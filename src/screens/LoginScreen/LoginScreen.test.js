import React from 'react';
import { render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../path_to_your_component/LoginScreen';
import * as LocalAuthentication from 'expo-local-authentication';

// Mocking the navigation object
const mockNavigation = {
  replace: jest.fn()
};

// Mocking LocalAuthentication methods
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

describe('<LoginScreen />', () => {
  beforeEach(() => {
    // Resetting the mock functions
    mockNavigation.replace.mockReset();
    LocalAuthentication.hasHardwareAsync.mockReset();
    LocalAuthentication.authenticateAsync.mockReset();
  });

  it('checks for device compatibility on load', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    await act(async () => {
      render(
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    });

    expect(LocalAuthentication.hasHardwareAsync).toHaveBeenCalled();
  });

  it('authenticates the user when device is compatible', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    await act(async () => {
      render(
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    });

    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled();
  });

  it('navigates to ToDo when authentication is successful', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    await act(async () => {
      render(
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    });

    expect(mockNavigation.replace).toHaveBeenCalledWith('ToDo');
  });

  it('does not authenticate if the device is not compatible', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(false);

    await act(async () => {
      render(
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    });

    expect(LocalAuthentication.authenticateAsync).not.toHaveBeenCalled();
  });

  it('does not navigate to ToDo when authentication is unsuccessful', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });

    await act(async () => {
      render(
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    });

    expect(mockNavigation.replace).not.toHaveBeenCalled();
  });
});
