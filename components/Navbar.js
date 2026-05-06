'use client'
import Link from 'next/link'
import { useState } from 'react'
import PostModal from './PostModal'

export default function Navbar() {
  const [showPost, setShowPost] = useState(false)

  return (
    <>
      <nav style={{
        background: 'rgba(7,20,7,0.95)',
        borderBottom: '0.5px solid #0f220f',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '62px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, background: '#16a34a',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            FixThis
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link href="/search" style={{
            fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none', padding: '7px 12px', borderRadius: 8
          }}>Browse</Link>
          <Link href="/profile" style={{
            fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none', padding: '7px 12px', borderRadius: 8
          }}>Profile</Link>
          <button onClick={() => setShowPost(true)} style={{
            background: '#16a34a', color: '#fff', border: 'none',
            padding: '8px 18px', borderRadius: 8, fontSize: 13,
            fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            marginLeft: 4
          }}>+ Post a Fix</button>
        </div>
      </nav>

      {showPost && <PostModal onClose={() => setShowPost(false)} />}
    </>
  )
                              }
