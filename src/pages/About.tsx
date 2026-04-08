import { motion } from 'motion/react';
import OriginalPage from '../components/OriginalPage';

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Page Header */}
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">02. ABOUT</p>
            <h1 className="text-4xl md:text-5xl font-bold">事業を知る</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              JA全農ひろしまの組織構成、各事業部門の取り組み、3-R活動をご紹介します。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Original Content: JA全農ひろしまとは */}
      <div id="business">
        <OriginalPage src="/pages/about.html" title="JA全農ひろしまとは" />
      </div>

      {/* 3-R Activity Section */}
      <div id="3r" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/message/message01.png" alt="3-R活動" className="w-full h-auto" />
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
      </div>

      {/* Original Content: 事業紹介 */}
      <div id="projects">
        <div className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">各部署の事業内容</h2>
            <p className="text-gray-500 mb-8">JA全農ひろしまの各部署の取り組みをご紹介します。</p>
          </div>
        </div>
        <OriginalPage src="/pages/jigyou.html" title="事業紹介" />
      </div>
    </div>
  );
}
