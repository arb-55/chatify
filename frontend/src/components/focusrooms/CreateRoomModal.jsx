import { useState } from "react";
import { XIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useFocusRoomStore } from "../../store/useFocusRoomStore";

const DURATION_PRESETS = [25, 45, 60];

function CreateRoomModal() {
  const { closeCreateModal, createRoom } = useFocusRoomStore();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(25);
  const [customDuration, setCustomDuration] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: `new-${Date.now()}`, label: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const handleRemoveTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = "Room name is required";
    if (!goal.trim()) errs.goal = "A session goal is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    createRoom({
      name: name.trim(),
      goal: goal.trim(),
      duration: customDuration ? parseInt(customDuration) : duration,
      tasks,
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeCreateModal(); }}>
      <div className="modal-box w-full max-w-md" role="dialog" aria-modal="true" aria-label="Create Focus Room">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="modal-title mb-0" style={{ color: "var(--text-primary)" }}>
            Create Focus Room
          </h2>
          <button className="btn-ghost p-1.5 rounded-lg" onClick={closeCreateModal} aria-label="Close">
            <XIcon size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Name */}
          <div>
            <label className="auth-label" htmlFor="room-name">Room name</label>
            <input
              id="room-name"
              type="text"
              className="auth-input"
              placeholder="e.g. Design Sprint, Deep Work"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              maxLength={60}
            />
            {errors.name && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.name}</p>}
          </div>

          {/* Goal */}
          <div>
            <label className="auth-label" htmlFor="room-goal">Session goal</label>
            <textarea
              id="room-goal"
              className="auth-input resize-none"
              placeholder="What do you want to accomplish this session?"
              rows={2}
              value={goal}
              onChange={(e) => { setGoal(e.target.value); setErrors((p) => ({ ...p, goal: undefined })); }}
              maxLength={200}
              style={{ fontFamily: "inherit" }}
            />
            {errors.goal && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.goal}</p>}
          </div>

          {/* Duration presets */}
          <div>
            <label className="auth-label">Focus duration</label>
            <div className="flex gap-2">
              {DURATION_PRESETS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className="flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-150"
                  style={
                    duration === d && !customDuration
                      ? { background: "var(--blue)", color: "#fff", border: "1px solid var(--blue)" }
                      : {
                          background: "var(--bg-elevated)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--bg-border)",
                        }
                  }
                  onClick={() => { setDuration(d); setCustomDuration(""); }}
                >
                  {d}m
                </button>
              ))}
              <input
                type="number"
                min="5"
                max="180"
                placeholder="Custom"
                className="auth-input text-xs flex-1"
                style={{ padding: "0 8px" }}
                value={customDuration}
                onChange={(e) => { setCustomDuration(e.target.value); setDuration(0); }}
              />
            </div>
          </div>

          {/* Task checklist */}
          <div>
            <label className="auth-label">Tasks (optional)</label>
            {tasks.length > 0 && (
              <div
                className="mb-2 rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--bg-border)" }}
              >
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-2 px-3 py-2"
                    style={{ borderBottom: "1px solid var(--bg-border-subtle)" }}
                  >
                    <span className="flex-1 text-xs" style={{ color: "var(--text-primary)" }}>
                      {t.label}
                    </span>
                    <button
                      type="button"
                      className="btn-ghost p-1 rounded"
                      onClick={() => handleRemoveTask(t.id)}
                      aria-label={`Remove task: ${t.label}`}
                    >
                      <TrashIcon size={12} style={{ color: "var(--red)" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                className="auth-input flex-1 text-xs"
                placeholder="Add a task…"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTask(); } }}
                maxLength={100}
              />
              <button
                type="button"
                className="composer-btn flex-shrink-0"
                onClick={handleAddTask}
                aria-label="Add task"
              >
                <PlusIcon size={15} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button type="button" className="btn-ghost flex-1 py-2.5" onClick={closeCreateModal}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 py-2.5">
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;
