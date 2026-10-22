/**
 * FocusTimer — displays MM:SS countdown/countup for a Focus Room session.
 * Receives elapsed (seconds) and duration (minutes) to compute remaining time.
 */
function FocusTimer({ elapsed, duration, status }) {
  const totalSec = duration * 60;
  const remaining = Math.max(totalSec - elapsed, 0);
  const progress = Math.min((elapsed / totalSec) * 100, 100);

  const m = Math.floor(remaining / 60).toString().padStart(2, "0");
  const s = (remaining % 60).toString().padStart(2, "0");

  const timerColor =
    status === "running"
      ? "var(--blue-bright)"
      : status === "paused"
      ? "var(--text-secondary)"
      : status === "finished"
      ? "#22c55e"
      : "var(--text-primary)";

  // SVG ring progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Ring + timer */}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
        {/* Background ring */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute inset-0 -rotate-90"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--bg-border)"
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={status === "finished" ? "#22c55e" : "var(--blue)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>

        {/* Time display */}
        <div className="flex flex-col items-center z-10">
          <span
            className="focus-timer-display"
            style={{ color: timerColor, fontSize: "3.5rem" }}
          >
            {m}:{s}
          </span>
          <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {status === "idle" && "Ready to start"}
            {status === "running" && "remaining"}
            {status === "paused" && "paused"}
            {status === "finished" && "Complete!"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
