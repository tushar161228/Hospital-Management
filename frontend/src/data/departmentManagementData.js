import { initialDoctors } from "./doctorManagementData";

export const initialDepartments = [
  {
    id: "DEPT-01",
    name: "Cardiology",
    head: "Dr. Rajesh Sharma",
    description: "Diagnosis and treatment of heart and cardiovascular conditions.",
    category: "Predefined",
  },
  {
    id: "DEPT-02",
    name: "Dermatology",
    head: "Dr. Priya Patel",
    description: "Skin, hair, and nail related medical and cosmetic care.",
    category: "Predefined",
  },
  {
    id: "DEPT-03",
    name: "Orthopedics",
    head: "Dr. Amit Kumar",
    description: "Bone, joint, and musculoskeletal system treatment.",
    category: "Predefined",
  },
  {
    id: "DEPT-04",
    name: "Gynecology",
    head: "Dr. Neha Gupta",
    description: "Women's reproductive health and obstetric care.",
    category: "Predefined",
  },
  {
    id: "DEPT-05",
    name: "Pediatrics",
    head: "Unassigned",
    description: "Medical care for infants, children, and adolescents.",
    category: "Predefined",
  },
  {
    id: "DEPT-06",
    name: "Neurology",
    head: "Unassigned",
    description: "Disorders of the brain, spinal cord, and nervous system.",
    category: "Predefined",
  },
];

export function generateDepartmentId(existing) {
  const nums = existing.map((d) => parseInt(d.id.split("-")[1], 10));
  const next = Math.max(...nums, 0) + 1;
  return `DEPT-${String(next).padStart(2, "0")}`;
}

export function doctorCountFor(departmentName) {
  return initialDoctors.filter((d) => d.department === departmentName).length;
}

export { initialDoctors };