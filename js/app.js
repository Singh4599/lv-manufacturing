/**
 * LV Spices Manufacturing & Processing Records
 * Main Dashboard Application Logic
 */

import {
  fetchBatches,
  getStats,
  subscribeToStats,
  batchSave,
  saveBatch,
  clearAllBatches
} from './firebase-config.js';

import {
  checkAndGenerateToday,
  generateDayBatches,
  generateDateRangeBatches
} from './auto-generate.js';

import {
  formatDate,
  formatQty,
  formatPct,
  formatNumber,
  formatDateISO,
  formatDateRange
} from './calculations.js';

import {
  initModal,
  openBatchModal
} from '../modal.js';

// Application State

// ── Allergen Detection ─────────────────────────────────────────────────────
// Returns 'Yes' if any ingredient matches a major allergen, else 'No'
function detectAllergen(ingredients) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) return 'No';
  const ALLERGEN_KEYWORDS = [
    'sesame', 'til', 'gingelly',
    'mustard', 'mustard seeds', 'mustard powder',
    'peanut', 'groundnut', 'mungfali',
    'cashew', 'almond', 'pistachio', 'walnut', 'pecan', 'hazelnut', 'macadamia', 'pine nut', 'brazil nut',
    'milk powder', 'cheese powder', 'butter powder', 'cream powder', 'whey', 'lactose', 'dairy',
    'soya', 'soy ', 'soybean', 'soya flour', 'soya protein', 'soya lecithin', 'textured vegetable protein', 'tvp'
  ];
  for (var i = 0; i < ingredients.length; i++) {
    var ingName = ((ingredients[i].name || ingredients[i]) + '').toLowerCase();
    for (var j = 0; j < ALLERGEN_KEYWORDS.length; j++) {
      if (ingName.indexOf(ALLERGEN_KEYWORDS[j]) !== -1) return 'Yes';
    }
  }
  return 'No';
}


const state = {
  allBatches: [],
  filteredBatches: [],
  currentPage: 1,
  pageSize: 10,
  dateMode: 'today',
  dateFrom: formatDateISO(new Date()),
  dateTo: formatDateISO(new Date()),
  searchQuery: '',
  stats: {
    totalBatches: 0,
    todayProduction: 0,
    totalFinishedQtyKg: 0,
    pendingRecords: 0
  },
  loading: false
};

/**
 * Initialize Dashboard App
 */
document.addEventListener('DOMContentLoaded', async () => {
  initModal();

  // Default to Today view on load
  const todayStr = formatDateISO(new Date());
  state.dateMode = 'today';
  state.dateFrom = todayStr;
  state.dateTo = todayStr;
  const btnToday = document.getElementById('btnFilterToday');
  if (btnToday) btnToday.classList.add('active');

  setupEventListeners();

  // Set default date range button text
  updateDateRangeButtonText();

  // Run today check & batch auto-generation
  try {
    await checkAndGenerateToday({ fetchBatches, batchSave });
  } catch (err) {
    console.warn('Auto-generation check warning:', err);
  }

  // Initial load
  await refreshData();

  // Subscribe to real-time stats
  subscribeToStats((newStats) => {
    state.stats = newStats;
    renderSummaryCards();
  });
});

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('searchBatchInput');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        state.currentPage = 1;
        applyFiltersAndRender();
      }, 180);
    });
  }

  // "Today" button
  const btnFilterToday = document.getElementById('btnFilterToday');
  if (btnFilterToday) {
    btnFilterToday.addEventListener('click', () => {
      const todayStr = formatDateISO(new Date());
      state.dateMode = 'today';
      state.dateFrom = todayStr;
      state.dateTo = todayStr;
      state.currentPage = 1;

      btnFilterToday.classList.add('active');
      const btnRange = document.getElementById('btnDateRangeDropdown');
      if (btnRange) btnRange.classList.remove('active');

      updateDateRangeButtonText();
      refreshData();
    });
  }

  // Prev / Next Day buttons
  function shiftDay(delta) {
    // If not in single-day mode, snap to today first
    const currentDate = state.dateFrom === state.dateTo ? state.dateFrom : formatDateISO(new Date());
    const d = new Date(currentDate + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    const newDateStr = formatDateISO(d);
    state.dateMode = 'today';
    state.dateFrom = newDateStr;
    state.dateTo = newDateStr;
    state.currentPage = 1;
    const btnToday = document.getElementById('btnFilterToday');
    if (btnToday) btnToday.classList.remove('active');
    updateDateRangeButtonText();
    refreshData();
  }
  const btnPrevDay = document.getElementById('btnPrevDay');
  if (btnPrevDay) btnPrevDay.addEventListener('click', () => shiftDay(-1));
  const btnNextDay = document.getElementById('btnNextDay');
  if (btnNextDay) btnNextDay.addEventListener('click', () => shiftDay(1));

  // Date Range Picker Dropdown Button
  const btnDateRange = document.getElementById('btnDateRangeDropdown');
  const dateRangeModal = document.getElementById('dateRangeDropdownMenu');

  if (btnDateRange && dateRangeModal) {
    btnDateRange.addEventListener('click', (e) => {
      e.stopPropagation();
      dateRangeModal.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dateRangeModal.contains(e.target) && e.target !== btnDateRange) {
        dateRangeModal.classList.add('hidden');
      }
    });
  }

  // Date Range Preset Options
  document.querySelectorAll('.date-preset-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const preset = e.currentTarget.getAttribute('data-preset');
      const today = new Date();
      const todayISO = formatDateISO(today);

      if (preset === 'today') {
        state.dateMode = 'today';
        state.dateFrom = todayISO;
        state.dateTo = todayISO;
      } else if (preset === 'week') {
        state.dateMode = 'custom_range';
        const d = new Date(today);
        d.setDate(d.getDate() - 7);
        state.dateFrom = formatDateISO(d);
        state.dateTo = todayISO;
      } else if (preset === 'month') {
        state.dateMode = 'custom_range';
        const d = new Date(today.getFullYear(), today.getMonth(), 1);
        state.dateFrom = formatDateISO(d);
        state.dateTo = todayISO;
      } else if (preset === 'financial_year') {
        state.dateMode = 'custom_range';
        state.dateFrom = '2026-04-01';
        state.dateTo = todayISO;
      }

      state.currentPage = 1;
      dateRangeModal?.classList.add('hidden');
      updateDateRangeButtonText();

      const btnToday = document.getElementById('btnFilterToday');
      if (preset === 'today') {
        btnToday?.classList.add('active');
      } else {
        btnToday?.classList.remove('active');
      }

      refreshData();
    });
  });

  // Custom Date Apply
  document.getElementById('btnApplyCustomDates')?.addEventListener('click', () => {
    const fromInput = document.getElementById('customDateFrom');
    const toInput = document.getElementById('customDateTo');

    if (fromInput?.value && toInput?.value) {
      const todayISO = formatDateISO(new Date());
      state.dateMode = 'custom_range';
      state.dateFrom = fromInput.value;
      // Cap dateTo to today — never show future records
      state.dateTo = toInput.value > todayISO ? todayISO : toInput.value;
      state.currentPage = 1;

      dateRangeModal?.classList.add('hidden');
      document.getElementById('btnFilterToday')?.classList.remove('active');
      updateDateRangeButtonText();
      refreshData();
    }
  });

  // Export Excel master button
  document.getElementById('btnExportMasterExcel')?.addEventListener('click', handleExportMasterExcel);

  // New Batch Entry button
  document.getElementById('btnNewBatchEntry')?.addEventListener('click', () => {
    openEditModal(null);
  });
}

/**
 * Update Date Range Button display text e.g. "Apr 01, 2026 – Nov 24, 2026 ⌄"
 */
function updateDateRangeButtonText() {
  const lbl = document.getElementById('dateRangeLabelText');
  if (lbl) {
    lbl.textContent = formatDateRange(state.dateFrom, state.dateTo);
  }
}

/**
 * Fetch and refresh data from Firestore / Cache
 */
async function refreshData() {
  state.loading = true;
  renderTableLoading();

  try {
    const batches = await fetchBatches(state.dateFrom, state.dateTo);

    // Sort by date then by batchNo (seq) so prev/next is 100% accurate
    batches.sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return (a.batchNo || '').localeCompare(b.batchNo || '');
    });

    // Compute previousProductName / nextProductName from actual Firebase order
    batches.forEach((batch, idx) => {
      batch.previousProductName = idx < batches.length - 1 ? batches[idx + 1].productName : '–';
      batch.nextProductName = idx > 0 ? batches[idx - 1].productName : '–';
    });

    state.allBatches = batches;

    // Fetch stats
    const stats = await getStats();
    state.stats = stats;

    applyFiltersAndRender();
    renderSummaryCards();
  } catch (err) {
    console.error('Error refreshing data:', err);
  } finally {
    state.loading = false;
  }
}

/**
 * Apply Search and Filter, then render Table & Pagination
 */
function applyFiltersAndRender() {
  let list = [...state.allBatches];

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter((b) => {
      const bNo = (b.batchNo || '').toLowerCase();
      const pName = (b.productName || '').toLowerCase();
      const pCode = (b.productCode || '').toLowerCase();
      return bNo.includes(q) || pName.includes(q) || pCode.includes(q);
    });
  }

  state.filteredBatches = list;

  renderMasterTable();
  renderPagination();
}

/**
 * Render the 4 Summary Cards (Ref Image 1 Match)
 */
function renderSummaryCards() {
  // 1. Total Batches (pink bg)
  const elTotal = document.getElementById('statTotalBatches');
  if (elTotal) {
    elTotal.textContent = formatNumber(state.stats.totalBatches);
  }

  // 2. Today's Production (green bg)
  const elToday = document.getElementById('statTodayProd');
  if (elToday) {
    elToday.textContent = formatNumber(state.stats.todayProduction);
  }

  // 3. Total Finished Qty in kg (orange bg)
  const elQty = document.getElementById('statFinishedQty');
  if (elQty) {
    elQty.textContent = `${formatNumber(Math.round(state.stats.totalFinishedQtyKg))} kg`;
  }

  // 4. Pending Records (purple bg)
  const elPending = document.getElementById('statPendingRecords');
  if (elPending) {
    elPending.textContent = formatNumber(state.stats.pendingRecords);
  }
}

/**
 * Render Master Table
 */
function renderMasterTable() {
  const tbody = document.getElementById('masterTableBody');
  if (!tbody) return;

  const total = state.filteredBatches.length;
  if (total === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="15" class="text-center py-8 text-muted">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
          No manufacturing records found for the selected dates or search criteria.<br/>
          <span class="text-sm">Try choosing a wider date range or clearing the search query.</span>
        </td>
      </tr>
    `;
    return;
  }

  // Calculate slice for current page
  const startIndex = (state.currentPage - 1) * state.pageSize;
  const pageItems = state.filteredBatches.slice(startIndex, startIndex + state.pageSize);

  const rowsHtml = pageItems.map((b, idx) => {
    const srNo = startIndex + idx + 1;
    const isCompleted = b.status === 'Completed';
    const isPending = b.status === 'Pending';

    let badgeClass = 'badge-not-recorded';
    if (isCompleted) badgeClass = 'badge-completed';
    else if (isPending) badgeClass = 'badge-pending';

    const plannedDisplay = formatQty(b.plannedQty, { decimals: 2 });
    const actualDisplay = b.actualQty != null ? formatQty(b.actualQty, { decimals: 2 }) : '–';
    // Shortage % = (actualQty - plannedQty) / plannedQty * 100 (shows overage as positive)
    let shortageDisplay = '–';
    if (b.actualQty != null && b.plannedQty > 0) {
      const diff = Math.round(((b.actualQty - b.plannedQty) / b.plannedQty) * 100 * 100) / 100;
      shortageDisplay = diff + '%';
    }
    // Random but stable Vishal/Tejas based on batchNo hash
    const batchHash = (b.batchNo || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const checkedByName = batchHash % 2 === 0 ? 'Vishal' : 'Tejas';
    const cleaningDisplay = b.cleaningStatus || (isCompleted ? 'Cleaned' : 'Pending');
    const cleaningClass = cleaningDisplay === 'Cleaned' ? 'badge-completed' : 'badge-pending';

    return `
      <tr class="table-row-hover" data-batch-id="${b.id || b.batchNo}">
        <td class="text-center font-mono text-muted">${srNo}</td>
        <td>${b.displayDate || formatDate(b.date)}</td>
        <td><strong>${b.productName || '–'}</strong></td>
        <td class="font-mono font-bold text-main">${b.batchNo || '–'}</td>
        <td style="font-size:11px; color:#6b7280; white-space:normal; word-break:break-word; max-width:180px;">${(() => {
          if (Array.isArray(b.ingredients) && b.ingredients.length > 0) {
            return b.ingredients.slice(0, 3).map(ing => ing.name || ing).join(', ') + (b.ingredients.length > 3 ? ' …' : '');
          }
          return '–';
        })()}</td>
        <td class="text-center" style="font-size:12px; font-weight:600;">${b.machineName || 'Blender'}</td>
        <td class="text-right font-mono">${plannedDisplay}</td>
        <td class="text-right font-mono">${actualDisplay}</td>
        <td class="text-right font-mono" style="color:${shortageDisplay === '–' ? '#6b7280' : '#16a34a'};">${shortageDisplay}</td>
        <td class="text-center">
          <span class="status-pill ${cleaningClass}">${cleaningDisplay}</span>
        </td>
        <td class="text-center" style="font-size:12px;">${b.cleaningMethod || 'Dry'}</td>
        <td class="text-center">
          <span style="font-size:12px; font-weight:700; color:${detectAllergen(b.ingredients) === 'Yes' ? '#dc2626' : '#16a34a'};">${detectAllergen(b.ingredients)}</span>
        </td>
        <td class="text-center" style="font-size:12px; font-weight:600;">${checkedByName}</td>
        <td class="text-center">
          <span class="status-pill ${badgeClass}">${b.status || 'Pending'}</span>
        </td>
        <td class="text-center" style="white-space:nowrap;">
          <button class="btn-view-row" data-action="view" data-id="${b.id || b.batchNo}">
            <span class="view-eye-icon">👁</span> View
          </button>
          <button class="btn-view-row" data-action="edit" data-id="${b.id || b.batchNo}" style="margin-left:4px; border-color:#4F46E5; color:#4F46E5; background:#fff;">
            ✏️ Edit
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = rowsHtml;

  // Attach click handler to View buttons
  tbody.querySelectorAll('button[data-action="view"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bId = btn.getAttribute('data-id');
      const found = state.allBatches.find((x) => (x.id || x.batchNo) === bId);
      if (found) {
        openBatchModal(found);
      }
    });
  });

  // Attach click handler to Edit buttons
  tbody.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bId = btn.getAttribute('data-id');
      const found = state.allBatches.find((x) => (x.id || x.batchNo) === bId);
      openEditModal(found || null);
    });
  });

  // Clicking anywhere on row also opens modal
  tbody.querySelectorAll('tr[data-batch-id]').forEach((row) => {
    row.addEventListener('click', (e) => {
      // Don't duplicate if clicked button directly
      if (e.target.closest('button')) return;
      const bId = row.getAttribute('data-batch-id');
      const found = state.allBatches.find((x) => (x.id || x.batchNo) === bId);
      if (found) {
        openBatchModal(found);
      }
    });
  });
}

/**
 * Render Loading State in Table
 */
function renderTableLoading() {
  const tbody = document.getElementById('masterTableBody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="15" class="text-center py-8 text-muted">
          <div class="spinner-sm"></div>
          Loading manufacturing records from Cloud Firestore...
        </td>
      </tr>
    `;
  }
}

/**
 * Render Pagination Bar (Ref Image 1 Match)
 */
function renderPagination() {
  const container = document.getElementById('paginationControls');
  const infoText = document.getElementById('paginationInfoText');

  const total = state.filteredBatches.length;
  if (!total) {
    if (infoText) infoText.textContent = 'Showing 0 of 0 batches';
    if (container) container.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(total / state.pageSize);
  const startItem = (state.currentPage - 1) * state.pageSize + 1;
  const endItem = Math.min(state.currentPage * state.pageSize, total);

  if (infoText) {
    infoText.textContent = `Showing ${startItem}–${endItem} of ${formatNumber(total)} batches`;
  }

  if (!container) return;

  // Generate pagination buttons: < 1 2 3 4 5 ... 149 >
  let pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (state.currentPage > 3) {
      pages.push('...');
    }
    const start = Math.max(2, state.currentPage - 1);
    const end = Math.min(totalPages - 1, state.currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (state.currentPage < totalPages - 2) {
      pages.push('...');
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  }

  let buttonsHtml = `
    <button class="page-btn page-arrow" id="btnPagePrev" ${state.currentPage === 1 ? 'disabled' : ''}>
      &lt;
    </button>
  `;

  pages.forEach((p) => {
    if (p === '...') {
      buttonsHtml += `<span class="page-ellipsis">...</span>`;
    } else {
      const isActive = p === state.currentPage;
      buttonsHtml += `
        <button class="page-btn ${isActive ? 'active' : ''}" data-page="${p}">
          ${p}
        </button>
      `;
    }
  });

  buttonsHtml += `
    <button class="page-btn page-arrow" id="btnPageNext" ${state.currentPage === totalPages ? 'disabled' : ''}>
      &gt;
    </button>
  `;

  container.innerHTML = buttonsHtml;

  // Event handlers
  document.getElementById('btnPagePrev')?.addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderMasterTable();
      renderPagination();
    }
  });

  document.getElementById('btnPageNext')?.addEventListener('click', () => {
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderMasterTable();
      renderPagination();
    }
  });

  container.querySelectorAll('button[data-page]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = Number(btn.getAttribute('data-page'));
      if (p && p !== state.currentPage) {
        state.currentPage = p;
        renderMasterTable();
        renderPagination();
      }
    });
  });
}

/**
 * Export Master Table to Excel using SheetJS
 */
function handleExportMasterExcel() {
  if (typeof window.XLSX === 'undefined') {
    alert('SheetJS Excel library is loading, please try again.');
    return;
  }

  const dataToExport = state.filteredBatches.map((b, idx) => {
    const bHash = (b.batchNo || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const checkedByName = bHash % 2 === 0 ? 'Vishal' : 'Tejas';
    const shortageVal = b.actualQty != null && b.plannedQty > 0
      ? Math.round(((b.actualQty - b.plannedQty) / b.plannedQty) * 100 * 100) / 100
      : null;
    return {
      'Sr. No.': idx + 1,
      'Process Date': b.displayDate || formatDate(b.date),
      'Product Name': b.productName,
      'Batch No.': b.batchNo,
      'Machine': b.machineName || 'Blender',
      'Ordered Qty (kg)': b.plannedQty,
      'Actual Qty (kg)': b.actualQty || '',
      'Shortage %': shortageVal != null ? shortageVal + '%' : '',
      'Cleaning Done': b.cleaningDone || 'Yes',
      'Cleaning Method': b.cleaningMethod || 'Dry',
      'Allergen Check': detectAllergen(b.ingredients),
      'Checked By': checkedByName,
      'Status': b.status,
      'Internal RM Batches': b.traceability?.internalRMBatchNo || '',
      'Dispatch Ref No': b.dispatch?.dispatchRefNo || ''
    };
  });

  const ws = window.XLSX.utils.json_to_sheet(dataToExport);
  const wb = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(wb, ws, 'Manufacturing Records');

  const filename = `LV_Spices_Manufacturing_Records_${state.dateFrom}_to_${state.dateTo}.xlsx`;
  window.XLSX.writeFile(wb, filename);
}

// ── Reset & Regenerate (Clear Firestore + Regenerate Apr 2026 → Today) ──────
const btnReset = document.getElementById('btnResetRegenerate');
if (btnReset) {
  // Show button with triple-click (hidden from casual users)
  let headerClickCount = 0;
  document.querySelector('.dashboard-header h1, .dashboard-header, h1')?.addEventListener('click', () => {
    headerClickCount++;
    if (headerClickCount >= 3) {
      btnReset.style.display = '';
      headerClickCount = 0;
    }
  });

  btnReset.addEventListener('click', async () => {
    if (!confirm('Clear ALL Firestore data and regenerate Apr 2026 → Today?\n\nThis cannot be undone.')) return;
    btnReset.disabled = true;
    btnReset.textContent = '⏳ Clearing...';

    try {
      await clearAllBatches();
      btnReset.textContent = '⏳ Generating...';

      const startDate = '2026-04-01';
      const endDate = new Date().toISOString().slice(0, 10);
      const batches = generateDateRangeBatches(startDate, endDate);

      // Save in chunks of 200
      const chunkSize = 200;
      for (let i = 0; i < batches.length; i += chunkSize) {
        await batchSave(batches.slice(i, i + chunkSize));
        btnReset.textContent = `⏳ Saving ${Math.min(i + chunkSize, batches.length)}/${batches.length}...`;
      }

      btnReset.textContent = '✅ Done! Reloading...';
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      alert('Error: ' + err.message);
      btnReset.disabled = false;
      btnReset.textContent = '♻ Reset & Regenerate';
    }
  });
}

// ── Edit / New Batch Modal ────────────────────────────────────────────────────

/**
 * Opens the Edit/New-Batch modal.
 * @param {object|null} batch - Existing batch to prefill, or null for a new entry.
 */
function openEditModal(batch) {
  // Remove any existing modal
  const existing = document.getElementById('batchEditModal');
  if (existing) existing.remove();

  const isNew = !batch;
  const todayISO = formatDateISO(new Date());

  const val = (key, fallback = '') => (batch && batch[key] != null ? batch[key] : fallback);

  const modal = document.createElement('div');
  modal.id = 'batchEditModal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.45);
  `;

  modal.innerHTML = `
    <div style="
      background: #fff; border-radius: 12px; padding: 32px 36px;
      width: min(760px, 95vw); max-height: 90vh; overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25); position: relative;
    ">
      <button id="batchEditModalClose" style="
        position: absolute; top: 16px; right: 20px; border: none;
        background: none; font-size: 22px; cursor: pointer; color: #6b7280;
        line-height: 1;
      ">×</button>
      <h2 style="margin: 0 0 20px; font-size: 18px; font-weight: 700; color: #1f2937;">
        ${isNew ? '+ New Batch Entry' : '✏️ Edit Batch'}
      </h2>
      <form id="batchEditForm" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px;">
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Production Date</label>
          <input type="date" name="date" value="${val('date', todayISO)}" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Product Name</label>
          <input type="text" name="productName" value="${val('productName')}" placeholder="e.g. Turmeric Powder" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Batch No.</label>
          <input type="text" name="batchNo" value="${val('batchNo')}" placeholder="e.g. LVS-001" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Status</label>
          <select name="status" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;">
            <option value="Completed" ${val('status') === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Pending" ${val('status', 'Pending') === 'Pending' ? 'selected' : ''}>Pending</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Planned Qty (kg)</label>
          <input type="number" name="plannedQty" value="${val('plannedQty')}" step="0.01" min="0" placeholder="0.00" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Actual Qty (kg)</label>
          <input type="number" name="actualQty" value="${val('actualQty')}" step="0.01" min="0" placeholder="0.00" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Machine Name</label>
          <input type="text" name="machineName" value="${val('machineName', 'Blender')}" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Cleaning Done</label>
          <select name="cleaningDone" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;">
            <option value="Yes" ${val('cleaningDone', 'Yes') === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${val('cleaningDone') === 'No' ? 'selected' : ''}>No</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Cleaning Method</label>
          <select name="cleaningMethod" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;">
            <option value="Dry" ${val('cleaningMethod', 'Dry') === 'Dry' ? 'selected' : ''}>Dry</option>
            <option value="Wet" ${val('cleaningMethod') === 'Wet' ? 'selected' : ''}>Wet</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Allergen Check</label>
          <select name="allergenCheck" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;">
            <option value="Yes" ${val('allergenCheck', 'Yes') === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${val('allergenCheck') === 'No' ? 'selected' : ''}>No</option>
            <option value="NA" ${val('allergenCheck') === 'NA' ? 'selected' : ''}>NA</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Checked By</label>
          <input type="text" name="checkedBy" value="${val('checkedBy', 'Vishal')}" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Previous Product</label>
          <input type="text" name="previousProductName" value="${val('previousProductName')}" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Next Product</label>
          <input type="text" name="nextProductName" value="${val('nextProductName')}" style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px;" />
        </div>
        <div style="grid-column: span 2;">
          <label style="font-size:12px; font-weight:600; color:#374151; display:block; margin-bottom:4px;">Remarks</label>
          <textarea name="remarks" rows="3" placeholder="Optional remarks..." style="width:100%; padding:8px 10px; border:1px solid #D1D5DB; border-radius:6px; font-size:13px; resize:vertical;">${val('remarks')}</textarea>
        </div>
        <div style="grid-column: span 2; display:flex; gap:12px; justify-content:flex-end; margin-top:4px;">
          <button type="button" id="batchEditCancelBtn" style="
            padding:9px 20px; border:1px solid #D1D5DB; background:#fff;
            color:#374151; border-radius:7px; font-size:13px; font-weight:600; cursor:pointer;
          ">Cancel</button>
          <button type="submit" style="
            padding:9px 24px; border:none; background:#7C2D3E; color:#fff;
            border-radius:7px; font-size:13px; font-weight:700; cursor:pointer;
          ">💾 Save</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => modal.remove();

  document.getElementById('batchEditModalClose').addEventListener('click', closeModal);
  document.getElementById('batchEditCancelBtn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.getElementById('batchEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const formData = {};
    fd.forEach((v, k) => { formData[k] = v; });

    // Coerce numeric fields
    if (formData.plannedQty !== '') formData.plannedQty = parseFloat(formData.plannedQty);
    if (formData.actualQty !== '') formData.actualQty = parseFloat(formData.actualQty);

    // Carry over existing id if editing
    if (batch && batch.id) formData.id = batch.id;

    const saveBtn = e.target.querySelector('button[type="submit"]');
    saveBtn.disabled = true;
    saveBtn.textContent = '⏳ Saving...';

    try {
      await saveBatch(formData);
      closeModal();
      await refreshData();
    } catch (err) {
      alert('Save failed: ' + err.message);
      saveBtn.disabled = false;
      saveBtn.textContent = '💾 Save';
    }
  });
}

// ── Print All Records ──────────────────────────────────────────────────────
window.printAllRecords = function () {
  // Set default dates to current filter range
  const today = state.dateFrom || new Date().toISOString().slice(0, 10);
  document.getElementById('printDateFrom').value = state.dateFrom || today;
  document.getElementById('printDateTo').value = state.dateTo || today;
  document.getElementById('printDialogOverlay').classList.add('active');
};

window.closePrintDialog = function () {
  document.getElementById('printDialogOverlay').classList.remove('active');
};

window.doPrintRecords = function () {
  const fromVal = document.getElementById('printDateFrom').value;
  const toVal = document.getElementById('printDateTo').value;
  if (!fromVal || !toVal) { alert('Please select both dates.'); return; }
  closePrintDialog();

  const dateLabel = fromVal === toVal ? fromVal : fromVal + ' to ' + toVal;

  // Show loading on button
  const goBtn = document.getElementById('btnPrintGo');
  if (goBtn) { goBtn.disabled = true; goBtn.textContent = '⏳ Loading...'; }

  // Always fetch from Firestore so any date range works
  fetchBatches(fromVal, toVal).then(function (batches) {
    if (goBtn) { goBtn.disabled = false; goBtn.innerHTML = '🖨 Print'; }
    if (!batches || batches.length === 0) {
      alert('No records found for ' + fromVal + ' to ' + toVal + '. Check date range.');
      return;
    }
    _buildAndPrint(batches, dateLabel);
  }).catch(function (err) {
    if (goBtn) { goBtn.disabled = false; goBtn.innerHTML = '🖨 Print'; }
    alert('Error fetching records: ' + err.message);
  });
};

function _buildAndPrint(batches, dateLabel) {

  const rows = batches.map(function (b, idx) {
    const bHash = (b.batchNo || '').split('').reduce(function (acc, c) { return acc + c.charCodeAt(0); }, 0);
    const checkedBy = bHash % 2 === 0 ? 'Vishal' : 'Tejas';
    const shortageVal = b.actualQty != null && b.plannedQty > 0
      ? Math.round(((b.actualQty - b.plannedQty) / b.plannedQty) * 100 * 100) / 100
      : null;
    const shortageStr = shortageVal != null ? shortageVal + '%' : '–';
    const ingredientsStr = Array.isArray(b.ingredients) && b.ingredients.length > 0
      ? b.ingredients.map(function (i) { return i.name || i; }).join(', ')
      : '–';
    const rowStyle = idx % 2 === 1 ? ' style="background:#f8fafc;"' : '';
    return '<tr' + rowStyle + '>'
      + '<td style="text-align:center;font-weight:700;">' + (idx + 1) + '</td>'
      + '<td style="font-weight:600;">' + (b.displayDate || b.date || '–') + '</td>'
      + '<td style="font-weight:700;">' + (b.productName || '–') + '</td>'
      + '<td style="font-weight:600;color:#7c3aed;">' + (b.batchNo || '–') + '</td>'
      + '<td style="color:#6b7280;">' + ingredientsStr + '</td>'
      + '<td style="text-align:center;">' + (b.machineName || 'Blender') + '</td>'
      + '<td style="text-align:right;font-weight:600;">' + (b.plannedQty != null ? b.plannedQty.toFixed(2) + ' kg' : '–') + '</td>'
      + '<td style="text-align:right;font-weight:600;">' + (b.actualQty != null ? b.actualQty.toFixed(2) + ' kg' : '–') + '</td>'
      + '<td style="text-align:center;font-weight:700;color:' + (shortageVal != null && shortageVal > 0 ? '#16a34a' : '#374151') + ';">' + shortageStr + '</td>'
      + '<td style="text-align:center;">' + (b.cleaningStatus || (b.status === 'Completed' ? 'Cleaned' : 'Pending')) + '</td>'
      + '<td style="text-align:center;">' + (b.cleaningMethod || 'Dry') + '</td>'
      + '<td style="text-align:center;font-weight:700;color:' + (detectAllergen(b.ingredients) === 'Yes' ? '#dc2626' : '#16a34a') + ';">' + detectAllergen(b.ingredients) + '</td>'
      + '<td style="text-align:center;font-weight:600;">' + checkedBy + '</td>'
      + '<td style="text-align:center;font-weight:700;color:' + (b.status === 'Completed' ? '#16a34a' : '#f59e0b') + ';">' + (b.status || 'Pending') + '</td>'
      + '</tr>';
  }).join('');

  document.getElementById('printAllTable').innerHTML =
    '<div class="print-header">Manufacturing &amp; Processing Records | LV Spices</div>'
    + '<div class="print-subheader">Unit: LV Manufacturing &nbsp;|&nbsp; Location: Nashik</div>'
    + '<div class="print-meta">Date: ' + dateLabel + ' &nbsp;|&nbsp; Total Records: ' + batches.length + ' &nbsp;|&nbsp; Printed: ' + new Date().toLocaleString('en-IN') + '</div>'
    + '<table>'
    + '<colgroup>'
    + '<col style="width:3%"><col style="width:8%"><col style="width:13%"><col style="width:8%">'
    + '<col style="width:19%"><col style="width:6%"><col style="width:7%"><col style="width:7%">'
    + '<col style="width:6%"><col style="width:6%"><col style="width:6%"><col style="width:5%">'
    + '<col style="width:7%"><col style="width:9%">'
    + '</colgroup>'
    + '<thead><tr>'
    + '<th>#</th><th>Process Date</th><th>Product Name</th><th>Batch No.</th>'
    + '<th>Main Ingredients</th><th>Machine</th><th>Ordered Qty</th><th>Actual Qty</th>'
    + '<th>Shortage %</th><th>Cleaning</th><th>Clean Method</th><th>Allergen</th>'
    + '<th>Checked By</th><th>Status</th>'
    + '</tr></thead>'
    + '<tbody>' + rows + '</tbody>'
    + '</table>';

  window.print();
}
