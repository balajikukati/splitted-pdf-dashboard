/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
        '50': '#ecf9ff',
        '100': '#d5f0ff',
        '200': '#b4e6ff',
        '300': '#81d9ff',
        '400': '#46c1ff',
        '500': '#1ba0ff',
        '600': '#0481ff',
        '700': '#0068f8',
        '800': '#065ad8',
        '900': '#0c499c',
        '950': '#0d2c5e',
    },
    
      },
    },
  },
  plugins: [],
}