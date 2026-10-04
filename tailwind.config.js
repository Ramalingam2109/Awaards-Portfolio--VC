/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0c',
          card: '#121216',
          border: '#202026',
          muted: '#80808e',
          text: '#ededf2'
        },
        accent: {
          lime: '#d9f99d',
          yellow: '#fde047',
          cyan: '#38bdf8',
          purple: '#c084fc',
          emerald: '#34d399'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Syne"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
