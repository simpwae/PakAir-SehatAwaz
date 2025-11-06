import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck } from "lucide-react";

function LoginOfficial() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("English");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Attempt login against mock users
    const res = await login(email, password);
    if (!res.ok) {
      setError(res.message || "Login failed");
      return;
    }

    // Navigate to official dashboard (namespaced)
    navigate("/official/national-dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Security Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-700 rounded-full p-3">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Portal Name */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          PakAir-SehatAwaz
        </h1>

        {/* Language Selector */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
            <button
              type="button"
              onClick={() => setLanguage("English")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === "English"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("Urdu")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === "Urdu"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Urdu
            </button>
          </div>
        </div>

        {/* Portal Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
          Government Official Portal
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Official Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your official email"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-700">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          This portal is for authorized personnel only. For access, please
          contact your department administrator.
        </p>

        {/* Citizen Portal Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Not an official?{" "}
            <Link
              to="/citizen/signup"
              className="text-teal-600 hover:text-teal-700"
            >
              Go to Citizen Portal
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginOfficial;
