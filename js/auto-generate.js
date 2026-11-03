/**
 * LV Spices Manufacturing & Processing Records
 * Manufacturing Batch Auto-Generation Engine
 */

import {
  calcIngredientQty,
  calcYield,
  calcProcessLoss,
  calcPackedQty,
  formatDate,
  formatDateISO,
  generateBatchNo,
  generateDispatchRefNo,
  generatePackagingLot
} from './calculations.js';

// Master list of products and recipes
export const PRODUCT_MASTER = [
  {
    code: 'PBM',
    name: 'Pav Bhaji Masala',
    category: 'Blended Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 28.0 },
      { srNo: 2, name: 'Cumin (Jeera)', rmBatchNo: 'JE-250915', formulaPct: 10.0 },
      { srNo: 3, name: 'Red Chilli (Lal Mirch)', rmBatchNo: 'RM-250910', formulaPct: 10.0 },
      { srNo: 4, name: 'Turmeric (Haldi)', rmBatchNo: 'TU-250908', formulaPct: 4.0 },
      { srNo: 5, name: 'Fennel (Saunf)', rmBatchNo: 'SF-250912', formulaPct: 8.0 },
      { srNo: 6, name: 'Other Spices & Salt (Blend)', rmBatchNo: 'OS-250914', formulaPct: 40.0 }
    ]
  },
  {
    code: 'TMS',
    name: 'Tea Masala',
    category: 'Speciality Blends',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Ginger (Sonth)', rmBatchNo: 'GN-250902', formulaPct: 30.0 },
      { srNo: 2, name: 'Green Cardamom (Elaichi)', rmBatchNo: 'CD-250911', formulaPct: 20.0 },
      { srNo: 3, name: 'Cloves (Laung)', rmBatchNo: 'CL-250907', formulaPct: 10.0 },
      { srNo: 4, name: 'Black Pepper (Kali Mirch)', rmBatchNo: 'BP-250903', formulaPct: 15.0 },
      { srNo: 5, name: 'Cinnamon (Dalchini)', rmBatchNo: 'CN-250909', formulaPct: 10.0 },
      { srNo: 6, name: 'Other Spices & Herbs', rmBatchNo: 'OH-250916', formulaPct: 15.0 }
    ]
  },
  {
    code: 'CHM',
    name: 'Chana Masala',
    category: 'Blended Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 35.0 },
      { srNo: 2, name: 'Pomegranate Seeds (Anardana)', rmBatchNo: 'AD-250920', formulaPct: 20.0 },
      { srNo: 3, name: 'Cumin (Jeera)', rmBatchNo: 'JE-250915', formulaPct: 15.0 },
      { srNo: 4, name: 'Red Chilli (Lal Mirch)', rmBatchNo: 'RM-250910', formulaPct: 10.0 },
      { srNo: 5, name: 'Black Salt & Dry Mango', rmBatchNo: 'BS-250918', formulaPct: 10.0 },
      { srNo: 6, name: 'Garam Masala Blend', rmBatchNo: 'GM-250922', formulaPct: 10.0 }
    ]
  },
  {
    code: 'BMS',
    name: 'Biryani Masala',
    category: 'Speciality Blends',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 25.0 },
      { srNo: 2, name: 'Cumin (Jeera)', rmBatchNo: 'JE-250915', formulaPct: 15.0 },
      { srNo: 3, name: 'Cardamom & Mace', rmBatchNo: 'CM-250925', formulaPct: 15.0 },
      { srNo: 4, name: 'Cinnamon & Cloves', rmBatchNo: 'CC-250927', formulaPct: 15.0 },
      { srNo: 5, name: 'Black Pepper & Bay Leaf', rmBatchNo: 'BL-250929', formulaPct: 15.0 },
      { srNo: 6, name: 'Star Anise & Nutmeg', rmBatchNo: 'SN-250931', formulaPct: 15.0 }
    ]
  },
  {
    code: 'KMS',
    name: 'Kitchen King Masala',
    category: 'Blended Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 30.0 },
      { srNo: 2, name: 'Cumin (Jeera)', rmBatchNo: 'JE-250915', formulaPct: 15.0 },
      { srNo: 3, name: 'Turmeric (Haldi)', rmBatchNo: 'TU-250908', formulaPct: 10.0 },
      { srNo: 4, name: 'Red Chilli (Lal Mirch)', rmBatchNo: 'RM-250910', formulaPct: 10.0 },
      { srNo: 5, name: 'Black Pepper & Cardamom', rmBatchNo: 'BC-250933', formulaPct: 15.0 },
      { srNo: 6, name: 'Dry Ginger & Fenugreek', rmBatchNo: 'GF-250935', formulaPct: 20.0 }
    ]
  },
  {
    code: 'SBM',
    name: 'Sambhar Masala',
    category: 'Blended Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 40.0 },
      { srNo: 2, name: 'Chana Dal & Urad Dal', rmBatchNo: 'CD-250937', formulaPct: 25.0 },
      { srNo: 3, name: 'Red Chilli (Lal Mirch)', rmBatchNo: 'RM-250910', formulaPct: 15.0 },
      { srNo: 4, name: 'Cumin & Fenugreek', rmBatchNo: 'CF-250939', formulaPct: 10.0 },
      { srNo: 5, name: 'Curry Leaves & Asafoetida', rmBatchNo: 'CA-250941', formulaPct: 10.0 }
    ]
  },
  {
    code: 'PNM',
    name: 'Paneer Masala',
    category: 'Blended Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania)', rmBatchNo: 'DH-250901', formulaPct: 30.0 },
      { srNo: 2, name: 'Kashmiri Red Chilli', rmBatchNo: 'RM-250910', formulaPct: 20.0 },
      { srNo: 3, name: 'Cumin (Jeera)', rmBatchNo: 'JE-250915', formulaPct: 15.0 },
      { srNo: 4, name: 'Turmeric (Haldi)', rmBatchNo: 'TU-250908', formulaPct: 5.0 },
      { srNo: 5, name: 'Kasuri Methi & Cardamom', rmBatchNo: 'KM-250943', formulaPct: 15.0 },
      { srNo: 6, name: 'Kitchen Spices Blend', rmBatchNo: 'KB-250945', formulaPct: 15.0 }
    ]
  },
  {
    code: 'AMM',
    name: 'Aamchur Powder',
    category: 'Pure Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Dried Green Mango (Aamchur)', rmBatchNo: 'AM-250950', formulaPct: 100.0 }
    ]
  },
  {
    code: 'HLD',
    name: 'Haldi Powder',
    category: 'Pure Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Turmeric (Haldi Finger)', rmBatchNo: 'TU-250908', formulaPct: 100.0 }
    ]
  },
  {
    code: 'DNM',
    name: 'Dhaniya Powder',
    category: 'Pure Spices',
    defaultQty: 1.0,
    packSize: '100 g',
    recipe: [
      { srNo: 1, name: 'Coriander (Dhania Seeds)', rmBatchNo: 'DH-250901', formulaPct: 100.0 }
    ]
  }
];

// Default Weekly Schedule (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
export const DEFAULT_WEEKLY_SCHEDULE = {
  0: [], // Sunday: No production
  1: ['PBM', 'TMS'], // Monday
  2: ['CHM', 'BMS'], // Tuesday
  3: ['KMS', 'SBM'], // Wednesday
  4: ['PNM', 'AMM'], // Thursday
  5: ['HLD', 'DNM'], // Friday
  6: ['PBM', 'CHM']  // Saturday
};

/**
 * Standard 10-step process flow template
 */
export function createProcessSteps(status = 'Completed') {
  const isCompleted = status === 'Completed';
  return [
    { id: 1, name: 'Raw Material Receipt', status: 'Completed', notes: 'Checked inward weights, COA verified' },
    { id: 2, name: 'Cleaning & Sorting', status: 'Completed', notes: 'Air classification & destoning cleared' },
    { id: 3, name: 'Grinding', status: 'Completed', notes: 'Cold grinding below 42°C' },
    { id: 4, name: 'Sieving', status: 'Completed', notes: '30-mesh vibratory sifter verified' },
    { id: 5, name: 'Blending / Mixing', status: 'Completed', notes: 'Ribbon blender 15 min uniform blend' },
    { id: 6, name: 'Metal Detection', status: 'N/A', notes: 'Checked against Fe 1.5mm standard' },
    { id: 7, name: 'Packing', status: isCompleted ? 'Completed' : 'Pending', notes: 'Food grade pouch sealed' },
    { id: 8, name: 'Finished Goods', status: isCompleted ? 'Completed' : 'Pending', notes: 'Secondary carton packaging done' },
    { id: 9, name: 'Quality Release', status: isCompleted ? 'Completed' : 'Pending', notes: 'Moisture, volatile oil & sensory passed' },
    { id: 10, name: 'Dispatch', status: isCompleted ? 'Completed' : 'Pending', notes: 'Transporter signoff recorded' }
  ];
}

/**
 * Create a single batch record object
 */
export function buildBatchRecord({
  product,
  dateStr,
  seq = 1,
  plannedQty = 1.0,
  status = 'Completed',
  actualQty = null,
  yieldPct = null,
  qualityPassed = true
}) {
  const displayDate = formatDate(dateStr);
  const batchNo = generateBatchNo(product.code, dateStr, seq);
  const dispatchRefNo = generateDispatchRefNo(batchNo);
  const packagingLot = generatePackagingLot(dateStr);

  const isCompleted = status === 'Completed';
  const effectiveActualQty = isCompleted
    ? (actualQty != null ? actualQty : plannedQty)
    : null;

  const effectiveYieldPct = isCompleted
    ? (yieldPct != null ? yieldPct : calcYield(plannedQty, effectiveActualQty))
    : null;

  const processLoss = isCompleted
    ? calcProcessLoss(plannedQty, effectiveActualQty)
    : 0;

  // Calculate ingredients
  const ingredients = product.recipe.map((item) => {
    const reqQty = calcIngredientQty(plannedQty, item.formulaPct);
    return {
      srNo: item.srNo,
      name: item.name,
      rmBatchNo: item.rmBatchNo,
      formulaPct: item.formulaPct,
      requiredQty: reqQty,
      actualUsed: isCompleted ? reqQty : (status === 'Pending' ? reqQty : null)
    };
  });

  const totalFormulaPct = product.recipe.reduce((sum, r) => sum + r.formulaPct, 0);
  const totalRequiredQty = ingredients.reduce((sum, r) => sum + r.requiredQty, 0);
  const totalActualUsed = isCompleted
    ? ingredients.reduce((sum, r) => sum + (r.actualUsed || 0), 0)
    : null;

  // Packing details
  const packSize = product.packSize || '100 g';
  const netWtPerPack = 0.1; // 100g = 0.100 kg
  const numPacks = isCompleted ? Math.round(effectiveActualQty / netWtPerPack) : 10;
  const totalPackedQty = isCompleted ? effectiveActualQty : plannedQty;

  const internalRMBatches = ingredients.map((i) => i.rmBatchNo).filter(Boolean).slice(0, 3).join(', ') + '...';

  return {
    id: batchNo,
    batchNo,
    productCode: product.code,
    productName: product.name,
    category: product.category,
    date: dateStr,
    displayDate,
    plannedQty,
    actualQty: effectiveActualQty,
    yieldPct: effectiveYieldPct,
    status, // 'Completed' | 'Pending' | 'Not Recorded'
    ingredients,
    formulaSummary: {
      totalFormulaPct: Math.round(totalFormulaPct * 100) / 100,
      totalRequiredQty: Math.round(totalRequiredQty * 1000) / 1000,
      totalActualUsed: totalActualUsed != null ? Math.round(totalActualUsed * 1000) / 1000 : null
    },
    packingDetails: {
      packSize,
      netWtPerPack,
      numPacks,
      totalPackedQty
    },
    yieldQuality: {
      inputQty: plannedQty,
      outputQty: effectiveActualQty != null ? effectiveActualQty : plannedQty,
      processLoss,
      wastage: 0.0,
      yieldPct: effectiveYieldPct != null ? effectiveYieldPct : 100.0,
      qualityCheck: qualityPassed ? 'Passed' : 'Pending',
      releaseStatus: isCompleted ? 'Released' : 'Pending',
      reprocessing: 'Not Applicable'
    },
    dispatch: {
      dispatchDate: displayDate,
      dispatchQty: effectiveActualQty != null ? effectiveActualQty : plannedQty,
      numPacks,
      dispatchRefNo,
      status: isCompleted ? 'Dispatched' : 'Pending'
    },
    traceability: {
      supplier: 'Multiple',
      supplierLotNo: 'As per RM',
      internalRMBatchNo: internalRMBatches,
      manufacturingBatchNo: batchNo,
      finishedGoodsBatchNo: batchNo,
      packagingMaterialLot: packagingLot
    },
    remarks: 'Batch manufactured as per approved recipe & process.',
    verification: {
      preparedBy: 'Ramesh Kumar',
      checkedBy: 'Suresh Patel',
      approvedBy: 'Vikram Singh'
    },
    processSteps: createProcessSteps(status),
    autoGenerated: true,
    createdAt: new Date().toISOString()
  };
}

/**
 * Generate batches for a single calendar date based on schedule
 * @param {string} dateStr - YYYY-MM-DD
 * @param {object} customSchedule - Optional override
 * @returns {Array} Array of generated batch objects
 */
export function generateDayBatches(dateStr, customSchedule = DEFAULT_WEEKLY_SCHEDULE) {
  if (!dateStr) return [];
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayOfWeek = d.getDay();

  // Sunday = 0 -> No production
  if (dayOfWeek === 0) {
    return [];
  }

  const productCodes = customSchedule[dayOfWeek] || [];
  if (!productCodes.length) {
    return [];
  }

  const batches = [];
  productCodes.forEach((code, idx) => {
    const product = PRODUCT_MASTER.find((p) => p.code === code);
    if (!product) return;

    // Determine default status & yield for realistic simulation
    // Usually completed 100%, occasionally 98% or 99%
    let actualQty = 1.0;
    let yieldPct = 100.0;
    let status = 'Completed';

    // Slight realistic variety for 1 in 8 batches
    const hash = (d.getDate() * 13 + idx * 7 + product.code.charCodeAt(0)) % 100;
    if (hash < 12) {
      actualQty = 0.98;
      yieldPct = 98.0;
    } else if (hash < 24) {
      actualQty = 0.99;
      yieldPct = 99.0;
    }

    const batch = buildBatchRecord({
      product,
      dateStr,
      seq: idx + 1,
      plannedQty: product.defaultQty || 1.0,
      status,
      actualQty,
      yieldPct,
      qualityPassed: true
    });

    batches.push(batch);
  });

  return batches;
}

/**
 * Generate batches across a date range (start to end inclusive)
 * @param {string} startDateStr - YYYY-MM-DD
 * @param {string} endDateStr - YYYY-MM-DD
 * @param {function} onProgress - Optional callback(current, total, dayBatches)
 * @returns {Array} Array of all generated batches
 */
export function generateDateRangeBatches(startDateStr, endDateStr, onProgress = null) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (start > end) return [];

  const allBatches = [];
  const cur = new Date(start);
  const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  let dayCount = 0;

  while (cur <= end) {
    const dateStr = formatDateISO(cur);
    const dayBatches = generateDayBatches(dateStr);
    allBatches.push(...dayBatches);
    dayCount++;

    if (onProgress) {
      onProgress(dayCount, totalDays, dayBatches, dateStr);
    }

    cur.setDate(cur.getDate() + 1);
  }

  return allBatches;
}

/**
 * Check if batches exist in Firestore for today; if not, generate and insert them.
 * @param {object} firebaseService - Reference to firebase-config module functions
 */
export async function checkAndGenerateToday(firebaseService) {
  try {
    const todayISO = formatDateISO(new Date());
    const [year, month, day] = todayISO.split('-').map(Number);
    const d = new Date(year, month - 1, day);

    // If Sunday, no production
    if (d.getDay() === 0) {
      return { generated: 0, reason: 'Sunday - No Production Scheduled' };
    }

    // Check if batches already exist for today
    const existing = await firebaseService.fetchBatches(todayISO, todayISO);
    if (existing && existing.length > 0) {
      return { generated: 0, existing: existing.length, reason: 'Batches already exist for today' };
    }

    // Generate batches for today
    const newBatches = generateDayBatches(todayISO);
    if (!newBatches.length) {
      return { generated: 0, reason: 'No products scheduled' };
    }

    // Save to Firestore
    await firebaseService.batchSave(newBatches);
    return { generated: newBatches.length, batches: newBatches };
  } catch (err) {
    console.error('Error in checkAndGenerateToday:', err);
    return { error: err.message };
  }
}
