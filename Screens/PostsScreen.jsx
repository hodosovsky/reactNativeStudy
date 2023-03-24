import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import MapScreen from "./nestedScreens/MapScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

import db from "../firebase/config";

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ paddingRight: 12 }}
              onPress={() => dispatch(authSignOutUser())}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        options={{
          tabBarStyle: { display: "none" },
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
