
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'test-dist/tests.js'
    ],

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },

    browsers: ['ChromeHeadless'],

    singleRun: true,

    client: {
      clearContext: false
    }
  })
}
