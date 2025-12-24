// Service Methods To Validate User
import {
  checkName,
  checkemail,
  checkPassword,
  mathcingPasswords
} from "../utils/authUtils";

import { db, auth } from "../../Data";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc , serverTimestamp  } from "firebase/firestore";


// Validate User
function validateRegister(userData) {
  if (
    checkName(userData.fullname) &&
    checkemail(userData.email) &&
    checkPassword(userData.Password) &&
    mathcingPasswords(userData.Password, userData.ConfirmPassword)
  ) {
    return "success";
  }

  throw new Error("Some fields are incorrect");
}

// Creating User .Based Rule User
function createAuthUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.error("Auth create error:", error.code, error.message);
      throw error;
    });
}

// Creating New Document In FireBase
async function createUserDocument(uid, userData) {
  await setDoc(doc(db, "users", uid), {
    uid,
    fullname: userData.fullname,
    email: userData.email,
    isAdmin: false,
    allowOthersToSeeMyOrders: true,
    createdAt: serverTimestamp()
  });
}

export {
  validateRegister,
  createAuthUser,
  createUserDocument
};
