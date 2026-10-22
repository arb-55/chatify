import { MessageSquareIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 select-none">
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-3xl mb-6"
        style={{
          width: 72,
          height: 72,
          background: "var(--bg-elevated)",
          border: "1px solid var(--bg-border)",
        }}
      >
        <MessageSquareIcon size={28} style={{ color: "var(--blue)" }} />
      </div>

      <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        Your messages
      </h2>
      <p className="text-sm max-w-xs mb-6" style={{ color: "var(--text-secondary)" }}>
        Select a conversation from the sidebar to start chatting, or find a new contact.
      </p>

      {/* Subtle feature hint */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs"
        style={{
          background: "rgba(22,119,255,0.06)",
          border: "1px solid rgba(22,119,255,0.15)",
          color: "var(--text-secondary)",
        }}
      >
        <ZapIcon size={12} style={{ color: "var(--blue)" }} />
        <span>
          Try{" "}
          <Link to="/focus-rooms" className="font-medium" style={{ color: "var(--blue-bright)" }}>
            Focus Rooms
          </Link>{" "}
          for collaborative sessions
        </span>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
