/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: [],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),

            h4: {
              fontWeight: 'normal',
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
