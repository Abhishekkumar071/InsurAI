import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
        <div>© {new Date().getFullYear()} PolicyPort</div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
