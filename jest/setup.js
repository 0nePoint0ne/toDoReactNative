jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.NativeModules.RNCNetInfo = {
    getCurrentState: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  };
  return rn;
});


jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')