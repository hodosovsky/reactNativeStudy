import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = db.auth().currentUser;

      await user.updateProfile({
        displayName: name,
      });

      const { uid, displayName, email: mail } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email: mail,
        })
      );

      console.log("user:", user);
    } catch (error) {
      console.log("error:", error);
      console.log("error:", error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);

      console.log("user:", user);
    } catch (error) {
      console.log("error:", error);
      console.log("error:", error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        })
      );

      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
