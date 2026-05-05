'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function GuideModal({ postId, onClose, onSubmitted }) {
  const [difficulty, setDifficulty] = useState('Medium')
  const [time, setTime] = useState('')
  const [tools, setTools] = useState('')
  const [steps, setSteps] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addStep() { setSteps([...steps, '']) }
  function updateStep(i, val) { const s = [...steps]; s[i] = val; setSteps(s) }

  async function handleSubmit() {
    const filledSteps = steps.filter(s => s.trim())
    if (!filledSteps.length) { setError('Add at least one step'); return }

    setLoading(true)
    setError('')

    const toolList = tools.split(',').map(t => t.trim()).filter(Boolean)

    const { error: err } = await supabase.from('guides').insert([{
      post_id: postId,
      author: 'Anonymous',
      initials: 'AN',
      difficulty,
      time_estimate: time || '30 min',
      tools: toolList,
      steps: filledSteps,
      upvotes: 0,
      accepted: false,
    }])

    setLoading(false)
    if (err) { setError('Something went wrong. Try again.'); return }
    onClose()
    onSubmitted()
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      zIndex: 200, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 12, padding: 32,
        maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          Write a repair guide
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
          Share how you'd fix this. Step-by-step guides get the most upvotes.
        </p>

        {error && <div style={{ background: '#fdeaea', color: '#b02020', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Difficulty</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
              style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif', background: 'white' }}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Time estimate</label>
            <input value={time} onChange={e => setTime(e.target.value)}
              placeholder="e.g. 30 minutes"
              style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
            Tools needed <span style={{ color: 'var(--muted)', fontWeight: 400 }}>— comma separated</span>
          </label>
          <input value={tools} onChange={e => setTools(e.target.value)}
            placeholder="e.g. screwdriver, multimeter, pliers"
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Repair steps</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: 'var(--teal)', color: 'white',
                  fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontFamily: 'Syne, sans-serif', marginTop: 2
                }}>{i + 1}</div>
                <input value={step} onChange={e => updateStep(i, e.target.value)}
                  placeholder={`Step ${i + 1}...`}
                  style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>
            ))}
          </div>
          <button onClick={addStep} style={{
            background: 'none', border: '1.5px dashed var(--border)', borderRadius: 8,
            padding: 10, fontSize: 13, color: 'var(--muted)', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', width: '100%'
          }}>+ Add another step</button>
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
          }}>{loading ? 'Posting...' : 'Post guide'}</button>
        </div>
      </div>
    </div>
  )
      }
