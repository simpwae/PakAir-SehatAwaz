import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [language, setLanguage] = useState("English");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Attempt login using mock users
    setAuthError("");
    const res = await login(formData.email, formData.password);
    if (!res.ok) {
      setAuthError(res.message || "Login failed");
      return;
    }

    // Navigate to citizen dashboard
    navigate("/citizen/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Image & Branding */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-gradient-to-br from-green-500 to-green-700 overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/40">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800')] bg-cover bg-center opacity-30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-8 h-full">
          {/* Top Section */}
          <div className="flex justify-start items-start">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <span className="font-bold text-white text-sm">PA</span>
              </div>
              <h1 className="text-2xl font-bold text-white">PakAir</h1>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Breathing Clean, Living Healthy.
            </h2>
            <p className="text-white/90 text-lg">
              Monitor air quality and protect your health across Pakistan.
            </p>

            {/* Navigation Dots */}
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
              <button
                type="button"
                onClick={() => setLanguage("English")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  language === "English"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("Urdu")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  language === "Urdu"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back.
          </h1>
          <p className="text-gray-600 mb-8">
            Don't have an account?{" "}
            <Link
              to="/citizen/signup"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign up
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-gray-50"
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/citizen/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Log in
            </button>
            {authError && (
              <p className="text-red-600 text-sm text-center mt-3">{authError}</p>
            )}
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/citizen/signup"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-600 text-center">
              Government official?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Login to Official Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

