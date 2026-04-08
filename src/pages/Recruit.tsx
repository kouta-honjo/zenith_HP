import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import OriginalPage from '../components/OriginalPage';

export default function Recruit() {
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
            <p className="text-green-300 font-bold text-sm tracking-widest mb-2">04. RECRUIT</p>
            <h1 className="text-4xl md:text-5xl font-bold">採用について</h1>
            <p className="text-green-100/80 mt-4 max-w-2xl">
              募集要項、選考フロー、福利厚生、キャリアパスなどの採用情報をご紹介します。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 py-6">
            <a href="#requirements" className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">募集要項</a>
            <a href="#flow" className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">選考フロー</a>
            <a href="#benefits" className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">福利厚生</a>
            <a href="#career" className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">キャリアパス・研修制度</a>
            <a href="#events" className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">説明会・イベント</a>
          </div>
        </div>
      </div>

      {/* 募集要項 */}
      <section id="requirements" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">募集要項</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {[
                  ['募集職種', '総合職'],
                  ['応募資格', '大学院・大学・短大・高専・専修学校卒業見込みの方、または既卒の方'],
                  ['初任給', '大学院卒：月給225,000円 / 大卒：月給210,000円 / 短大卒：月給190,000円（2025年4月実績）'],
                  ['勤務時間', '8:30〜17:00（休憩60分）'],
                  ['勤務地', '広島県内（広島市・東広島市・三次市）'],
                  ['休日', '完全週休2日制、祝日、お盆、年末年始'],
                ].map(([label, value], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50 w-1/4 text-sm">{label}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://zennoh-recruit.jp/recruit/index/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700"
            >
              詳しい募集要項はこちら <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 選考フロー */}
      <section id="flow" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">選考フロー</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {['エントリー', '会社説明会', '書類選考', '面接（複数回）', '内定'].map((step, i) => (
              <div key={i} className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none bg-white rounded-xl p-6 shadow-sm text-center min-w-[140px]">
                  <div className="w-10 h-10 mx-auto mb-3 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{step}</p>
                </div>
                {i < 4 && <ArrowRight className="w-5 h-5 text-green-400 hidden md:block shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 福利厚生 - オリジナルHTML */}
      <div id="benefits">
        <OriginalPage src="/pages/welfare.html" title="福利厚生" />
      </div>

      {/* キャリアパス・研修制度 */}
      <section id="career" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">キャリアパス・研修制度</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">OJT研修制度</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                入会1年目の職員一人につき、直接指導する先輩職員が一人つきます。入会後も業務の習得のサポートを行います。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">階層別研修制度</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                1年目、2年目と段階に応じた研修プログラムで、計画的にスキルアップを図ります。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">ライン長研修制度</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                管理職候補向けの研修で、リーダーシップやマネジメントスキルを育成します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 説明会・イベント */}
      <section id="events" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">説明会・イベント</h2>
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <p className="text-gray-600 mb-6">最新の説明会・イベント情報はJA全農採用サイトをご確認ください。</p>
            <a
              href="https://zennoh-recruit.jp/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all"
            >
              JA全農 採用情報サイト <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">エントリーはこちらから</h2>
          <p className="text-green-100 mb-8">JA全農ひろしまで、食と農の未来を一緒につくりましょう。</p>
          <a
            href="https://zennoh-recruit.jp/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:bg-green-50"
          >
            ENTRY <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
