import React from 'react';

export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/80 p-8 rounded text-center max-w-2xl">
        <h2 className="text-3xl font-semibold mb-4">About InsureAI</h2>
        <p className="text-gray-800">InsurAI helps customers choose insurance using AI-driven suggestions and a simple UI.</p>
      </div>
    </div>
  );
}
