/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          400: '#6DE1D2',
        },
        yellow: {
          400: '#FFD63A',
        },
        orange: {
          400: '#FFA955',
        },
        red: {
          500: '#F75A5A',
        },
      },
    },
  },
  plugins: [],
}
