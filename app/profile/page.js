import Navbar from '../../components/Navbar'

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '40px 0 32px', marginBottom: 32 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: 'var(--teal)', color: 'white',
              fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Syne, sans-serif'
            }}>MK</div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>MechaniKo</div>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>Member since May 2026 · Top Fixer 🔧</div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: '#e0f5ed', color: '#0a9e6e' }}>Top Fixer</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'var(--teal-light)', color: '#077a54' }}>Electronics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { num: '0', label: 'Posts' },
            { num: '0', label: 'Guides written' },
            { num: '0', label: 'Upvotes earned' },
            { num: '0', label: 'Problems solved' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--teal)', lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#2d3a30', marginBottom: 8 }}>
            User accounts coming soon
          </div>
          <div style={{ fontSize: 14, maxWidth: 340, margin: '0 auto' }}>
            Full login and profile tracking will be added in Phase 2. For now, start posting and writing guides!
          </div>
        </div>
      </div>
    </>
  )
    }
