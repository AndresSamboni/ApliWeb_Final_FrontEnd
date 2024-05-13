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
      'bg': '#ffdbd7',
      'title': '#3d0604',
      'content': '#542638',
      'shadow':'#ce7095',
      //Navigation
      'nav-bg': '#fa7f77',
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
      'subtmit': '#3c8f2e',
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

