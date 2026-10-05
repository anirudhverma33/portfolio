/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,ts,tsx}'],
  // Tailwind is used for the homepage sections; global.css keeps its own reset for the other pages.
  corePlugins: { preflight: false },
  theme: { extend: { fontFamily: { kanit: ['Kanit', 'sans-serif'] } } },
};
