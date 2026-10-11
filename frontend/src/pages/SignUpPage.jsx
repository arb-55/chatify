import { useState } from "react";
import { Link } from "react-router";
import { MessageCircle, User, Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-5xl md:h-[700px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left Column: Form */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700/60">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/20">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Create Account
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Get started with your free account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <div className="auth-input-icon">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>

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
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Column: Illustration Banner */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="text-center max-w-sm z-10 flex flex-col items-center">
                <div className="w-52 h-52 flex items-center justify-center mb-6 signup-illustration-float rounded-2xl overflow-hidden bg-white/5 border border-slate-700/50 p-4">
                  <img
                    src="/signup.png"
                    alt="Sign up illustration"
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] mix-blend-luminosity opacity-90 hover:mix-blend-normal hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Join the Community
                </h3>
                <p className="text-sm text-slate-400">
                  Connect with friends, share media, and chat in real-time
                  seamlessly.
                </p>
                <div className="flex gap-2 mt-6">
                  <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                    Real-time
                  </span>
                  <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                    Encrypted
                  </span>
                  <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                    Fast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default SignUpPage;