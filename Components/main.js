import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useRoute } from "../router";
import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   db.auth().onAuthStateChanged((user) => setUser(user));

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
