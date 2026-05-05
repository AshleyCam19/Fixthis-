import { supabase } from '../../../lib/supabase'
import Navbar from '../../../components/Navbar'
import GuideSection from '../../../components/GuideSection'
import Link from 'next/link'

const ICONS = { Appliances:'🫧', Electronics:'📱', Furniture:'🪑', Plumbing:'🔧', Bikes:'🚲', Cars:'🚗', Clothing:'👕' }

export const revalidate = 0

export default async function FixPage({ params }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: guides } = await supabase
    .from('guides')
    .select('*')
    .eq('post_id', params.id)
    .order('upvotes', { ascending: false })

  if (!post) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif' }}>Post not found</h2>
        <Link href="/" style={{ color: 'var(--teal)' }}>← Back to home</Link>
      </div>
    </>
  )

  const icon = ICONS[post.category] || '🔧'

  return (
    <>
      <Navbar />
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '40px 0 32px', marginBottom: 32 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--muted)', textDecoration: 'none', marginBottom: 16
          }}>← Back to all fixes</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
              background: post.status === 'solved' ? '#e0f5ed' : '#f0f0f0',
              color: post.status === 'solved' ? '#0a9e6e' : '#888'
            }}>{post.status === 'solved' ? '✓ Solved' : 'Unsolved'}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'var(--teal-light)', color: '#077a54' }}>
              {post.category}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2,
            marginBottom: 14, letterSpacing: '-0.02em'
          }}>{post.title}</h1>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{
              width: 90, height: 90, borderRadius: 8, background: 'var(--surface)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 36
            }}>{icon}</div>
          </div>

          <p style={{ fontSize: 15, color: '#2d3a30', lineHeight: 1.7, marginBottom: 16 }}>
            {post.description}
          </p>

          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Posted by {post.author} · {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem 60px' }}>
        <GuideSection postId={params.id} initialGuides={guides || []} />
      </div>
    </>
  )
                  }
