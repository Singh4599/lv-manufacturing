/**
 * LV Spices Manufacturing & Processing Records
 * Main Dashboard Application Logic
 */

import {
  fetchBatches,
  getStats,
  subscribeToStats,
  batchSave,
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
const state = {
  allBatches: [],
  filteredBatches: [],
  currentPage: 1,
  pageSize: 10,
  dateMode: 'custom_range', // 'today' | 'custom_range'
  dateFrom: '2026-04-01',
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
        <td colspan="16" class="text-center py-8 text-muted">
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
    const yieldDisplay = b.yieldPct != null ? formatPct(b.yieldPct) : '–';
    const cleaningDisplay = b.cleaningStatus || (isCompleted ? 'Cleaned' : 'Pending');
    const cleaningClass = cleaningDisplay === 'Cleaned' ? 'badge-completed' : 'badge-pending';

    return `
      <tr class="table-row-hover" data-batch-id="${b.id || b.batchNo}">
        <td class="text-center font-mono text-muted">${srNo}</td>
        <td>${b.displayDate || formatDate(b.date)}</td>
        <td><strong>${b.productName || '–'}</strong></td>
        <td class="font-mono font-bold text-main">${b.batchNo || '–'}</td>
        <td style="font-size:12px; color:#6b7280;">${b.previousProductName || '–'}</td>
        <td style="font-size:12px; color:#6b7280;">${b.nextProductName || '–'}</td>
        <td class="text-center" style="font-size:12px; font-weight:600;">${b.machineName || 'Blender'}</td>
        <td class="text-right font-mono">${plannedDisplay}</td>
        <td class="text-right font-mono">${actualDisplay}</td>
        <td class="text-right font-mono">${yieldDisplay}</td>
        <td class="text-center">
          <span class="status-pill ${cleaningClass}">${cleaningDisplay}</span>
        </td>
        <td class="text-center" style="font-size:12px;">${b.cleaningMethod || 'Dry'}</td>
        <td class="text-center">
          <span style="font-size:12px; font-weight:700; color:${b.allergenCheck === 'Yes' ? '#16a34a' : '#dc2626'};">${b.allergenCheck || 'Yes'}</span>
        </td>
        <td class="text-center" style="font-size:12px; font-weight:600;">${b.checkedBy || 'Vishal'}</td>
        <td class="text-center">
          <span class="status-pill ${badgeClass}">${b.status || 'Pending'}</span>
        </td>
        <td class="text-center">
          <button class="btn-view-row" data-action="view" data-id="${b.id || b.batchNo}">
            <span class="view-eye-icon">👁</span> View
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
        <td colspan="16" class="text-center py-8 text-muted">
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

  const dataToExport = state.filteredBatches.map((b, idx) => ({
    'Sr. No.': idx + 1,
    'Production Date': b.displayDate || formatDate(b.date),
    'Product Name': b.productName,
    'Batch No.': b.batchNo,
    'Prev. Product': b.previousProductName || '–',
    'Next Product': b.nextProductName || '–',
    'Machine': b.machineName || 'Blender',
    'Planned Qty (kg)': b.plannedQty,
    'Actual Qty (kg)': b.actualQty || '',
    'Yield %': b.yieldPct != null ? `${b.yieldPct}%` : '',
    'Cleaning Done': b.cleaningDone || 'Yes',
    'Cleaning Method': b.cleaningMethod || 'Dry',
    'Allergen Check': b.allergenCheck || 'Yes',
    'Checked By': b.checkedBy || 'Vishal',
    'Status': b.status,
    'Internal RM Batches': b.traceability?.internalRMBatchNo || '',
    'Dispatch Ref No': b.dispatch?.dispatchRefNo || ''
  }));

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
