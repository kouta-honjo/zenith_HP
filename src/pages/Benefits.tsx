import { motion } from 'motion/react';
import OriginalPage from '../components/OriginalPage';

export default function Benefits() {
  return (
    <div className="w-full bg-white">
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">採用について</p>
            <h1 className="text-4xl md:text-5xl font-bold">福利厚生</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              充実した社会人生活のための福利厚生制度をご紹介します。
            </p>
          </motion.div>
        </div>
      </div>
      <OriginalPage src="/pages/welfare.html" title="福利厚生" />
    </div>
  );
}
