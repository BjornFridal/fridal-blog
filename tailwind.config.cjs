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

            h2: {
              marginBottom: '0.75rem'
            },

            h4: {
              fontWeight: 700,
              fontSize: '1.25rem'
            },

            code: {
              backgroundColor: theme('colors.yellow.50'),
              fontWeight: 400
            },

            a: {
              borderBottomColor: theme('colors.black'),
              borderBottomWidth: '1px',
              fontWeight: 600,
              textDecoration: 'none',

              '&:hover': {
                color: '#d227c4',
                textDecoration: 'none'
              }
            },

            pre: {
              fontSize: '14px'
            }
          }
        }
      }),
      animation: {
        'spin-slow': 'spin 7s linear infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
