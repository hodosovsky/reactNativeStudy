import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import uuid from "react-native-uuid";

const initialState = {
  id: "",
  uri: "",
  name: "",
  latitude: "",
  longitude: "",
  city: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");

      const loc = await Location.requestForegroundPermissionsAsync();
      if (loc.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    // if (state.name === "" || state.city === "") {
    //   Toast.error("all fields must be filled");
    //   return;
    // }
    // if (state.uri === "") {
    //   Toast.error("Make photo, please");
    //   return;
    // }

    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setState(initialState);
    navigation.navigate("DefaultScreen", state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ToastManager
          hasBackdrop={true}
          duration={2000}
          backdropColor={"red"}
        />
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, color: "red" }}> Flip </Text>
          </TouchableOpacity>

          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  setPhoto(uri);
                  const location = await Location.getCurrentPositionAsync({});

                  setState((prev) => ({ ...prev, uri }));
                  await MediaLibrary.createAssetAsync(uri);
                  setState((prev) => ({
                    ...prev,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    id: uuid.v4(),
                  }));
                  console.log(state);
                }
              }}
            >
              <View style={styles.takePhotoOut}>
                <Entypo name="camera" size={20} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: photo }}
            style={{ width: 140, height: 100, alignSelf: "flex-end" }}
          />
        </Camera>

        <View style={styles.form}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.title}>
              {photo ? "Change Photo" : "Download photo"}
            </Text>
            <TextInput
              style={styles.input}
              value={state.name}
              placeholder={"Name..."}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, name: value }))
              }
            />

            <TextInput
              style={{ ...styles.input, paddingLeft: 25 }}
              value={state.city}
              placeholder={"Location"}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, city: value }))
              }
            />
            <Ionicons
              name="location-outline"
              size={18}
              color="#BDBDBD"
              style={{ position: "absolute", top: 108, left: 0 }}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Public</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  camera: {
    flex: 0.55,
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.2,

    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  form: {
    flex: 0.6,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 8,
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "normal",
    color: "#BDBDBD",
    backgroundColor: "transparent",
    padding: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  btn: {
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
    width: "100%",
    alignSelf: "center",
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
});
