/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#ff0000',
        customDarkRed: '#cc0000',
        customBlue: '#3b4cca',
        customYellow: '#ffde00',
        customGold: '#b3a125',
        customGreen: '#28a745',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ffde00',        // Custom Yellow
          secondary: '#3b4cca',      // Custom Blue
          accent: '#ff0000',         // Custom Dark Red
          info: '#b3a125',          // Custom Gold
          submit: '#28a745',        // Custom Green
          revoke: '#cc0000',         // Custom Dark Red
          'base-100': '#FFFFFF',     // White
        },
      },
    ],
  },
};
