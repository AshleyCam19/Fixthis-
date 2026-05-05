'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HomeSearch() {
  const [q, setQ] = useState('')
  const router = useRouter()

  function search() {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div style={{
      display: 'flex', maxWidth: 560, margin: '0 auto 20px',
      background: 'white', border: '1.5px solid var(--border)',
      borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
    }}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && search()}
        placeholder="e.g. Samsung fridge not cooling..."
        style={{
          flex: 1, border: 'none', outline: 'none', padding: '14px 18px',
          fontSize: 15, background: 'transparent', color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif'
        }}
      />
      <button onClick={search} style={{
        background: 'var(--teal)', color: 'white', border: 'none',
        padding: '0 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap'
      }}>Search fixes</button>
    </div>
  )
          }
