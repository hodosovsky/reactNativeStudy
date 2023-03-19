import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Entypo } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

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

  return (
    <View style={styles.container}>
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
                await MediaLibrary.createAssetAsync(uri);
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
    </View>
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
    flex: 0.1,

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
});
