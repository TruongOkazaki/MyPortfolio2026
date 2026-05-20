import Link from 'next/link'

export default function GlobalNotFound() {
  return (
    <html>
      <body style={{ margin: 0, background: '#f5f2ed', fontFamily: 'Georgia, serif', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#999', fontFamily: 'Arial, sans-serif', marginBottom: '24px' }}>Error</p>
        <h1 style={{ fontSize: 'clamp(100px, 22vw, 200px)', fontWeight: 700, color: '#1a1a1a', lineHeight: 0.85, margin: '0 0 32px' }}>404</h1>
        <div style={{ width: '40px', height: '2px', background: '#1a1a1a', margin: '0 auto 24px' }} />
        <p style={{ fontSize: '16px', color: '#1a1a1a', margin: '0 0 8px' }}>Page not found</p>
        <p style={{ fontSize: '14px', color: '#888', fontFamily: 'Arial, sans-serif', maxWidth: '280px', lineHeight: 1.6, margin: '0 0 40px' }}>The page you're looking for doesn't exist.</p>
        <Link href="/vi" style={{ display: 'inline-block', background: '#1a1a1a', color: '#f5f2ed', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '12px 28px', fontFamily: 'Arial, sans-serif', textDecoration: 'none' }}>
          Back to home
        </Link>
      </body>
    </html>
  )
}
