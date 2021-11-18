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
        'accent': '#B8CDD2'
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
