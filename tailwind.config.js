/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'false',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#4318E3',
        shadow: '#DCDCDE',
        mainHover: '#633fe8',
        neutral: '#ADACB0',
        dashboard_background: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
