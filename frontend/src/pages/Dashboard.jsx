import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import CategoryManager from "../components/CategoryManager";  

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState([]);
  const [name, setName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("tasks/", {
        params: { status, search, category },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      // If token expired, redirect to login
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

const fetchUsername = async () => {
    try {
      const res = await api.get("login/", {
       params: { username },
      });
      setUsername(res.data);
    } catch (err) {
      console.error(err);
      // If token expired, redirect to login
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };



  const fetchCategoryManager = async () => {
    try{
      const res = await api.get("categories/", {
        params: { name, categories}
      });
      setName(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchUsername;
    fetchCategories();
    fetchTasks();
    fetchCategoryManager;
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [status, search, category]);

   useEffect(() => {
    fetchCategoryManager();
  }, [name, categories]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">My Tasks</h1>
        <p><label>{fetchUsername}</label></p>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search */}
      <input
        className="form-control mb-3"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Status Filters */}
      <div className="btn-group mb-3">
        {["all", "pending", "completed", "overdue"].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${
              status === s ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setStatus(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <select
        className="form-select mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <CategoryManager categories={categories} onAdd={fetchCategoryManager}/>
      <TaskForm categories={categories} onAdd={fetchTasks} />
      <TaskList tasks={tasks} categories={categories} onChange={fetchTasks} />
    </div>
  );
}
