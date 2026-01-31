import { useState } from "react";
import api from "../api/axios";

export default function TaskItem({ task, categories = [], onChange }) {
  const [category, setCategory] = useState(task.category || "");
  const [loading, setLoading] = useState(false); // For buttons
  const [categoryLoading, setCategoryLoading] = useState(false); // For category select

  // Toggle complete
  const toggleComplete = async () => {
    setLoading(true);
    try {
      await api.put(`tasks/${task.id}/`, { ...task, completed: !task.completed });
      onChange();
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (newCategory) => {
    setCategoryLoading(true);
    setCategory(newCategory);
    try {
      await api.put(`tasks/${task.id}/`, { ...task, category: newCategory || null });
      onChange();
    } finally {
      setCategoryLoading(false);
    }
  };

  // Delete task
  const deleteTask = async () => {
    setLoading(true);
    try {
      await api.delete(`tasks/${task.id}/`);
      onChange();
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div style={{ flex: 1 }}>
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.title}
        </span>
        {task.due_date && <small className="ms-2">(Due: {task.due_date})</small>}

        {/* Category Selector */}
        <select
          className="form-select form-select-sm mt-1"
          value={category || ""}
          onChange={(e) => updateCategory(e.target.value)}
          disabled={categoryLoading || loading} // Disable while loading
        >
          {categoryLoading ? (
            <option>Updating...</option>
          ) : (
            <>
              <option value="">No Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="btn-group btn-group-sm ms-2">
        <button
          className="btn btn-success"
          onClick={toggleComplete}
          disabled={loading || categoryLoading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "✓"
          )}
        </button>

        <button
          className="btn btn-danger"
          onClick={deleteTask}
          disabled={loading || categoryLoading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "🗑"
          )}
        </button>
      </div>
    </li>
  );
}
