'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import GuideModal from './GuideModal'

export default function GuideSection({ postId, initialGuides }) {
  const [guides, setGuides] = useState(initialGuides)
  const [showModal, setShowModal] = useState(false)
  const [voted, setVoted] = useState({})

  async function upvote(guideId) {
    if (voted[guideId]) return
    setVoted(v => ({ ...v, [guideId]: true }))
    setGuides(gs => gs.map(g => g.id === guideId ? { ...g, upvotes: g.upvotes + 1 } : g))
    await supabase.from('guides').update({ upvotes: guides.find(g => g.id === guideId).upvotes + 1 }).eq('id', guideId)
  }

  async function refresh() {
    const { data } = await supabase.from('guides').select('*').eq('post_id', postId).order('upvotes', { ascending: false })
    setGuides(data || [])
  }

  const diffColor = d => d === 'Easy' ? { bg: '#e8f8f0', color: '#0a7a50' } : d === 'Medium' ? { bg: '#fff4e6', color: '#b06000' } : { bg: '#fee8e8', color: '#b02020' }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>
          {guides.length} repair guide{guides.length !== 1 ? 's' : ''}
        </h2>
        <button onClick={() => setShowModal(true)} style={{
          background: 'var(--teal)', color: 'white', border: 'none',
          padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
        }}>+ Write a guide</button>
      </div>

      {guides.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛠️</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#2d3a30', marginBottom: 8 }}>No guides yet</div>
          <div style={{ fontSize: 14, marginBottom: 24 }}>Be the first to write a step-by-step repair guide!</div>
        </div>
      ) : (
        guides.map(g => {
          const dc = diffColor(g.difficulty)
          return (
            <div key={g.id} style={{
              background: 'white', border: `${g.accepted ? '2px solid var(--teal)' : '1px solid var(--border)'}`,
              borderRadius: 12, padding: 24, marginBottom: 14
            }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 18, alignItems: 'flex-start' }}>
                <button onClick={() => upvote(g.id)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  background: voted[g.id] ? 'var(--teal-light)' : 'var(--surface)',
                  border: `1px solid ${voted[g.id] ? 'var(--teal)' : 'var(--border)'}`,
                  borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
                  minWidth: 50, flexShrink: 0, fontFamily: 'DM Sans, sans-serif'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={voted[g.id] ? 'var(--teal)' : 'var(--muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{g.upvotes}</span>
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: 'var(--teal)', color: 'white',
                      fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Syne, sans-serif', flexShrink: 0
                    }}>{g.initials}</div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{g.author}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>· {new Date(g.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 99, background: dc.bg, color: dc.color }}>{g.difficulty}</span>
                    <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 99, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>⏱ {g.time_estimate}</span>
                    {g.accepted && <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: 'var(--teal)', color: 'white' }}>✓ Accepted solution</span>}
                  </div>
                </div>
              </div>

              {g.tools?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>Tools needed</div>
                  <div>
                    {g.tools.map(t => (
                      <a key={t} href={`https://www.amazon.com/s?tag=fixthis-20&k=${encodeURIComponent(t)}`} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          background: 'var(--surface)', border: '1px solid var(--border)',
                          borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#2d3a30',
                          margin: 3, textDecoration: 'none'
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }}></span>
                        {t}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div>
                {g.steps?.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < g.steps.length - 1 ? '1px solid var(--surface)' : 'none' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', background: 'var(--teal-light)',
                      color: '#077a54', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0, fontFamily: 'Syne, sans-serif', marginTop: 1
                    }}>{i + 1}</div>
                    <div style={{ fontSize: 14, color: '#2d3a30', lineHeight: 1.6 }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}

      {showModal && (
        <GuideModal
          postId={postId}
          onClose={() => setShowModal(false)}
          onSubmitted={refresh}
        />
      )}
    </>
  )
    }
