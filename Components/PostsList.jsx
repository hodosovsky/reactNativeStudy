import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PostsList = ({ state, navigation }) => {
  console.log("state:", state);

  return (
    <FlatList
      style={styles.list}
      data={state}
      renderItem={({ item }) => {
        return (
          <View>
            <Image
              source={{ uri: item.uri }}
              style={{ width: "100%", height: 240 }}
            />
            <View style={styles.description}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.likes}>
                  <FontAwesome name="comment" size={24} color="#FF6C00" />
                  <Text
                    style={{
                      fontFamily: "normal",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#212121",
                      paddingBottom: 35,
                      marginLeft: 9,
                      marginRight: 27,
                    }}
                  >
                    {5}
                  </Text>
                </View>
                <View style={styles.likes}>
                  <AntDesign name="like2" size={24} color="#FF6C00" />
                  <Text
                    style={{
                      fontFamily: "normal",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#212121",
                      marginLeft: 9,
                    }}
                  >
                    {12}
                  </Text>
                </View>
              </View>
              <View
                style={styles.likes}
                onPress={() => navigation.navigate("Map")}
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text
                  style={{
                    fontFamily: "normal",
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121",
                    textDecorationLine: "underline",
                    marginLeft: 9,
                  }}
                >
                  {item.city}
                </Text>
              </View>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  card: {
    marginBottom: 10,
    alignItems: "center",
  },
  description: {
    textAlign: "flex-start",
  },
  title: {
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

export default PostsList;
