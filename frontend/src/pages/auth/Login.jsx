import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldPlus } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    alert(`Signed in as ${role}: ${email}`);
    navigate("/signup"); // temporary - change later when dashboard exists
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldPlus className="text-teal-700" size={28} />
            <span className="text-xl font-bold text-teal-700">
              CityCare{" "}
              <span className="font-medium text-gray-700">Hospital</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to manage your clinic dashboard.
        </p>

        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => setRole("doctor")}
            className={`flex-1 py-2 font-medium transition ${
              role === "doctor"
                ? "border-2 border-teal-700 text-teal-700 rounded-lg"
                : "text-gray-600"
            }`}
          >
            Doctor
          </button>
          <button
            type="button"
            onClick={() => setRole("staff")}
            className={`flex-1 py-2 font-medium transition ${
              role === "staff"
                ? "border-2 border-teal-700 text-teal-700 rounded-lg"
                : "text-gray-600"
            }`}
          >
            Staff
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.sharma@citycare.com"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-teal-700 underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-700 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
