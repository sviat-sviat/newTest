let realTimeConsoleSpecReporter = require('jasmine-spec-reporter').SpecReporter;
require("ts-node").register();

exports.config = {
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function () {},
  },
  directConnect:true,
  restartBrowserBetweenTests: true,
  specs: ["./tests/**/*.spec.ts"],

  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: [
        "--start-maximized",
      ],
      excludeSwitches: [
        "enable-logging",
        "enable-automation",
      ],
      prefs: {
        "credentials_enable_service": false,
        "profile.password_manager_enabled": false,
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: downloadsPath,
        }
      }
    },
  },

  onPrepare() {
    const jasminEnv = jasmine.getEnv();

    // REPORTING
    jasminEnv.clearReporters(); // remove default reporter logs

    // jasmine-spec-reporter (real-time reporter)
    jasminEnv.addReporter(new realTimeConsoleSpecReporter({
      spec: {
        displayPending: true,
        displayDuration: true
      },
      summary: {
        displaySuccesses: false,
        displayFailed: false,
        displayPending: false
      }
    }));
},
}