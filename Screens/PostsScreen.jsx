import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
} from "react-native";
import ProfileScreen from "./ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PostsList from "../Components/PostsList";

const COURSES = {
  id: "45k6-j54k-4jth",
  title: "Natali Romanova",
  email: "email@example.com",
};
// {
//   id: "4116-jfk5-43rh",
//   title: "Natali Romanova",
//   email: "email@example.com",
// },
// {
//   id: "4d16-5tt5-4j55",
//   title: "Natali Romanova",
//   email: "email@example.com",
// },
// {
//   id: "LG16-ant5-0J25",
//   title: "Natali Romanova",
//   email: "email@example.com",
// },

export default function PostsScreen({ route }) {
  const [courses, setCourses] = useState(COURSES);
  const [state, setState] = useState([]);
  useEffect(() => {
    if (route.params) setState((prev) => [...prev, route.params]);
    console.log(state);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../assets/images/Rectangle.jpg")} />

        <View style={styles.description}>
          <Text style={styles.title}>{courses.title}</Text>
          <Text style={styles.email}>{courses.email}</Text>
        </View>
      </View>

      <PostsList state={state} />
      {/* <FlatList
        data={state}
        keyExtractor={(item) => Math.floor(Math.random() * 10000)}
        renderItem={({ item }) => (
          <View>
            <Image source={require("../assets/images/Rectangle.jpg")} />
          </View>
        )}
      /> */}
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
