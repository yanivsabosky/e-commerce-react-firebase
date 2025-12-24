import { db, auth } from "../../Data";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

async function LogginUser(email, password) {
  try {
    // Firebase Auth login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user document
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("User document does not exist in Firestore");
    }

    const {
      fullname,
      email: dbEmail,
      isAdmin,
      allowOthersToSeeMyOrders
    } = snapshot.data();

    return {
      fullname,
      email: dbEmail,
      isAdmin,
      allowOthersToSeeMyOrders,
      uid: user.uid
    };

  } catch (error) {
    console.error("Login error:", error.code || error.message);

    //  Auth errors
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      throw new Error("Wrong email or password");
    }

    //  Firestore permission error
    if (error.code === "permission-denied") {
      throw new Error("Permission denied (Firestore rules)");
    }

    //  Any other error
    throw new Error(error.message || "Login failed");
  }
}

export { LogginUser };



