exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        deviceName: 'emulator-5554',
        app: '/path/to/your/app.apk',
        automationName: 'UiAutomator2'
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    services: ['appium'],
    appium: {
        command: 'appium',
    },
    mochaOpts: {
        timeout: 60000
    }
};