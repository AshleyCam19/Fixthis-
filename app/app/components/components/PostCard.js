import Link from 'next/link'

const ICONS = { Appliances:'🫧', Electronics:'📱', Furniture:'🪑', Plumbing:'🔧', Bikes:'🚲', Cars:'🚗', Clothing:'👕' }

export default function PostCard({ post }) {
  const icon = ICONS[post.category] || '🔧'
  const guideCount = post.guide_count || 0

  return (
    <Link href={`/fix/${post.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', border: '1px solid var(--border)', borderRadius: 12,
        padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start',
        cursor: 'pointer', transition: 'all 0.15s'
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
      >
        <div style={{
          width: 72, height: 72, borderRadius: 8, flexShrink: 0,
          background: 'var(--surface)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
        }}>{icon}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
              background: post.status === 'solved' ? '#e0f5ed' : '#f0f0f0',
              color: post.status === 'solved' ? '#0a9e6e' : '#888'
            }}>{post.status === 'solved' ? '✓ Solved' : 'Unsolved'}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
              background: 'var(--teal-light)', color: '#077a54'
            }}>{post.category}</span>
          </div>

          <div style={{
            fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700,
            color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3
          }}>{post.title}</div>

          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>
            {post.description?.substring(0, 120)}...
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
            <span>💬 {guideCount} guide{guideCount !== 1 ? 's' : ''}</span>
            <span style={{ marginLeft: 'auto' }}>
              {post.author} · {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
            }
