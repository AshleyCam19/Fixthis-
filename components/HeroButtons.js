'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PostModal from './PostModal'
import AuthModal from './AuthModal'

export default function HeroButtons() {
  const [user, setUser] = useState(null)
  const [showPost, setShowPost] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

  function handlePostClick() {
    if (user) {
      setShowPost(true)
    } else {
      setShowAuth(true)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={handlePostClick} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#16a34a', color: '#fff', border: 'none',
          padding: '12px 24px', borderRadius: 10, fontSize: 14,
          fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'
        }}>
          🔧 Post a Fix Request
        </button>
        <a href="/search" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.08)', color: '#fff',
          border: '0.5px solid rgba(255,255,255,0.22)',
          padding: '12px 20px', borderRadius: 10, fontSize: 14,
          fontWeight: 500, textDecoration: 'none'
        }}>
          Browse Fixes →
        </a>
      </div>

      {showPost && <PostModal onClose={() => setShowPost(false)} />}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => { setShowAuth(false); setShowPost(true) }}
        />
      )}
    </>
  )
         }
