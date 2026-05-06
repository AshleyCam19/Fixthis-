import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import HomeSearch from '../components/HomeSearch'

const CATEGORIES = [
  { name: 'Appliances', icon: '🫧' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Furniture', icon: '🪑' },
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Bikes', icon: '🚲' },
  { name: 'Cars', icon: '🚗' },
  { name: 'Clothing', icon: '👕' },
]

export const revalidate = 0

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*, guides(count)')
    .order('created_at', { ascending: false })
    .limit(20)

  const postsWithCount = (posts || []).map(p => ({
    ...p,
    guide_count: p.guides?.[0]?.count || 0
  }))

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

        {/* SVG BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#071407' }}>
          <svg viewBox="0 0 1200 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <rect width="1200" height="340" fill="#071407"/>
            <line x1="0" y1="80" x2="1200" y2="80" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="0" y1="160" x2="1200" y2="160" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="0" y1="240" x2="1200" y2="240" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="200" y1="0" x2="200" y2="340" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="400" y1="0" x2="400" y2="340" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="600" y1="0" x2="600" y2="340" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="800" y1="0" x2="800" y2="340" stroke="#0f220f" strokeWidth="0.5"/>
            <line x1="1000" y1="0" x2="1000" y2="340" stroke="#0f220f" strokeWidth="0.5"/>

            {/* HAMMER */}
            <g transform="translate(180, 200) rotate(-35)">
              <rect x="-8" y="-10" width="16" height="120" rx="6" fill="#22532a"/>
              <rect x="-28" y="-52" width="56" height="38" rx="6" fill="#22c55e"/>
              <rect x="-26" y="-50" width="52" height="10" rx="4" fill="#4ade80" opacity="0.4"/>
              <rect x="-22" y="-47" width="14" height="5" rx="2" fill="#86efac" opacity="0.5"/>
            </g>
            <circle cx="180" cy="180" r="70" fill="#16a34a" opacity="0.07"/>

            {/* WRENCH */}
            <g transform="translate(650, 130) rotate(25)">
              <rect x="-9" y="15" width="18" height="110" rx="7" fill="#166534"/>
              <ellipse cx="0" cy="8" rx="24" ry="20" fill="#22c55e"/>
              <rect x="-10" y="-8" width="20" height="18" rx="2" fill="#071407"/>
              <ellipse cx="-10" cy="-2" rx="8" ry="8" fill="#071407"/>
              <ellipse cx="10" cy="-2" rx="8" ry="8" fill="#071407"/>
              <ellipse cx="-6" cy="0" rx="4" ry="5" fill="#4ade80" opacity="0.3"/>
            </g>
            <circle cx="650" cy="120" r="60" fill="#16a34a" opacity="0.07"/>

            {/* SCREWDRIVER */}
            <g transform="translate(950, 80) rotate(15)">
              <rect x="-13" y="-18" width="26" height="55" rx="10" fill="#22c55e"/>
              <rect x="-11" y="-16" width="22" height="51" rx="8" fill="#4ade80" opacity="0.3"/>
              <rect x="-11" y="-4" width="22" height="4" rx="1" fill="#15803d"/>
              <rect x="-11" y="5" width="22" height="4" rx="1" fill="#15803d"/>
              <rect x="-11" y="14" width="22" height="4" rx="1" fill="#15803d"/>
              <rect x="-4" y="37" width="8" height="100" rx="3" fill="#166534"/>
              <polygon points="-5,135 5,135 2,150 -2,150" fill="#4ade80"/>
              <rect x="-9" y="-14" width="7" height="25" rx="4" fill="#86efac" opacity="0.35"/>
            </g>
            <circle cx="950" cy="120" r="65" fill="#16a34a" opacity="0.06"/>

            {/* PLIERS */}
            <g transform="translate(80, 110) rotate(-20)">
              <rect x="-14" y="25" width="12" height="85" rx="5" fill="#166534"/>
              <rect x="2" y="25" width="12" height="85" rx="5" fill="#22532a"/>
              <circle cx="0" cy="25" r="10" fill="#22c55e"/>
              <circle cx="0" cy="25" r="6" fill="#4ade80" opacity="0.5"/>
              <path d="M-12,25 L-22,-5 L-17,-9 L-5,22 Z" fill="#22c55e"/>
              <path d="M12,25 L22,-5 L17,-9 L5,22 Z" fill="#16a34a"/>
            </g>
            <circle cx="80" cy="110" r="55" fill="#16a34a" opacity="0.06"/>

            {/* TAPE MEASURE */}
            <g transform="translate(430, 190) rotate(-10)">
              <rect x="-28" y="-22" width="56" height="44" rx="10" fill="#22c55e"/>
              <rect x="-26" y="-20" width="52" height="40" rx="8" fill="#16a34a"/>
              <rect x="-22" y="-8" width="34" height="16" rx="4" fill="#071407"/>
              <rect x="-20" y="-5" width="24" height="4" rx="1" fill="#4ade80" opacity="0.5"/>
              <rect x="-20" y="2" width="18" height="4" rx="1" fill="#4ade80" opacity="0.3"/>
              <rect x="16" y="-5" width="10" height="10" rx="4" fill="#15803d"/>
              <rect x="-24" y="-18" width="18" height="8" rx="4" fill="#86efac" opacity="0.3"/>
            </g>
            <circle cx="430" cy="185" r="55" fill="#16a34a" opacity="0.07"/>

            {/* Sparkles */}
            <circle cx="300" cy="40" r="2" fill="#4ade80" opacity="0.7"/>
            <circle cx="550" cy="70" r="1.5" fill="#4ade80" opacity="0.5"/>
            <circle cx="750" cy="30" r="2.5" fill="#4ade80" opacity="0.6"/>
            <circle cx="1100" cy="60" r="1.5" fill="#4ade80" opacity="0.4"/>
            <circle cx="50" cy="50" r="2" fill="#4ade80" opacity="0.5"/>
            <circle cx="870" cy="230" r="1.5" fill="#4ade80" opacity="0.4"/>
            <circle cx="250" cy="260" r="2" fill="#4ade80" opacity="0.3"/>
            <circle cx="1050" cy="250" r="1.5" fill="#4ade80" opacity="0.35"/>
          </svg>
        </div>

        {/* OVERLAY */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,10,4,0.3) 0%, rgba(4,10,4,0.55) 50%, rgba(4,10,4,0.92) 100%)' }}/>

        {/* HERO CONTENT */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 2rem 40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(34,197,94,0.18)', border: '0.5px solid rgba(34,197,94,0.4)',
            color: '#4ade80', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, marginBottom: 14
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
            Community-powered repairs
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 6
          }}>
            Something broken?<br />
            <span style={{ color: '#4ade80' }}>We can fix it.</span>
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 460, lineHeight: 1.6, marginBottom: 24 }}>
            Post what's broken. Get step-by-step repair guides from people who've fixed the same thing.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="/post" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#16a34a', color: '#fff', border: 'none',
              padding: '12px 24px', borderRadius: 10, fontSize: 14,
              fontWeight: 700
            }}>
              🔧 Post a Fix Request
            </a>
            <a href="/search" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)', color: '#fff',
              border: '0.5px solid rgba(255,255,255,0.22)',
              padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500
            }}>
              Browse Fixes →
            </a>
          </div>
        </div>
      </div>

      {/* FLOATING SEARCH BAR */}
      <div style={{ background: '#f8f9fb', padding: '0 2rem' }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '20px 24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          transform: 'translateY(-28px)',
          display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>What's broken?</div>
            <HomeSearch />
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ flex: 1, maxWidth: 60, height: '0.5px', background: '#16a34a', display: 'inline-block' }}/>
            What we fix
            <span style={{ flex: 1, maxWidth: 60, height: '0.5px', background: '#16a34a', display: 'inline-block' }}/>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>Browse by category</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10, marginBottom: 48 }}>
          {CATEGORIES.map(c => (
            <a key={c.name} href={`/search?q=${c.name}`}>
              <div style={{
                background: '#fff', border: '0.5px solid #e8edf2', borderRadius: 12,
