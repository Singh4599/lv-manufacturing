/**
 * LV Spices Manufacturing & Processing Records
 * Firebase Firestore Configuration & Data Service
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

import { formatDateISO } from './calculations.js';

const firebaseConfig = {
  apiKey: "AIzaSyDtzCXonT008wlOb4Lk5cSkAhAiJHvlanE",
  authDomain: "process-b5150.firebaseapp.com",
  projectId: "process-b5150",
  storageBucket: "process-b5150.firebasestorage.app",
  messagingSenderId: "1072136844370",
  appId: "1:1072136844370:web:8f2b2ec83a68179f8d9b8b"
};

// Initialize Firebase App & Firestore
let app = null;
let db = null;
let isFirestoreAvailable = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirestoreAvailable = true;
} catch (err) {
  console.warn('Firebase initialization error, will use local storage fallback:', err);
}

const LOCAL_STORAGE_BATCHES_KEY = 'lv_spices_batches_v2';
const LOCAL_STORAGE_PRODUCTS_KEY = 'lv_spices_products_v2';
const LOCAL_STORAGE_SETTINGS_KEY = 'lv_spices_settings_v2';

// In-memory cache
let localBatchesMemory = [];
try {
  const cached = localStorage.getItem(LOCAL_STORAGE_BATCHES_KEY);
  if (cached) {
    localBatchesMemory = JSON.parse(cached);
  }
} catch (e) {
  localBatchesMemory = [];
}

/**
 * Persist memory cache to localStorage
 */
function syncLocalCache() {
  try {
    localStorage.setItem(LOCAL_STORAGE_BATCHES_KEY, JSON.stringify(localBatchesMemory));
  } catch (e) {
    console.warn('LocalStorage quota or write error:', e);
  }
}

/**
 * Fetch Batches from Firestore with optional filtering
 * @param {string|null} dateFrom - YYYY-MM-DD
 * @param {string|null} dateTo - YYYY-MM-DD
 * @param {string|null} search - Search query for batchNo or productName
 * @param {string|null} status - Optional status filter
 * @returns {Promise<Array>}
 */
export async function fetchBatches(dateFrom = null, dateTo = null, search = null, status = null) {
  let batches = [];

  if (isFirestoreAvailable && db) {
    try {
      const coll = collection(db, 'manufacturingBatches');
      let q = query(coll, orderBy('date', 'desc'), orderBy('batchNo', 'desc'));

      // If date range is specified
      if (dateFrom && dateTo) {
        q = query(coll, where('date', '>=', dateFrom), where('date', '<=', dateTo), orderBy('date', 'desc'), orderBy('batchNo', 'desc'));
      } else if (dateFrom) {
        q = query(coll, where('date', '>=', dateFrom), orderBy('date', 'desc'), orderBy('batchNo', 'desc'));
      }

      const snap = await getDocs(q);
      snap.forEach((d) => {
        batches.push({ id: d.id, ...d.data() });
      });

      // Update local memory and cache
      if (batches.length > 0) {
        // Merge into local cache
        const map = new Map();
        localBatchesMemory.forEach((b) => map.set(b.id || b.batchNo, b));
        batches.forEach((b) => map.set(b.id || b.batchNo, b));
        localBatchesMemory = Array.from(map.values()).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        syncLocalCache();
      }
    } catch (err) {
      console.warn('Firestore fetchBatches query failed, falling back to local cache:', err);
      batches = [...localBatchesMemory];
    }
  } else {
    batches = [...localBatchesMemory];
  }

  // If localBatchesMemory was used or filtering required
  if (dateFrom || dateTo) {
    batches = batches.filter((b) => {
      if (dateFrom && b.date < dateFrom) return false;
      if (dateTo && b.date > dateTo) return false;
      return true;
    });
  }

  // Text search filter
  if (search && search.trim() !== '') {
    const term = search.trim().toLowerCase();
    batches = batches.filter((b) => {
      const bNo = (b.batchNo || '').toLowerCase();
      const pName = (b.productName || '').toLowerCase();
      const pCode = (b.productCode || '').toLowerCase();
      return bNo.includes(term) || pName.includes(term) || pCode.includes(term);
    });
  }

  // Status filter
  if (status && status !== 'all') {
    batches = batches.filter((b) => (b.status || '').toLowerCase() === status.toLowerCase());
  }

  // Sort descending by date, then batchNo
  batches.sort((a, b) => {
    const cmp = (b.date || '').localeCompare(a.date || '');
    if (cmp !== 0) return cmp;
    return (b.batchNo || '').localeCompare(a.batchNo || '');
  });

  return batches;
}

/**
 * Fetch a single batch document by ID / BatchNo
 * @param {string} id - Document ID or batch number
 * @returns {Promise<object|null>}
 */
export async function fetchBatchById(id) {
  if (!id) return null;

  if (isFirestoreAvailable && db) {
    try {
      const docRef = doc(db, 'manufacturingBatches', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
    } catch (err) {
      console.warn('Firestore fetchBatchById failed, checking local cache:', err);
    }
  }

  // Fallback to local memory
  const found = localBatchesMemory.find((b) => b.id === id || b.batchNo === id);
  return found || null;
}

/**
 * Save or update a single batch record
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function saveBatch(data) {
  const docId = data.id || data.batchNo;
  const payload = {
    ...data,
    id: docId,
    updatedAt: new Date().toISOString()
  };

  if (isFirestoreAvailable && db) {
    try {
      const docRef = doc(db, 'manufacturingBatches', docId);
      await setDoc(docRef, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore saveBatch failed, caching locally:', err);
    }
  }

  // Update memory & local cache
  const idx = localBatchesMemory.findIndex((b) => (b.id || b.batchNo) === docId);
  if (idx >= 0) {
    localBatchesMemory[idx] = payload;
  } else {
    localBatchesMemory.unshift(payload);
  }
  syncLocalCache();

  return payload;
}

/**
 * Bulk save batches using Firestore batch writes (chunks of 400)
 * @param {Array<object>} records
 * @param {function} onChunkSaved
 * @returns {Promise<{saved: number, errors: number}>}
 */
export async function batchSave(records, onChunkSaved = null) {
  if (!records || !records.length) return { saved: 0, errors: 0 };

  let savedCount = 0;
  let errorCount = 0;
  const CHUNK_SIZE = 400; // Under Firestore 500 limit

  for (let i = 0; i < records.length; i += CHUNK_SIZE) {
    const chunk = records.slice(i, i + CHUNK_SIZE);

    if (isFirestoreAvailable && db) {
      try {
        const batch = writeBatch(db);
        chunk.forEach((rec) => {
          const docId = rec.id || rec.batchNo;
          const ref = doc(db, 'manufacturingBatches', docId);
          batch.set(ref, {
            ...rec,
            id: docId,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        });

        await batch.commit();
        savedCount += chunk.length;
      } catch (err) {
        console.error('Firestore batch commit error:', err);
        errorCount += chunk.length;
      }
    } else {
      savedCount += chunk.length;
    }

    // Merge into local cache
    const map = new Map();
    localBatchesMemory.forEach((b) => map.set(b.id || b.batchNo, b));
    chunk.forEach((b) => map.set(b.id || b.batchNo, b));
    localBatchesMemory = Array.from(map.values()).sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (onChunkSaved) {
      onChunkSaved(Math.min(i + CHUNK_SIZE, records.length), records.length);
    }
  }

  syncLocalCache();
  return { saved: savedCount, errors: errorCount };
}

/**
 * Calculate Summary Statistics
 * @returns {Promise<object>}
 */
export async function getStats() {
  const allBatches = await fetchBatches();
  const todayISO = formatDateISO(new Date());

  let totalBatches = allBatches.length;
  let todayProduction = 0;
  let totalFinishedQtyKg = 0;
  let pendingRecords = 0;

  allBatches.forEach((b) => {
    // Today's production
    if (b.date === todayISO) {
      todayProduction++;
    }

    // Finished quantity
    if (b.actualQty != null && !isNaN(b.actualQty)) {
      totalFinishedQtyKg += Number(b.actualQty);
    } else if (b.status === 'Completed' && b.plannedQty != null) {
      totalFinishedQtyKg += Number(b.plannedQty);
    }

    // Pending records
    if (b.status === 'Pending' || b.actualQty == null) {
      pendingRecords++;
    }
  });

  return {
    totalBatches,
    todayProduction,
    totalFinishedQtyKg: Math.round(totalFinishedQtyKg * 100) / 100,
    pendingRecords
  };
}

/**
 * Subscribe to real-time stats updates
 * @param {function} callback
 * @returns {function} Unsubscribe function
 */
export function subscribeToStats(callback) {
  if (!isFirestoreAvailable || !db) {
    // Local fallback: invoke callback once
    getStats().then(callback);
    return () => {};
  }

  try {
    const coll = collection(db, 'manufacturingBatches');
    const unsub = onSnapshot(coll, (snap) => {
      let totalBatches = snap.size;
      let todayProduction = 0;
      let totalFinishedQtyKg = 0;
      let pendingRecords = 0;
      const todayISO = formatDateISO(new Date());

      snap.forEach((d) => {
        const b = d.data();
        if (b.date === todayISO) todayProduction++;
        if (b.actualQty != null && !isNaN(b.actualQty)) {
          totalFinishedQtyKg += Number(b.actualQty);
        } else if (b.status === 'Completed' && b.plannedQty != null) {
          totalFinishedQtyKg += Number(b.plannedQty);
        }
        if (b.status === 'Pending' || b.actualQty == null) {
          pendingRecords++;
        }
      });

      callback({
        totalBatches,
        todayProduction,
        totalFinishedQtyKg: Math.round(totalFinishedQtyKg * 100) / 100,
        pendingRecords
      });
    }, (err) => {
      console.warn('onSnapshot listener error:', err);
      getStats().then(callback);
    });

    return unsub;
  } catch (err) {
    console.warn('Failed to attach onSnapshot, falling back:', err);
    getStats().then(callback);
    return () => {};
  }
}

/**
 * Fetch Product Master from Firestore or local fallback
 */
export async function fetchProducts() {
  if (isFirestoreAvailable && db) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        const products = [];
        snap.forEach((d) => products.push({ id: d.id, ...d.data() }));
        return products;
      }
    } catch (err) {
      console.warn('Firestore fetchProducts error:', err);
    }
  }

  // Check local storage
  const cached = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  return null;
}

/**
 * Save Product to Firestore and local storage
 */
export async function saveProduct(product) {
  if (isFirestoreAvailable && db) {
    try {
      const ref = doc(db, 'products', product.code);
      await setDoc(ref, product, { merge: true });
    } catch (err) {
      console.warn('saveProduct firestore error:', err);
    }
  }

  let products = [];
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (cached) products = JSON.parse(cached);
  } catch (e) {}

  const idx = products.findIndex((p) => p.code === product.code);
  if (idx >= 0) products[idx] = product;
  else products.push(product);

  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  return product;
}

/**
 * Fetch Global App Settings
 */
export async function fetchAppSettings() {
  if (isFirestoreAvailable && db) {
    try {
      const ref = doc(db, 'appSettings', 'globalConfig');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (err) {
      console.warn('fetchAppSettings error:', err);
    }
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  return {
    defaultBatchQty: 1.0,
    autoGenerationEnabled: true,
    lastBackfillDate: null
  };
}

/**
 * Save Global App Settings
 */
export async function saveAppSettings(settings) {
  if (isFirestoreAvailable && db) {
    try {
      const ref = doc(db, 'appSettings', 'globalConfig');
      await setDoc(ref, settings, { merge: true });
    } catch (err) {
      console.warn('saveAppSettings error:', err);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  return settings;
}

export { db, isFirestoreAvailable };
