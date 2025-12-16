import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// Use import.meta.url so Vite resolves images in src/assets
const imgGeneral = new URL('../assets/General_Insurance_Banner.png', import.meta.url).href;
const imgCar = new URL('../assets/Car_Insurance_Banner.png', import.meta.url).href;
const imgHealth = new URL('../assets/Health_Insurance_Banner.png', import.meta.url).href;
const imgTravel = new URL('../assets/Travel_Insurance_ 2.png', import.meta.url).href;
const imgFire = new URL('../assets/Fire_Insurance_Banner.png', import.meta.url).href;

const slides = [
  {
    id: 1,
    title: 'Insure Your Future Digitally, Anytime, Anywhere',
    text: "Experience The Ease Of Securing Your Future With Our Digital Platform. Get Insured In Just A Few Clicks!",
    cta: 'Buy Online Services',
    img: imgGeneral,
  },
  {
    id: 2,
    title: "Drive With Confidence, We’ve Got You Covered",
    text: "Enjoy Your Journey On The Road Knowing You’re Protected With Our Motor Insurance Plans",
    cta: 'Buy Online Services',
    img: imgCar,
  },
  {
    id: 3,
    title: 'Health Is Wealth, Secure It',
    text: 'Invest In Your Health Today For A Wealthy Tomorrow With Our Health Insurance Plans',
    cta: 'Buy Online Services',
    img: imgHealth,
  },
  {
    id: 4,
    title: 'Secure Your Tomorrow, Today',
    text: "From Getting A Quote To Renewing Your Policy, We’re With You At Every Step. Experience Seamless Insurance With Our Travel Insurance Plans",
    cta: 'Buy Online Services',
    img: imgTravel,
  },
  {
    id: 5,
    title: "Shield Your Home From The Unexpected",
    text: 'We Care About Your Home As Much As You Do. Stay Secure And Let The Peace Of Mind Be The Spark That Lights Up Your Life With Our Fire Insurance Plans',
    cta: 'Buy Online Services',
    img: imgFire,
  },
];

export default function Home() {
    const guestBanner = new URL('../assets/aNew/guest-banner.svg', import.meta.url).href;
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [policyMsg, setPolicyMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [applyMsg, setApplyMsg] = useState('');
  const [applyLoading, setApplyLoading] = useState(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  const ALL_CATEGORIES = [
    'Term Life',
    'Health',
    'Car Insurance',
    'Travel',
    'Child Plans',
    'Retirement',
    'Home Insurance',
    'Employee Group Insurance'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    let mounted = true;
    setLoadingPolicies(true);
    setPolicies([]);
    setPolicyMsg('');
    api.get(`/policies?category=${encodeURIComponent(selectedCategory)}`)
      .then((res) => {
        if (!mounted) return;
        setPolicies(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to load policies for category', selectedCategory, err);
        setPolicyMsg('Could not load policies for this category.');
      })
      .finally(() => mounted && setLoadingPolicies(false));
    return () => { mounted = false; };
  }, [selectedCategory]);

  const handleApplyPolicy = async (policy) => {
    const token = localStorage.getItem('token');
    
    // If not logged in, redirect to login
    if (!token) {
      setApplyMsg('Please log in to apply for a policy.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setApplyLoading(policy.id);
    setApplyMsg('');

    try {
      // Create application with policy and user details
      const payload = {
        policyId: policy.id,
        policyName: policy.name || policy.policyName,
        status: 'pending'
      };

      const res = await api.post('/applications', payload);
      setApplyMsg('Application submitted successfully! Check your status in the agent dashboard.');
      
      // Clear loading state after 2 seconds
      setTimeout(() => {
        setApplyLoading(null);
        setApplyMsg('');
      }, 2000);
    } catch (err) {
      console.error('Failed to apply for policy', err);
      const errorMsg = err.response?.data?.message || 'Failed to submit application. Please try again.';
      setApplyMsg(errorMsg);
      setApplyLoading(null);
    }
  };

  return (
    <div>

      {/* Search bar - styled to match InsurAI header with gradient and hover effects */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = query.trim();
              // Show categories section and filter
              setShowCategories(true);
              const qLower = q.toLowerCase();
              if (!q) {
                setFilteredCategories(ALL_CATEGORIES);
              } else {
                const matches = ALL_CATEGORIES.filter((c) => c.toLowerCase().includes(qLower));
                setFilteredCategories(matches.length ? matches : ALL_CATEGORIES);
              }
              // scroll to categories after a small delay to allow render
              setTimeout(() => {
                categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 120);
            }}
            className="w-full"
          >
            <div className="flex items-center gap-3 bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder-gray-400"
                placeholder="Search plans, e.g. Health, Car, Travel..."
                aria-label="Search policies"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <header className="relative w-full h-[60vh] lg:h-[70vh]">
      {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            style={{
              backgroundImage: `url('${slide.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-full h-full bg-black/30 flex items-center">
              {/* content on right side */}
              <div className="flex-1" />
              <div className="w-full md:w-1/3 p-6 md:p-12 flex items-center justify-center">
                <div className="bg-black/60 p-6 rounded text-right">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{slide.title}</h2>
                  <p className="text-white/90 mb-4 text-sm md:text-base">{slide.text}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate('/register')}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-3 z-20">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </header>

      <main className="w-full">
        {/* Banner section before categories */}
        <section className="relative z-0 py-10 px-4 bg-gradient-to-b from-cyan-100 to-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Choose A Plan That Works For You</h2>
              <p className="text-gray-700 text-base md:text-lg">
                National Insurance Company Ltd offers a wide range of insurance services to its customers with around 300 products. The products it sells can be subdivided into various lines of business like Personal Line of Insurance like Health Insurance, Personal Accident, Householders’ Insurance, Shopkeepers’ Insurance, Motor Vehicle Insurance, Rural Insurance covering Livestock, Agricultural implements, Industrial & Commercial Insurance covering industrial units, power plants, business establishments etc. against fire & allied perils, natural calamities etc.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img src={guestBanner} alt="Insurance Banner" className="max-w-[350px] w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Categories section (8 only, clickable) */}
        <section ref={categoriesRef} className="relative z-0 p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Insurance Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(showCategories ? (filteredCategories.length ? filteredCategories : ALL_CATEGORIES) : ALL_CATEGORIES).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex flex-col items-center gap-2 bg-white rounded-lg p-4 shadow hover:shadow-md text-left border-2 ${selectedCategory === cat ? 'border-blue-600' : 'border-transparent'}`}
                  aria-label={`Show plans for ${cat}`}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{cat.split(' ').slice(0,1)[0].slice(0,1)}</div>
                  <div className="text-sm font-medium text-center">{cat}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Show policies for selected category only */}
        {selectedCategory && (
          <section className="relative z-0 p-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{selectedCategory} Plans</h2>
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Show Categories
                </button>
              </div>
              {policyMsg && <div className="text-sm text-blue-700 mb-3">{policyMsg}</div>}
              {applyMsg && (
                <div className={`text-sm mb-3 px-3 py-2 rounded ${applyMsg.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {applyMsg}
                </div>
              )}
              {loadingPolicies ? (
                <div>Loading policies…</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {policies.length ? policies.map((p) => (
                    <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col justify-between hover:shadow-lg transition">
                      <div>
                        <h3 className="text-lg font-semibold">{p.name || p.policyName}</h3>
                        <p className="text-sm text-gray-600 mt-2">{p.description}</p>
                        <p className="mt-3"><strong>Premium:</strong> ₹{p.premium || p.premiumAmount}</p>
                        {p.benefits && (
                          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                            {p.benefits.split('\n').map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                      <button
                        onClick={() => handleApplyPolicy(p)}
                        disabled={applyLoading === p.id}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {applyLoading === p.id ? 'Applying...' : 'Apply Now'}
                      </button>
                    </div>
                  )) : (
                    <div className="p-4 bg-white rounded shadow">No policies available for this category.</div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}