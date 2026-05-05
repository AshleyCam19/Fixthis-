'use client'
import Link from 'next/link'
import { useState } from 'react'
import PostModal from './PostModal'

export default function Navbar() {
  const [showPost, setShowPost] = useState(false)

  return (
    <>
      <nav style={{
        background: 'white', borderBottom: '1px solid var(--border)',
        padding: '0 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '62px',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 30, height: 30, background: 'var(--teal)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--teal)' }}>
            FixThis
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/search" style={{
            fontSize: 14, fontWeight: 500, color: 'var(--muted)',
            textDecoration: 'none', padding: '8px 14px', borderRadius: 8
          }}>Browse</Link>
          <Link href="/profile" style={{
            fontSize: 14, fontWeight: 500, color: 'var(--muted)',
            textDecoration: 'none', padding: '8px 14px', borderRadius: 8
          }}>My Profile</Link>
          <button onClick={() => setShowPost(true)} style={{
            background: 'var(--teal)', color: 'white', border: 'none',
            padding: '9px 20px', borderRadius: 8, fontSize: 14,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
          }}>+ Post a Fix</button>
        </div>
      </nav>

      {showPost && <PostModal onClose={() => setShowPost(false)} />}
    </>
  )
    }
