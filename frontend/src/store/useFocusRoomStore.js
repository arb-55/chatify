import { create } from "zustand";

/**
 * Focus Rooms Store
 *
 * ⚠️ DEV-ONLY SAMPLE DATA — no backend integration exists for Focus Rooms yet.
 * All data in this store is local/ephemeral and is NOT persisted.
 * When the backend is implemented, replace sampleRooms and the createRoom / joinRoom
 * methods with real API calls and Socket.IO events.
 */

const DEV_SAMPLE_ROOMS = [
  {
    id: "sample-1",
    name: "Product Sprint",
    goal: "Finish the dashboard wireframes and review copy",
    duration: 45,
    elapsed: 720, // seconds elapsed (12 min)
    status: "running", // 'idle' | 'running' | 'paused' | 'finished'
    participants: [
      { id: "p1", fullName: "Alex Rivera", profilePic: null, isOnline: true },
      { id: "p2", fullName: "Priya Singh", profilePic: null, isOnline: true },
    ],
    tasks: [
      { id: "t1", label: "Wireframe home screen", done: true },
      { id: "t2", label: "Write hero copy", done: true },
      { id: "t3", label: "Review competitor layouts", done: false },
      { id: "t4", label: "Prepare stakeholder notes", done: false },
    ],
    createdAt: new Date(Date.now() - 720_000).toISOString(),
    isSample: true,
  },
  {
    id: "sample-2",
    name: "Deep Work: Backend",
    goal: "Write unit tests for auth and message routes",
    duration: 25,
    elapsed: 0,
    status: "idle",
    participants: [{ id: "p3", fullName: "Jordan Kim", profilePic: null, isOnline: false }],
    tasks: [
      { id: "t5", label: "Auth route tests", done: false },
      { id: "t6", label: "Message route tests", done: false },
    ],
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
    isSample: true,
  },
];

export const useFocusRoomStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  rooms: DEV_SAMPLE_ROOMS,
  activeRoom: null,       // the room the user is currently inside
  isCreating: false,
  showCreateModal: false,
  timerInterval: null,

  // ── Modal ──────────────────────────────────────────────────────────────────
  openCreateModal: () => set({ showCreateModal: true }),
  closeCreateModal: () => set({ showCreateModal: false }),

  // ── Room creation (local-only, dev sample) ─────────────────────────────────
  createRoom: (data) => {
    const newRoom = {
      id: `local-${Date.now()}`,
      name: data.name,
      goal: data.goal,
      duration: data.duration,
      elapsed: 0,
      status: "idle",
      participants: [],   // creator will join immediately
      tasks: data.tasks || [],
      createdAt: new Date().toISOString(),
      isSample: false,    // user-created (still local-only in this version)
    };
    set((s) => ({ rooms: [newRoom, ...s.rooms], showCreateModal: false }));
    get().joinRoom(newRoom.id);
  },

  // ── Join / leave ───────────────────────────────────────────────────────────
  joinRoom: (roomId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room) return;
    set({ activeRoom: { ...room } });
  },

  leaveRoom: () => {
    get()._clearTimer();
    set({ activeRoom: null });
  },

  // ── Timer controls ─────────────────────────────────────────────────────────
  startTimer: () => {
    const { activeRoom } = get();
    if (!activeRoom || activeRoom.status === "running") return;

    const interval = setInterval(() => {
      const { activeRoom } = get();
      if (!activeRoom) return;

      const durationSec = activeRoom.duration * 60;
      const newElapsed = activeRoom.elapsed + 1;

      if (newElapsed >= durationSec) {
        get()._clearTimer();
        set((s) => ({
          activeRoom: s.activeRoom ? { ...s.activeRoom, elapsed: durationSec, status: "finished" } : null,
        }));
        return;
      }

      set((s) => ({
        activeRoom: s.activeRoom ? { ...s.activeRoom, elapsed: newElapsed } : null,
      }));
    }, 1000);

    set((s) => ({
      timerInterval: interval,
      activeRoom: s.activeRoom ? { ...s.activeRoom, status: "running" } : null,
    }));
  },

  pauseTimer: () => {
    get()._clearTimer();
    set((s) => ({
      activeRoom: s.activeRoom ? { ...s.activeRoom, status: "paused" } : null,
    }));
  },

  resetTimer: () => {
    get()._clearTimer();
    set((s) => ({
      activeRoom: s.activeRoom
        ? { ...s.activeRoom, elapsed: 0, status: "idle" }
        : null,
    }));
  },

  _clearTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) {
      clearInterval(timerInterval);
      set({ timerInterval: null });
    }
  },

  // ── Task toggle ────────────────────────────────────────────────────────────
  toggleTask: (taskId) => {
    set((s) => {
      if (!s.activeRoom) return {};
      const updatedTasks = s.activeRoom.tasks.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      );
      return { activeRoom: { ...s.activeRoom, tasks: updatedTasks } };
    });
  },

  addTask: (label) => {
    if (!label.trim()) return;
    const newTask = { id: `task-${Date.now()}`, label: label.trim(), done: false };
    set((s) => ({
      activeRoom: s.activeRoom
        ? { ...s.activeRoom, tasks: [...s.activeRoom.tasks, newTask] }
        : null,
    }));
  },
}));
