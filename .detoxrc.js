/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: 'failing',
    },
  },
  apps: {
    // 'ios.debug': {
    //   type: 'ios.app',
    //   binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/bluehstreifeniOS.app',
    //   build: 'xcodebuild -workspace ios/bluehstreifeniOS.xcworkspace -scheme bluehstreifeniOS -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    //   // build: 'xcodebuild -project ios/bluehstreifeniOS.xcodeproj -scheme bluehstreifeniOS -sdk -configuration Debug iphonesimulator -derivedDataPath ios/build'

    // },
    'ios.release': {
      type: 'ios.app',
      build: 'xcodebuild -workspace ios/bluehstreifeniOS.xcworkspace -scheme bluehstreifeniOS -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/bluehstreifeniOS.app',
      // build: 'xcodebuild -workspace ios/bluehstreifeniOS.xcworkspace -scheme bluehstreifeniOS -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
      // build: 'xcodebuild -project ios/bluehstreifeniOS.xcodeproj -scheme bluehstreifeniOS -sdk -configuration Release iphonesimulator -derivedDataPath ios/build'

    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14 Pro Max'
      }
    },
    // attached: {
    //   type: 'android.attached',
    //   device: {
    //     adbName: '.*'
    //   }
    // },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_x86'
      }
    }
  },
  configurations: {
    // 'ios.sim.debug': {
    //   device: 'simulator',
    //   app: 'ios.debug'
    // },
    'ios.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
