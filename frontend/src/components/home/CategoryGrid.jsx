import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORY_META } from '@/utils/constants';

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-11 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Find your fit</p>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Browse by Category</h2>
        <p className="mt-3 text-gray-500">Find the right cover for every stage of life</p>
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
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 transition-all group-hover:rotate-3 group-hover:bg-primary-100">
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
