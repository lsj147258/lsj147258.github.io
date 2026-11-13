/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF6',
        card: '#FFFFFF',
        ink: '#16181C',
        muted: '#6E7178',
        line: '#E8E4DA',
        accent: '#E4572E',
        moss: '#2F6F62',
        sand: '#F0EAD9',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        serif: [
          '"Noto Serif SC"',
          '"Songti SC"',
          '"Source Han Serif SC"',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(22,24,28,0.04), 0 14px 40px -18px rgba(22,24,28,0.18)',
        lift: '0 2px 4px rgba(22,24,28,0.05), 0 28px 60px -24px rgba(22,24,28,0.28)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
