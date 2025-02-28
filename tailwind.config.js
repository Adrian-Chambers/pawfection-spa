/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FCE4EC', // Light pink
          DEFAULT: '#F8BBD0', // Pink
          dark: '#EC407A', // Dark pink
        },
        secondary: {
          light: '#E1F5FE', // Light blue
          DEFAULT: '#B3E5FC', // Blue
          dark: '#29B6F6', // Dark blue
        },
        accent: {
          DEFAULT: '#FFD54F', // Yellow
        },
        fur: {
          brown: '#8D6E63',
          golden: '#FFB74D',
          black: '#424242',
          white: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        display: ['var(--font-fredoka-one)'],
      },
    },
  },
  plugins: [],
}