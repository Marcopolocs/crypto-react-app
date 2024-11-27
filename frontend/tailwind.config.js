/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,ts,tsx}'],
  important: '#root',
  theme: {
    colors: {
      blue: {
        mainBgBlue: '#03274C',
        darkestBlue: '#090E17',
        darkerBlue: '#051629',
        lightBlue: '#0A5BAF',
        lighterBlue: '#0B66C2',
        lightestBlue: '#56A6F6',
      },
      white: '#ffffff',
      yellow: {
        bitcoin: '#EF8F19',
        deeperBitcoin: '#C77013',
      },
      red: {
        brightRed: '#e21b0b',
        darkerRed: '#cc1809',
        darkestRed: '#b51205',
      },
      grey: {
        buttonBgGrey: '#192738',
        darkGrey: '#333333',
      },
      green: {
        brightGreen: '#00b300',
        darkerGreen: '#009900',
        darkestGreen: '#007700',
      },
    },
    extend: {
      boxShadow: {
        custom: '2px 1px 10px #039be5',
      },
      borderRadius: {
        'radius-40': '40px',
        'radius-20': '20px',
        'radius-10': '10px',
        'radius-15': '15px',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        custom: '450px',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        custom: '450px',
      },
    },
  },
  plugins: [],
  entry: ['./src/index.css', './src/index.js'],
};
