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
            lineHeight: 1.65,

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
      maxWidth: {
        'screen-sm': '614px'
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
        'grow-fade': 'grow-fade 1s linear infinite'
      },

      keyframes: {
        'grow-fade': {
          '0%': { opacity: 0.5, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(2.5)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
