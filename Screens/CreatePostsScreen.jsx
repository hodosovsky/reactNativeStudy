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

const initialState = {
  uri: "",
  name: "",
  latitude: "",
  longitude: "",
};

export default function CreatePostsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // const handleLocation = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let location1 = await Location.getCurrentPositionAsync({});
  //   console.log(location1);
  //   // let text = "Waiting..";
  //   // if (errorMsg) {
  //   //   text = errorMsg;
  //   // } else if (location1) {
  //   //   text = JSON.stringify(location1);
  //   // }
  //   setLocation(JSON.stringify(location1));
  // };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    //  if (state.name === "" || state.email === "" || state.password === "") {
    //    Toast.error("all fields must be filled");
    //    return;
    //  }

    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        ></KeyboardAvoidingView>
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Download photo</Text>
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

          <Text style={styles.title}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#BDBDBD"
              style={{ position: "absolute", top: 124, left: 0 }}
            />
            {"  "}
            {state.latitude
              ? `${state.latitude} ${state.longitude}`
              : "Location"}
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Public</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 32, paddingHorizontal: 16 },
  camera: {
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
  title: {
    marginTop: 8,
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "normal",
    color: "#BDBDBD",
    padding: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
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
});
