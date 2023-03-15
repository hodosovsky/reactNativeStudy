import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import ToastManager, { Toast } from "toastify-react-native";

SplashScreen.preventAutoHideAsync();
const bg = require("../images/bg.jpg");
const initialState = {
  email: "",
  password: "",
};
export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    medium: require("../fonts/rmedium.ttf"),
    normal: require("../fonts/rregular.ttf"),
    bold: require("../fonts/rbold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const changeIsPasswordSecure = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (state.name === "" || state.email === "" || state.password === "") {
      Toast.error("all fields must be filled");
      return;
    }

    if (state.email.includes("@")) {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      console.log(state);
      setState(initialState);
      return;
    }

    Toast.error('Email must have "@"');
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground source={bg} style={styles.image}>
          <ToastManager
            hasBackdrop={true}
            duration={2000}
            backdropColor={"red"}
          />
          <View
            style={{
              ...styles.registerBox,
              paddingBottom: isShowKeyboard ? 32 : 144,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.form}>
                <Text style={styles.title}>Log In</Text>

                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                  }}
                  value={state.email}
                  placeholder={"Email"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setEmailFocus(true);
                  }}
                  onBlur={() => setEmailFocus(false)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, email: value }))
                  }
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: passwordFocus ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={isPasswordSecure}
                  value={state.password}
                  placeholder={"Password"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setPasswordFocus(true);
                  }}
                  onBlur={() => setPasswordFocus(false)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                />
                <Text
                  style={styles.swowPassword}
                  onPress={changeIsPasswordSecure}
                >
                  {isPasswordSecure ? "Show" : "Hide"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.7}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.login}>Don't have an account? Sign up</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  registerBox: {
    backgroundColor: "#fff",

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "normal",
    color: "#BDBDBD",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  password: {
    position: "relative",
  },
  swowPassword: {
    position: "absolute",
    top: 200,
    right: 32,
    color: "#1B4371",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
