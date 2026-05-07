'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin() {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    onSuccess()
    onClose()
  }

  async function handleSignup() {
    if (!email || !password || !username) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase.auth.signUp({ email, password })
    if (err) { setLoading(false); setError(err.message); return }
    if (data?.user) {
      await supabase.from('profiles').insert([{
        id: data.user.id,
        username: username.trim(),
        reputation: 0
      }])
    }
    setLoading(false)
    setMessage('Account created! You can now log in.')
    setMode('login')
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 300, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 32,
        maxWidth: 420, width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, background: '#16a34a', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4, letterSpacing: '-0.02em' }}>
            {mode === 'login' ? 'Welcome back' : 'Join FixThis'}
          </h2>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>
            {mode === 'login' ? 'Log in to post fix requests and guides' : 'Create an account to start fixing things'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 4, marginBottom: 20 }}>
          <button onClick={() => { setMode('login'); setError(''); setMessage('') }} style={{
            flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === 'login' ? '#fff' : 'transparent',
            color: mode === 'login' ? '#0f172a' : '#94a3b8',
            boxShadow: mode === 'login' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
          }}>Log in</button>
          <button onClick={() => { setMode('signup'); setError(''); setMessage('') }} style={{
            flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === 'signup' ? '#fff' : 'transparent',
            color: mode === 'signup' ? '#0f172a' : '#94a3b8',
            boxShadow: mode === 'signup' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
          }}>Sign up</button>
        </div>

        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}
        {message && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{message}</div>}

        {/* Fields */}
        {mode === 'signup' && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="e.g. MechaniKo"
              style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 9, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              onFocus={e => e.target.style.borderColor = '#16a34a'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="you@example.com"
            style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 9, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = '#16a34a'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)}
            type="password" placeholder="••••••••"
            style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 9, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = '#16a34a'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            onKeyDown={e => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignup())}
          />
        </div>

        <button onClick={mode === 'login' ? handleLogin : handleSignup} disabled={loading} style={{
          width: '100%', background: '#16a34a', color: '#fff', border: 'none',
          padding: '13px 0', borderRadius: 10, fontSize: 15, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
          marginBottom: 12
        }}>{loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}</button>

        <button onClick={onClose} style={{
          width: '100%', background: 'transparent', color: '#94a3b8',
          border: 'none', padding: '8px 0', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
        }}>Cancel</button>
      </div>
    </div>
  )
      }
