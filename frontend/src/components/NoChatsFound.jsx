import { MessageSquareIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="empty-state py-12">
      <div className="empty-state-icon">
        <MessageSquareIcon size={24} />
      </div>
      <h4 className="empty-state-title">No conversations yet</h4>
      <p className="empty-state-desc mb-4">
        Start a new chat by finding someone from your contacts.
      </p>
      <button className="btn-primary text-xs" onClick={() => setActiveTab("contacts")}>
        Browse Contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
