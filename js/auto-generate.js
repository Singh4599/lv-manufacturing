/**
 * LV Spices Manufacturing & Processing Records
 * Manufacturing Batch Auto-Generation Engine
 * Real LV Spices Product Master (462 products)
 */

import {
  calcIngredientQty,
  calcYield,
  calcProcessLoss,
  calcPackedQty,
  formatDate,
  formatDateISO,
  generateDispatchRefNo,
  generatePackagingLot
} from './calculations.js';

/**
 * Generate batch number: {ABBREV}{MMYY}-{SEQ}
 * e.g. Chana Masala → CM1126-01, Pav Bhaji Masala → PBM1126-01
 * Skips generic words: masala, powder, spice, mix, blend
 */
export function generateBatchNumber(code, dateInput, seq = 1) {
  let d;
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [year, month] = dateInput.split('-').map(Number);
    d = new Date(year, month - 1, 1);
  } else {
    d = new Date(dateInput);
  }

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  const seqStr = String(seq).padStart(2, '0');

  // Generate code from product name if not provided
  let cleanCode = (code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!cleanCode) cleanCode = 'XX';

  return `${cleanCode}${month}${year}-${seqStr}`;
}

export const generateBatchNo = generateBatchNumber;

// Complete Real LV Spices Product Master
export const PRODUCTS = [
  {
    "code": "KUM",
    "name": "Kesari Ukala Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cardamom",
        "rmBatchNo": "CA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Ginger",
        "rmBatchNo": "GI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Saffron",
        "rmBatchNo": "SA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "CHNM",
    "name": "Chowmein Hakka Noodle Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Red Chili",
        "rmBatchNo": "RE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "FRM",
    "name": "Fried Rice Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Garlic powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cane sugar",
        "rmBatchNo": "CA-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Soy sauce powder",
        "rmBatchNo": "SO-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Green chili powder",
        "rmBatchNo": "GR-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Star anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "OM",
    "name": "Oats Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Oat flour",
        "rmBatchNo": "OA-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Red chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "AOM",
    "name": "All In One Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Red chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KBP",
    "name": "Katlu Batrisu Powder",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Edible Gum",
        "rmBatchNo": "ED-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Almonds",
        "rmBatchNo": "AL-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Cashews",
        "rmBatchNo": "CA-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Pistachios",
        "rmBatchNo": "PI-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Poppy Seeds",
        "rmBatchNo": "PO-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Cloves",
        "rmBatchNo": "CL-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "UM",
    "name": "Undhiya Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Dry Coconut",
        "rmBatchNo": "DR-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "RFDM",
    "name": "Roselle Flower Drink Mix (Khatti Bhindi Sharbat)",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Hibiscus Flower Powder",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "JPPM",
    "name": "Jaljeera Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PPM",
    "name": "Garlic Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Salt",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Ginger",
        "rmBatchNo": "GI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Mint",
        "rmBatchNo": "MI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "MBM",
    "name": "Mughlai Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "SFRM",
    "name": "Schezwan Fried Rice Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chili",
        "rmBatchNo": "RE-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "MPM",
    "name": "Masala Pav Mix",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Black pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "DM",
    "name": "Dabeli Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cumin",
        "rmBatchNo": "CU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Dry ginger",
        "rmBatchNo": "DR-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RM",
    "name": "Ragda Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Red chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Cloves",
        "rmBatchNo": "CL-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Cardamom",
        "rmBatchNo": "CA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "PSM",
    "name": "Punjabi Samosa Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Red chili",
        "rmBatchNo": "RE-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cloves",
        "rmBatchNo": "CL-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Cardamom",
        "rmBatchNo": "CA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "PPM",
    "name": "Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Dried Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Citric Acid",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KKM",
    "name": "Kitchen King Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Mace",
        "rmBatchNo": "MA-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "AM",
    "name": "Achari Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Fenugreek seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Nigella seeds",
        "rmBatchNo": "NI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cumin",
        "rmBatchNo": "CU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Red chili",
        "rmBatchNo": "RE-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Turmeric",
        "rmBatchNo": "TU-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MDM",
    "name": "Mysore Dosa Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Turmeric",
        "rmBatchNo": "TU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Mustard seeds",
        "rmBatchNo": "MU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "BPCM",
    "name": "Black Pindi Chole Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 7.14
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 7.14
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 7.14
      },
      {
        "srNo": 4,
        "name": "Dried mango powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 7.14
      },
      {
        "srNo": 5,
        "name": "Red chili",
        "rmBatchNo": "RE-260405",
        "formulaPct": 7.14
      },
      {
        "srNo": 6,
        "name": "Black salt",
        "rmBatchNo": "BL-260406",
        "formulaPct": 7.14
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 7.14
      },
      {
        "srNo": 8,
        "name": "Pomegranate seeds",
        "rmBatchNo": "PO-260408",
        "formulaPct": 7.14
      },
      {
        "srNo": 9,
        "name": "Black pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 7.14
      },
      {
        "srNo": 10,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260410",
        "formulaPct": 7.14
      },
      {
        "srNo": 11,
        "name": "Cloves",
        "rmBatchNo": "CL-260411",
        "formulaPct": 7.14
      },
      {
        "srNo": 12,
        "name": "Cardamom",
        "rmBatchNo": "CA-260412",
        "formulaPct": 7.14
      },
      {
        "srNo": 13,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260413",
        "formulaPct": 7.14
      },
      {
        "srNo": 14,
        "name": "Mace",
        "rmBatchNo": "MA-260414",
        "formulaPct": 7.18
      }
    ]
  },
  {
    "code": "SM",
    "name": "Saoji Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 7.69
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 7.69
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 7.69
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 7.69
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 7.69
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 7.69
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 7.69
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 7.69
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 7.69
      },
      {
        "srNo": 10,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 7.69
      },
      {
        "srNo": 11,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260411",
        "formulaPct": 7.69
      },
      {
        "srNo": 12,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260412",
        "formulaPct": 7.69
      },
      {
        "srNo": 13,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260413",
        "formulaPct": 7.72
      }
    ]
  },
  {
    "code": "PUMM",
    "name": "Puneri Usal Misal Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Agri Koli Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "CM",
    "name": "CHAT Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Dried Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "KKPP",
    "name": "Kachi Keri Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Raw Mango Powder",
        "rmBatchNo": "RA-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "HPPM",
    "name": "Hing Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "PPPM",
    "name": "Pudina Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Green Chili",
        "rmBatchNo": "GR-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "NPPM",
    "name": "Nimbu Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "JPPM",
    "name": "Jeera Pani Puri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mint",
        "rmBatchNo": "MI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "MSM",
    "name": "Masala Soda Mix",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Mint",
        "rmBatchNo": "MI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Citric Acid (Lemon Juice Powder)",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "GRM",
    "name": "Ghee Roast Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cumin",
        "rmBatchNo": "CU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "TFM",
    "name": "Tawa Fry Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cumin",
        "rmBatchNo": "CU-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "TLSS",
    "name": "Turmeric latte - Super Seed Mix",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Flax Seed Powder",
        "rmBatchNo": "FL-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Chia Seed Powder",
        "rmBatchNo": "CH-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Sunflower Seed Powder",
        "rmBatchNo": "SU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "TL",
    "name": "Turmeric Latte",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "TM",
    "name": "Thandai Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Almond Powder",
        "rmBatchNo": "AL-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Pistachio Powder",
        "rmBatchNo": "PI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Poppy Seeds",
        "rmBatchNo": "PO-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Saffron",
        "rmBatchNo": "SA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "RCMM",
    "name": "Rose Cashew Milk Magic Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cashew Nut Powder",
        "rmBatchNo": "CA-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Rose Petals",
        "rmBatchNo": "RO-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Cardamom",
        "rmBatchNo": "CA-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "GTMM",
    "name": "Golden Turmeric Milk Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "BM",
    "name": "Basundi Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Cardamom",
        "rmBatchNo": "CA-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Almonds",
        "rmBatchNo": "AL-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Pistachios",
        "rmBatchNo": "PI-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Saffron",
        "rmBatchNo": "SA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "SLM",
    "name": "Surti Locho Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Red Chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "DVGM",
    "name": "Dal Vegetable Garam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "KMM",
    "name": "Kesari Milk Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Almonds",
        "rmBatchNo": "AL-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Cashews",
        "rmBatchNo": "CA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Pistachios",
        "rmBatchNo": "PI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Saffron",
        "rmBatchNo": "SA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "PTM",
    "name": "Premium Tea Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "KM",
    "name": "Khichdi Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "PM",
    "name": "Puliyogare Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Coriander",
        "rmBatchNo": "CO-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Red chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Sesame seeds",
        "rmBatchNo": "SE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cumin",
        "rmBatchNo": "CU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Curry leaves",
        "rmBatchNo": "CU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "SBM",
    "name": "Sindhi Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Black pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "NBM",
    "name": "Nawabi Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Black cardamom",
        "rmBatchNo": "BL-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Black pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Mace",
        "rmBatchNo": "MA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Star anise",
        "rmBatchNo": "ST-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "MRM",
    "name": "Masala Rice Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cloves",
        "rmBatchNo": "CL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "LRM",
    "name": "Lemon Rice Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Chana Dal",
        "rmBatchNo": "CH-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Urad Dal",
        "rmBatchNo": "UR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "TBM",
    "name": "Thalassery Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Star Anise",
        "rmBatchNo": "ST-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KBM",
    "name": "Kolkata Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Star Anise",
        "rmBatchNo": "ST-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "HBM",
    "name": "Hyderabadi Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "CBM",
    "name": "Chettinad Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black pepper",
        "rmBatchNo": "BL-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Fennel",
        "rmBatchNo": "FE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Coriander",
        "rmBatchNo": "CO-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red chili",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Star anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Curry leaves",
        "rmBatchNo": "CU-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "BBM",
    "name": "Bombay Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Black cardamom",
        "rmBatchNo": "BL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Star anise",
        "rmBatchNo": "ST-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "ABM",
    "name": "Awadhi Biryani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MM",
    "name": "Manchurian Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red Chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PCM",
    "name": "Paneer Chilli Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Red Chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cumin",
        "rmBatchNo": "CU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "RGM",
    "name": "Rajwadi Garam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Mace",
        "rmBatchNo": "MA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PGM",
    "name": "Punjabi Garam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "ZGM",
    "name": "Zaffrani Garam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Saffron",
        "rmBatchNo": "SA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "RPGM",
    "name": "Rose Petal Garam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Dried Rose Petals",
        "rmBatchNo": "DR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PMH",
    "name": "Pickle Masala - Hot",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "PMM",
    "name": "Pickle Masala - Mild",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "TCPG",
    "name": "Thai Curry Powder - Green",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coconut Milk Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Lemongrass Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Galangal Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Green Chilli Powder",
        "rmBatchNo": "GR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Coriander",
        "rmBatchNo": "CO-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cumin",
        "rmBatchNo": "CU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Turmeric",
        "rmBatchNo": "TU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Basil Powder",
        "rmBatchNo": "BA-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "MCPH",
    "name": "Madras Curry Powder - Hot",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MCPM",
    "name": "Madras Curry Powder - Mild",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Turmeric",
        "rmBatchNo": "TU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "CM",
    "name": "Chivda Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cumin",
        "rmBatchNo": "CU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "SUM",
    "name": "Sev Usal Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Ginger",
        "rmBatchNo": "GI-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Star Anise",
        "rmBatchNo": "ST-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "PM",
    "name": "Pakoda Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Dry ginger",
        "rmBatchNo": "DR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SM",
    "name": "Sandwich Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Red chili",
        "rmBatchNo": "RE-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Coriander",
        "rmBatchNo": "CO-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Mint leaves",
        "rmBatchNo": "MI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "BVM",
    "name": "Batata Vada Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Red chili",
        "rmBatchNo": "RE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Dry ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mustard seeds",
        "rmBatchNo": "MU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PBM",
    "name": "Pav Bhaji Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Red chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Black pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cloves",
        "rmBatchNo": "CL-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Cardamom",
        "rmBatchNo": "CA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "FM",
    "name": "Frankie Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Red chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Cloves",
        "rmBatchNo": "CL-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "KM",
    "name": "Kachori Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Red chili",
        "rmBatchNo": "RE-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Black pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "GSBM",
    "name": "Golden Sukha bhel masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Dried Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Salt",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CM",
    "name": "Chaat Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Dried Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "SM",
    "name": "Sabji Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jaljeera Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Black salt",
        "rmBatchNo": "BL-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Mint",
        "rmBatchNo": "MI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Citric acid (from lemon juice powder)",
        "rmBatchNo": "CI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "FJM",
    "name": "Fruit Juice Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dry mango powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Mint",
        "rmBatchNo": "MI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CSMM",
    "name": "Chef's Special Magic Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 6.67
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 6.67
      },
      {
        "srNo": 3,
        "name": "Red chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 6.67
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 6.67
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 6.67
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 6.67
      },
      {
        "srNo": 7,
        "name": "Garlic",
        "rmBatchNo": "GA-260407",
        "formulaPct": 6.67
      },
      {
        "srNo": 8,
        "name": "Onion",
        "rmBatchNo": "ON-260408",
        "formulaPct": 6.67
      },
      {
        "srNo": 9,
        "name": "Black pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 6.67
      },
      {
        "srNo": 10,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260410",
        "formulaPct": 6.67
      },
      {
        "srNo": 11,
        "name": "Cloves",
        "rmBatchNo": "CL-260411",
        "formulaPct": 6.67
      },
      {
        "srNo": 12,
        "name": "Cardamom",
        "rmBatchNo": "CA-260412",
        "formulaPct": 6.67
      },
      {
        "srNo": 13,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260413",
        "formulaPct": 6.67
      },
      {
        "srNo": 14,
        "name": "Mace",
        "rmBatchNo": "MA-260414",
        "formulaPct": 6.67
      },
      {
        "srNo": 15,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260415",
        "formulaPct": 6.62
      }
    ]
  },
  {
    "code": "VTSM",
    "name": "Veg Tawa Sizzler Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 7.69
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 7.69
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 7.69
      },
      {
        "srNo": 4,
        "name": "Red chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 7.69
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 7.69
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 7.69
      },
      {
        "srNo": 7,
        "name": "Garlic",
        "rmBatchNo": "GA-260407",
        "formulaPct": 7.69
      },
      {
        "srNo": 8,
        "name": "Onion",
        "rmBatchNo": "ON-260408",
        "formulaPct": 7.69
      },
      {
        "srNo": 9,
        "name": "Black pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 7.69
      },
      {
        "srNo": 10,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260410",
        "formulaPct": 7.69
      },
      {
        "srNo": 11,
        "name": "Cloves",
        "rmBatchNo": "CL-260411",
        "formulaPct": 7.69
      },
      {
        "srNo": 12,
        "name": "Cardamom",
        "rmBatchNo": "CA-260412",
        "formulaPct": 7.69
      },
      {
        "srNo": 13,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260413",
        "formulaPct": 7.72
      }
    ]
  },
  {
    "code": "KCM",
    "name": "Kulambu Chilli Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Fenugreek seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Curry leaves",
        "rmBatchNo": "CU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "CM",
    "name": "Chettinad Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Red chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Black pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Star anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Curry leaves",
        "rmBatchNo": "CU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "RM",
    "name": "Rasam Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Garlic",
        "rmBatchNo": "GA-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SM",
    "name": "Sambhar Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jhalmuri Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin",
        "rmBatchNo": "CU-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "TM",
    "name": "Tandoori Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Ginger",
        "rmBatchNo": "GI-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Garlic",
        "rmBatchNo": "GA-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Onion",
        "rmBatchNo": "ON-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Clove",
        "rmBatchNo": "CL-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Soya Chaap Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Garlic",
        "rmBatchNo": "GA-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Onion",
        "rmBatchNo": "ON-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Clove",
        "rmBatchNo": "CL-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "RM",
    "name": "Rajma Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "RM",
    "name": "Raita Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin",
        "rmBatchNo": "CU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Dried Mint Leaves",
        "rmBatchNo": "DR-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "PDAM",
    "name": "Punjabi Dum Aloo Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PPM",
    "name": "Panch Phoron Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Nigella Seeds",
        "rmBatchNo": "NI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "MVM",
    "name": "Mughlai Vegetable Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "LGKM",
    "name": "Lucknowi Galouti kabab masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Rose petal powder",
        "rmBatchNo": "RO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cloves",
        "rmBatchNo": "CL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Mace",
        "rmBatchNo": "MA-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dried ginger",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KTM",
    "name": "Kabab & Tikki Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Dried mango powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KDAM",
    "name": "Kashmiri Dum Aloo Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Fennel seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Dried ginger",
        "rmBatchNo": "DR-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "DMM",
    "name": "Dal Makhani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Dried ginger",
        "rmBatchNo": "DR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Green cardamom",
        "rmBatchNo": "GR-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "DFTM",
    "name": "Dal Fry Tadka Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Dried ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "DBM",
    "name": "Dal Bukhara Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Red chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Awadhi Korma Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cardamom",
        "rmBatchNo": "CA-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Star anise",
        "rmBatchNo": "ST-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Amritsari Kulcha Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Dried mango powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red chili",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black salt",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Carom seeds",
        "rmBatchNo": "CA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "ACM",
    "name": "Amritsari Chole Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 7.69
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 7.69
      },
      {
        "srNo": 3,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 7.69
      },
      {
        "srNo": 4,
        "name": "Red chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 7.69
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 7.69
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 7.69
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 7.69
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 7.69
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 7.69
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 7.69
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 7.69
      },
      {
        "srNo": 12,
        "name": "Mace",
        "rmBatchNo": "MA-260412",
        "formulaPct": 7.69
      },
      {
        "srNo": 13,
        "name": "Fenugreek leaves",
        "rmBatchNo": "FE-260413",
        "formulaPct": 7.72
      }
    ]
  },
  {
    "code": "VM",
    "name": "Vindaloo Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "VM",
    "name": "Varahadi Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SJM",
    "name": "Surti Jiralu Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin",
        "rmBatchNo": "CU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "SGM",
    "name": "Super Goda Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Dry Coconut",
        "rmBatchNo": "DR-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "SSMM",
    "name": "Sunday Special Mix Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PDM",
    "name": "Parsi Dhanshak Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "MAM",
    "name": "Marathi Amti Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MM",
    "name": "Malvani Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 7.69
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 7.69
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 7.69
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 7.69
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 7.69
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 7.69
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 7.69
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 7.69
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 7.69
      },
      {
        "srNo": 10,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 7.69
      },
      {
        "srNo": 11,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260411",
        "formulaPct": 7.69
      },
      {
        "srNo": 12,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260412",
        "formulaPct": 7.69
      },
      {
        "srNo": 13,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260413",
        "formulaPct": 7.72
      }
    ]
  },
  {
    "code": "MGM",
    "name": "Maharashtrian Ghati Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KM",
    "name": "Khakhra Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jeeravan Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "GKM",
    "name": "Gujarati Kadhi Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dried Ginger",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "GDM",
    "name": "Gujarati Dal Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dried Ginger",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "GGVM",
    "name": "Green Gujarat Vegetable Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Dried Green Chillies",
        "rmBatchNo": "DR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "GXM",
    "name": "Goan Xacuti Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coconut Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Dried Red Chillies",
        "rmBatchNo": "DR-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "GRM",
    "name": "Goan Recheado Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Red Chillies",
        "rmBatchNo": "DR-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Garlic",
        "rmBatchNo": "GA-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Ginger",
        "rmBatchNo": "GI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "GCM",
    "name": "Goan Cafreal Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Green Chilli",
        "rmBatchNo": "GR-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Ginger",
        "rmBatchNo": "GI-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Garlic",
        "rmBatchNo": "GA-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "CM",
    "name": "Chaas Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Dry Mint Leaves",
        "rmBatchNo": "DR-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "ASM",
    "name": "Aloo Sabji Masala",
    "category": "Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CP",
    "name": "Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Chilli Powder",
        "rmBatchNo": "CH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BJCP",
    "name": "Bhut Jolokia Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Bhut Jolokia Chilli Powder",
        "rmBatchNo": "BH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KCP",
    "name": "Kashmiri Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Chilli Powder",
        "rmBatchNo": "KA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCP",
    "name": "Guntur Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Guntur Chilli Powder",
        "rmBatchNo": "GU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KCP",
    "name": "Kanthari Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kanthari Chilli Powder",
        "rmBatchNo": "KA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BCP",
    "name": "Byadgi Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Byadgi Chilli",
        "rmBatchNo": "BY-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BCP",
    "name": "Bird-Eye Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Bird-Eye Chilli",
        "rmBatchNo": "BI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SPP",
    "name": "Sweet Paprika Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sweet Paprika",
        "rmBatchNo": "SW-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SCP",
    "name": "Sankeshwari Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sankeshwari Chilli",
        "rmBatchNo": "SA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CF",
    "name": "Chilli Flakes",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Chilli Flakes",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RCP",
    "name": "Reshampatti Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Reshampatti Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "K+RC",
    "name": "Kashmiri + Reshampatti Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Chilli Powder",
        "rmBatchNo": "KA-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Reshampatti Chilli Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "LCP",
    "name": "Longi Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Longi Chilli Powder",
        "rmBatchNo": "LO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TCP",
    "name": "Teja Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Teja Chilli Powder",
        "rmBatchNo": "TE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KKM",
    "name": "Kashmiri Kuti Mirch",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Chilli (Coarse Ground)",
        "rmBatchNo": "KA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RKM",
    "name": "Reshampatti Kuti Mirch",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Reshampatti Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "K+RK",
    "name": "Kashmiri + Reshampatti Kuti Mirch",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Chilli",
        "rmBatchNo": "KA-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Reshampatti Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "BKM",
    "name": "Byadgi Kuti Mirch",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Byadgi Chilli",
        "rmBatchNo": "BY-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SP",
    "name": "Smoked Paprika",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Smoked Paprika",
        "rmBatchNo": "SM-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CPKP",
    "name": "Chilli Powder Karam Pudi",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "YCP",
    "name": "Yellow Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Yellow Chilli Powder",
        "rmBatchNo": "YE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "WCP",
    "name": "White Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "White Chilli Powder",
        "rmBatchNo": "WH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCP",
    "name": "Green Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Chilli Powder",
        "rmBatchNo": "GR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SCPP",
    "name": "Special Chilli Powder For Pickle",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MHCP",
    "name": "Medium Hot Chilli Powder -15000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HCP3",
    "name": "Hot Chilli Powder 30000 - 40000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Hot Chilli Powder",
        "rmBatchNo": "HO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HCC3",
    "name": "Hot Chilli Crushed 30000 - 40000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Crushed Hot Chilli",
        "rmBatchNo": "CR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SPC",
    "name": "Sweet Paprika Crushed",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sweet Paprika",
        "rmBatchNo": "SW-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CCHP",
    "name": "Chilli Crushed (High Pungency)",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Crushed Chilli",
        "rmBatchNo": "CR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MHPC",
    "name": "Medium Hot Paprika Crushed 15000 - 20000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Medium Hot Paprika",
        "rmBatchNo": "ME-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HPC3",
    "name": "Hot Paprika Crushed 30000 - 40000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Hot Paprika",
        "rmBatchNo": "HO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MPC9",
    "name": "Mild Paprika Crushed 9000 - 12000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mild Paprika",
        "rmBatchNo": "MI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MCP9",
    "name": "Mild Chilli Powder 9000 - 12000 SHU",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mild Chilli Powder",
        "rmBatchNo": "MI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCP",
    "name": "Gochugaru Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Gochugaru Chilli Powder",
        "rmBatchNo": "GO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CPP",
    "name": "Cayenne Pepper Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cayenne Pepper Powder",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCF",
    "name": "Gochugaru Chilli Flakes",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Red Chilli",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RCP",
    "name": "Red Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SGRC",
    "name": "Stone Ground Red Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "ACP",
    "name": "Ancho Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Ancho Chilli",
        "rmBatchNo": "AN-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DCP",
    "name": "Deggi Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Deggi Chilli",
        "rmBatchNo": "DE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "EHCP",
    "name": "Extra Hot Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Extra Hot Chilli Powder",
        "rmBatchNo": "EX-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "ACP",
    "name": "Aleppo Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Aleppo Chilli Powder",
        "rmBatchNo": "AL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CPM",
    "name": "Chilli Powder- Mild",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mild Chilli Powder",
        "rmBatchNo": "MI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CPH",
    "name": "Chilli Powder- Hot",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Hot Chilli Powder",
        "rmBatchNo": "HO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CCP",
    "name": "Chipotle Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Chipotle Chilli Powder",
        "rmBatchNo": "CH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HCP",
    "name": "Habanero Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Habanero Chilli Powder",
        "rmBatchNo": "HA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TRCP",
    "name": "Thai Red Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Thai Red Chilli Powder",
        "rmBatchNo": "TH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SCP",
    "name": "Sanaam Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sanaam Chilli Powder",
        "rmBatchNo": "SA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "PH",
    "name": "Paprika Hungarian",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Hungarian Paprika",
        "rmBatchNo": "HU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "PA",
    "name": "Paprika American",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "American Paprika",
        "rmBatchNo": "AM-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MCP",
    "name": "Mulato Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mulato Chilli",
        "rmBatchNo": "MU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "NMCP",
    "name": "New Mexico Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "New Mexico Chilli",
        "rmBatchNo": "NE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "JCP",
    "name": "Jalapeno Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Jalapeno Chilli",
        "rmBatchNo": "JA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CCP",
    "name": "Calabrian Chilli Powder",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Calabrian Chilli",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RCFW",
    "name": "RED CHILLI FLAKES WITHOUT SEEDS",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Flakes",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCF",
    "name": "GREEN CHILLI FLAKES",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Chilli",
        "rmBatchNo": "GR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SCF",
    "name": "Seedless Chilli Flakes",
    "category": "Chilli Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "FCP",
    "name": "Fenugreek Chutney Powder",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "RBCT",
    "name": "Roasted & Burnt Chilli Garlic Tomato Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MCM",
    "name": "Mint Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Mint Leaves",
        "rmBatchNo": "DR-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Green Chilli",
        "rmBatchNo": "GR-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Ginger",
        "rmBatchNo": "GI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "GCT",
    "name": "Green Chilli Thecha",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Chilli",
        "rmBatchNo": "GR-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "SM",
    "name": "Schezwan Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "VPCM",
    "name": "Vada Pav Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Peanuts",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MDCM",
    "name": "Mysore Dosa Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "KCM",
    "name": "Khaman Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Gram Flour",
        "rmBatchNo": "RO-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Red Chili",
        "rmBatchNo": "RE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "MM",
    "name": "Malgapodi Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Split Urad Dal",
        "rmBatchNo": "SP-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Split Chana Dal",
        "rmBatchNo": "SP-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Red Chili",
        "rmBatchNo": "RE-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "SGCM",
    "name": "Spicy Ginger Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Saunth Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Samosa Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "TCM",
    "name": "Tamarind Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MCM",
    "name": "Mustard Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "PRM",
    "name": "Puliyogare Rice Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Split Chickpeas",
        "rmBatchNo": "SP-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Split Black Gram",
        "rmBatchNo": "SP-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "LRM",
    "name": "Lemon Rice Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Split Chickpeas",
        "rmBatchNo": "SP-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Split Black Gram",
        "rmBatchNo": "SP-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "BRM",
    "name": "Bisibele Rice Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Split Pigeon Peas",
        "rmBatchNo": "SP-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RBC",
    "name": "Roasted & Burnt Garlic Onion Chutney",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Garlic",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Roasted Onion",
        "rmBatchNo": "RO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Sesame Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "KCM",
    "name": "Kalonji Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Nigella Seeds",
        "rmBatchNo": "NI-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "FSCM",
    "name": "Flax Seed Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Flax Seeds",
        "rmBatchNo": "FL-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "KCM",
    "name": "Kara Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "CPCM",
    "name": "Chana Peanut Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Peanuts",
        "rmBatchNo": "RO-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "CRCM",
    "name": "Coconut Red Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Desiccated Coconut",
        "rmBatchNo": "DE-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CGCM",
    "name": "Coconut Green Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Desiccated Coconut",
        "rmBatchNo": "DE-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Green Chilli",
        "rmBatchNo": "GR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Ginger",
        "rmBatchNo": "GI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CM",
    "name": "Onion Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Roasted Gram Flour",
        "rmBatchNo": "RO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Curry Leaves Powder",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "TCM",
    "name": "Onion Tomato Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "RSCM",
    "name": "Rajkot Special Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Gram Flour",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "TCM",
    "name": "Tomato Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "GCM",
    "name": "Green Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Leaves Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Green Chilli Powder",
        "rmBatchNo": "GR-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "KMCM",
    "name": "Khatta Meetha Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MCM",
    "name": "Momos Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "CCM",
    "name": "Coconut Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Desiccated Coconut Powder",
        "rmBatchNo": "DE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Roasted Gram Flour",
        "rmBatchNo": "RO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "LCM",
    "name": "Lemon Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "MMCM",
    "name": "Mango Mustard Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mango Powder",
        "rmBatchNo": "MA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SMCM",
    "name": "Spicy Mango Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mango Powder",
        "rmBatchNo": "MA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "GBCM",
    "name": "Golden Bhel Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Date Powder",
        "rmBatchNo": "DA-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Sandwich Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Mint Powder",
        "rmBatchNo": "MI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "LCM",
    "name": "Lasun Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Garlic",
        "rmBatchNo": "GA-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "KLCM",
    "name": "Kanda Lasun Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Garlic",
        "rmBatchNo": "GA-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Roasted Gram",
        "rmBatchNo": "RO-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "PCM",
    "name": "Peanut Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Peanuts",
        "rmBatchNo": "RO-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Garlic",
        "rmBatchNo": "GA-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "CCM",
    "name": "Coconut Garlic Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Desiccated Coconut",
        "rmBatchNo": "DE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Garlic",
        "rmBatchNo": "GA-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "BCM",
    "name": "Bhelpuri Chutney Mix",
    "category": "Chutney Powders",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Chili Powder",
        "rmBatchNo": "CH-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "OMS",
    "name": "Jain Oats Masala Seasoning",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Oat Flour",
        "rmBatchNo": "OA-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "CSMM",
    "name": "Jain Chef's Special Magic Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cloves",
        "rmBatchNo": "CL-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "TM",
    "name": "Jain Tandoori Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Black pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "KKM",
    "name": "Jain Kitchen King Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cardamom",
        "rmBatchNo": "CA-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "MM",
    "name": "Jain Manchurian Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "RFDM",
    "name": "Jain Roselle Flower Drink Mix",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Roselle Flower Powder",
        "rmBatchNo": "DR-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "PBM",
    "name": "Jain Pav Bhaji Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain Chinese Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Kashmiri Chilli",
        "rmBatchNo": "KA-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Vinegar Powder",
        "rmBatchNo": "VI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Sichuan Pepper",
        "rmBatchNo": "SI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "HBM",
    "name": "Jain Hyderabadi Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Star Anise",
        "rmBatchNo": "ST-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "CHNM",
    "name": "Jain Chowmein Hakka Noodle Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "MCPH",
    "name": "Jain Madras Curry Powder - Hot",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "FM",
    "name": "Jain Frankie Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "AOM",
    "name": "Jain All In One Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cardamom",
        "rmBatchNo": "CA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "LGKM",
    "name": "Jain Lucknowi Galouti kabab Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cloves",
        "rmBatchNo": "CL-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Mace",
        "rmBatchNo": "MA-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Rose Petals",
        "rmBatchNo": "RO-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PUMM",
    "name": "Jain Puneri Usal Misal Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chili Powder",
        "rmBatchNo": "KA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dry Coconut",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "PPPM",
    "name": "Jain Pudina Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Mint Leaves",
        "rmBatchNo": "DR-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "GRM",
    "name": "Jain Ghee Roast Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "KM",
    "name": "Jain Khichdi Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "PM",
    "name": "Jain Puliyogare Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind Powder",
        "rmBatchNo": "TA-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "FRM",
    "name": "Jain Fried Rice Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Soy Sauce Powder",
        "rmBatchNo": "SO-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SFRM",
    "name": "Jain Schezwan Fried Rice Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "PCM",
    "name": "Jain Paneer Chilli Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tomato Powder",
        "rmBatchNo": "TO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PMH",
    "name": "Jain Pickle Masala - Hot",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "PMM",
    "name": "Jain Pickle Masala - Mild",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "MCPM",
    "name": "Jain Madras Curry Powder - Mild",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SUM",
    "name": "Jain Sev Usal Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "SM",
    "name": "Jain Sandwich Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "VM",
    "name": "Jain Vada Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "GSBM",
    "name": "Jain Golden Sukha bhel Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Turmeric",
        "rmBatchNo": "TU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "ACM",
    "name": "Jain Amritsari Chole Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cardamom",
        "rmBatchNo": "CA-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PDM",
    "name": "Jain Parsi Dhanshak Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Mace",
        "rmBatchNo": "MA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MM",
    "name": "Jain Malvani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MGM",
    "name": "Jain Maharashtrian Ghati Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Coconut Powder",
        "rmBatchNo": "CO-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "KM",
    "name": "Jain Khakhra Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "KBP",
    "name": "Jain Katlu Batrisu Powder",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Mace",
        "rmBatchNo": "MA-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cardamom",
        "rmBatchNo": "CA-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Almonds",
        "rmBatchNo": "AL-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Cashews",
        "rmBatchNo": "CA-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Pistachios",
        "rmBatchNo": "PI-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain Chaas Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Dried Mint Leaves",
        "rmBatchNo": "DR-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "TM",
    "name": "Tea Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Cloves",
        "rmBatchNo": "CL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain CHAT Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Dried Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Jain Agri Koli Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "KKPP",
    "name": "Jain Kachi Keri Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Raw Mango Powder",
        "rmBatchNo": "RA-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Black Salt",
        "rmBatchNo": "BL-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "JPPM",
    "name": "Jain Jaljeera Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Black Salt",
        "rmBatchNo": "BL-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "HPPM",
    "name": "Jain Hing Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "NPPM",
    "name": "Jain Nimbu Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "JPPM",
    "name": "Jain Jeera Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Cumin Powder",
        "rmBatchNo": "RO-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Mint Powder",
        "rmBatchNo": "MI-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "MSM",
    "name": "Jain Masala Soda Mix",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mint Powder",
        "rmBatchNo": "MI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "TFM",
    "name": "Jain Tawa Fry Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "TLSS",
    "name": "Jain Turmeric Latte - Super Seed Mix",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Almond Powder",
        "rmBatchNo": "AL-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cashew Powder",
        "rmBatchNo": "CA-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon Powder",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper Powder",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cardamom Powder",
        "rmBatchNo": "CA-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "TL",
    "name": "Jain Turmeric Latte",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric",
        "rmBatchNo": "TU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "TM",
    "name": "Jain Thandai Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Almonds",
        "rmBatchNo": "AL-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Pistachios",
        "rmBatchNo": "PI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Poppy Seeds",
        "rmBatchNo": "PO-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Saffron",
        "rmBatchNo": "SA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "RCMM",
    "name": "Jain Rose Cashew Milk Magic Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Cashew Powder",
        "rmBatchNo": "CA-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Rose Petals",
        "rmBatchNo": "RO-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Cardamom",
        "rmBatchNo": "CA-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "GTMM",
    "name": "Jain Golden Turmeric Milk Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric",
        "rmBatchNo": "TU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "KUM",
    "name": "Jain Kesari Ukala Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Almonds",
        "rmBatchNo": "AL-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Pistachios",
        "rmBatchNo": "PI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Cardamom",
        "rmBatchNo": "CA-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Saffron",
        "rmBatchNo": "SA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "BM",
    "name": "Jain Basundi Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Almonds",
        "rmBatchNo": "AL-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Cashews",
        "rmBatchNo": "CA-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Pistachios",
        "rmBatchNo": "PI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Saffron",
        "rmBatchNo": "SA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "SLM",
    "name": "Jain Surti Locho Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "DVGM",
    "name": "Jain Dal Vegetable Garam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "KMM",
    "name": "Jain Kesari Milk Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Almonds",
        "rmBatchNo": "AL-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Cashews",
        "rmBatchNo": "CA-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Pistachios",
        "rmBatchNo": "PI-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Saffron",
        "rmBatchNo": "SA-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "TM",
    "name": "Jain Tea Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SBM",
    "name": "Jain Sindhi Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "NBM",
    "name": "Jain Nawabi Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Mace",
        "rmBatchNo": "MA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "MBM",
    "name": "Jain Mughlai Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Bay Leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "MRM",
    "name": "Jain Masala Rice Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "LRM",
    "name": "Jain Lemon Rice Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Turmeric",
        "rmBatchNo": "TU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "TBM",
    "name": "Jain Thalassery Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Star Anise",
        "rmBatchNo": "ST-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Mace",
        "rmBatchNo": "MA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "KBM",
    "name": "Jain Kolkata Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Mace",
        "rmBatchNo": "MA-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "CBM",
    "name": "Jain Chettinad Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "BBM",
    "name": "Jain Bombay Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Star Anise",
        "rmBatchNo": "ST-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "ABM",
    "name": "Jain Awadhi Biryani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RGM",
    "name": "Jain Rajwadi Garam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Mace",
        "rmBatchNo": "MA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "PGM",
    "name": "Jain Punjabi Garam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Cardamom",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Mace",
        "rmBatchNo": "MA-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "ZGM",
    "name": "Jain Zaffrani Garam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Saffron",
        "rmBatchNo": "SA-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cardamom",
        "rmBatchNo": "CA-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cloves",
        "rmBatchNo": "CL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Mace",
        "rmBatchNo": "MA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "RPGM",
    "name": "Jain Rose Petal Garam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Rose Petals",
        "rmBatchNo": "DR-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cardamom",
        "rmBatchNo": "CA-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "TCPG",
    "name": "Jain Thai Curry Powder - Green",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Lemongrass Powder",
        "rmBatchNo": "LE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Galangal Powder",
        "rmBatchNo": "GA-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain Chivda Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "PM",
    "name": "Jain Pakoda Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "MPM",
    "name": "Jain Masala Pav Mix",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "DM",
    "name": "Jain Dabeli Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "RM",
    "name": "Jain Ragda Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KM",
    "name": "Jain Kachori Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "PSM",
    "name": "Jain Punjabi Samosa Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "PPM",
    "name": "Jain Pani Puri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Salt",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain Chaat Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Black Salt",
        "rmBatchNo": "BL-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jain Jaljeera Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Mint Leaves",
        "rmBatchNo": "MI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "FJM",
    "name": "Jain Fruit Juice Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Dry Ginger Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Black Salt",
        "rmBatchNo": "BL-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "AM",
    "name": "Jain Achari Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "VTSM",
    "name": "Jain Veg Tawa Sizzler Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "KCM",
    "name": "Jain Kulambu Chilli Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Byadgi Chilli",
        "rmBatchNo": "BY-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Guntur Chilli",
        "rmBatchNo": "GU-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "MDM",
    "name": "Jain Mysore Dosa Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "CM",
    "name": "Jain Chettinad Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Turmeric",
        "rmBatchNo": "TU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RM",
    "name": "Jain Rasam Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Toor Dal",
        "rmBatchNo": "TO-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "SM",
    "name": "Jain Sambhar Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Toor Dal",
        "rmBatchNo": "TO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Chana Dal",
        "rmBatchNo": "CH-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Turmeric",
        "rmBatchNo": "TU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Curry Leaves",
        "rmBatchNo": "CU-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jain Jhalmuri Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Black salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Black pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Jain Soya Chaap Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RM",
    "name": "Jain Rajma Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Red chili powder",
        "rmBatchNo": "RE-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Ginger powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Cardamom",
        "rmBatchNo": "CA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Bay leaf",
        "rmBatchNo": "BA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "RM",
    "name": "Jain Raita Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan pink salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Cumin seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Black salt",
        "rmBatchNo": "BL-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Coriander seeds",
        "rmBatchNo": "CO-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Mint leaves",
        "rmBatchNo": "MI-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Black pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Lemon juice powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "PPM",
    "name": "Jain Panch Phoron Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Nigella Seeds",
        "rmBatchNo": "NI-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "MVM",
    "name": "Jain Mughlai Vegetable Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "KTM",
    "name": "Jain Kabab & Tikki Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Mango Powder",
        "rmBatchNo": "MA-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Mace",
        "rmBatchNo": "MA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "DMM",
    "name": "Jain Dal Makhani Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Red Chilli",
        "rmBatchNo": "RE-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Cloves",
        "rmBatchNo": "CL-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Mace",
        "rmBatchNo": "MA-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "DFTM",
    "name": "Jain Dal Fry Tadka Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "DBM",
    "name": "Jain Dal Bukhara Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "BPCM",
    "name": "Jain Black Pindi Chole Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Pomegranate Seeds",
        "rmBatchNo": "PO-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Jain Awadhi Korma Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cashew Nut Powder",
        "rmBatchNo": "CA-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Poppy Seeds",
        "rmBatchNo": "PO-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Mace",
        "rmBatchNo": "MA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "AKM",
    "name": "Jain Amritsari Kulcha Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 8.33
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 8.33
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 8.33
      },
      {
        "srNo": 4,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260404",
        "formulaPct": 8.33
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 8.33
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 8.33
      },
      {
        "srNo": 7,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260407",
        "formulaPct": 8.33
      },
      {
        "srNo": 8,
        "name": "Carom Seeds",
        "rmBatchNo": "CA-260408",
        "formulaPct": 8.33
      },
      {
        "srNo": 9,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260409",
        "formulaPct": 8.33
      },
      {
        "srNo": 10,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260410",
        "formulaPct": 8.33
      },
      {
        "srNo": 11,
        "name": "Cloves",
        "rmBatchNo": "CL-260411",
        "formulaPct": 8.33
      },
      {
        "srNo": 12,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260412",
        "formulaPct": 8.37
      }
    ]
  },
  {
    "code": "VM",
    "name": "Jain Vindaloo Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Turmeric",
        "rmBatchNo": "TU-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "VM",
    "name": "Jain Varahadi Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cardamom",
        "rmBatchNo": "CA-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "SJM",
    "name": "Jain Surti Jiralu Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Citric Acid (Lemon Juice Powder)",
        "rmBatchNo": "CI-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SGM",
    "name": "Jain Super Goda Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Dry Coconut",
        "rmBatchNo": "DR-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "SSMM",
    "name": "Jain Sunday Special Mix Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Kashmiri Red Chili Powder",
        "rmBatchNo": "KA-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "SM",
    "name": "Jain Saoji Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Red Chili Powder",
        "rmBatchNo": "KA-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Star Anise",
        "rmBatchNo": "ST-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "MAM",
    "name": "Jain Marathi Amti Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Turmeric",
        "rmBatchNo": "TU-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cloves",
        "rmBatchNo": "CL-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "JM",
    "name": "Jain Jeeravan Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Dry Ginger",
        "rmBatchNo": "DR-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "UM",
    "name": "Jain Undhiya Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Sesame Seeds",
        "rmBatchNo": "SE-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "GKM",
    "name": "Jain Gujarati Kadhi Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "GDM",
    "name": "Jain Gujarati Dal Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 10.0
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 10.0
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 10.0
      },
      {
        "srNo": 4,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260404",
        "formulaPct": 10.0
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 10.0
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 10.0
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 10.0
      },
      {
        "srNo": 8,
        "name": "Cardamom",
        "rmBatchNo": "CA-260408",
        "formulaPct": 10.0
      },
      {
        "srNo": 9,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260409",
        "formulaPct": 10.0
      },
      {
        "srNo": 10,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260410",
        "formulaPct": 10.0
      }
    ]
  },
  {
    "code": "GGVM",
    "name": "Jain Green Gujarat Vegetable Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "GXM",
    "name": "Jain Goan Xacuti Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander",
        "rmBatchNo": "CO-260401",
        "formulaPct": 9.09
      },
      {
        "srNo": 2,
        "name": "Kashmiri Red Chilli",
        "rmBatchNo": "KA-260402",
        "formulaPct": 9.09
      },
      {
        "srNo": 3,
        "name": "Cumin",
        "rmBatchNo": "CU-260403",
        "formulaPct": 9.09
      },
      {
        "srNo": 4,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260404",
        "formulaPct": 9.09
      },
      {
        "srNo": 5,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260405",
        "formulaPct": 9.09
      },
      {
        "srNo": 6,
        "name": "Cloves",
        "rmBatchNo": "CL-260406",
        "formulaPct": 9.09
      },
      {
        "srNo": 7,
        "name": "Star Anise",
        "rmBatchNo": "ST-260407",
        "formulaPct": 9.09
      },
      {
        "srNo": 8,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260408",
        "formulaPct": 9.09
      },
      {
        "srNo": 9,
        "name": "Mace",
        "rmBatchNo": "MA-260409",
        "formulaPct": 9.09
      },
      {
        "srNo": 10,
        "name": "Turmeric",
        "rmBatchNo": "TU-260410",
        "formulaPct": 9.09
      },
      {
        "srNo": 11,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260411",
        "formulaPct": 9.1
      }
    ]
  },
  {
    "code": "GRM",
    "name": "Jain Goan Recheado Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Red Chili Powder",
        "rmBatchNo": "RE-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Turmeric",
        "rmBatchNo": "TU-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "GCM",
    "name": "Jain Goan Cafreal Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 12.5
      },
      {
        "srNo": 2,
        "name": "Green Chili Powder",
        "rmBatchNo": "GR-260402",
        "formulaPct": 12.5
      },
      {
        "srNo": 3,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260403",
        "formulaPct": 12.5
      },
      {
        "srNo": 4,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260404",
        "formulaPct": 12.5
      },
      {
        "srNo": 5,
        "name": "Cloves",
        "rmBatchNo": "CL-260405",
        "formulaPct": 12.5
      },
      {
        "srNo": 6,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260406",
        "formulaPct": 12.5
      },
      {
        "srNo": 7,
        "name": "Turmeric",
        "rmBatchNo": "TU-260407",
        "formulaPct": 12.5
      },
      {
        "srNo": 8,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260408",
        "formulaPct": 12.5
      }
    ]
  },
  {
    "code": "SM",
    "name": "Jain Sabji Masala",
    "category": "Jain Blended Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Seeds",
        "rmBatchNo": "CO-260401",
        "formulaPct": 11.11
      },
      {
        "srNo": 2,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260402",
        "formulaPct": 11.11
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 11.11
      },
      {
        "srNo": 4,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260404",
        "formulaPct": 11.11
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 11.11
      },
      {
        "srNo": 6,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260406",
        "formulaPct": 11.11
      },
      {
        "srNo": 7,
        "name": "Cloves",
        "rmBatchNo": "CL-260407",
        "formulaPct": 11.11
      },
      {
        "srNo": 8,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260408",
        "formulaPct": 11.11
      },
      {
        "srNo": 9,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260409",
        "formulaPct": 11.12
      }
    ]
  },
  {
    "code": "ZVSS",
    "name": "Zesty Vinaigrette Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Dried Parsley",
        "rmBatchNo": "DR-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Mustard Powder",
        "rmBatchNo": "MU-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "PPSS",
    "name": "Peri Peri Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Chili Powder",
        "rmBatchNo": "CH-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Oregano",
        "rmBatchNo": "OR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Paprika",
        "rmBatchNo": "PA-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "SSSS",
    "name": "Smoked Sea Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Natural Wood Smoke",
        "rmBatchNo": "NA-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "PSS",
    "name": "Pepper Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "SS",
    "name": "Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "COSS",
    "name": "Chilli Oregano Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Dried Chilli Flakes",
        "rmBatchNo": "DR-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Dried Oregano",
        "rmBatchNo": "DR-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "RJSS",
    "name": "Red Jalapeno Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Red Jalapeno Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "LBSS",
    "name": "Lemon Butter Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "CBSS",
    "name": "Caramelized Onion Butter Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "BSS",
    "name": "Buttery Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "SHSS",
    "name": "SMOKED HIMALAYAN Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TSS",
    "name": "Tangy Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "FSS",
    "name": "Frankie Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Chili Powder",
        "rmBatchNo": "CH-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Black Salt",
        "rmBatchNo": "BL-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Dry Mango Powder",
        "rmBatchNo": "DR-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "FJSS",
    "name": "Fruit Juice Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "BMSS",
    "name": "Butter Milk Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Milk Solids",
        "rmBatchNo": "MI-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Black Salt",
        "rmBatchNo": "BL-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Dried Mint",
        "rmBatchNo": "DR-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SSS",
    "name": "Sriracha Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Chilli Powder",
        "rmBatchNo": "CH-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Paprika",
        "rmBatchNo": "PA-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "LSS",
    "name": "Lime Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "RSS",
    "name": "Roasted Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Roasted Garlic Powder",
        "rmBatchNo": "RO-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "CSS",
    "name": "Chipotle Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Chipotle Chilli Powder",
        "rmBatchNo": "CH-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "SGPS",
    "name": "Smoked Ghost Pepper Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Smoked Ghost Pepper Powder",
        "rmBatchNo": "SM-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "BSS",
    "name": "Butter Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Milk Solids",
        "rmBatchNo": "MI-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Turmeric",
        "rmBatchNo": "TU-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "ASS",
    "name": "Achari Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 14.29
      },
      {
        "srNo": 2,
        "name": "Mustard Seeds",
        "rmBatchNo": "MU-260402",
        "formulaPct": 14.29
      },
      {
        "srNo": 3,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260403",
        "formulaPct": 14.29
      },
      {
        "srNo": 4,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260404",
        "formulaPct": 14.29
      },
      {
        "srNo": 5,
        "name": "Turmeric",
        "rmBatchNo": "TU-260405",
        "formulaPct": 14.29
      },
      {
        "srNo": 6,
        "name": "Cumin",
        "rmBatchNo": "CU-260406",
        "formulaPct": 14.29
      },
      {
        "srNo": 7,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260407",
        "formulaPct": 14.26
      }
    ]
  },
  {
    "code": "OSS",
    "name": "Oregano Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Dried Garlic",
        "rmBatchNo": "DR-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Dried Oregano",
        "rmBatchNo": "DR-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "GCSS",
    "name": "Green Chilli Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Dried Green Chilli",
        "rmBatchNo": "DR-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Dried Garlic",
        "rmBatchNo": "DR-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "GSS",
    "name": "Ginger Garlic Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Ginger",
        "rmBatchNo": "GI-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Garlic",
        "rmBatchNo": "GA-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "HSS",
    "name": "Garlic Herb Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Garlic",
        "rmBatchNo": "GA-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Dried Herbs",
        "rmBatchNo": "DR-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "RCSS",
    "name": "Red Chilli Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "GSS",
    "name": "Grill Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Smoked Paprika",
        "rmBatchNo": "SM-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "CSS",
    "name": "Curry Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 16.67
      },
      {
        "srNo": 2,
        "name": "Turmeric",
        "rmBatchNo": "TU-260402",
        "formulaPct": 16.67
      },
      {
        "srNo": 3,
        "name": "Coriander",
        "rmBatchNo": "CO-260403",
        "formulaPct": 16.67
      },
      {
        "srNo": 4,
        "name": "Cumin",
        "rmBatchNo": "CU-260404",
        "formulaPct": 16.67
      },
      {
        "srNo": 5,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260405",
        "formulaPct": 16.67
      },
      {
        "srNo": 6,
        "name": "Fenugreek",
        "rmBatchNo": "FE-260406",
        "formulaPct": 16.65
      }
    ]
  },
  {
    "code": "SS",
    "name": "Onion Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "FSS",
    "name": "Fire Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Ginger Powder",
        "rmBatchNo": "GI-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "MCPS",
    "name": "Mint Garlic Chilli Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Dried Mint",
        "rmBatchNo": "DR-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Red Chilli Powder",
        "rmBatchNo": "RE-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "CHPS",
    "name": "Citrus Himalayan Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "IHPP",
    "name": "Italian Herbs & Peperoncino Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Dried Oregano",
        "rmBatchNo": "DR-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Dried Basil",
        "rmBatchNo": "DR-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Dried Thyme",
        "rmBatchNo": "DR-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Red Chilli Flakes",
        "rmBatchNo": "RE-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "SPSS",
    "name": "Smoked Paprika Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Smoked Paprika",
        "rmBatchNo": "SM-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "CPSS",
    "name": "Chilli Pepper Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Chilli Powder",
        "rmBatchNo": "CH-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "HABP",
    "name": "Herbs & Aged Balsamic Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Dried Basil",
        "rmBatchNo": "DR-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Dried Oregano",
        "rmBatchNo": "DR-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Balsamic Vinegar Powder",
        "rmBatchNo": "BA-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "SCLP",
    "name": "Smoked Onion Garlic Chilli Lemon Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Onion Powder",
        "rmBatchNo": "ON-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Chilli Powder",
        "rmBatchNo": "CH-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "SLCP",
    "name": "Smoked Lime Chilli Garlic Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 20.0
      },
      {
        "srNo": 2,
        "name": "Garlic Powder",
        "rmBatchNo": "GA-260402",
        "formulaPct": 20.0
      },
      {
        "srNo": 3,
        "name": "Chilli Powder",
        "rmBatchNo": "CH-260403",
        "formulaPct": 20.0
      },
      {
        "srNo": 4,
        "name": "Lemon Juice Powder",
        "rmBatchNo": "LE-260404",
        "formulaPct": 20.0
      },
      {
        "srNo": 5,
        "name": "Smoked Paprika",
        "rmBatchNo": "SM-260405",
        "formulaPct": 20.0
      }
    ]
  },
  {
    "code": "HSS",
    "name": "Herb Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Dried Basil",
        "rmBatchNo": "DR-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Dried Oregano",
        "rmBatchNo": "DR-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Dried Parsley",
        "rmBatchNo": "DR-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "CSS",
    "name": "Celery Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Celery Seed Powder",
        "rmBatchNo": "CE-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "MSS",
    "name": "Minty Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Dried Mint Leaves",
        "rmBatchNo": "DR-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "SS",
    "name": "Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "SSRS",
    "name": "Sendha Salt (Rock Salt)",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Rock Salt",
        "rmBatchNo": "RO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BSS",
    "name": "Black Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Salt",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HPSS",
    "name": "Himalayan Pink Seasoned Salt",
    "category": "Salt",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HP",
    "name": "Hing Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Edible Gum Arabic",
        "rmBatchNo": "ED-260401",
        "formulaPct": 33.33
      },
      {
        "srNo": 2,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260402",
        "formulaPct": 33.33
      },
      {
        "srNo": 3,
        "name": "Edible Rice Bran Oil",
        "rmBatchNo": "ED-260403",
        "formulaPct": 33.34
      }
    ]
  },
  {
    "code": "TP",
    "name": "Triphala Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Sichuan Pepper",
        "rmBatchNo": "SI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TPSG",
    "name": "Turmeric Powder Selam Gold",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TP",
    "name": "Turmeric Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "JP",
    "name": "Javantri Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mace",
        "rmBatchNo": "MA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Caramel Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cane Sugar",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "ASP",
    "name": "All Spice Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260401",
        "formulaPct": 25.0
      },
      {
        "srNo": 2,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260402",
        "formulaPct": 25.0
      },
      {
        "srNo": 3,
        "name": "Cloves",
        "rmBatchNo": "CL-260403",
        "formulaPct": 25.0
      },
      {
        "srNo": 4,
        "name": "Allspice",
        "rmBatchNo": "AL-260404",
        "formulaPct": 25.0
      }
    ]
  },
  {
    "code": "CPT",
    "name": "Chilli Powder Tikhawala",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Chilli Powder Tikhawala",
        "rmBatchNo": "CH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GP",
    "name": "GanthoDa Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Ganthoda Powder",
        "rmBatchNo": "GA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "AP",
    "name": "Anardana Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Pomegranate Seeds",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BLP",
    "name": "Bay Leaves Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BCP",
    "name": "Black Cardamom Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Cardamom Powder",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SAP",
    "name": "Star Anise Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Star Anise Powder",
        "rmBatchNo": "ST-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "FSP",
    "name": "Fennel Seed Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fennel Seed Powder",
        "rmBatchNo": "FE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "PP",
    "name": "Peppermaul Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Pipramul Powder",
        "rmBatchNo": "PI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "WPP",
    "name": "White Pepper Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "White Pepper Powder",
        "rmBatchNo": "WH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MP",
    "name": "Mace Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mace Powder",
        "rmBatchNo": "MA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CSAP",
    "name": "Carom Seed (Ajwain) Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Carom Seed Powder",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RFSP",
    "name": "Roasted Flax Seed Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Flax Seed Powder",
        "rmBatchNo": "RO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Cardamom Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cardamom Powder",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DC",
    "name": "Desiccated Coconut",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Desiccated Coconut",
        "rmBatchNo": "DE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Cinnamon Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cinnamon Powder",
        "rmBatchNo": "CI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "NP",
    "name": "Nutmeg Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Nutmeg Powder",
        "rmBatchNo": "NU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Clove Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Clove Powder",
        "rmBatchNo": "CL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "YMP",
    "name": "Yellow Mustard Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Yellow Mustard Powder",
        "rmBatchNo": "YE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "FP",
    "name": "Fenugreek Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fenugreek Powder",
        "rmBatchNo": "FE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DGP",
    "name": "Dry Ginger Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Ginger",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DMP",
    "name": "Dry Mango Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Mango",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MBPP",
    "name": "Malabar Black Pepper Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Pepper",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "RCP",
    "name": "Roasted Cumin Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Cumin Seeds",
        "rmBatchNo": "RO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Cumin Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TPA",
    "name": "Turmeric Powder Alleppey",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "LTP",
    "name": "Lakadong Turmeric Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TPR",
    "name": "Turmeric Powder Rajapore",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Turmeric Powder",
        "rmBatchNo": "TU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DJP",
    "name": "Dhana - Jeera Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Cumin Powder",
        "rmBatchNo": "CU-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "CP",
    "name": "Coriander Powder",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Powder",
        "rmBatchNo": "CO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HPH",
    "name": "Hingtaj Premium Hing",
    "category": "Single Spices Powder",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Asafoetida",
        "rmBatchNo": "AS-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Rice Flour",
        "rmBatchNo": "RI-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "PC",
    "name": "Pandi Chilli",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Pandi Chilli",
        "rmBatchNo": "PA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CR",
    "name": "Cinnamon Rolls",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "TAMA",
    "name": "Tamarind",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Tamarind",
        "rmBatchNo": "TA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GCS",
    "name": "Gold Carom Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Carom Seeds",
        "rmBatchNo": "CA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GFS",
    "name": "Green Fennel Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Fennel Seeds",
        "rmBatchNo": "GR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DRP",
    "name": "Dry Rose Petals",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dry Rose Petals",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "WKR",
    "name": "Wet Kokam Rinds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kokam Rinds",
        "rmBatchNo": "KO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DD",
    "name": "Dhana Dal",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Roasted Coriander Seeds",
        "rmBatchNo": "RO-260401",
        "formulaPct": 50.0
      },
      {
        "srNo": 2,
        "name": "Himalayan Pink Salt",
        "rmBatchNo": "HI-260402",
        "formulaPct": 50.0
      }
    ]
  },
  {
    "code": "DKR",
    "name": "Dry Kokam Rinds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dry Kokam Rinds",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SHAH",
    "name": "Shahjeera",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Cumin Seeds",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "DS",
    "name": "Dill Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dill Seeds",
        "rmBatchNo": "DI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BS",
    "name": "Basil Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Basil Seeds",
        "rmBatchNo": "BA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KALO",
    "name": "Kalonji",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Nigella Seeds",
        "rmBatchNo": "NI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "MACE",
    "name": "Mace",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Mace",
        "rmBatchNo": "MA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SF",
    "name": "Stone Flower",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Stone Flower",
        "rmBatchNo": "ST-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KK",
    "name": "Khus Khus",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Poppy Seeds",
        "rmBatchNo": "PO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BC",
    "name": "Big Cardamom",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Big Cardamom",
        "rmBatchNo": "BI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SA",
    "name": "Star Anise",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Star Anise",
        "rmBatchNo": "ST-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "NUTM",
    "name": "Nutmeg",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Nutmeg",
        "rmBatchNo": "NU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "AJWA",
    "name": "Ajwain",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Ajwain Seeds",
        "rmBatchNo": "AJ-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BSS",
    "name": "Black Sesame Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Sesame Seeds",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "WSS",
    "name": "White Sesame Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "White Sesame Seeds",
        "rmBatchNo": "WH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GW",
    "name": "Ginger Whole",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Ginger Whole",
        "rmBatchNo": "GI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KM",
    "name": "Kasuri Methi",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Dried Fenugreek Leaves",
        "rmBatchNo": "DR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "SMS",
    "name": "Small Mustard Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Small Mustard Seeds",
        "rmBatchNo": "SM-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BMS",
    "name": "Big Mustard Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Big Mustard Seeds",
        "rmBatchNo": "BI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CS",
    "name": "Cumin Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cumin Seeds",
        "rmBatchNo": "CU-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BL",
    "name": "Bay Leaves",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Bay Leaves",
        "rmBatchNo": "BA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "WP",
    "name": "White Peppercorns",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "White Peppercorns",
        "rmBatchNo": "WH-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BP",
    "name": "Black Peppercorns",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Black Peppercorns",
        "rmBatchNo": "BL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "FS",
    "name": "Fenugreek Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fenugreek Seeds",
        "rmBatchNo": "FE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "FS",
    "name": "Fennel Seeds",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Fennel Seeds",
        "rmBatchNo": "FE-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "GC",
    "name": "Green Cardamom",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Green Cardamom",
        "rmBatchNo": "GR-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CINN",
    "name": "Cinnamon",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Cinnamon",
        "rmBatchNo": "CI-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CLOV",
    "name": "Clove",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Clove",
        "rmBatchNo": "CL-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "CGW",
    "name": "Coriander Green Whole",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Coriander Green Whole",
        "rmBatchNo": "CO-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "HSW",
    "name": "Haldi Selam Whole",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Haldi Selam Whole",
        "rmBatchNo": "HA-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "BCW",
    "name": "Byadgi Chilli Whole",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Byadgi Chilli Whole",
        "rmBatchNo": "BY-260401",
        "formulaPct": 100.0
      }
    ]
  },
  {
    "code": "KCW",
    "name": "Kashmiri Chilli Whole",
    "category": "Whole Spices",
    "defaultQty": 1.0,
    "packSize": "100 g",
    "recipe": [
      {
        "srNo": 1,
        "name": "Kashmiri Chilli Whole",
        "rmBatchNo": "KA-260401",
        "formulaPct": 100.0
      }
    ]
  }
];

// Alias for backwards compatibility
export const PRODUCT_MASTER = PRODUCTS;

// Default Weekly Schedule (legacy support for settings view)
export const DEFAULT_WEEKLY_SCHEDULE = {
  0: [],
  1: ['PBM', 'KUM'],
  2: ['CHNM', 'FRM'],
  3: ['OM', 'AOM'],
  4: ['KBP', 'UM'],
  5: ['RFDM', 'JPPM'],
  6: ['PPM', 'MBM']
};

// ── REALISTIC PRODUCTION SCHEDULING ──────────────────────────────────────────
// Core products: manufactured 2-3x per week (staples)
const CORE_PRODUCT_INDICES = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
// Regular products: once per week rotation
const REGULAR_PRODUCT_INDICES = Array.from({length: 80}, (_, i) => 20 + i);

// Seeded deterministic RNG (Mulberry32)
function seeded(seed) {
  let s = (seed ^ 0xDEADBEEF) >>> 0;
  return function() {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Realistic Product Selection for a given date.
 * - Sunday: 0 batches
 * - Mon-Sat: 6-15 batches based on realistic patterns:
 *   * 60% of days: 6-8 batches
 *   * 25% of days: 9-12 batches
 *   * 15% of days: 13-15 batches (busy days)
 * - Core products repeat every 2-3 days (popular sellers)
 * - Regular products rotate weekly
 * - Same date always gives same result (deterministic)
 */
export function getProductsForDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (d.getDay() === 0) return []; // Sunday = no production

  const base = new Date('2026-04-01T00:00:00');
  const dayIdx = Math.floor((d - base) / 86400000);
  const rng = seeded(dayIdx * 7919 + 31337);

  // Determine how many batches today
  const rand = rng();
  let count;
  if (rand < 0.60) {
    count = 6 + Math.floor(rng() * 3); // 6,7,8
  } else if (rand < 0.85) {
    count = 9 + Math.floor(rng() * 4); // 9,10,11,12
  } else {
    count = 13 + Math.floor(rng() * 3); // 13,14,15
  }

  const selected = [];
  const usedIndices = new Set();

  // Always include 2-4 core products (repeating staples)
  const coreCount = 2 + Math.floor(rng() * 3); // 2,3,4
  const shuffledCore = [...CORE_PRODUCT_INDICES].sort(() => rng() - 0.5);
  for (let i = 0; i < Math.min(coreCount, shuffledCore.length); i++) {
    const idx = ((shuffledCore[i] + Math.floor(dayIdx / 2)) % PRODUCTS.length + PRODUCTS.length) % PRODUCTS.length;
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selected.push(PRODUCTS[idx]);
    }
  }

  // Fill remaining slots with rotating regular + occasional products
  const weekIdx = Math.floor(dayIdx / 6);
  let fillIdx = 0;
  while (selected.length < count) {
    const offset = (weekIdx * 13 + fillIdx * 7 + dayIdx * 3) % PRODUCTS.length;
    const idx = (offset + PRODUCTS.length) % PRODUCTS.length;
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selected.push(PRODUCTS[idx]);
    }
    fillIdx++;
    if (fillIdx > PRODUCTS.length) break; // safety
  }

  return selected.slice(0, count);
}

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
  const batchNo = generateBatchNumber(product.code, dateStr, seq);
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
  const ingredients = (product.recipe || []).map((item) => {
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

  const totalFormulaPct = (product.recipe || []).reduce((sum, r) => sum + r.formulaPct, 0);
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
 * Generate batches for a single calendar date based on deterministic 462-product rotation
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {Array} Array of generated batch objects
 */
export function generateDayBatches(dateStr) {
  if (!dateStr) return [];
  const prods = getProductsForDate(dateStr);
  if (!prods || !prods.length) return [];

  const todayISO = formatDateISO(new Date());
  const isFuture = dateStr > todayISO;

  // Seeded RNG for this date so results are deterministic
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateSeed = year * 10000 + month * 100 + day;
  const rng = seeded(dateSeed * 6271 + 99991);

  // Realistic yield pool: mostly 96-100%, occasionally lower
  const yieldPool = [1.00, 1.00, 1.00, 0.99, 0.99, 0.98, 0.98, 0.97, 0.96, 0.95, 1.00, 0.99, 1.00, 0.98, 0.99];

  const batches = [];
  prods.forEach((product, idx) => {
    let actualQty = null;
    let yieldPct = null;
    let status = isFuture ? 'Pending' : 'Completed';

    if (!isFuture) {
      const yieldFactor = yieldPool[Math.floor(rng() * yieldPool.length)];
      actualQty = Math.round(1.0 * yieldFactor * 1000) / 1000;
      yieldPct = Math.round(yieldFactor * 10000) / 100;
    }

    const batch = buildBatchRecord({
      product,
      dateStr,
      seq: idx + 1,
      plannedQty: product.defaultQty || 1.0,
      status,
      actualQty,
      yieldPct,
      qualityPassed: !isFuture
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
