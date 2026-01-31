import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CategoryManager({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await api.post("categories/", { name });
      setName("");
      await fetchCategories();
      if (onChange) onChange();
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`categories/${id}/`);
      await fetchCategories();
      if (onChange) onChange();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Categories</h3>

      <form onSubmit={addCategory} className="flex gap-2 mb-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </form>

      <ul>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center p-1 mb-1 bg-gray-100 rounded"
          >
            {cat.name}
            <button
              onClick={() => deleteCategory(cat.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
