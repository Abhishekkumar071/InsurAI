import React, { useState } from 'react';

export default function About() {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 shadow-xl overflow-hidden">
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white mb-2">About InsurAI</h2>
            <p className="text-lg md:text-xl text-white/95 text-center max-w-full mx-auto whitespace-nowrap overflow-hidden truncate animate-pulse">
              At InsurAI, we believe the future of insurance lies in intelligence — not paperwork.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
            We are an innovative AI-driven platform dedicated to transforming the way people discover, compare, and manage insurance. 
            By combining cutting-edge machine learning, predictive analytics, and automation, we simplify complex insurance processes 
            and make them smarter, faster, and fairer.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12 p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border-l-4 border-indigo-600 shadow-lg">
          <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Mission</h3>
          <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-6">
            Our mission is to bring trust and transparency back into insurance. We empower customers with personalized recommendations, 
            real-time risk analysis, and instant claim validation — all powered by secure, explainable AI models.
          </p>
          <p className="text-slate-700 text-lg md:text-xl leading-relaxed">
            With a team of AI engineers, insurance experts, and data scientists, we aim to revolutionize the industry by building 
            a digital ecosystem that adapts to every individual's needs.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: 'Transparency & Fairness', color: 'from-blue-400 to-cyan-500', icon: '🔍' },
              { title: 'Data Privacy & Security', color: 'from-indigo-400 to-blue-500', icon: '🔒' },
              { title: 'Innovation & Scalability', color: 'from-purple-400 to-indigo-500', icon: '⚡' },
              { title: 'Customer Empowerment', color: 'from-pink-400 to-rose-500', icon: '👥' }
            ].map((value, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
                className={`p-8 bg-gradient-to-br ${value.color} rounded-2xl shadow-lg transform transition-all duration-300 cursor-pointer ${
                  hoveredValue === idx ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h4 className="font-bold text-white text-lg md:text-xl">{value.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section - Full Width */}
        <div className="mb-12 p-6 md:p-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="flex items-start gap-5 hover:bg-slate-700/40 p-5 rounded-lg transition">
              <span className="text-4xl md:text-5xl flex-shrink-0">📧</span>
              <div className="flex-grow">
                <p className="font-semibold text-white mb-2 text-lg">Email</p>
                <a href="mailto:contact@aiinsuretech.com" className="text-cyan-300 hover:text-cyan-200 transition break-all">
                  contact@aiinsuretech.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5 hover:bg-slate-700/40 p-5 rounded-lg transition">
              <span className="text-4xl md:text-5xl flex-shrink-0">📞</span>
              <div className="flex-grow">
                <p className="font-semibold text-white mb-2 text-lg">Phone</p>
                <a href="tel:+1-555-123-4567" className="text-cyan-300 hover:text-cyan-200 transition">
                  +1-555-123-4567
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5 hover:bg-slate-700/40 p-5 rounded-lg transition">
              <span className="text-4xl md:text-5xl flex-shrink-0">📱</span>
              <div className="flex-grow">
                <p className="font-semibold text-white mb-2 text-lg">Instagram</p>
                <a href="https://instagram.com/aiinsuretech" className="text-cyan-300 hover:text-cyan-200 transition">
                  @aiinsuretech
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 md:p-12 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl border-2 border-indigo-300">
          <p className="text-2xl md:text-3xl font-bold text-indigo-900 leading-relaxed">
            Join us in redefining the insurance experience — one smart policy at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
