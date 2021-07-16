module.exports= {  // 模块化写法
    // 提供一个对外接口
    devServer: { // 表示是开发环境配置
        proxy: { // 反向代理的字段
            '/ajax': { // 代理的接口是api  api之后的内容地址不一样，只要将相同的api提出来，后面的内容都会反向代理到
                target: 'http://m.maoyan.com/',  // 网址
                changeOrigin : true  // 反向代理的时候是否要改变反向的地址
            },
            '/dianying': {
                target: 'https://m.maoyan.com/',
                changeOrigin : true
            },
            // '/apollo': {
            //     target: 'https://m.maoyan.com/',
            //     changeOrigin : true
            // }
        }
    }
}
// export default { // ES6的写法
//     // 提供一个对外接口
//     devServer: { // 表示是开发环境配置
//         proxy: { // 反向代理的字段
//             '/api': { // 代理的接口是api  api之后的内容地址不一样，只要将相同的api提出来，后面的内容都会反向代理到
//                 target: 'http://39.97.33.178',  // 网址
//                 changeOrigin : true  // 反向代理的时候是否要改变反向的地址
//             }
//         }
//     }
// }