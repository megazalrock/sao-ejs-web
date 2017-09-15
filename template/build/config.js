module.exports = {
  jsDirName: 'js',
  jsFileName: 'main.js',
  cssDirName: 'css',
  sourceDir: 'src',
  distDir: 'dist',
  staticDir: 'static',
  sourceMapDir: './maps',
  browsers: <%- JSON.stringify(browsers) %>,
  port: 3000,
  host: '127.0.0.1',
};
