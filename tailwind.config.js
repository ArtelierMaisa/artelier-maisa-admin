const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontSize: {
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        white: '#fff',
        white90: '#ffffffe6',
        white60: '#ffffff99',
        text: '#252527',
        text85: '#252527d9',
        text50: '#25252780',
        'background-color': '#F2E9E4',
        primary: '#AA906B',
        primary60: '#aa906b99',
        alert: '#FB4D3D',
        warning: '#E7BB41',
      },
      boxShadow: {
        default:
          '0px 0px 32px -16px rgba(37, 37, 39, 0.5), 0px 0px 32px -16px rgba(37, 37, 39, 0.5)',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
