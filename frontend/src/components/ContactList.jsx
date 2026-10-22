import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { UsersIcon } from "lucide-react";

function ContactList({ search = "" }) {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const filtered = search.trim()
    ? allContacts.filter((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    : allContacts;

  if (filtered.length === 0) {
    return (
      <div className="empty-state py-12">
        <div className="empty-state-icon">
          <UsersIcon size={24} />
        </div>
        <h4 className="empty-state-title">No contacts found</h4>
        <p className="empty-state-desc">
          {search ? `No contacts matching "${search}".` : "No other users are registered yet."}
        </p>
      </div>
    );
  }

  // Group alphabetically
  const grouped = filtered.reduce((acc, contact) => {
    const letter = contact.fullName[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {});

  return (
    <div className="py-1">
      {Object.keys(grouped)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <p className="section-label">{letter}</p>
            <div className="space-y-0.5">
              {grouped[letter].map((contact) => {
                const isOnline = onlineUsers.includes(contact._id);
                const isSelected = selectedUser?._id === contact._id;

                return (
                  <div
                    key={contact._id}
                    className={`conv-item ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedUser(contact)}
                  >
                    {/* Avatar */}
                    <div className="avatar-wrap">
                      <img
                        src={contact.profilePic || "/avatar.png"}
                        alt={contact.fullName}
                        className="avatar-img"
                        style={{ width: 40, height: 40 }}
                      />
                      <span className={`presence-dot ${isOnline ? "online" : "offline"}`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="conv-name">{contact.fullName}</span>
                        {isOnline && (
                          <span
                            className="text-[10px] flex-shrink-0 font-medium"
                            style={{ color: "#22c55e" }}
                          >
                            Online
                          </span>
                        )}
                      </div>
                      <p className="conv-preview mt-0.5">
                        {isOnline ? "Available to chat" : "Offline"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}
export default ContactList;
