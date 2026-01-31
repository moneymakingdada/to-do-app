
A full-stack Task Manager application with:

- ✅ Django REST Framework backend  
- 🔐 JWT authentication  
- ⚛️ React frontend  
- 🎨 Bootstrap UI  
- 📂 Categories, search, filters, and due dates  

---

# 🚀 Features

## Authentication
- User registration
- JWT login/logout
- Protected API routes
- Auto-login after registration

## Tasks
- Create, update, delete tasks
- Mark tasks complete/pending
- Due dates & overdue detection
- Search tasks
- Filter by status:
  - All
  - Completed
  - Pending
  - Overdue
- Assign categories

## Categories
- Create categories
- Assign categories to tasks
- Filter tasks by category

---

# 🛠️ Tech Stack

## Backend
- Django
- Django REST Framework
- SimpleJWT
- SQLite (default)

## Frontend
- React (Vite)
- Axios
- Bootstrap 5
- React Router

---

# 📦 Project Structure
backend/
├── to_do/
├── manage.py
└── requirements.txt

frontend/
├── src/
├── package.json
└── vite.config.js


---

# ⚙️ Backend Setup (Django)

## 1️⃣ Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

💻 Frontend Setup (React)
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Start dev server
npm run dev


Frontend runs at:

http://localhost:5173/
