import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  MessageSquareIcon,
  UsersIcon,
  ZapIcon,
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
  SearchIcon,
  CameraIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

// ─── Nav Rail ────────────────────────────────────────────────────────────────
function NavRail() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const location = useLocation();
  const [avatarLoading, setAvatarLoading] = useState(false);

  const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 7 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setAvatarLoading(true);
      await updateProfile({ profilePic: reader.result });
      setAvatarLoading(false);
    };
  };

  const navItems = [
    { to: "/", icon: MessageSquareIcon, label: "Messages" },
    { to: "/focus-rooms", icon: ZapIcon, label: "Focus Rooms" },
  ];

  return (
    <nav className="nav-rail">
      {/* Logo */}
      <div className="nav-rail-logo mb-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="10" fill="rgba(22,119,255,0.15)" />
          <path
            d="M9 21V16C9 12.134 12.134 9 16 9C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23H9"
            stroke="#1677FF"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2" fill="#35A7FF" />
        </svg>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-rail-item group ${location.pathname === to ? "active" : ""}`}
            aria-label={label}
          >
            <Icon size={18} />
            <span className="tooltip">{label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom: sound toggle, avatar */}
      <div className="flex flex-col items-center gap-2 mt-auto">
        {/* Sound toggle */}
        <button
          className="nav-rail-item group"
          aria-label={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch(() => {});
            toggleSound();
          }}
        >
          {isSoundEnabled ? <Volume2Icon size={16} /> : <VolumeOffIcon size={16} />}
          <span className="tooltip">{isSoundEnabled ? "Sound on" : "Sound off"}</span>
        </button>

        {/* Logout */}
        <button
          className="nav-rail-item group"
          aria-label="Sign out"
          onClick={logout}
        >
          <LogOutIcon size={16} />
          <span className="tooltip">Sign out</span>
        </button>

        {/* Avatar (click to change profile pic) */}
        <label
          className="relative mt-1 cursor-pointer group"
          aria-label="Change profile picture"
          title="Change profile picture"
        >
          <img
            src={authUser.profilePic || "/avatar.png"}
            alt={authUser.fullName}
            className="w-8 h-8 rounded-full object-cover border-2"
            style={{
              borderColor: avatarLoading ? "var(--blue)" : "var(--bg-border)",
            }}
          />
          <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <CameraIcon size={10} color="#fff" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </label>
      </div>
    </nav>
  );
}

// ─── Sidebar Header ───────────────────────────────────────────────────────────
function SidebarHeader({ search, onSearch }) {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div>
      {/* Title row */}
      <div className="sidebar-header">
        <h1 className="text-sm font-semibold flex-1" style={{ color: "var(--text-primary)" }}>
          {activeTab === "chats" ? "Messages" : "Contacts"}
        </h1>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="search-input-wrap">
          <SearchIcon className="search-input-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={activeTab === "chats" ? "Search conversations…" : "Search contacts…"}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "chats" ? "active" : ""}`}
          onClick={() => setActiveTab("chats")}
        >
          Chats
        </button>
        <button
          className={`tab-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}

// ─── ChatPage ────────────────────────────────────────────────────────────────
function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [search, setSearch] = useState("");

  return (
    <div className="app-shell">
      {/* 1. Navigation Rail */}
      <NavRail />

      {/* 2. Conversation Sidebar */}
      <aside className="sidebar">
        <SidebarHeader search={search} onSearch={setSearch} />

        <div className="flex-1 overflow-y-auto py-1">
          {activeTab === "chats" ? (
            <ChatsList search={search} />
          ) : (
            <ContactList search={search} />
          )}
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="main-panel">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </main>
    </div>
  );
}

export default ChatPage;
