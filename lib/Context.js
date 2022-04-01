import { createContext } from "react/cjs/react.production.min";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useState, useEffect } from "react";

export const authContext = createContext({
  user: "null",
  username: "null",
});

export default function AuthenticationContext(props) {
  const [googleUser, setGoogleUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getUsername = async () => {
      const docRef = doc(db, `users/${userID}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap)
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
        getUsername();
      } else {
        setGoogleUser(null);
      }
    });
  }, [userID]);

  

  return (
    <authContext.Provider value={{ user: googleUser, username: username }}>
      {props.children}
    </authContext.Provider>
  );
}
