/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lagoon: {
          DEFAULT: '#005A7A',
          50: '#E0F1F6', 100: '#B8DFEA', 200: '#89CADD', 300: '#5AB5CF',
          400: '#359FBE', 500: '#1E86A4', 600: '#0C6B86', 700: '#005A7A',
          800: '#034B63', 900: '#033A4C'
        },
        coral: {
          DEFAULT: '#E04F39',
          50: '#FCE8E5', 100: '#F9D0CB', 200: '#F1A59C', 300: '#EA7B6E',
          400: '#E45A47', 500: '#E04F39', 600: '#C4412E', 700: '#A83626', 800: '#8C2B1E', 900: '#6F2218'
        },
        sky: { DEFAULT: '#4FB0C6' },
        sand: { DEFAULT: '#F5F2EB' },
        charcoal: { DEFAULT: '#333333' }
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: [],
};
