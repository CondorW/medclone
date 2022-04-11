import { createContext } from "react/cjs/react.production.min";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useState, useEffect } from "react";

export const authContext = createContext({
  user: "null",
  username: "null",
  userID: "null",
});

export default function AuthenticationContext(props) {
  const [googleUser, setGoogleUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getUsername = async (uid) => {
      const docRef = doc(db, `users/${uid}`);
      const docSnap = await getDoc(docRef);
      console.log("Database Read Executed");
      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
      } else {
        setUsername(null);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleUser(user.displayName);
        setUserID(user.uid);
        getUsername(user.uid);
      } else {
        setGoogleUser(null);
      }
    });
  }, []);

  

  return (
    <authContext.Provider value={{ user: googleUser, username: username , userID: userID}}>
      {props.children}
    </authContext.Provider>
  );
}
