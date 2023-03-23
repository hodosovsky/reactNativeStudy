// import { Text } from "react-native";

// const CommentsScreen = () => {
//   return (
//     <>
//       <Text>Comments screen</Text>
//     </>
//   );
// };

// export default CommentsScreen;
import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

import db from "../../firebase/config";

export default function CommentsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState(null);
  const photo = require("../../assets/images/Rectangle23.jpg");
  const onReturn = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocusInput = () => {
    setIsShowKeyboard(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Rectangle23.jpg")}
        style={styles.photo}
      />

      {/* <FlatList
        data={allComments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <View style={styles.dateAndTime}>
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateText}>'date'</Text>
                </View>
                <Text style={styles.timeText}>'date'</Text>
              </View>
            </View>
          </View>
        )}
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...Platform.select({
              ios: {
                ...styles.inputContainer,
                marginBottom: isShowKeyboard ? 120 : 0,
              },
            }),
          }}
        >
          <TextInput
            onSubmitEditing={onReturn}
            value={comment}
            onChangeText={(value) => setComment(value)}
            style={styles.input}
            onFocus={onFocusInput}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
          />

          <TouchableOpacity style={styles.sendBtn}>
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  photo: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentsContainer: {
    flex: 1,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    marginRight: 16,
  },
  comment: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 16,
  },
  commentText: {
    color: "#212121",
    fontFamily: "normal",
    fontSize: 13,
    lineHeight: 18,
  },
  dateAndTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateTextContainer: {
    borderRightWidth: 1,
    borderRightColor: "#BDBDBD",
    paddingRight: 4,
    marginRight: 4,
  },
  dateText: {
    color: "#BDBDBD",
    fontFamily: "normal",
    fontSize: 10,
    lineHeight: 12,
  },
  timeText: {
    color: "#BDBDBD",
    fontFamily: "normal",
    fontSize: 10,
    lineHeight: 12,
  },
  inputContainer: {
    marginTop: 6,
  },
  input: {
    position: "relative",
    height: 50,
    width: Dimensions.get("window").width - 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
