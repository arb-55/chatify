import { CheckCircleIcon, ArrowLeftIcon } from "lucide-react";
import { useFocusRoomStore } from "../../store/useFocusRoomStore";

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m} min`;
  return `${m}m ${s}s`;
}

function SessionComplete({ room }) {
  const { leaveRoom } = useFocusRoomStore();
  const completed = room.tasks.filter((t) => t.done).length;
  const remaining = room.tasks.length - completed;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-full mb-6"
        style={{
          width: 80,
          height: 80,
          background: "rgba(34,197,94,0.1)",
          border: "2px solid rgba(34,197,94,0.3)",
        }}
      >
        <CheckCircleIcon size={36} color="#22c55e" />
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        Session Complete!
      </h2>
      <p className="text-sm mb-8 max-w-xs" style={{ color: "var(--text-secondary)" }}>
        Great work on &quot;{room.name}&quot;. Here&apos;s your session summary.
      </p>

      {/* Stats */}
      <div
        className="w-full max-w-sm rounded-2xl p-5 mb-6 space-y-3 text-left"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--bg-border)" }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Session goal</span>
          <span className="text-sm font-medium max-w-[55%] text-right truncate" style={{ color: "var(--text-primary)" }}>
            {room.goal}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Duration</span>
          <span className="text-sm font-medium" style={{ color: "var(--blue-bright)" }}>
            {formatDuration(room.elapsed)}
          </span>
        </div>
        {room.tasks.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Tasks completed</span>
              <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
                {completed}/{room.tasks.length}
              </span>
            </div>
            {remaining > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Tasks remaining</span>
                <span className="text-sm font-medium" style={{ color: "var(--red)" }}>
                  {remaining}
                </span>
              </div>
            )}
          </>
        )}
        {room.participants.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Participants</span>
            <div className="flex -space-x-1.5">
              {room.participants.slice(0, 4).map((p) => (
                <img
                  key={p.id}
                  src={p.profilePic || "/avatar.png"}
                  alt={p.fullName}
                  title={p.fullName}
                  className="w-6 h-6 rounded-full object-cover border"
                  style={{ borderColor: "var(--bg-elevated)" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className="btn-primary px-6 py-2.5 flex items-center gap-2"
        onClick={leaveRoom}
      >
        <ArrowLeftIcon size={14} />
        Back to rooms
      </button>
    </div>
  );
}

export default SessionComplete;
