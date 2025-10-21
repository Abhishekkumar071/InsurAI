import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">InsureAI</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
  <Link to="/register" className="hover:underline">Register</Link>
  <Link to="/about" className="hover:underline">About</Link>
  <Link to="/admin" className="hover:underline">Admin</Link>
      </div>
    </nav>
  );
}
