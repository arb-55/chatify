import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MailIcon, LoaderIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Subtle ambient glows */}
      <div
        className="pointer-events-none fixed top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-[120px]"
        style={{ background: "var(--blue)" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 right-1/4 w-96 h-96 rounded-full opacity-5 blur-[120px]"
        style={{ background: "var(--red)" }}
      />

      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--bg-border)",
        }}
      >
        {/* Left: Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          {/* Logo + heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="10" fill="rgba(22,119,255,0.15)" />
                <path
                  d="M9 21V16C9 12.134 12.134 9 16 9C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23H9"
                  stroke="#1677FF"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="2" fill="#35A7FF" />
              </svg>
              <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--text-secondary)" }}>
                Chatify
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Sign in to continue to your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="auth-label" htmlFor="email">Email address</label>
              <div className="relative">
                <MailIcon className="auth-input-icon" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="auth-input"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="auth-label" htmlFor="password">Password</label>
              <div className="relative">
                <LockIcon className="auth-input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="auth-input pr-10"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-btn mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderIcon size={15} className="animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-link font-medium">
              Create one
            </Link>
          </p>
        </div>

        {/* Right: Illustration panel */}
        <div
          className="hidden lg:flex w-96 flex-col items-center justify-center p-10"
          style={{
            background: "linear-gradient(135deg, rgba(22,119,255,0.08) 0%, var(--bg-elevated) 100%)",
            borderLeft: "1px solid var(--bg-border)",
          }}
        >
          <img
            src="/login.png"
            alt="Chatify messaging illustration"
            className="w-full max-w-xs h-auto object-contain mb-6"
          />
          <h3 className="text-base font-semibold mb-2 text-center" style={{ color: "var(--text-primary)" }}>
            Connect anytime, anywhere
          </h3>
          <p className="text-xs text-center mb-5" style={{ color: "var(--text-secondary)" }}>
            Real-time messaging, shared Focus Rooms, and seamless media sharing.
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Free", "Private", "Real-time"].map((tag) => (
              <span key={tag} className="auth-badge">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
