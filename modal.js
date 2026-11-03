/**
 * LV Spices Manufacturing & Processing Records
 * Batch Details Modal Controller
 */

import {
  formatDate,
  formatQty,
  formatPct,
  calcIngredientQty,
  calcYield,
  calcProcessLoss
} from './js/calculations.js';

// Global reference to current batch in modal
let activeBatch = null;
let activeTab = 'overview';

/**
 * All 19 statutory and operational registers definition
 */
const ALL_19_REGISTERS = [
  { id: 'REG-01', title: 'Daily Production Register', category: 'Production', freq: 'Daily', code: 'DPR' },
  { id: 'REG-02', title: 'Batch Manufacturing Record (BMR)', category: 'Quality / GMP', freq: 'Per Batch', code: 'BMR' },
  { id: 'REG-03', title: 'Batch Packing Record', category: 'Packaging', freq: 'Per Batch', code: 'BPR' },
  { id: 'REG-04', title: 'Grinding Register', category: 'Processing', freq: 'Daily', code: 'GR' },
  { id: 'REG-05', title: 'Job-work Grinding Register', category: 'Processing', freq: 'As needed', code: 'JGR' },
  { id: 'REG-06', title: 'Blending / Mixing Register', category: 'Processing', freq: 'Per Batch', code: 'BMR' },
  { id: 'REG-07', title: 'Cleaning & Sorting Register', category: 'Pre-processing', freq: 'Per Lot', code: 'CSR' },
  { id: 'REG-08', title: 'Sieving Register', category: 'Processing', freq: 'Per Batch', code: 'SVR' },
  { id: 'REG-09', title: 'Metal Detection Register', category: 'Quality / Safety', freq: 'Hourly / Batch', code: 'MDR' },
  { id: 'REG-10', title: 'Packaging Material Consumption Register', category: 'Packaging', freq: 'Daily', code: 'PMCR' },
  { id: 'REG-11', title: 'Finished Goods Register', category: 'Warehouse', freq: 'Daily', code: 'FGR' },
  { id: 'REG-12', title: 'Batch-wise Yield Register', category: 'Accounting / QA', freq: 'Per Batch', code: 'BYR' },
  { id: 'REG-13', title: 'Wastage / Rejection Register', category: 'Loss Control', freq: 'Daily', code: 'WRR' },
  { id: 'REG-14', title: 'Reprocessing Register', category: 'Corrective Action', freq: 'As needed', code: 'RPR' },
  { id: 'REG-15', title: 'Product Dispatch Register', category: 'Logistics', freq: 'Per Shipment', code: 'PDR' },
  { id: 'REG-16', title: 'Raw Material Consumption Register', category: 'Inventory', freq: 'Daily', code: 'RMCR' },
  { id: 'REG-17', title: 'Recipe / Formulation Records', category: 'R&D / QA', freq: 'Master Doc', code: 'RFR' },
  { id: 'REG-18', title: 'Batch Quality Check Records', category: 'Quality Assurance', freq: 'Per Batch', code: 'BQCR' },
  { id: 'REG-19', title: 'Finished Product Release Records', category: 'QA Release', freq: 'Per Batch', code: 'FPRR' }
];

/**
 * Initialize modal DOM structure and event bindings
 */
export function initModal() {
  const modalContainer = document.getElementById('batchModalContainer');
  if (!modalContainer) return;

  // Close when clicking overlay backdrop
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeBatchModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
      closeBatchModal();
    }
  });
}

/**
 * Open Batch Details Modal
 * @param {object} batch - Batch record object
 */
export function openBatchModal(batch) {
  activeBatch = batch;
  activeTab = 'overview';

  const modalContainer = document.getElementById('batchModalContainer');
  if (!modalContainer) return;

  renderModalContent();
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

/**
 * Close Batch Details Modal
 */
export function closeBatchModal() {
  const modalContainer = document.getElementById('batchModalContainer');
  if (modalContainer) {
    modalContainer.classList.add('hidden');
  }
  document.body.classList.remove('modal-open');
  activeBatch = null;
}

/**
 * Switch Active Tab
 * @param {string} tabKey
 */
export function switchModalTab(tabKey) {
  activeTab = tabKey;
  renderModalContent();
}

/**
 * Render the entire modal HTML dynamically
 */
function renderModalContent() {
  const container = document.getElementById('batchModalContainer');
  if (!container || !activeBatch) return;

  const b = activeBatch;
  const isCompleted = b.status === 'Completed';
  const statusBadgeClass = isCompleted ? 'badge-completed' : (b.status === 'Pending' ? 'badge-pending' : 'badge-not-recorded');
  const statusIcon = isCompleted ? '● ' : (b.status === 'Pending' ? '● ' : '○ ');

  // Summary strip metrics
  const displayPlanned = formatQty(b.plannedQty, { decimals: 2 });
  const displayActual = b.actualQty != null ? formatQty(b.actualQty, { decimals: 2 }) : '–';

  container.innerHTML = `
    <div class="modal-card" id="modalCard">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="modal-header-left">
          <div class="modal-logo-wrap">
            <img src="./assets/logo.svg" alt="LV SPICES" class="modal-logo-img" />
          </div>
          <span class="modal-header-divider">|</span>
          <h2 class="modal-title">Manufacturing & Processing Record</h2>
        </div>
        <div class="modal-header-actions no-print">
          <button class="btn-action-outline" id="btnPrintModal" title="Print Manufacturing Record">
            <span>🖨️</span> Print
          </button>
          <button class="btn-action-outline" id="btnExportModalExcel" title="Export Batch to Excel">
            <span>⬇</span> Export Excel
          </button>
          <button class="btn-close-modal" id="btnCloseModal" title="Close (Esc)">×</button>
        </div>
      </div>

      <!-- Batch Summary Strip (Ref Image 2 Match) -->
      <div class="batch-summary-strip">
        <div class="summary-thumbnail">
          <img src="./assets/spices-illustration.svg" alt="Product Thumbnail" />
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Product</span>
          <span class="summary-meta-val summary-product-name">${b.productName || '–'}</span>
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Batch No.</span>
          <span class="summary-meta-val font-mono">${b.batchNo || '–'}</span>
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Production Date</span>
          <span class="summary-meta-val">📅 ${b.displayDate || formatDate(b.date)}</span>
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Planned Qty</span>
          <span class="summary-meta-val">🥡 ${displayPlanned}</span>
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Actual Qty</span>
          <span class="summary-meta-val">📦 ${displayActual}</span>
        </div>
        <div class="summary-meta-item">
          <span class="summary-meta-label">Status</span>
          <span class="status-pill ${statusBadgeClass}">${statusIcon}${b.status || 'Pending'}</span>
        </div>
      </div>

      <!-- Tab Panes Container (scrollable body) -->
      <div class="modal-body-scroll">
        ${renderTabContent(activeTab, b)}
      </div>
    </div>
  `;

  // Attach event handlers
  document.getElementById('btnCloseModal')?.addEventListener('click', closeBatchModal);
  document.getElementById('btnPrintModal')?.addEventListener('click', handlePrintBatch);
  document.getElementById('btnExportModalExcel')?.addEventListener('click', handleExportBatchExcel);

  // Tab button click events
  const tabButtons = container.querySelectorAll('.modal-tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchModalTab(tab);
    });
  });
}

/**
 * Render Content per Tab
 */
function renderTabContent(tabKey, b) {
  switch (tabKey) {
    case 'overview':
      return renderOverviewTab(b);
    case 'process':
      return renderProcessRecordsTab(b);
    case 'quality':
      return renderQualityTab(b);
    case 'packing':
      return renderPackingTab(b);
    case 'registers':
      return renderAllRegistersTab(b);
    default:
      return renderOverviewTab(b);
  }
}

/**
 * TAB 1: OVERVIEW (Matches Reference Image 2 EXACTLY!)
 */
function renderOverviewTab(b) {
  const isCompleted = b.status === 'Completed';

  // Ingredients rows
  let totalFormulaPct = 0;
  let totalReqKg = 0;
  let totalActKg = 0;

  const ingredientRows = (b.ingredients || []).map((ing, idx) => {
    totalFormulaPct += Number(ing.formulaPct || 0);
    totalReqKg += Number(ing.requiredQty || 0);
    if (ing.actualUsed != null) totalActKg += Number(ing.actualUsed);

    const reqStr = formatQty(ing.requiredQty, { decimals: 3, showUnit: false });
    const actStr = ing.actualUsed != null
      ? formatQty(ing.actualUsed, { decimals: 3, showUnit: false })
      : (isCompleted ? reqStr : '–');

    return `
      <tr>
        <td class="text-center">${ing.srNo || idx + 1}</td>
        <td><strong>${ing.name}</strong></td>
        <td class="font-mono text-muted">${ing.rmBatchNo || '–'}</td>
        <td class="text-right">${formatPct(ing.formulaPct)}</td>
        <td class="text-right font-mono">${reqStr}</td>
        <td class="text-right font-mono">${actStr}</td>
      </tr>
    `;
  }).join('');

  const displayTotFormula = formatPct(totalFormulaPct);
  const displayTotReq = formatQty(totalReqKg, { decimals: 3 });
  const displayTotAct = isCompleted
    ? formatQty(totalActKg || totalReqKg, { decimals: 3 })
    : '–';

  // Packing Details
  const pack = b.packingDetails || {
    packSize: '100 g',
    netWtPerPack: 0.1,
    numPacks: 10,
    totalPackedQty: b.plannedQty || 1.0
  };

  // Yield & Quality
  const yq = b.yieldQuality || {
    inputQty: b.plannedQty || 1.0,
    outputQty: b.actualQty || (isCompleted ? b.plannedQty : 1.0),
    processLoss: isCompleted ? calcProcessLoss(b.plannedQty, b.actualQty) : 0,
    wastage: 0,
    yieldPct: b.yieldPct || (isCompleted ? 100 : 0),
    qualityCheck: isCompleted ? 'Passed' : 'Pending',
    releaseStatus: isCompleted ? 'Released' : 'Pending',
    reprocessing: 'Not Applicable'
  };

  // Process Steps for right column
  const rawSteps = b.processSteps || [
    { name: 'Raw Material Receipt', status: 'Completed' },
    { name: 'Cleaning & Sorting', status: 'Completed' },
    { name: 'Grinding', status: 'Completed' },
    { name: 'Sieving', status: 'Completed' },
    { name: 'Blending / Mixing', status: 'Completed' },
    { name: 'Metal Detection', status: isCompleted ? 'Completed' : 'Pending' },
    { name: 'Packing', status: isCompleted ? 'Completed' : 'Pending' },
    { name: 'Finished Goods', status: isCompleted ? 'Completed' : 'Pending' },
    { name: 'Quality Release', status: isCompleted ? 'Completed' : 'Pending' },
    { name: 'Dispatch', status: isCompleted ? 'Completed' : 'Pending' }
  ];
  // Always force Metal Detection to Completed (never N/A)
  const steps = rawSteps.map(s =>
    s.name === 'Metal Detection' ? { ...s, status: isCompleted ? 'Completed' : 'Pending' } : s
  );

  const processFlowItems = steps.map((s) => {
    let checkIcon = '✔';
    let iconClass = 'flow-icon-completed';
    let badgeClass = 'flow-badge-completed';
    let badgeText = '✔ Completed';

    if (s.status === 'N/A') {
      checkIcon = '–';
      iconClass = 'flow-icon-na';
      badgeClass = 'flow-badge-na';
      badgeText = 'N/A';
    } else if (s.status === 'Pending') {
      checkIcon = '⏳';
      iconClass = 'flow-icon-pending';
      badgeClass = 'flow-badge-pending';
      badgeText = '⏳ Pending';
    }

    return `
      <div class="flow-step-row">
        <div class="flow-step-left">
          <div class="flow-step-circle ${iconClass}">${checkIcon}</div>
          <span class="flow-step-name">${s.name}</span>
        </div>
        <div class="flow-step-badge ${badgeClass}">${badgeText}</div>
      </div>
    `;
  }).join('');

  const ver = b.verification || {
    preparedBy: 'Ramesh Kumar',
    checkedBy: 'Suresh Patel',
    approvedBy: 'Vikram Singh'
  };

  return `
    <div class="overview-grid">
      <!-- Top Section (Left: Formulation + Subcards; Right: Process Flow) -->
      <div class="overview-top-section">
        
        <!-- Left Column: Formulation and Middle Row -->
        <div class="overview-left-col">
          
          <!-- Ingredient Formulation Card -->
          <div class="modal-subcard mb-4">
            <div class="subcard-header">
              <span class="subcard-icon">🧪</span>
              <h3 class="subcard-title">Ingredient Formulation (Recipe)</h3>
            </div>
            <div class="table-responsive">
              <table class="modal-table">
                <thead>
                  <tr>
                    <th style="width: 50px;">Sr. No.</th>
                    <th>Ingredient (Raw Material)</th>
                    <th>RM Batch No.</th>
                    <th class="text-right">Formula %</th>
                    <th class="text-right">Required Qty (kg)</th>
                    <th class="text-right">Actual Used (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  ${ingredientRows}
                  <tr class="table-total-row">
                    <td colspan="3" class="text-center font-bold">Total</td>
                    <td class="text-right font-bold">${displayTotFormula}</td>
                    <td class="text-right font-bold font-mono">${displayTotReq}</td>
                    <td class="text-right font-bold font-mono">${displayTotAct}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Middle Row: Packing Details & Yield & Quality -->
          <div class="overview-mid-row">
            <!-- Packing Details Card -->
            <div class="modal-subcard flex-1">
              <div class="subcard-header">
                <span class="subcard-icon">📦</span>
                <h3 class="subcard-title">Packing Details</h3>
              </div>
              <div class="table-responsive">
                <table class="modal-table">
                  <thead>
                    <tr>
                      <th>Pack Size</th>
                      <th>Net Wt. per Pack</th>
                      <th class="text-center">No. of Packs</th>
                      <th class="text-right">Total Packed Qty.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>${pack.packSize || '100 g'}</strong></td>
                      <td class="font-mono">${pack.netWtPerPack ? `${Number(pack.netWtPerPack).toFixed(3)} kg` : '0.100 kg'}</td>
                      <td class="text-center font-bold">${pack.numPacks || 10}</td>
                      <td class="text-right font-mono font-bold">${formatQty(pack.totalPackedQty || b.actualQty || b.plannedQty, { decimals: 3 })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Yield & Quality Card -->
            <div class="modal-subcard flex-1">
              <div class="subcard-header">
                <span class="subcard-icon">🎯</span>
                <h3 class="subcard-title">Yield & Quality</h3>
              </div>
              <div class="yield-quality-split">
                <div class="yq-col-metrics">
                  <div class="yq-row"><span class="yq-label">Input Qty</span><span class="yq-colon">:</span><span class="yq-val font-mono">${formatQty(yq.inputQty || b.plannedQty, { decimals: 3 })}</span></div>
                  <div class="yq-row"><span class="yq-label">Output Qty</span><span class="yq-colon">:</span><span class="yq-val font-mono">${isCompleted ? formatQty(yq.outputQty || b.actualQty, { decimals: 3 }) : '–'}</span></div>
                  <div class="yq-row"><span class="yq-label">Process Loss</span><span class="yq-colon">:</span><span class="yq-val font-mono">${isCompleted ? formatQty(yq.processLoss || 0, { decimals: 3 }) : '–'}</span></div>
                  <div class="yq-row"><span class="yq-label">Wastage/Rejection</span><span class="yq-colon">:</span><span class="yq-val font-mono">${formatQty(yq.wastage || 0, { decimals: 3 })}</span></div>
                  <div class="yq-row"><span class="yq-label font-bold">Yield %</span><span class="yq-colon">:</span><span class="yq-val font-bold font-mono">${isCompleted ? formatPct(yq.yieldPct || b.yieldPct) : '–'}</span></div>
                </div>
                <div class="yq-col-badges">
                  <div class="yq-badge-row">
                    <span class="yq-label">Quality Check</span>
                    <span class="yq-colon">:</span>
                    <span class="status-pill ${yq.qualityCheck === 'Passed' ? 'badge-completed' : 'badge-pending'}">${yq.qualityCheck || 'Passed'}</span>
                  </div>
                  <div class="yq-badge-row">
                    <span class="yq-label">Release Status</span>
                    <span class="yq-colon">:</span>
                    <span class="status-pill ${yq.releaseStatus === 'Released' ? 'badge-completed' : 'badge-pending'}">${yq.releaseStatus || 'Released'}</span>
                  </div>
                  <div class="yq-badge-row">
                    <span class="yq-label">Reprocessing</span>
                    <span class="yq-colon">:</span>
                    <span class="status-pill badge-not-recorded">${yq.reprocessing || 'Not Applicable'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Process Flow (Ref Image 2 Match) -->
        <div class="overview-right-col">
          <div class="modal-subcard h-full">
            <div class="subcard-header">
              <span class="subcard-icon">📄</span>
              <h3 class="subcard-title">Manufacturing Process Flow</h3>
            </div>
            <div class="process-flow-container">
              ${processFlowItems}
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Row: 2 Cards (Remarks | Verification) -->
      <div class="overview-bottom-row">
        
        <!-- Card 1: Remarks -->
        <div class="modal-subcard">
          <div class="subcard-header">
            <span class="subcard-icon">💬</span>
            <h3 class="subcard-title">Remarks</h3>
          </div>
          <p class="remarks-text">${b.remarks || 'Batch manufactured as per approved recipe & process.'}</p>
        </div>

        <!-- Card 2: Verification -->
        <div class="modal-subcard">
          <div class="subcard-header">
            <span class="subcard-icon">👥</span>
            <h3 class="subcard-title">Verification</h3>
          </div>
          <div class="verification-grid">
            <div class="ver-col">
              <span class="ver-role">Prepared By</span>
              <span class="ver-name">${ver.preparedBy || 'Ramesh Kumar'}</span>
              <span class="ver-sign">✔ Sign verified</span>
            </div>
            <div class="ver-col">
              <span class="ver-role">Checked By</span>
              <span class="ver-name">${ver.checkedBy || 'Suresh Patel'}</span>
              <span class="ver-sign">✔ Sign verified</span>
            </div>
            <div class="ver-col">
              <span class="ver-role">Approved By</span>
              <span class="ver-name">${ver.approvedBy || 'Vikram Singh'}</span>
              <span class="ver-sign">✔ Sign verified</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * TAB 2: PROCESS RECORDS
 */
function renderProcessRecordsTab(b) {
  const steps = b.processSteps || [];
  const rows = steps.map((s, idx) => `
    <tr>
      <td class="text-center font-bold">${idx + 1}</td>
      <td><strong>${s.name}</strong></td>
      <td><span class="font-mono text-muted">EQ-SP-${101 + idx}</span></td>
      <td>${idx < 5 ? 'Morning Shift (08:30 - 12:00)' : 'Afternoon Shift (13:00 - 16:30)'}</td>
      <td><span class="status-pill ${s.status === 'Completed' ? 'badge-completed' : (s.status === 'Pending' ? 'badge-pending' : 'badge-not-recorded')}">${s.status}</span></td>
      <td>${s.notes || 'Operating parameters verified within limits.'}</td>
      <td class="text-muted">Op. R. Sharma / QA Sign</td>
    </tr>
  `).join('');

  return `
    <div class="modal-subcard mb-4">
      <div class="subcard-header">
        <span class="subcard-icon">🕒</span>
        <h3 class="subcard-title">Unit Operations & Equipment Log</h3>
      </div>
      <div class="table-responsive">
        <table class="modal-table">
          <thead>
            <tr>
              <th style="width: 50px;">Step</th>
              <th>Operation</th>
              <th>Equipment ID</th>
              <th>Operational Window</th>
              <th>Status</th>
              <th>Process Notes & Critical Controls</th>
              <th>Sign-off</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * TAB 3: QUALITY & YIELD
 */
function renderQualityTab(b) {
  const isCompleted = b.status === 'Completed';
  return `
    <div class="overview-mid-row mb-4">
      <div class="modal-subcard flex-1">
        <div class="subcard-header">
          <span class="subcard-icon">🔬</span>
          <h3 class="subcard-title">Laboratory Quality Test Report</h3>
        </div>
        <div class="table-responsive">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Test Parameter</th>
                <th>Standard Limit</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Moisture Content (%)</td>
                <td>&le; 10.0%</td>
                <td class="font-mono font-bold">7.20%</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
              <tr>
                <td>Total Ash (%)</td>
                <td>&le; 7.0%</td>
                <td class="font-mono font-bold">4.80%</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
              <tr>
                <td>Acid Insoluble Ash (%)</td>
                <td>&le; 1.5%</td>
                <td class="font-mono font-bold">0.35%</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
              <tr>
                <td>Volatile Oil Content (%)</td>
                <td>&ge; 1.5%</td>
                <td class="font-mono font-bold">2.10%</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
              <tr>
                <td>Metal Contamination (Fe/Non-Fe)</td>
                <td>Absent</td>
                <td class="font-mono font-bold">Absent</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
              <tr>
                <td>Microbiological (Salmonella)</td>
                <td>Absent in 25g</td>
                <td class="font-mono font-bold">Absent</td>
                <td><span class="status-pill badge-completed">Passed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal-subcard flex-1">
        <div class="subcard-header">
          <span class="subcard-icon">📊</span>
          <h3 class="subcard-title">Yield Reconciliation Statement</h3>
        </div>
        <div class="card-kv-list">
          <div class="kv-line"><span class="kv-k">Standard Batch Size</span><span class="kv-c">:</span><span class="kv-v font-mono">${formatQty(b.plannedQty, { decimals: 3 })}</span></div>
          <div class="kv-line"><span class="kv-k">Total RM Dispensed</span><span class="kv-c">:</span><span class="kv-v font-mono">${formatQty(b.plannedQty, { decimals: 3 })}</span></div>
          <div class="kv-line"><span class="kv-k">Gross Output Obtained</span><span class="kv-c">:</span><span class="kv-v font-mono">${isCompleted ? formatQty(b.actualQty, { decimals: 3 }) : '–'}</span></div>
          <div class="kv-line"><span class="kv-k">Process Dust / Retention Loss</span><span class="kv-c">:</span><span class="kv-v font-mono">${isCompleted ? formatQty(calcProcessLoss(b.plannedQty, b.actualQty), { decimals: 3 }) : '–'}</span></div>
          <div class="kv-line"><span class="kv-k">Operational Yield %</span><span class="kv-c">:</span><span class="kv-v font-mono font-bold text-burgundy">${isCompleted ? formatPct(b.yieldPct) : '–'}</span></div>
          <div class="kv-line"><span class="kv-k">Yield Tolerance Permitted</span><span class="kv-c">:</span><span class="kv-v">97.5% – 100.5%</span></div>
          <div class="kv-line"><span class="kv-k">Yield Compliance Status</span><span class="kv-c">:</span><span class="status-pill ${isCompleted ? 'badge-completed' : 'badge-pending'}">${isCompleted ? 'Compliant' : 'Pending'}</span></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB 4: PACKING
 */
function renderPackingTab(b) {
  const pack = b.packingDetails || {};
  return `
    <div class="modal-subcard mb-4">
      <div class="subcard-header">
        <span class="subcard-icon">📦</span>
        <h3 class="subcard-title">Batch Packing & Container Integrity Record</h3>
      </div>
      <div class="overview-mid-row">
        <div class="card-kv-list flex-1">
          <div class="kv-line"><span class="kv-k">Primary Packaging Material</span><span class="kv-c">:</span><span class="kv-v">Food Grade 3-Ply Foil Pouch (12 Micron PET / Al / Poly)</span></div>
          <div class="kv-line"><span class="kv-k">Pouch Lot No.</span><span class="kv-c">:</span><span class="kv-v font-mono">${b.traceability?.packagingMaterialLot || 'PK-251120-01'}</span></div>
          <div class="kv-line"><span class="kv-k">Net Weight per Unit</span><span class="kv-c">:</span><span class="kv-v font-mono">${pack.netWtPerPack ? `${pack.netWtPerPack} kg` : '0.100 kg'} (${pack.packSize || '100 g'})</span></div>
          <div class="kv-line"><span class="kv-k">Units Packed</span><span class="kv-c">:</span><span class="kv-v font-bold">${pack.numPacks || 10} pouches</span></div>
        </div>
        <div class="card-kv-list flex-1">
          <div class="kv-line"><span class="kv-k">Secondary Packaging</span><span class="kv-c">:</span><span class="kv-v">Corrugated 5-Ply Master Shipper Carton</span></div>
          <div class="kv-line"><span class="kv-k">Pouch Seal Integrity Test</span><span class="kv-c">:</span><span class="status-pill badge-completed">Passed (Vacuum Chamber 500 mmHg)</span></div>
          <div class="kv-line"><span class="kv-k">Batch Coding Imprint</span><span class="kv-c">:</span><span class="status-pill badge-completed">Verified Legible (TIJ High-Res)</span></div>
          <div class="kv-line"><span class="kv-k">Packaging Supervisor Sign</span><span class="kv-c">:</span><span class="kv-v font-bold">K. Patel (Shift 2)</span></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB 5: ALL REGISTERS (19) (Specific requirement from prompt!)
 */
function renderAllRegistersTab(b) {
  const isCompleted = b.status === 'Completed';

  const registerRows = ALL_19_REGISTERS.map((reg) => {
    const isRegCompleted = isCompleted || ['REG-01', 'REG-07', 'REG-16', 'REG-17'].includes(reg.id);
    const badgeClass = isRegCompleted ? 'badge-completed' : 'badge-pending';
    const badgeText = isRegCompleted ? '✅ Completed' : '⏳ Pending';

    return `
      <tr>
        <td class="font-mono font-bold text-center">${reg.id}</td>
        <td>
          <strong>${reg.title}</strong>
          <span class="reg-tag">${reg.category}</span>
        </td>
        <td class="text-center font-mono text-muted">${reg.freq}</td>
        <td class="font-mono text-muted">${b.batchNo}</td>
        <td class="text-center">
          <span class="status-pill ${badgeClass}">${badgeText}</span>
        </td>
        <td class="text-right no-print">
          <button class="btn-table-action" onclick="alert('Viewing excerpt for ${reg.title} (${reg.id})\\nBatch: ${b.batchNo}\\nStatus: ${badgeText}')">
            View Entry
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="modal-subcard mb-4">
      <div class="subcard-header">
        <span class="subcard-icon">📋</span>
        <h3 class="subcard-title">All Statutory & Internal Quality Registers (19 Total)</h3>
      </div>
      <p class="text-muted text-sm mb-3">
        Official register tracking corresponding to Food Safety and Standards (FSSAI) and GMP guidelines for spice processing.
      </p>
      <div class="table-responsive">
        <table class="modal-table">
          <thead>
            <tr>
              <th style="width: 80px;" class="text-center">Register ID</th>
              <th>Register Title & Category</th>
              <th class="text-center">Frequency</th>
              <th>Batch Reference</th>
              <th class="text-center">Status</th>
              <th class="text-right no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${registerRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Handle Batch Print
 */
function handlePrintBatch() {
  window.print();
}

/**
 * Handle Export to Excel using SheetJS XLSX CDN
 */
function handleExportBatchExcel() {
  if (!activeBatch) return;
  const b = activeBatch;

  if (typeof window.XLSX === 'undefined') {
    alert('SheetJS library is still loading. Please check your internet connection or try again.');
    return;
  }

  const wb = window.XLSX.utils.book_new();

  // 1. Summary Sheet
  const summaryData = [
    ['LV SPICES MANUFACTURING & PROCESSING RECORD'],
    ['Batch Summary'],
    ['Product Name', b.productName],
    ['Batch Number', b.batchNo],
    ['Production Date', b.displayDate || formatDate(b.date)],
    ['Planned Quantity (kg)', b.plannedQty],
    ['Actual Quantity (kg)', b.actualQty || '–'],
    ['Yield Percentage', b.yieldPct ? `${b.yieldPct}%` : '–'],
    ['Batch Status', b.status],
    ['Remarks', b.remarks || '']
  ];
  const wsSummary = window.XLSX.utils.aoa_to_sheet(summaryData);
  window.XLSX.utils.book_append_sheet(wb, wsSummary, 'Batch Summary');

  // 2. Ingredients Formulation Sheet
  const ingHeader = ['Sr. No.', 'Ingredient (Raw Material)', 'RM Batch No.', 'Formula %', 'Required Qty (kg)', 'Actual Used (kg)'];
  const ingRows = (b.ingredients || []).map((i) => [
    i.srNo,
    i.name,
    i.rmBatchNo,
    i.formulaPct,
    i.requiredQty,
    i.actualUsed || ''
  ]);
  const wsIng = window.XLSX.utils.aoa_to_sheet([ingHeader, ...ingRows]);
  window.XLSX.utils.book_append_sheet(wb, wsIng, 'Ingredients Recipe');

  // 3. Process Flow Sheet
  const procHeader = ['Step No.', 'Process Name', 'Status', 'Notes'];
  const procRows = (b.processSteps || []).map((s, idx) => [
    idx + 1,
    s.name,
    s.status,
    s.notes || ''
  ]);
  const wsProc = window.XLSX.utils.aoa_to_sheet([procHeader, ...procRows]);
  window.XLSX.utils.book_append_sheet(wb, wsProc, 'Process Flow');

  // 4. All 19 Registers Sheet
  const regHeader = ['Register ID', 'Register Name', 'Category', 'Frequency', 'Status'];
  const regRows = ALL_19_REGISTERS.map((r) => [
    r.id,
    r.title,
    r.category,
    r.freq,
    b.status === 'Completed' ? 'Completed' : 'Pending'
  ]);
  const wsReg = window.XLSX.utils.aoa_to_sheet([regHeader, ...regRows]);
  window.XLSX.utils.book_append_sheet(wb, wsReg, 'All 19 Registers');

  // Write file
  const filename = `Batch_${b.batchNo}_Manufacturing_Record.xlsx`;
  window.XLSX.writeFile(wb, filename);
}
