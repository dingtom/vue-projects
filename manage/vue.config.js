/*
 * @Author: your name
 * @Date: 2021-08-23 18:27:06
 * @LastEditTime: 2021-08-23 21:19:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage\vue.config.js
 */

// 通过vue.config.js 修改webpack默认配置，vue-cli 3.0默认隐藏webpack的配置项

// 为开发模式与发布模式，设置不同的打包的入口文件

// 导出一个包含了自定义配置选项的对象
module.exports = {
  // 在vue. config. js导出的配置对象中，新増 configurewebpack或 chain Webpack节点，来自定义 webpack的打包配置
  // 在这里， configurewebpack和 chain Webpack的作用相同，唯一的区别就是它们修改 webpack配置的方式不同
  // ④ chain Webpack通过链式编程的形式，来修改默认的 webpack配置
  // ② configurewebpack通过操作对象的形式，来修改默认的 webpacki配置
  chainWebpack: config => {
    // 发布模式process.env.NODE_ENV === 'production'
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')  //默认打包入口
        .clear()  // 清空默认打包入口
        .add('./src/main-prod.js')  // 新增打包入口
        
      // 默认情况下，通过 Import语法导入的第三方依赖包，最终会被打包合并到同个文件中，从而导]包成功后，单文件体积过大的问题
      // 为了解决上述问题，可以通过 webpack的 externals节点，来配置并加载外部的CDN资源。凡是声明在
      // externals中的第三方依赖包，都不会被打包。去Windows全局查找使用该对象    
      // 同时，需要在 public/index. html文件的头部，添加如下的CDN资源引用 ！！！！！！！！！！    
      config.set('externals', {
        vue: 'Vue',
        // 包名: 全局对象
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      // tap修改参数,用于index.html首页定制
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
