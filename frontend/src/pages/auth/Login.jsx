import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const roleLabels = { admin: "Admin", doctor: "Doctor" };
    const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const displayName = role === "doctor" ? `Dr. ${nameFromEmail}` : "Admin User";

    localStorage.setItem(
      "sutrasync_user",
      JSON.stringify({ name: displayName, role: roleLabels[role], email })
    );

    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "doctor") {
      navigate("/doctor-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Sutra Sync Hospital logo" className="w-12 h-12 mb-2" />
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-bold text-blue-700">Sutra Sync</span>
            <span className="text-base font-medium text-gray-700 mt-0.5">Hospital</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to manage your clinic dashboard.
        </p>

        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
          {["admin", "doctor"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 font-medium text-sm transition capitalize ${
                role === r
                  ? "border-2 border-blue-700 text-blue-700 rounded-lg"
                  : "text-gray-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-700">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sutrasync.com"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-700">
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
            <Link to="/forgot-password" className="text-blue-700 underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}