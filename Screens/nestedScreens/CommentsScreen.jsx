import { useState, useEffect, useMemo } from "react";

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
import moment from "moment";

import { AntDesign } from "@expo/vector-icons";

import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState([]);
  const currentDate = new Date().toString();
  const { postId, photo, commentsCount } = route.params;
  const { name } = useSelector((state) => state.auth);
  const [allComments, setAllComments] = useState([]);
  console.log("allComments:", allComments);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, name, date: currentDate });

    getAllPosts();

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        commentsCount: commentsCount + 1,
      });

    setComment("");

    keyboardHide();
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocusInput = () => {
    setIsShowKeyboard(true);
  };

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  function checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.photo} />

        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
              <View style={styles.comment}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <View style={styles.dateAndTime}>
                  <View style={styles.dateTextContainer}>
                    <Text style={styles.dateText}>
                      {moment(new Date(item.date)).format("L")}
                      {/* {moment(item.date).format("D MMM, YYYY").toString()} */}
                    </Text>
                  </View>
                  <Text style={styles.timeText}>
                    {moment(new Date(item.date)).format("LT")}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

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
              onSubmitEditing={keyboardHide}
              value={comment}
              onChangeText={(value) => setComment(value)}
              style={styles.input}
              onFocus={onFocusInput}
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
            />

            <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
              <AntDesign name="arrowup" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
  // commentsContainer: {
  //   flex: 1,
  // },
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
