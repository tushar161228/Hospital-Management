import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, ShieldPlus } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!form.agree) {
      alert("Please agree to the Staff Policies");
      return;
    }
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 mb-1">
            <ShieldPlus className="text-teal-700" size={28} />
            <span className="text-xl font-bold text-teal-700">
              CityCare{" "}
              <span className="font-medium text-gray-700">Hospital</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">
          Register as new hospital staff member.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
            <User size={18} className="text-gray-400 mr-2" />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
            <Mail size={18} className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
            <Phone size={18} className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full outline-none text-sm"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Role</p>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-700"
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-700"
          >
            <option value="">Department</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              className="mt-1"
            />
            <span>
              I agree to{" "}
              <Link to="/staff-policies" className="text-teal-700 underline">
                CityCare Hospital Staff Policies
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-700 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
