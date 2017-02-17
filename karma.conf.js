var webpackConfig = require("./webpack.config.js");

let travis = process.env.TRAVIS || false;

if(travis) console.log("Running in Travis!");

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["mocha", "chai", "sinon"],

    files: [
      'tests/*.test.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      "tests/*.test.ts": ["webpack"]
    },
    reporters: ['mocha'],
    singleRun: false,

    port: 9876,
    colors: true,
    singleRun: travis,

    logLevel: config.LOG_INFO,
    autoWatch: true,
    plugins: ["karma-*"],
    browsers: ["PhantomJS"],

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    concurrency: Infinity,
    webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        }
  })
}
