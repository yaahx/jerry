/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0c0a09',
        card: 'rgba(26, 21, 16, 0.85)',
        'card-hover': 'rgba(38, 30, 24, 0.95)',
        'burnt-orange': '#f36c21',
        'burnt-deep': '#d9531e',
        'burnt-amber': '#ff9f43',
        'burnt-fire': '#ff4500',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        brand: ['Unbounded', 'Syne', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        gta: ['"Pirata One"', '"UnifrakturMaguntia"', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
