import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORY_META } from '@/utils/constants';

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Category</h2>
        <p className="mt-2 text-gray-500">Find the right cover for every stage of life</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {Object.entries(CATEGORY_META).map(([key, meta], i) => {
          const Icon = meta.icon;
          return (
            <motion.button
              key={key}
              onClick={() => navigate(`/policies?category=${key}`)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-200
                         bg-white hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                {meta.asset ? (
                  <img src={meta.asset} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <Icon className="text-primary-600" size={22} />
                )}
              </div>
              <span className="text-sm font-medium text-gray-800 text-center">{meta.label}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
