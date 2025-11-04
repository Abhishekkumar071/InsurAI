import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Search box (centered at top) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = query.trim().toLowerCase();
          if (!q) return navigate('/about');
          const found = slides.findIndex(
            (s) => s.title.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)
          );
          if (found >= 0) {
            setIndex(found);
          } else {
            // If nothing matched, navigate to About page for more info
            navigate('/about');
          }
        }}
        className="absolute z-30 left-1/2 -translate-x-1/2 top-6 w-full max-w-2xl px-4"
      >
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70"
            placeholder="Search plans, e.g. health, car, travel or type 'about'..."
            aria-label="Search policies"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Search
          </button>
        </div>
      </form>
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
    </div>
  );
}
