import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
} from "react-native";

const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "Natali Romanova",
    email: "email@example.com",
  },
  {
    id: "4116-jfk5-43rh",
    title: "Natali Romanova",
    email: "email@example.com",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "Natali Romanova",
    email: "email@example.com",
  },
  {
    id: "LG16-ant5-0J25",
    title: "Natali Romanova",
    email: "email@example.com",
  },
];

export default function PostsScreen() {
  const [courses, setCourses] = useState(COURSES);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image source={require("../assets/images/Rectangle.jpg")} />

              <View style={styles.description}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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
    marginBottom: 10,
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
});
