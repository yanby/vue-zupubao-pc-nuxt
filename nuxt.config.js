const webpack = require('webpack')
const resolve = require("path").resolve;
module.exports = {
  router: {
    extendRoutes (routes) {
      routes.push({
        name: "index",
        path: "*",
        component: resolve(__dirname, "pages/index.vue")
      })
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '租铺宝-优铺',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://up-img.oss-cn-beijing.aliyuncs.com/Icon-20.png' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/css/swiper.min.css'}
    ],
    script: [
      {src: 'http://api.map.baidu.com/api?v=2.0&ak=OxAEbfrVXXqWUSC4nP8mYi3bTKRBcP6u'},
      {src: "https://s19.cnzz.com/z_stat.php?id=1273667551&web_id=1273667551"},
      {src: "https://hm.baidu.com/hm.js?02f77b7a5e9d7a9600c2c4b1b8aed6ff"},
      {src: "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/js/swiper.min.js"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/youmeng',
    '~/plugins/route'
  ],
  //全局css
  css:[
    '~assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*关闭ESLint
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    vendor: [
      'axios',
      'element-ui'
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ]
  }
}

