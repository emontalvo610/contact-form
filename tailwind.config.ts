const tailwindBaseConfig = require('@pickleballinc/configs');

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [tailwindBaseConfig],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365'
        },
        secondary: {
          DEFAULT: '#6FC5E4',
          50: '#D0E9F0',
          100: '#C7E4ED',
          200: '#B3DBE7',
          300: '#A0D2E1',
          400: '#8CC8DB',
          500: '#79BFD5',
          600: '#4EABC8',
          700: '#358DA9',
          800: '#28697E',
          900: '#1A4653'
        },
        danger: {
          DEFAULT: '#EA5455',
          50: '#F4A6A6',
          100: '#F39D9D',
          200: '#F18B8B',
          300: '#EE7879',
          400: '#EC6667',
          500: '#EA5455',
          600: '#E7393A',
          700: '#E31D1F',
          800: '#C9191A',
          900: '#AE1516'
        },
        primary: {
          600: '#254EDB',
          700: '#1939B7'
        },
        warning: {
          100: '#FFFCF5',
          300: '#FEC84B',
          700: '#B54708'
        }
      },
      fontSize: {
        sm: '14px',
        md: '16px',
        xmd: '18px'
      }
    },
    screens: {
      mi: { max: '450px' },
      sm: { max: '639px' },
      ld: { min: '640px' }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
export default config;
