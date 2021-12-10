module.exports = {
  content: [
    './module/**/*.js',
    './templates/**/*.handlebars',
  ],
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
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
