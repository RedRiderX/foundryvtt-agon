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
    extend: {},
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
