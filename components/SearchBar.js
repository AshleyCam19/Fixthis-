'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar({ defaultValue = '' }) {
  const [q, setQ] = useState(defaultValue)
  const router = useRouter()

  function search() {
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div style={{
      display: 'flex', maxWidth: 500,
      background: 'white', border: '1.5px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && search()}
        placeholder="Search fix requests..."
        style={{
          flex: 1, border: 'none', outline: 'none', padding: '12px 18px',
          fontSize: 14, background: 'transparent', color: 'var(--ink)',
          fontFamily: 'DM Sans, sans-serif'
        }}
      />
      <button onClick={search} style={{
        background: 'var(--teal)', color: 'white', border: 'none',
        padding: '0 20px', fontSize: 14, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
      }}>Search</button>
    </div>

  )
  }
