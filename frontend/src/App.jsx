import { useState, useEffect } from "react";
import api from "./api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Session expired, please login again");
      logout();
    }
  };

  const register = async () => {
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful, now login");
    } catch {
      alert("Register failed");
    }
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setEmail("");
      setPassword("");
    } catch {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const res = await api.post("/tasks", { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch {
      alert("Add failed");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks(tasks.map(t => (t.id === id ? res.data : t)));
    } catch {
      alert("Toggle failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`, { ...tasks.find(t => t.id === id), title: editTitle });
      setTasks(tasks.map(t => (t.id === id ? res.data : t)));
      setEditingTask(null);
      setEditTitle("");
    } catch {
      alert("Update failed");
    }
  };

  // 🎨 Shared styles
  const container = { maxWidth: 500, margin: "40px auto", fontFamily: "Arial, sans-serif" };
  const card = { background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" };
  const input = { padding: "10px", margin: "8px 0", borderRadius: 6, border: "1px solid #ddd", width: "100%" };
  const button = { padding: "8px 12px", margin: "4px", border: "none", borderRadius: 6, cursor: "pointer" };
  const primaryBtn = { ...button, background: "#4CAF50", color: "#fff" };
  const secondaryBtn = { ...button, background: "#f44336", color: "#fff" };
  const editBtn = { ...button, background: "#2196F3", color: "#fff" };

  if (!token) {
    return (
      <div style={container}>
        <div style={card}>
          <h2 style={{ textAlign: "center", color: "#333" }}>Task Manager</h2>
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} style={input} />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} style={input} />
          <div style={{ textAlign: "center" }}>
            <button onClick={login} style={primaryBtn}>Login</button>
            <button onClick={register} style={secondaryBtn}>Register</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Your Tasks</h2>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button onClick={logout} style={secondaryBtn}>Logout</button>
        </div>

        <div style={{ display: "flex", marginBottom: 20 }}>
          <input type="text" placeholder="New Task" value={newTask}
            onChange={e => setNewTask(e.target.value)} style={{ ...input, flex: 1 }} />
          <button onClick={addTask} style={primaryBtn}>Add</button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{
              background: "#f9f9f9", marginBottom: 10, padding: 12,
              borderRadius: 8, display: "flex", alignItems: "center",
              justifyContent: "space-between"
            }}>
              {editingTask === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ ...input, margin: 0, flex: 1 }}
                  />
                  <button onClick={() => saveEdit(task.id)} style={primaryBtn}>Save</button>
                  <button onClick={() => setEditingTask(null)} style={secondaryBtn}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#999" : "#333",
                    flex: 1
                  }}>
                    {task.title}
                  </span>
                  <input type="checkbox" checked={task.completed}
                    onChange={() => toggleTask(task.id)} />
                  <button onClick={() => startEdit(task)} style={editBtn}>Edit</button>
                  <button onClick={() => deleteTask(task.id)} style={secondaryBtn}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
