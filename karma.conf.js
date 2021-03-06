// Karma configuration
// Generated on Sun Aug 09 2015 21:31:51 GMT+0200 (CEST)

var browsers = process.env.hasOwnProperty('CI_BROWSER')
    ? [process.env.CI_BROWSER]
    : ['Chrome', 'PhantomJS'];
var generateCoverage = !!process.env['GENERATE_COVERAGE'] || false;
module.exports = function (config) {
    var karmaConfig = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'source-map-support'],

        jasmineDiffReporter: {
            pretty: true,
            multiline: true
        },


        // list of files / patterns to load in the browser
        files: [
            'test/bootstrap.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // 'test/bootstrap.js': ['webpack', 'sourcemap']
            'src/**/*': ['webpack'],
            'test/**/*':  ['webpack']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['jasmine-diff', 'dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_LOG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: browsers,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        webpack: require('./config/webpack.config'),

        client: {
            captureConsole: true
        },
        browserConsoleLogOptions: {
            level: 'log',
            terminal: true
        },
        webpackMiddleware: {
            noInfo: 'errors-only'
        },
        coverageReporter: {
            reporters: [
                {
                    type: 'json',
                    dir: 'build/coverage/json',
                    subdir: '.'
                }
            ]
        }
    };

    if (generateCoverage) {
        karmaConfig.reporters.push('coverage');
    }

    config.set(karmaConfig);
};
