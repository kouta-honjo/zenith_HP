import { motion } from 'motion/react';
import OriginalPage from '../components/OriginalPage';

export default function Vision() {
  return (
    <div className="w-full bg-white">
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">未来に向けて</p>
            <h1 className="text-4xl md:text-5xl font-bold">全農の目指す姿</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              2030年の目指す姿「持続可能な農業と食の提供のために"なくてはならない全農"であり続ける」
            </p>
          </motion.div>
        </div>
      </div>
      <OriginalPage src="/pages/message.html" title="全農の目指す姿" />
    </div>
  );
}
