/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zilla-reguler': ['zillaslab-reguler', 'serif'],
      },
      screens: {
        'mobile': {'min': '360px', 'max': '500px'},
      },
      keyframes: {
        slideIn: {
          '0%': {transform: 'translateY(-100%)'},
          '100%': {transform: 'translateY(0)'}
        },
      },
      animation: {
        headerIn: 'slideIn 0.5s ease-out',
      }
    },
  },
  plugins: [],
}