/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
     'Darkblue':'#2B3945',
     'Verydarkbg':'#202C37',
     'Verydarktext':'#111517',
     'Darkgray':'#858585',
     'Verylight':'#FAFAFA',
     'White':'#FFFFFF',


    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'sb': '740px',
      // => @media (min-width: 640px) { ... }
      'mb': '950px',
      // => @media (min-width: 768px) { ... }
    
      'md': '768px',
      // => @media (min-width: 768px) { ... }
    
      'lg': '1124px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
     
    },

  },
  plugins: [],
 
}
