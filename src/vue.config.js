// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ],
  },
  configureWebpack: {
    // plugins: [
    //   new VuetifyLoaderPlugin()
    // ],
    //调试JS
    devtool: "source-map",
    css: {
      // extract: {
      //   ignoreOrder: true
      // },
      //查看CSS属于哪个css文件
      sourceMap: true
    }
  },
};