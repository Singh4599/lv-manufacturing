/**
 * LV Spices Manufacturing & Processing Records
 * Calculation and Formatting Engine
 */

/**
 * Calculate required ingredient quantity from batch quantity and formula percentage
 * @param {number} batchQty - Planned batch quantity in kg
 * @param {number} formulaPct - Percentage of formula (e.g. 28.0)
 * @returns {number} Required quantity in kg rounded to 3 decimal places
 */
export function calcIngredientQty(batchQty, formulaPct) {
  if (batchQty == null || formulaPct == null || isNaN(batchQty) || isNaN(formulaPct)) {
    return 0;
  }
  const qty = (Number(batchQty) * Number(formulaPct)) / 100;
  return Math.round(qty * 1000) / 1000;
}

/**
 * Calculate production yield percentage
 * @param {number} input - Total input material in kg
 * @param {number} output - Total finished output material in kg
 * @returns {number} Yield percentage rounded to 2 decimal places
 */
export function calcYield(input, output) {
  if (!input || input <= 0 || output == null || output < 0 || isNaN(input) || isNaN(output)) {
    return 0;
  }
  const yieldPct = (Number(output) / Number(input)) * 100;
  return Math.round(yieldPct * 100) / 100;
}

/**
 * Calculate process loss in kg
 * @param {number} input - Total input material in kg
 * @param {number} output - Total finished output in kg
 * @returns {number} Loss in kg rounded to 3 decimal places
 */
export function calcProcessLoss(input, output) {
  if (input == null || output == null || isNaN(input) || isNaN(output)) {
    return 0;
  }
  const diff = Number(input) - Number(output);
  return Math.max(0, Math.round(diff * 1000) / 1000);
}

/**
 * Calculate total packed quantity in kg
 * @param {number|string} packSize - Size per pack in grams (e.g. 100 or '100 g')
 * @param {number} numPacks - Number of packed units
 * @returns {number} Total packed quantity in kg
 */
export function calcPackedQty(packSize, numPacks) {
  if (!packSize || !numPacks || isNaN(numPacks)) return 0;
  const sizeGrams = typeof packSize === 'string' ? parseFloat(packSize) : Number(packSize);
  if (isNaN(sizeGrams)) return 0;
  const totalKg = (sizeGrams * Number(numPacks)) / 1000;
  return Math.round(totalKg * 1000) / 1000;
}

/**
 * Format quantity with units
 * @param {number|null} kg - Value in kilograms
 * @param {object} options - Formatting options
 * @param {boolean} options.smartUnit - If true and < 1kg, formats as grams (e.g. 280g)
 * @param {number} options.decimals - Decimal places (default 2 or 3)
 * @param {boolean} options.showUnit - Whether to append 'kg' (default true)
 * @returns {string} Formatted string e.g. "1.00 kg" or "0.280"
 */
export function formatQty(kg, options = {}) {
  if (kg === null || kg === undefined || kg === '' || isNaN(kg)) {
    return '–';
  }
  const val = Number(kg);
  const { smartUnit = false, decimals = 2, showUnit = true } = options;

  if (smartUnit && val > 0 && val < 1) {
    const grams = Math.round(val * 1000);
    return `${grams}g`;
  }

  const formattedNum = val.toFixed(decimals);
  return showUnit ? `${formattedNum} kg` : formattedNum;
}

/**
 * Format percentage
 * @param {number|null} pct - Percentage value (0-100)
 * @returns {string} Formatted string e.g. "100.00%" or "–"
 */
export function formatPct(pct) {
  if (pct === null || pct === undefined || pct === '' || isNaN(pct)) {
    return '–';
  }
  return `${Number(pct).toFixed(2)}%`;
}

/**
 * Format number with comma separators
 * @param {number} num - Integer or float
 * @returns {string} e.g. "1,482"
 */
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return Number(num).toLocaleString('en-IN');
}

/**
 * Format Date object or ISO string to standard display format: "24-Nov-2026"
 * @param {Date|string} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return '–';
  let d;
  if (typeof dateInput === 'string') {
    // If input is YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      const [year, month, day] = dateInput.split('-').map(Number);
      d = new Date(year, month - 1, day);
    } else {
      d = new Date(dateInput);
    }
  } else {
    d = new Date(dateInput);
  }

  if (isNaN(d.getTime())) return '–';

  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 * Format Date to ISO string YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
export function formatDateISO(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date range for UI banner e.g. "Apr 01, 2026 – Nov 24, 2026"
 * @param {Date|string} start
 * @param {Date|string} end
 * @returns {string}
 */
export function formatDateRange(start, end) {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const sStr = `${months[d1.getMonth()]} ${String(d1.getDate()).padStart(2, '0')}, ${d1.getFullYear()}`;
  const eStr = `${months[d2.getMonth()]} ${String(d2.getDate()).padStart(2, '0')}, ${d2.getFullYear()}`;
  return `${sStr} – ${eStr}`;
}

/**
 * Generate standard batch number: CODE-DDMMYY-SEQ e.g. PBM-241126-01
 * @param {string} code - Product code e.g. PBM
 * @param {Date|string} dateInput - Production date
 * @param {number} seq - Sequence index (1, 2...)
 * @returns {string}
 */
export function generateBatchNo(code, dateInput, seq = 1) {
  let d;
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [year, month, day] = dateInput.split('-').map(Number);
    d = new Date(year, month - 1, day);
  } else {
    d = new Date(dateInput);
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  const seqStr = String(seq).padStart(2, '0');

  return `${code.toUpperCase()}-${day}${month}${year}-${seqStr}`;
}

/**
 * Generate dispatch reference number e.g. DSP-241126-01
 * @param {string} batchNo - Batch number
 * @returns {string}
 */
export function generateDispatchRefNo(batchNo) {
  if (!batchNo) return 'DSP-000000-01';
  const parts = batchNo.split('-');
  if (parts.length >= 3) {
    return `DSP-${parts[1]}-${parts[2]}`;
  }
  return `DSP-${batchNo}`;
}

/**
 * Generate packaging material lot number e.g. PK-251120-01
 * @param {Date|string} dateInput
 * @returns {string}
 */
export function generatePackagingLot(dateInput) {
  let d = new Date(dateInput);
  if (isNaN(d.getTime())) d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `PK-${year}${month}${day}-01`;
}
