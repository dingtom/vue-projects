/*
 * @Author: your name
 * @Date: 2021-08-23 18:27:06
 * @LastEditTime: 2021-08-23 20:48:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage\babel.config.js
 */
// 项目发布阶段需要用到的Babel插件，放到plugin数组
const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
  // 打包时不允许出现console 移除console.log
  // 安装babel-plugin-transform-remove-console
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins
  ]
}
