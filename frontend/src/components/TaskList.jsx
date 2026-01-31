import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, categories, onChange }) {
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} categories={categories} onChange={onChange} />
          ))
        ) : (
          <li className="list-group-item text-center">No tasks found</li>
        )}
      </ul>
    </div>
  );
}
