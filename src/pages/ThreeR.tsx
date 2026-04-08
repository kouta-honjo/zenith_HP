import { motion } from 'motion/react';

export default function ThreeR() {
  return (
    <div className="w-full bg-white">
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">事業を知る</p>
            <h1 className="text-4xl md:text-5xl font-bold">3-R（さん・あーる）</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              耕畜連携・資源循環ブランド「３-Ｒ」の取り組みをご紹介します。
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img src="/images/top/message-icon.png" alt="3-Rロゴ" className="max-w-md w-full" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                耕畜連携・資源循環ブランド「３-Ｒ（さん・あーる）」
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                畜産業で出た堆肥を「資源（RESOURCE）」として「再利用（RECYCLING）」する
                資源循環・耕畜連携の取り組みを「繰り返し（REPEAT）」ていくことで、
                地域の環境保全と持続可能な耕種農業と畜産農業を目指しています。
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                SDGsの「11.住み続けられるまちづくりを」「12.つくる責任 つかう責任」
                「15.陸の豊かさを守ろう」「17.パートナーシップで目標を達成しよう」に関連した取り組みです。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
