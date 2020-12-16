// 配置vue项目
module.exports = {
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        port: '9527',
        open: true, //自动在浏览器地址栏打开项目
        proxy: { //配置跨域请求
            '/api': {
                target: 'https://x.dscmall.cn/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}