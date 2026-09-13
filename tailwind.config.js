// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // برای اسکن فایل‌های Angular
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // 👈 این خط حیاتی است
  plugins: [],
}

