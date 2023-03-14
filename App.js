import RegistrationScreen from "./assets/screens/auth/RegistrationScreen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <RegistrationScreen />
    </>
  );
}
