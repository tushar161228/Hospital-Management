export const initialBranches = [
  {
    id: "BR-01",
    name: "Main Branch - Sector 12",
    address: "12 MG Road, Sector 12, Delhi",
    phone: "+91 11 4567 8900",
    isMainBranch: true,
    facilities: {
      opd: { total: 40, occupied: 28 },
      ipd: { total: 60, occupied: 47 },
      icu: { total: 12, occupied: 9 },
      ot: { total: 4, occupied: 1 },
    },
  },
  {
    id: "BR-02",
    name: "City Branch - MG Road",
    address: "45 MG Road, Gurgaon",
    phone: "+91 12 4890 1122",
    isMainBranch: false,
    facilities: {
      opd: { total: 20, occupied: 12 },
      ipd: { total: 30, occupied: 18 },
      icu: { total: 6, occupied: 4 },
      ot: { total: 2, occupied: 0 },
    },
  },
];

export function generateBranchId(existing) {
  const nums = existing.map((b) => parseInt(b.id.split("-")[1], 10));
  const next = Math.max(...nums, 0) + 1;
  return `BR-${String(next).padStart(2, "0")}`;
}