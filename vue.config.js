const resolve = dir => require('path').join(__dirname, dir)
module.exports = {
  // publicPath:'/',
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'vuestatic',
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: `http://localhost:8081/finalwork`,
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     },
    //   }
    // }
  },
  
}