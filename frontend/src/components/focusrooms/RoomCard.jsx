import { CheckIcon, UsersIcon, ZapIcon, PlayIcon } from "lucide-react";

// Format seconds to MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function RoomCard({ room, onJoin }) {
  const totalSec = room.duration * 60;
  const progress = Math.min((room.elapsed / totalSec) * 100, 100);
  const tasksCompleted = room.tasks.filter((t) => t.done).length;

  const statusColors = {
    idle: "var(--text-muted)",
    running: "#22c55e",
    paused: "#f59e0b",
    finished: "var(--blue-bright)",
  };

  const statusLabels = {
    idle: "Ready",
    running: "In Progress",
    paused: "Paused",
    finished: "Completed",
  };

  return (
    <div
      className={`room-card ${room.status === "running" ? "active-room" : ""}`}
      style={{ animationFillMode: "both" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-sm font-semibold truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {room.name}
            </h3>
            {room.isSample && (
              <span className="dev-only-badge flex-shrink-0">sample</span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
            {room.goal}
          </p>
        </div>

        {/* Status badge */}
        <span
          className="flex items-center gap-1 text-[10px] font-medium flex-shrink-0 px-2 py-0.5 rounded-full"
          style={{
            color: statusColors[room.status],
            background: `${statusColors[room.status]}18`,
            border: `1px solid ${statusColors[room.status]}30`,
          }}
        >
          {room.status === "running" && (
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
          )}
          {statusLabels[room.status]}
        </span>
      </div>

      {/* Progress bar */}
      {room.status !== "idle" && (
        <div className="mb-3">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "var(--bg-border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${progress}%`,
                background: room.status === "finished" ? "var(--blue)" : "var(--blue)",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {formatTime(room.elapsed)}
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {room.duration}m
            </span>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4">
        {/* Participants */}
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {room.participants.slice(0, 3).map((p) => (
              <img
                key={p.id}
                src={p.profilePic || "/avatar.png"}
                alt={p.fullName}
                className="w-5 h-5 rounded-full object-cover border"
                style={{ borderColor: "var(--bg-surface)" }}
              />
            ))}
          </div>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {room.participants.length === 0
              ? "No participants"
              : `${room.participants.length} member${room.participants.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Tasks */}
        {room.tasks.length > 0 && (
          <div
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <CheckIcon size={11} />
            {tasksCompleted}/{room.tasks.length} tasks
          </div>
        )}

        {/* Duration */}
        <div
          className="flex items-center gap-1 text-[11px] ml-auto"
          style={{ color: "var(--text-muted)" }}
        >
          <ZapIcon size={11} style={{ color: "var(--blue)" }} />
          {room.duration}m session
        </div>
      </div>

      {/* Join button */}
      <button
        className="w-full py-2 text-xs font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
        style={{
          background: "rgba(22,119,255,0.1)",
          border: "1px solid rgba(22,119,255,0.25)",
          color: "var(--blue-bright)",
        }}
        onClick={() => onJoin(room.id)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--blue)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "var(--blue)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(22,119,255,0.1)";
          e.currentTarget.style.color = "var(--blue-bright)";
          e.currentTarget.style.borderColor = "rgba(22,119,255,0.25)";
        }}
      >
        <PlayIcon size={11} />
        {room.status === "idle" ? "Start Session" : "Join Room"}
      </button>
    </div>
  );
}

export default RoomCard;
