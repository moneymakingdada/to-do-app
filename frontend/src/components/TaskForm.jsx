import { useState } from "react";
import api from "../api/axios";

export default function TaskForm({ categories = [], onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("tasks/", {
        title,
        due_date: dueDate || null,
        category: category || null,
      });
      setTitle("");
      setDueDate("");
      setCategory("");
      onAdd();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card p-3 mb-4" onSubmit={submitTask}>
      <div className="input-group mb-2">
        <input
          className="form-control"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">No Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="btn btn-success" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Adding...
            </>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </form>
  );
}
