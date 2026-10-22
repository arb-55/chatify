import { ArrowLeftIcon, PlayIcon, PauseIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { useFocusRoomStore } from "../../store/useFocusRoomStore";
import FocusTimer from "./FocusTimer";
import TaskChecklist from "./TaskChecklist";
import SessionComplete from "./SessionComplete";

function ActiveRoomView() {
  const { activeRoom, leaveRoom, startTimer, pauseTimer, resetTimer } = useFocusRoomStore();

  if (!activeRoom) return null;

  // Show completion screen
  if (activeRoom.status === "finished") {
    return <SessionComplete room={activeRoom} />;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="chat-header">
        <div className="flex items-center gap-3">
          <button
            className="btn-ghost p-2 rounded-lg"
            onClick={leaveRoom}
            aria-label="Leave room"
            title="Leave room"
          >
            <ArrowLeftIcon size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {activeRoom.name}
              </h2>
              {activeRoom.isSample && (
                <span className="dev-only-badge">dev sample</span>
              )}
            </div>
            <p className="text-xs truncate max-w-xs" style={{ color: "var(--text-secondary)" }}>
              {activeRoom.goal}
            </p>
          </div>
        </div>

        {/* Participants */}
        {activeRoom.participants.length > 0 && (
          <div className="flex -space-x-2">
            {activeRoom.participants.slice(0, 4).map((p) => (
              <img
                key={p.id}
                src={p.profilePic || "/avatar.png"}
                alt={p.fullName}
                title={p.fullName}
                className="w-7 h-7 rounded-full object-cover border-2"
                style={{ borderColor: "var(--bg-surface)" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body: two-column on large screens */}
      <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-0">
        {/* Left: Timer */}
        <div
          className="lg:w-1/2 flex flex-col items-center justify-center p-8"
          style={{ borderRight: "1px solid var(--bg-border)" }}
        >
          <FocusTimer
            elapsed={activeRoom.elapsed}
            duration={activeRoom.duration}
            status={activeRoom.status}
          />

          {/* Controls */}
          <div className="flex items-center gap-3 mt-8">
            {/* Reset */}
            <button
              className="composer-btn"
              onClick={resetTimer}
              aria-label="Reset timer"
              title="Reset"
              disabled={activeRoom.elapsed === 0 && activeRoom.status === "idle"}
            >
              <RotateCcwIcon size={15} />
            </button>

            {/* Play / Pause — primary control */}
            {activeRoom.status === "running" ? (
              <button
                className="flex items-center justify-center rounded-2xl transition-all duration-200"
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--bg-border)",
                  color: "var(--text-primary)",
                }}
                onClick={pauseTimer}
                aria-label="Pause timer"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,23,68,0.4)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              >
                <PauseIcon size={22} />
              </button>
            ) : (
              <button
                className="flex items-center justify-center rounded-2xl transition-all duration-200"
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--blue)",
                  color: "#fff",
                }}
                onClick={startTimer}
                aria-label="Start timer"
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--blue-bright)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--blue)"; }}
              >
                <PlayIcon size={22} />
              </button>
            )}

            {/* Leave */}
            <button
              className="composer-btn"
              onClick={leaveRoom}
              aria-label="Leave room"
              title="Leave room"
            >
              <XIcon size={15} style={{ color: "var(--red)" }} />
            </button>
          </div>

          {/* Status label */}
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            {activeRoom.status === "idle" && "Press play to start your session"}
            {activeRoom.status === "running" && "Focus session in progress"}
            {activeRoom.status === "paused" && "Session paused — press play to resume"}
          </p>

          {/* Dev-only notice */}
          {activeRoom.isSample && (
            <div
              className="mt-6 px-3 py-2 rounded-lg text-xs text-center"
              style={{
                background: "rgba(255,23,68,0.06)",
                border: "1px solid rgba(255,23,68,0.15)",
                color: "var(--text-muted)",
                maxWidth: 280,
              }}
            >
              ⚠️ This is <strong style={{ color: "var(--red)" }}>sample data</strong> — participants and progress are not synced with any backend.
            </div>
          )}
        </div>

        {/* Right: Tasks */}
        <div className="lg:w-1/2 p-6 overflow-y-auto">
          <TaskChecklist tasks={activeRoom.tasks} />
        </div>
      </div>
    </div>
  );
}

export default ActiveRoomView;
