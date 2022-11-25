module.exports = {

    chainWebpack: config => {
        // 配置
        config.module
          .rule('worker')
          .test(/\.worker\.js$/)
          .use('worker')
          .loader('worker-loader')
          .options({
            inline: 'fallback'
          })
        // 解决 "window is undefined", 这是因为 worker 线程中不存在 window 对象, 要用 this 代替: (不过我的项目中配置了这个也不行, 用的 self 代替, 后面介绍)
        config.output.globalObject('this')
    },
    // 解决打包的时报错: (由于一些原因我的项目最后没有使用 worker, 也就没有研究打包遇到的问题...)
    parallel: false,
}