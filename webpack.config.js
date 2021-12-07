module.exports = {
  entry: './app/static/js/main.js',
  output: {
    path: `${__dirname}/dist/static/js`,
    filename: 'main.min.js'
  },
  mode: 'production',
};
