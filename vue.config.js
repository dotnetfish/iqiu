const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CDN_ADDRESS = `https://static.likedu.top${ process.env.VUE_APP_CONFIG_ENV === 'production' ? "/aiqiu-prod/pc/dist/" : "/aiqiu-prod/pc/dist/" }`;
const CDN_ADDRESS = `${process.env.VUE_APP_CDN === 'production' ? "https://static.iqiulive.cn" : "https://static.iqiulive.cn"}/aiqiu-prod/pc/dist/`;

// const path = require("path");

// function resolve(dir) {
//     return path.join(__dirname, ".", dir);
// }

console.log(process.env.VUE_APP_ZY_API, "VUE_APP_ZY_API");
// console.log(process.env.VUE_APP_DOMAIN, "VUE_APP_DOMAIN");
console.log(process.env.VUE_APP_CONFIG_ENV, "VUE_APP_CONFIG_ENV");
console.log(CDN_ADDRESS, 'CDN_ADDRESS');
module.exports = () => {
  let prodConfig = {
    // runtimeCompiler: true,
    chainWebpack: config => {
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 图片使用cdn 不需要打包js内
      // config.module
      //   .rule("images")
      //   .use("url-loader")
      //   .loader("url-loader")
      //   .tap(options => Object.assign(options, { limit: 10240 }));
      // svg相关 暂时未使用
      // config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
      // config.module
      //     .rule("svg-sprite-loader")
      //     .test(/\.svg$/)
      //     .include.add(resolve("src/assets/icons"))
      //     .end()
      //     .use("svg-sprite-loader")
      //     .loader("svg-sprite-loader")
      //     .options({
      //         symbolId: "icon-[name]"
      //     });
    }
  };
  if (process.env.NODE_ENV === "production") {
    // mutate config for production...
    prodConfig = Object.assign(prodConfig, {
      // outputDir: `build/static/${TIMESTAMP}/`,
      // publicPath: "",
      publicPath: CDN_ADDRESS,
      productionSourceMap: false,
      configureWebpack: {
        output: {
          filename: "[hash:10].js",
          chunkFilename: "[chunkhash:10].js"
        },
        plugins: [
          /**
           * console 打包处理
           */
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: { // TODO 直播视频高度 打包去掉console有问题
                drop_console: true
              },
              output: {
                // 去掉注释内容
                // comments: true
              }
            },
            sourceMap: false,
            parallel: true
          })
        ]
      }
    });
  } else {
    prodConfig = Object.assign(prodConfig, {
      configureWebpack: {
        devtool: "eval-source-map",
        plugins: []
      },
      devServer: {
        disableHostCheck: true,//(required)
        port: 7777,
        host: '0.0.0.0',
        proxy: {
          "/aiqiu/*": {
            target: "https://api.iqiulive.cn", // test
            changeOrigin: true
          },
          // "/mock/*": {
          //   target: "https://mock.yonyoucloud.com", // test
          //   changeOrigin: false,
          //   secure: false
          // }
        }
      }
    });
  }
  return prodConfig;
};
