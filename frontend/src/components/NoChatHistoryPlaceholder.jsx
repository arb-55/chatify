import { MessageSquarePlusIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();

  const quickMessages = ["👋 Hey there!", "How are you doing?", "Let's catch up soon!"];

  const handleQuickSend = (text) => {
    sendMessage({ text, image: null });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 select-none">
      <div
        className="flex items-center justify-center rounded-3xl mb-5"
        style={{
          width: 64,
          height: 64,
          background: "var(--bg-elevated)",
          border: "1px solid var(--bg-border)",
        }}
      >
        <MessageSquarePlusIcon size={26} style={{ color: "var(--blue)" }} />
      </div>

      <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
        Start chatting with {name}
      </h3>
      <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-secondary)" }}>
        This is the beginning of your conversation. Send a message to kick things off!
      </p>

      {/* Quick messages */}
      <div className="flex flex-wrap gap-2 justify-center">
        {quickMessages.map((msg) => (
          <button
            key={msg}
            onClick={() => handleQuickSend(msg)}
            className="px-3 py-1.5 text-xs rounded-full transition-all duration-150"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(22,119,255,0.4)";
              e.currentTarget.style.color = "var(--blue-bright)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--bg-border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {msg}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
