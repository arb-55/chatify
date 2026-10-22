import { XIcon, PhoneIcon, VideoIcon, MoreHorizontalIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="chat-header">
      {/* Left: avatar + name */}
      <div className="flex items-center gap-3">
        <div className="avatar-wrap">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="avatar-img"
            style={{ width: 36, height: 36 }}
          />
          <span className={`presence-dot ${isOnline ? "online" : "offline"}`} />
        </div>

        <div>
          <h2
            className="text-sm font-semibold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {selectedUser.fullName}
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: isOnline ? "#22c55e" : "var(--text-muted)" }}
          >
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button
          className="btn-ghost p-2 rounded-lg"
          aria-label="Close conversation"
          title="Close (Esc)"
          onClick={() => setSelectedUser(null)}
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;
