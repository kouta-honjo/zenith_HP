import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="w-full">
      {/* ===== Hero Section ===== */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src="/images/top/mv.png"
          alt="JA全農ひろしま 採用情報"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="text-white/80 text-sm tracking-[0.3em] mb-4 font-medium">
              明日の農に挑戦する
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 tracking-tight">
              食と農を
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                未来へつなぐ。
              </span>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed">
              JA全農ひろしまの採用情報ページです。
              <br />
              私たちと一緒に、広島の食と農業の未来をつくりませんか。
            </p>
            <a
              href="https://zennoh-recruit.jp/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-green-600/30"
            >
              ENTRY
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== Section 1: 全農の目指す姿（2030ビジョン） ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-600 font-bold text-sm tracking-widest mb-2">01 MESSAGE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                全農の目指す姿
                <br />
                <span className="text-green-700">2030ビジョン</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                持続可能な食料・農業基盤の確立を通じ、豊かで暮らしやすい地域共生社会を実現。
                2030年の目指す姿を「持続可能な農業と食の提供のために"なくてはならない全農"であり続ける」と定めました。
              </p>
              <Link
                to="/message#vision"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all"
              >
                詳しく見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/top/message-icon.png" alt="2030ビジョン" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: TOPメッセージ ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/zennoh/top_message.jpg" alt="トップメッセージ" className="w-full h-auto" />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-green-600 font-bold text-sm tracking-widest mb-2">02 TOP MESSAGE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                これからも、
                <br />
                生産者と消費者を安心で
                <br />
                結ぶ確かな懸け橋であるために。
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                私たちは経営理念である「生産者と消費者を安心で結ぶ懸け橋」としての機能・役割を誠実に実践し、
                日本の食を国民の皆様にお届けするため日々事業を展開しております。
              </p>
              <Link
                to="/message#top-message"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all"
              >
                メッセージを読む <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: 事業紹介 ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-green-600 font-bold text-sm tracking-widest mb-2">03 BUSINESS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">事業紹介</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              JA全農ひろしまは、米穀・畜産・園芸・営農資材・生活の5事業部門と、改革推進・管理の2部門で構成されています。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '米穀事業', img: '/images/biz/beikoku-title.jpg', desc: '広島のお米を適切な精米処理・品質管理を通じて消費者の皆さまへお届けします。' },
              { title: '畜産事業', img: '/images/biz/chikusan-title.jpg', desc: '生産から販売までの一体的な事業体制で、安全・安心な畜産物をお届けしています。' },
              { title: '園芸事業', img: '/images/biz/engei-title.jpg', desc: '生産者と実需者の橋渡し役を担い、広島県産野菜の供給を行っています。' },
              { title: 'とれたて元気市', img: '/images/biz/genkiiti-title.jpg', desc: '生産者と消費者を直接結ぶ産直市場を運営しています。' },
              { title: '営農支援', img: '/images/biz/einou-title.jpg', desc: '生産技術の開発・普及により、収量・品質向上をサポートしています。' },
              { title: '各部署の事業内容', img: '/images/top/detail.png', desc: 'JA全農ひろしまの各部署の取り組みをご紹介します。' },
            ].map((item, i) => (
              <Link
                key={i}
                to="/about#business"
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/about#business" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
              事業紹介をもっと見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 4: 担当するプロジェクト ===== */}
      <section className="py-24 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-300 font-bold text-sm tracking-widest mb-2">04 PROJECTS</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">担当するプロジェクト</h2>
              <p className="text-green-100/80 leading-relaxed mb-8">
                JA全農ひろしまでは、若手職員でも大きなプロジェクトに携わることができます。広島県の農業を支える多様なプロジェクトをご紹介します。
              </p>
              <Link to="/about#projects" className="inline-flex items-center gap-2 bg-white text-green-900 hover:bg-green-100 px-6 py-3 rounded-full font-bold text-sm transition-all">
                プロジェクトを見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['/images/biz/jigyou_img01.jpg', '/images/biz/jigyou_img03.jpg', '/images/biz/jigyou_img05.jpg', '/images/biz/jigyou_img07.jpg'].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <img src={src} alt="プロジェクト" className="w-full h-40 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 3-R活動 ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/message/message01.png" alt="3-R活動" className="w-full h-auto" />
            </div>
            <div>
              <p className="text-green-600 font-bold text-sm tracking-widest mb-2">05 SUSTAINABILITY</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                耕畜連携・資源循環ブランド
                <br />
                <span className="text-green-700">「３-Ｒ（さん・あーる）」</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                畜産業で出た堆肥を「資源（RESOURCE）」として「再利用（RECYCLING）」する資源循環・耕畜連携の取り組みを
                「繰り返し（REPEAT）」ていくことで、地域の環境保全と持続可能な農業を目指しています。
              </p>
              <Link to="/about#3r" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                3-R活動について <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 6: 職員紹介 ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-green-600 font-bold text-sm tracking-widest mb-2">06 PEOPLE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">先輩職員のある1日をご紹介</h2>
            <p className="text-gray-500 mt-4">さまざまな部署で活躍する職員たちの声をお届けします。</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: '若林 崚太', dept: '改革推進部', year: '2022年入会', img: '/images/member/member01.png' },
              { name: '青木 菜月', dept: '改革推進部', year: '2025年入会', img: '/images/member/member02.png' },
              { name: '松本 美桜', dept: '管理部', year: '2022年入会', img: '/images/member/member05.png' },
              { name: '沖原 孝衣', dept: '米穀部', year: '2023年入会', img: '/images/member/member03.png' },
              { name: '寺尾 匡平', dept: '米穀部', year: '2022年入会', img: '/images/member/member04.png' },
            ].map((m, i) => (
              <Link key={i} to="/people#interviews" className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3 text-center">
                  <p className="font-bold text-sm text-gray-900">{m.name}</p>
                  <p className="text-xs text-green-600 mt-1">{m.dept}</p>
                  <p className="text-xs text-gray-400">{m.year}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/people#interviews" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
              職員紹介をもっと見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 7: データで知る ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-green-600 font-bold text-sm tracking-widest mb-2">07 DATA</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">データで知るJA全農ひろしま</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['01', '02', '03', '04', '05', '06', '09'].map((n, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <img src={`/images/data/data-item${n}.png`} alt={`データ${i + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/people#numbers" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
              データをもっと見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 8: 福利厚生 ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-600 font-bold text-sm tracking-widest mb-2">08 BENEFITS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">充実した社会人生活のために</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                週休2日制、各種手当、OJT研修制度、療養費補助（年30万円限度）など、
                職員一人ひとりが安心して働ける環境を整備しています。
                野球部・フットサル同好会・駅伝愛好会などのクラブ活動も充実。
              </p>
              <Link to="/recruit#benefits" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                福利厚生を見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/top/club.png" alt="福利厚生・クラブ活動" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">エントリーはこちらから</h2>
          <p className="text-green-100 mb-10">JA全農ひろしまで、食と農の未来を一緒につくりましょう。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zennoh-recruit.jp/index.html" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:bg-green-50">
              JA全農 採用情報 <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://zennoh-recruit.jp/recruit/index/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/10">
              募集要項 <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
