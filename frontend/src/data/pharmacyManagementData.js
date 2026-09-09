export const medicineCategories = ["Tablet", "Syrup", "Injection", "Ointment", "Capsule", "Drops"];

export const initialMedicines = [
  {
    id: "MED-4001",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Tablet",
    manufacturer: "Cipla Ltd.",
    stock: 45,
    reorderLevel: 100,
    unitPrice: 2.5,
    expiryDate: "15 Aug 2026",
  },
  {
    id: "MED-4002",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    category: "Capsule",
    manufacturer: "Sun Pharma",
    stock: 320,
    reorderLevel: 150,
    unitPrice: 5.0,
    expiryDate: "22 Dec 2026",
  },
  {
    id: "MED-4003",
    name: "Cetirizine Syrup",
    genericName: "Cetirizine HCl",
    category: "Syrup",
    manufacturer: "Dr. Reddy's",
    stock: 60,
    reorderLevel: 50,
    unitPrice: 45.0,
    expiryDate: "10 Jun 2026",
  },
  {
    id: "MED-4004",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    category: "Injection",
    manufacturer: "Novo Nordisk",
    stock: 18,
    reorderLevel: 25,
    unitPrice: 850.0,
    expiryDate: "05 Jul 2026",
  },
  {
    id: "MED-4005",
    name: "Betamethasone Cream",
    genericName: "Betamethasone",
    category: "Ointment",
    manufacturer: "GSK",
    stock: 90,
    reorderLevel: 40,
    unitPrice: 78.0,
    expiryDate: "30 Mar 2027",
  },
];

export function generateMedicineId(existing) {
  const nums = existing.map((m) => parseInt(m.id.split("-")[1], 10));
  const next = Math.max(...nums, 4000) + 1;
  return `MED-${next}`;
}

export function isExpiringSoon(expiryDate) {
  const expiry = new Date(expiryDate);
  const today = new Date("2026-05-27"); // matches app's mock "today"
  const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return daysLeft <= 45;
}

export function isLowStock(medicine) {
  return medicine.stock <= medicine.reorderLevel;
}