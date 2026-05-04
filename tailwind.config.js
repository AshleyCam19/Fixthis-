/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0a9e6e',
          dark: '#077a54',
          light: '#e0f5ed',
          mid: '#d0f0e4',
        },
        ink: '#111810',
        muted: '#6b7d6e',
        surface: '#f6faf7',
        border: '#d8e8db',
      },
    },
  },
  plugins: [],
}
