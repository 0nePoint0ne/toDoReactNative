import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import styles from '../../styles';

function LoginScreen({ navigation }) {
  const [compatible, setCompatible] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  useEffect(() => {
    if(compatible) {
      authenticate();
    }
  }, [compatible]);

  async function checkDeviceForHardware() {
    let isCompatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible(isCompatible);
  }

  async function authenticate() {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.replace("ToDo");
    }
  }

  return (
    <View style={styles.container}/>
  );
}

export default LoginScreen;
