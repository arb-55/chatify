import { Link, useLocation } from "react-router";
import {
  MessageSquareIcon,
  ZapIcon,
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
  PlusIcon,
  CameraIcon,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useFocusRoomStore } from "../store/useFocusRoomStore";
import RoomCard from "../components/focusrooms/RoomCard";
import CreateRoomModal from "../components/focusrooms/CreateRoomModal";
import ActiveRoomView from "../components/focusrooms/ActiveRoomView";

// ─── Shared Nav Rail (same as ChatPage) ──────────────────────────────────────
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

      <div className="flex flex-col items-center gap-2 mt-auto">
        <button
          className="nav-rail-item group"
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch(() => {});
            toggleSound();
          }}
          aria-label={isSoundEnabled ? "Mute" : "Enable sounds"}
        >
          {isSoundEnabled ? <Volume2Icon size={16} /> : <VolumeOffIcon size={16} />}
          <span className="tooltip">{isSoundEnabled ? "Sound on" : "Sound off"}</span>
        </button>

        <button className="nav-rail-item group" onClick={logout} aria-label="Sign out">
          <LogOutIcon size={16} />
          <span className="tooltip">Sign out</span>
        </button>

        <label className="relative mt-1 cursor-pointer group" title="Change profile picture">
          <img
            src={authUser.profilePic || "/avatar.png"}
            alt={authUser.fullName}
            className="w-8 h-8 rounded-full object-cover border-2"
            style={{ borderColor: avatarLoading ? "var(--blue)" : "var(--bg-border)" }}
          />
          <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <CameraIcon size={10} color="#fff" />
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </label>
      </div>
    </nav>
  );
}

// ─── Focus Rooms Page ─────────────────────────────────────────────────────────
function FocusRoomsPage() {
  const { rooms, activeRoom, openCreateModal, showCreateModal, joinRoom } = useFocusRoomStore();

  return (
    <div className="app-shell">
      <NavRail />

      {/* If inside a room, show the active room view */}
      {activeRoom ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ActiveRoomView />
        </div>
      ) : (
        /* Room directory */
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Page header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ZapIcon size={20} style={{ color: "var(--blue)" }} />
                  <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    Focus Rooms
                  </h1>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Dedicated workspaces for focused, collaborative sessions.
                </p>

                {/* Dev notice */}
                <div
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    background: "rgba(255,23,68,0.06)",
                    border: "1px solid rgba(255,23,68,0.15)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span className="dev-only-badge">preview</span>
                  <span>
                    Rooms marked &quot;sample&quot; are dev-only. Backend integration coming soon.
                  </span>
                </div>
              </div>

              {/* Create button */}
              <button
                className="btn-primary flex items-center gap-2 flex-shrink-0"
                onClick={openCreateModal}
              >
                <PlusIcon size={15} />
                New Room
              </button>
            </div>

            {/* Rooms grid */}
            {rooms.length === 0 ? (
              <div className="empty-state py-16">
                <div className="empty-state-icon">
                  <ZapIcon size={24} />
                </div>
                <h3 className="empty-state-title">No Focus Rooms yet</h3>
                <p className="empty-state-desc mb-4">
                  Create a room to start a focused session with your team.
                </p>
                <button className="btn-primary" onClick={openCreateModal}>
                  <PlusIcon size={14} />
                  Create your first room
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} onJoin={joinRoom} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreateModal && <CreateRoomModal />}
    </div>
  );
}

export default FocusRoomsPage;
