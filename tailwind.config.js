module.exports = {
  purge: [
    './module/**.js',
    './templates/**.handlebars',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Jost', 'sans-serif']
    },
    extend: {
      colors: {
        accent: {
          200: '#CDD9DC',
          300: '#ACC3C8',
          400: '#6D9EA5',
          500: '#007D84'
        }
      }
    },
  },
  variants: {
    extend: {
      margin: ['last']
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
