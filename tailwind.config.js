/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#00A896',
          'teal-light': '#E8F8F5',
          'teal-soft': '#B8EADF',
          'teal-dark': '#007A6D',
          'teal-deep': '#005349',
          mocha: '#5C3D2E',
          'mocha-light': '#7A5441',
          'mocha-dark': '#3D251A',
          coral: '#FF4D6D',
          olive: '#6C7A38',
          sand: '#FDFBF7'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 168, 150, 0.08)',
        'glass-lg': '0 12px 48px 0 rgba(0, 168, 150, 0.14)',
        'glass-glow': '0 0 25px rgba(0, 168, 150, 0.25)',
        'mocha-glow': '0 0 20px rgba(92, 61, 46, 0.2)'
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
