var fs = require("fs");

module.exports = {
  /**
   * base URL at domain
   */
  publicPath: "/",

  /**
   * directory where the production build files will be generated
   */
  outputDir: "dist",

  /**
   * directory to nest generated static assets (relative to outputDir)
   */
  assetsDir: "",

  /**
   * output path for the generated index.html (relative to outputDir)
   */
  indexPath: "index.html",

  /**
   * filename hashing for better caching control
   */
  filenameHashing: true,

  /**
   * build the app in multi-page mode.
   */
  // pages: {
  //   index: {
  //     entry: "path/to/main.js",
  //     template: "path/to/index.html",
  //     filename: "index.html",
  //     title: "My Page",
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   },
  //   subpage: "path/to/subpage/main.js"
  // },

  /**
   * Whether to perform lint-on-save during development using eslint-loader.
   * This is respected only when @vue/cli-plugin-eslint is installed.
   *
   * boolean | "warning" | "default" | "error"
   */
  lintOnSave: "warning",

  /**
   * use the build of Vue core that includes the runtime compiler.
   * Required for the usage of "template" in Vue components.
   * Incurs approx. 10kb payload for the app.
   */
  runtimeCompiler: true,

  /**
   * Explicitly transpile a dependency with Babel
   */
  transpileDependencies: [],

  /**
   * Disabling can speed up production builds
   */
  productionSourceMap: true,

  /**
   * Configure the crossorigin attribute on <link rel="stylsheet"> and <script> tags.
   */
  //crossorigin: "",

  /**
   * enable subresource integrity on <link rel="stylesheet"> and <script> tags.
   */
  integrity: false,

  /**
   * configure WebPack
   */
  //configureWebPack: {},

  /**
   * More fine-grained modification of the internal webpack config
   */
  //chainWebpack: () -> {},

  css: {
    /**
     * Disabling allows you to drop .module in the filenames and treat all
     * *.(css|scss|sass|less|styl(us)?) files as CSS modules.
     */
    requireModuleExtension: true,

    /**
     * Whether to extract CSS in your components into a standalone CSS file
     * (instead of inlined in JavaScript and injected dynamically)
     */
    extract: false,

    /**
     * Whether to enable source maps for CSS. Enabling may affect build
     * performance.
     */
    sourceMap: false,

    /**
     * pass options to CSS-related loaders.
     */
    loaderOptions: {},
  },

  /**
   * supports all options for webpack-dev-server.
   * Values host, port and https may be overwritten by command line flages.
   * Values publicPath and historyApiFallback need to be synchronized with
   * publicPath for the dev server to function properly.
   */
  devServer: {
    /**
     * Specify a host to use.
     */
    //host: "0.0.0.0",
    host: "kuugel.com",

    /**
     * Specify a port number to listen for requests on.
     */
    port: 9090,

    /**
     * dev-server will be served over HTTP/2 with HTTPS.
     * "true" option uses a self-signed certificate.
     * object can be used to provide a certificate
     */
    //https: true,
    https: {
      key: fs.readFileSync("./kuugel.com-key.pem"),
      cert: fs.readFileSync("./kuugel.com.pem"),
    },
  },
  chainWebpack: config => {
    config
    .plugin("html")
    .tap(args => {
      args[0].title = "KUUGEL";
      return args;
    });
  },
};
