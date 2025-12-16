import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", formData);
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          disabled={isLoading}
          minLength={2}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          disabled={isLoading}
          minLength={6}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Register as</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="USER"
                checked={formData.role === 'USER'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={isLoading}
                className="mr-2"
              />
              User
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="AGENT"
                checked={formData.role === 'AGENT'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={isLoading}
                className="mr-2"
              />
              Agent
            </label>
          </div>
        </div>
        <button 
          type="submit"
          className={`w-full py-2 rounded text-white ${
            isLoading 
              ? 'bg-green-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
