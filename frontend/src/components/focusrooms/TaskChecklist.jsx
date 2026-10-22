import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useFocusRoomStore } from "../../store/useFocusRoomStore";

function TaskChecklist({ tasks }) {
  const { toggleTask, addTask } = useFocusRoomStore();
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    addTask(newTask);
    setNewTask("");
  };

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          TASKS
        </span>
        {tasks.length > 0 && (
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            {completed}/{tasks.length} done
          </span>
        )}
      </div>

      {/* Task progress bar */}
      {tasks.length > 0 && (
        <div className="mb-3 h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-border)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(completed / tasks.length) * 100}%`,
              background: completed === tasks.length ? "#22c55e" : "var(--blue)",
            }}
          />
        </div>
      )}

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="text-xs py-2 text-center" style={{ color: "var(--text-muted)" }}>
          No tasks yet. Add one below.
        </p>
      ) : (
        <div className="space-y-0.5 mb-3">
          {tasks.map((task) => (
            <label
              key={task.id}
              className="task-item cursor-pointer"
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`task-label ${task.done ? "completed" : ""}`}>{task.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Add task */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="composer-input flex-1 text-xs py-1.5 px-3"
          placeholder="Add task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
          maxLength={100}
        />
        <button
          type="button"
          className="composer-btn flex-shrink-0"
          onClick={handleAdd}
          aria-label="Add task"
          style={{ width: 30, height: 30 }}
        >
          <PlusIcon size={13} />
        </button>
      </div>
    </div>
  );
}

export default TaskChecklist;
