import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { config as firebaseConfig } from "./config";
// Code edited from https://usehooks.com/useAuth/ and
// https://firebase.google.com/docs/auth/web/start#add-initialize-sdk
// Not my original work.
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const authContext = createContext();
const db = getFirestore(app);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (e, email, password) => {
    e.preventDefault();
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((error) => {
        alert(error);
      });
  };
  const registerWithEmailAndPassword = async (fullname, username, password) => {
    const database = getDatabase(app);
    try {
      const auth = getAuth(app);
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = res.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullname,
        authProvider: "local",
        username,
      });
      /*set(ref(database, 'employers/' + fullname), {
       
      });*/
      /*db.collection("employers").doc(fullname).set({
        uid: user.uid,
        email: username,
        fullname: fullname,
        authProvider:"local"
      })*/
    } catch (err) {
      //console.error(err);
      //alert(err.message);
    }
  };

  const signup = (e, email, password) => {
    e.preventDefault();
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };

  const signout = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return firebaseAuth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (code, password) => {
    return firebaseAuth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const auth = getAuth();

  const signOutWithGoogle = () => {
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //const registeruser = createUserWithEmailAndPassword(auth, email, password)
  //.then((userCredential) => {
  // Signed in
  //user = userCredential.user;
  // ...
  //})
  //.catch((error) => {
  // const errorCode = error.code;
  //const errorMessage = error.message;
  // ..
  //});
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    signOutWithGoogle,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle,
    registerWithEmailAndPassword,
  };
}
