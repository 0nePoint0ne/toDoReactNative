module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    preset: "react-native",
    setupFiles: ['./jest.setup.js'],
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)"
    ],
    jest: {
      "setupFiles": ["jest/setup.js"]
    },
  };