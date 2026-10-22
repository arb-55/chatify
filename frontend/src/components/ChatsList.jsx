import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

// Format a timestamp for conversation list display
function formatTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return date.toLocaleDateString(undefined, { weekday: "short" });
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function ChatsList({ search = "" }) {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const filtered = search.trim()
    ? chats.filter((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    : chats;

  if (filtered.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-0.5 py-1">
      {filtered.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);
        const isSelected = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            className={`conv-item ${isSelected ? "selected" : ""}`}
            onClick={() => setSelectedUser(chat)}
          >
            {/* Avatar */}
            <div className="avatar-wrap">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="avatar-img"
                style={{ width: 40, height: 40 }}
              />
              <span className={`presence-dot ${isOnline ? "online" : "offline"}`} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="conv-name">{chat.fullName}</span>
                {isOnline && (
                  <span
                    className="text-[10px] flex-shrink-0 font-medium"
                    style={{ color: "#22c55e" }}
                  >
                    Online
                  </span>
                )}
              </div>
              <p className="conv-preview mt-0.5">Tap to open conversation</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatsList;
