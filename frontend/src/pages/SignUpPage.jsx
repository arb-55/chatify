import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { UserIcon, LockIcon, MailIcon, LoaderIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Subtle ambient glows */}
      <div
        className="pointer-events-none fixed top-0 right-1/4 w-96 h-96 rounded-full opacity-5 blur-[120px]"
        style={{ background: "var(--blue)" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/4 w-96 h-96 rounded-full opacity-4 blur-[120px]"
        style={{ background: "var(--red)" }}
      />

      <div
        className="w-full max-w-4xl flex rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--bg-border)",
        }}
      >
        {/* Left: Illustration panel */}
        <div
          className="hidden lg:flex w-96 flex-col items-center justify-center p-10"
          style={{
            background: "linear-gradient(135deg, rgba(22,119,255,0.08) 0%, var(--bg-elevated) 100%)",
            borderRight: "1px solid var(--bg-border)",
          }}
        >
          <img
            src="/signup.png"
            alt="Chatify sign up illustration"
            className="w-full max-w-xs h-auto object-contain mb-6"
          />
          <h3 className="text-base font-semibold mb-2 text-center" style={{ color: "var(--text-primary)" }}>
            Start your journey today
          </h3>
          <p className="text-xs text-center mb-5" style={{ color: "var(--text-secondary)" }}>
            Join thousands of users collaborating in real-time with Chatify.
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Free", "Easy Setup", "Private"].map((tag) => (
              <span key={tag} className="auth-badge">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right: Form */}
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
              Create an account
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Join Chatify and start messaging in seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="auth-label" htmlFor="fullName">Full name</label>
              <div className="relative">
                <UserIcon className="auth-input-icon" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="auth-input"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  autoComplete="new-password"
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderIcon size={15} className="animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/login" className="auth-link font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;
