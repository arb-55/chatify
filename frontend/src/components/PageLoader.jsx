function PageLoader() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <div className="relative">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="rgba(22,119,255,0.12)" />
            <path
              d="M12 26V20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28H12"
              stroke="#1677FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="2.5" fill="#35A7FF" />
          </svg>
          {/* Spinning ring */}
          <svg
            className="absolute inset-0 animate-spin"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#1677FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="30 80"
              opacity="0.6"
            />
          </svg>
        </div>
        <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Chatify
        </p>
      </div>
    </div>
  );
}
export default PageLoader;
