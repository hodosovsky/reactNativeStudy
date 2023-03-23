import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Provider } from "react-redux";

import Main from "./Components/main";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    medium: require("./assets/fonts/rmedium.ttf"),
    normal: require("./assets/fonts/rregular.ttf"),
    bold: require("./assets/fonts/rbold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
