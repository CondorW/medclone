import { createContext } from "react/cjs/react.production.min";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

export const authContext = createContext({
  user: "null",
  username: "null",
});

export default function AuthenticationContext(props) {
  const [googleUser, setGoogleUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      setGoogleUser(user.displayName);
    } else {
      setGoogleUser(null);
    }
  });

  return (
    <authContext.Provider value={{ user: googleUser, username: "Jeff" }}>
      {props.children}
    </authContext.Provider>
  );
}
