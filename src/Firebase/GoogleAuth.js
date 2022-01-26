import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./Firebase";

function signInWithFirebase() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      localStorage.setItem("user_name", result.user.displayName);
      localStorage.setItem("user_dp", result.user.photoURL);
      localStorage.setItem("user_email", result.user.email);
      localStorage.setItem("user_uid", result.user.uid);
      localStorage.setItem("user_accessToken", result.user.accessToken);
    })
    .then(() => window.location.reload())
    .catch((error) => {
      console.log(error);
    });
}

function firebaseSignOut() {
  signOut(auth)
    .then(() => {
      console.log("signout successful");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_dp");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_uid");
      localStorage.removeItem("user_accessToken");
    })
    .then(() => window.location.reload())
    .catch((error) => {
      console.log(error);
    });
}

export { signInWithFirebase, firebaseSignOut };
