import './globals.css'

export const metadata = {
  title: 'FixThis — Crowd-sourced Repair Guides',
  description: 'Post what\'s broken. Get step-by-step repair guides from people who\'ve fixed the same thing.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
