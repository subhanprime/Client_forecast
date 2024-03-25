/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.3, 0.76, 0.27, 1)',
      },
    },
  },
  plugins: [],
};
