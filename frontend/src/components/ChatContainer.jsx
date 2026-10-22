import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

// Format message timestamp
function formatMsgTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format date for separator
function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString(undefined, { weekday: "long" });
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function isSameDay(a, b) {
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate();
}

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className="messages-area">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : (
          <div className="messages-inner">
            {messages.map((msg, index) => {
              const isOutgoing = msg.senderId === authUser._id;
              const prevMsg = messages[index - 1];
              const showDateSep = !prevMsg || !isSameDay(prevMsg.createdAt, msg.createdAt);

              return (
                <div key={msg._id}>
                  {/* Date separator */}
                  {showDateSep && (
                    <div className="date-separator">
                      <div className="date-separator-line" />
                      <span className="date-separator-text">
                        {formatDateLabel(msg.createdAt)}
                      </span>
                      <div className="date-separator-line" />
                    </div>
                  )}

                  {/* Message row */}
                  <div className={`msg-row ${isOutgoing ? "outgoing" : ""} mb-1`}>
                    {/* Incoming avatar */}
                    {!isOutgoing && (
                      <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt={selectedUser.fullName}
                        className="avatar-img flex-shrink-0 self-end"
                        style={{ width: 24, height: 24 }}
                      />
                    )}

                    {/* Bubble */}
                    <div className="flex flex-col">
                      <div className={`msg-bubble ${isOutgoing ? "outgoing" : "incoming"}`}>
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="Shared image"
                            className="rounded-xl mb-1.5 max-h-48 max-w-xs object-cover cursor-pointer"
                            onClick={() => window.open(msg.image, "_blank")}
                          />
                        )}
                        {msg.text && <span>{msg.text}</span>}
                        {/* Optimistic indicator */}
                        {msg.isOptimistic && (
                          <span
                            className="ml-2 text-[10px] opacity-60"
                            style={{ color: isOutgoing ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}
                          >
                            ···
                          </span>
                        )}
                      </div>
                      {/* Timestamp */}
                      <span className={`msg-time ${isOutgoing ? "outgoing" : ""}`}>
                        {formatMsgTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
