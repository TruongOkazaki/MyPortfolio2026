import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2ed',
        ink: '#1a1a1a',
        'ink-light': '#444444',
        muted: '#888888',
        border: '#e0ddd8',
        'border-dark': '#c8c4bc',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
