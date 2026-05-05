import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar'
import PostCard from '../../components/PostCard'
import SearchBar from '../../components/SearchBar'

export const revalidate = 0

export default async function SearchPage({ searchParams }) {
  const q = searchParams?.q || ''

  let query = supabase.from('posts').select('*, guides(count)').order('created_at', { ascending: false })
  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`)
  }

  const { data: posts } = await query.limit(50)
  const postsWithCount = (posts || []).map(p => ({ ...p, guide_count: p.guides?.[0]?.count || 0 }))

  return (
    <>
      <Navbar />
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '32px 0', marginBottom: 28 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
            Browse all fixes
          </div>
          <SearchBar defaultValue={q} />
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 80px' }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          {postsWithCount.length} result{postsWithCount.length !== 1 ? 's' : ''}{q ? ` for "${q}"` : ''}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {postsWithCount.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#2d3a30', marginBottom: 8 }}>No fixes found</div>
              <div style={{ fontSize: 14 }}>Try a different search term</div>
            </div>
          ) : (
            postsWithCount.map(post => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </>
  )
    }
