/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      //General
      'bg': '#EFF6FF',
      'title': '#3d0604',
      'content': '#542638',
      'shadow':'#AD7980',
      //Navigation
      'nav-bg': '#C1B4D7',
      'nav-border':'#855e6e',
      'link-bg': '#b42529',
      'link-border': '#ffc219',
      //Cards
      'card-bg': '',
      'card-border': '',
      //Table
      'table-bg': '',
      'table-border': '',
      //Buttons
      'submit': '#198754',
      'info': '#1f2937',
      'modify': '#040174',
      'delete':'#800803',
    },
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ]
}

