/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [defaultTheme.fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: '1.15rem',
            fontWeight: 500,

            h4: {
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '5rem'
            }
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
