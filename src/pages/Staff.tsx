import { motion } from 'motion/react';
import OriginalPage from '../components/OriginalPage';

export default function Staff() {
  return (
    <div className="w-full bg-white">
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">全農ひろしまで働く</p>
            <h1 className="text-4xl md:text-5xl font-bold">先輩社員の1日</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              さまざまな部署で活躍する職員たちの声をお届けします。
            </p>
          </motion.div>
        </div>
      </div>
      <OriginalPage src="/pages/member.html" title="職員紹介" />
    </div>
  );
}
