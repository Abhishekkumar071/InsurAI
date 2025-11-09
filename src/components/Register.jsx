import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, role } = formData;
    if (!name || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Registration successful — redirecting to login...");
    setTimeout(() => navigate("/login"), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Create your account</h2>
          <p className="text-sm text-slate-500 mb-6">Quick signup — demo stores users in browser storage</p>

          <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Full name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-slate-600">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-slate-600">Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-slate-600">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-brand-accent text-white py-2 rounded-md btn-primary">Register</button>
      </form>

          {message && <div className="mt-4 text-sm text-slate-600">{message}</div>}
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <img src="/src/assets/react.svg" alt="illustration" className="auth-illustration" />
        </div>
      </div>
    </div>
  );
}

export default Register;
