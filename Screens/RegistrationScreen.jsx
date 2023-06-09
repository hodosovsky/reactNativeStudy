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
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";

const bg = require("../assets/images/bg.jpg");
const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const dispatch = useDispatch();

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
      console.log("register state", state);
      dispatch(authSignUpUser(state));
      setState(initialState);
      // navigation.navigate("Home");
      return;
    }

    Toast.error('Email must have "@"');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevState) => ({ ...prevState, avatar: result.assets[0].uri }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.image}>
          <ToastManager
            hasBackdrop={true}
            duration={3000}
            backdropColor={"red"}
          />
          <View
            style={{
              ...styles.registerBox,
              paddingBottom: isShowKeyboard ? 32 : 78,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ position: "absolute", top: -60, left: 128 }}>
                <View style={styles.avatar}>
                  {state.avatar ? (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          setState((prevState) => ({
                            ...prevState,
                            avatar: null,
                          }))
                        }
                        style={{ ...styles.icon, right: 0 }}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={25}
                          color="#E8E8E8"
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: state.avatar }}
                        style={styles.avatarImage}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={pickImage} style={styles.icon}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.form}>
                <Text style={styles.title}>Registration</Text>

                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: nameFocus ? "#FF6C00" : "#E8E8E8",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setNameFocus(true);
                  }}
                  onBlur={() => setNameFocus(false)}
                  value={state.name}
                  placeholder={"Login"}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, name: value }))
                  }
                />
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
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.5}
              >
                <Text style={styles.login}> Already has account? Login</Text>
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
    flex: 0.75,
    backgroundColor: "#fff",

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "medium",
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
  swowPassword: {
    position: "absolute",
    top: 336,
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
