/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
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
