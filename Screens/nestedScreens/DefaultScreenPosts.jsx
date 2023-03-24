import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
} from "react-native";
import db from "../../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PostsList from "../../Components/PostsList";

const COURSES = {
  id: "45k6-j54k-4jth",
  title: "Natali Romanova",
  email: "email@example.com",
};

export default function DefaultScreenPosts({ route, navigation }) {
  const [courses, setCourses] = useState(COURSES);
  const [state, setState] = useState([]);

  console.log("state:", state);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();

    // if (route.params) setState((prev) => [...prev, route.params]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/images/Rectangle.jpg")} />

        <View style={styles.description}>
          <Text style={styles.title}>{courses.title}</Text>
          <Text style={styles.email}>{courses.email}</Text>
        </View>
      </View>

      <PostsList state={state} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    marginLeft: 8,
  },
  email: {
    marginLeft: 8,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 13,
  },
  ProfileBox: {
    flex: 0.7,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  name: {
    fontFamily: "normal",
    fontWeight: "semiBold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },
  // card: {
  //   marginBottom: 10,
  //   alignItems: "center",
  // },
  description: {
    textAlign: "flex-start",
  },
  cardTitle: {
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 10,
  },
  likes: {
    display: "flex",
    flexDirection: "row",
  },
});
