import { useState } from "react";
import { Link } from "react-router";
import { MessageCircle, Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-5xl md:h-[650px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left Column: Illustration Banner */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="text-center max-w-sm z-10 flex flex-col items-center">
                <div className="w-56 h-56 flex items-center justify-center mb-6 signup-illustration-float rounded-2xl overflow-hidden bg-white/5 border border-slate-700/50 p-4">
                  <img
                    src="/login.jpg"
                    alt="Login illustration"
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome Back!
                </h3>
                <p className="text-sm text-slate-400">
                  Sign in to continue your conversations and stay connected with
                  your community.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-700/60">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/20">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <div className="auth-input-icon">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <div className="auth-input-icon">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      className="auth-input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="auth-btn mt-2"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;