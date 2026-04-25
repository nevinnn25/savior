/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00ff88',
        cyanGlow: '#63f6ff',
      },
      boxShadow: {
        neon: '0 0 22px rgba(0, 255, 136, 0.35)',
        glass: '0 18px 40px rgba(0,0,0,0.45)',
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
        drift: 'drift 26s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-60px,-30px,0)' },
        },
      },
    },
  },
  plugins: [],
}
