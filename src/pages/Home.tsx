import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';

/* ── Hero slide data ── */
const heroSlides = [
  { src: '/images/top/hero1.png', alt: '広島レモンと瀬戸内海' },
  { src: '/images/top/hero2.png', alt: '広島和牛' },
  { src: '/images/top/hero3.png', alt: '黄金の稲穂' },
  { src: '/images/top/hero4.jpg', alt: '世羅のたまご' },
];

/* ── Box card data (MAFF-style grid) ── */
const boxes: BoxProps[] = [
  {
    to: '/vision',
    img: '/images/top/mezasu-mirai.png',
    cat: '未来に向けて',
    catColor: 'bg-green-600',
    title: '全農の目指す姿\n2030ビジョン',
  },
  {
    to: '/business',
    img: '/images/top/about.png',
    cat: '事業を知る',
    catColor: 'bg-green-600',
    title: '事業紹介',
  },
  {
    to: '/top-message',
    img: '/images/special01/kv.jpg',
    cat: '未来に向けて',
    catColor: 'bg-emerald-700',
    title: '全農トップメッセージ',
    objectPos: 'right',
  },
  {
    to: '/projects',
    img: '/images/biz/jigyou_img01.jpg',
    cat: '事業を知る',
    catColor: 'bg-green-800',
    title: '担当するプロジェクト',
  },
  {
    to: '/3r',
    img: '/images/top/message-icon.png',
    cat: '事業を知る',
    catColor: 'bg-teal-600',
    title: '耕畜連携・資源循環\n3-R（さん・あーる）',
    square: true,
  },
  {
    to: '/staff',
    img: '/images/member/member01.png',
    cat: '全農ひろしまで働く',
    catColor: 'bg-amber-600',
    title: '先輩社員の1日',
  },
  {
    to: '/data',
    img: '/images/top/data.png',
    cat: '全農ひろしまで働く',
    catColor: 'bg-sky-600',
    title: 'データで知る\nJA全農ひろしま',
  },
  {
    to: '/benefits',
    img: '/images/top/club.png',
    cat: '採用について',
    catColor: 'bg-rose-600',
    title: '充実した\n社会人生活のために',
  },
  {
    href: 'https://zennoh-recruit.jp/index.html',
    img: '/images/top/mv.png',
    cat: '採用について',
    catColor: 'bg-red-600',
    title: 'エントリーは\nこちらから',
  },
];

/* ── Types ── */
interface BoxProps {
  to?: string;
  href?: string;
  img: string;
  cat: string;
  catColor: string;
  title: string;
  square?: boolean;
  objectPos?: string;
}

/* ── Reusable Box Card (MAFF style) ── */
function BoxCard({ to, href, img, cat, catColor, title, square, objectPos, className = '' }: BoxProps & { className?: string }) {
  const inner = (
    <>
      {/* Image with gradient overlay */}
      <div className={`absolute inset-0 rounded-[15px] overflow-hidden ${square ? 'bg-white' : ''}`}>
        <img
          src={img}
          alt={title.replace('\n', ' ')}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${square ? 'object-contain p-6' : 'object-cover'}`}
          style={objectPos ? { objectPosition: objectPos } : undefined}
        />
        {!square && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />}
      </div>

      {/* Category label (top-left) */}
      <span className={`absolute top-0 left-0 ${catColor} text-white text-xs font-bold px-4 py-2 rounded-br-xl rounded-tl-[15px] z-10`}>
        {cat}
      </span>

      {/* Title (bottom-left) */}
      <span className={`absolute bottom-5 left-5 font-bold text-lg md:text-xl leading-snug whitespace-pre-line z-10 ${square ? 'text-gray-800' : 'text-white drop-shadow-lg'}`}>
        {title}
      </span>

      {/* Arrow mark (bottom-right) */}
      <span className="absolute bottom-4 right-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
        <ArrowRight className="w-5 h-5 text-white" />
      </span>
    </>
  );

  const sharedClass = `group relative block ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClass}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to!} className={sharedClass}>
      {inner}
    </Link>
  );
}

/* ── Main Component ── */
export default function Home() {
  const [current, setCurrent] = useState(0);
  const len = heroSlides.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % len), [len]);

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="w-full bg-white">
      {/* ═══════ Hero Carousel (fade) ═══════ */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: '2816 / 1536' }}>
        {/* Stacked slides — only current one is visible */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>
        ))}

        {/* Hero text overlay — only the main tagline */}
        <div className="absolute inset-0 flex items-end pointer-events-none pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-xl"
            >
              食と農を
              <br />
              未来へつなぐ。
            </motion.h1>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => setCurrent(c => (c - 1 + len) % len)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Previous"
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Next"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </section>

      {/* ═══════ MAFF-style Box Grid ═══════ */}
      <article className="max-w-[1400px] mx-auto px-[3%] py-8 flex flex-col gap-4">

        {/* ─── Row 1: MESSAGE (large 59%) + BUSINESS (40%) ─── */}
        <div className="flex flex-col md:flex-row gap-4" style={{ minHeight: 500 }}>
          <BoxCard {...boxes[0]} className="w-full md:w-[59%] h-[400px] md:h-auto" />
          <BoxCard {...boxes[1]} className="w-full md:w-[40%] h-[300px] md:h-auto" />
        </div>

        {/* ─── Row 2: TOP MESSAGE + 3-R (square) + PROJECTS ─── */}
        <div className="flex flex-col md:flex-row gap-4" style={{ minHeight: 480 }}>
          {/* TOP MESSAGE */}
          <BoxCard {...boxes[2]} className="w-full md:w-[35%] h-[350px] md:h-auto" />
          {/* 3-R (square, logo) - 事業を知るに統合 */}
          <BoxCard {...boxes[4]} className="w-full md:w-[30%] aspect-square md:aspect-auto md:h-auto" />
          {/* PROJECTS */}
          <BoxCard {...boxes[3]} className="w-full md:w-[35%] h-[350px] md:h-auto" />
        </div>

        {/* ─── Row 3: PEOPLE + DATA + BENEFITS ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <BoxCard {...boxes[5]} className="w-full sm:w-1/3 h-[300px]" />
          <BoxCard {...boxes[6]} className="w-full sm:w-1/3 h-[300px]" />
          <BoxCard {...boxes[7]} className="w-full sm:w-1/3 h-[300px]" />
        </div>

        {/* ─── Row 4: Full-width ENTRY CTA ─── */}
        <BoxCard {...boxes[8]} className="w-full h-[250px]" />
      </article>
    </div>
  );
}
