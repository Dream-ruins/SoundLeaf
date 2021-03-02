module.exports = {
  //域名的根路径
  publicPath: process.env.NODE_ENV === "production" ? "/msp/" : "/",

  devServer: {
    //是否自动开启浏览器
    open: true,
    host: "localhost",
    //端口
    port: 5050,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      "/api": {
        target: "http://172.10.10.10:8080/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "/", //请求的时候使用这个api就可以
        },
      },
    },
  },
};
