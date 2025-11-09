import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setMessage("Login successful — redirecting...");
      setTimeout(() => navigate("/dashboard"), 700);
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Sign in to PolicyPort</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your account details to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        <button type="submit" className="w-full bg-brand-accent text-white py-2 rounded-md font-medium btn-primary">Sign in</button>
      </form>

          {message && <div className="mt-4 text-sm text-slate-600">{message}</div>}
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          {/* decorative illustration; uses existing react.svg as a placeholder */}
          <img src="/src/assets/react.svg" alt="illustration" className="auth-illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
