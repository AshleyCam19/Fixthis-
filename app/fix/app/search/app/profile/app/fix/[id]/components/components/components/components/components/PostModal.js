'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['Appliances','Electronics','Furniture','Plumbing','Bikes','Cars','Clothing']

export default function PostModal({ onClose }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit() {
    if (!title.trim()) { setError('Please add a title'); return }
    if (!category) { setError('Please select a category'); return }
    if (!description.trim()) { setError('Please describe the problem'); return }

    setLoading(true)
    setError('')

    const { data, error: err } = await supabase.from('posts').insert([{
      title: title.trim(),
      description: description.trim(),
      category,
      status: 'unsolved',
      author: 'Anonymous',
    }]).select().single()

    setLoading(false)
    if (err) { setError('Something went wrong. Try again.'); return }
    onClose()
    router.push(`/fix/${data.id}`)
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      zIndex: 200, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 12, padding: 32,
        maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          Post a fix request
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
          Describe what's broken and the community will help.
        </p>

        {error && <div style={{ background: '#fdeaea', color: '#b02020', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
            Title <span style={{ color: 'var(--muted)', fontWeight: 400 }}>— be specific</span>
          </label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Samsung fridge making clicking noise and not cooling"
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={e => e.target.style.borderColor = 'var(--teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif', background: 'white' }}
            onFocus={e => e.target.style.borderColor = 'var(--teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
            Description <span style={{ color: 'var(--muted)', fontWeight: 400 }}>— what happened, what you've tried</span>
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            rows={4} placeholder="e.g. It started clicking 2 days ago. Fridge is 5 years old. The freezer still works but the fridge section is warm."
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6 }}
            onFocus={e => e.target.style.borderColor = 'var(--teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <button onClick={onClose} style={{
            background: 'white', color: 'var(--ink)', border: '1.5px solid var(--border)',
            padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            background: 'var(--teal)', color: 'white', border: 'none',
            padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            opacity: loading ? 0.7 : 1
          }}>{loading ? 'Posting...' : 'Post request'}</button>
        </div>
      </div>
    </div>
  )
}
