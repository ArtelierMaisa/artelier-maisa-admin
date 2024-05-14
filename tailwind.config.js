/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },

    colors: {
      'white': '#fff',
      'white60': '#ffffff99',
      'white90': '#ffffffe6',
      'text': '#252527',
      'text85': '#252527d9',
      'text50': '#25252780',
      'background-color': '#F2E9E4',
      'primary': '#AA906B',
      'primary60': '#aa906b99',
      'alert': '#FB4D3D',
      'warning': '#E7BB41',
    },
    extend: {},
  },
  plugins: [],
}

