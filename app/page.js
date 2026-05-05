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
      <div style={{ background: 'white', borderBottom: '1px solid #d8e8db', padding: '64px 2rem 56px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#e0f5ed', color: '#077a54',
          fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
          textTransform: 'uppercase', padding: '5px 14px', borderRadius: 99, marginBottom: 20
        }}>⚡ Community-powered repairs</div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 54px)',
          fontWeight: 800, color: '#111810', lineHeight: 1.1,
          marginBottom: 16, letterSpacing: '-0.02em'
        }}>
          Something broken?<br /><span style={{ color: '#0a9e6e' }}>We can fix it.</span>
        </h1>

        <p style={{ fontSize: 17, color: '#6b7d6e', maxWidth: 500, margin: '0 auto 36px', fontWeight: 300 }}>
          Post what's broken. Get step-by-step repair guides from people who've fixed the same thing.
        </p>

        <HomeSearch />

        <div style={{ fontSize: 13, color: '#6b7d6e', marginTop: 16 }}>
          <strong style={{ color: '#111810' }}>{postsWithCount.length}</strong> fix requests posted
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 2rem 80px' }}>
        <div style={{ marginBottom: 16, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7d6e' }}>
          Browse by category
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginBottom: 48 }}>
          {CATEGORIES.map(c => (
            <a key={c.name} href={`/search?q=${c.name}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', border: '1px solid #d8e8db', borderRadius: 12,
                padding: '18px 12px', textAlign: 'center', cursor: 'pointer'
              }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2d3a30' }}>{c.name}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginBottom: 16, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7d6e' }}>
          Recent fix requests
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {postsWithCount.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7d6e' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#2d3a30', marginBottom: 8 }}>No fix requests yet</div>
              <div style={{ fontSize: 14, marginBottom: 24 }}>Be the first to post a fix request!</div>
            </div>
          ) : (
            postsWithCount.map(post => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      <footer style={{ background: 'white', borderTop: '1px solid #d8e8db', padding: '32px 2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: '#0a9e6e', marginBottom: 8 }}>FixThis</div>
        <div style={{ fontSize: 13, color: '#6b7d6e' }}>Crowd-sourced repair guides for everyday broken things.</div>
      </footer>
    </>
  )
  }
