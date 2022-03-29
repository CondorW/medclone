import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { authContext } from "../lib/Context";
import { useContext } from "react";

export default function Enter(props) {
  const { user, username } = useContext(authContext);

  console.log(user, username);

  if (user) {
    if (!username) {
      return (
        <div>
          <h1>Hello Google User {user}</h1>
          <UsernameForm></UsernameForm>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hello Google User {user} with site username {username}</h1>
          <SignOutButton></SignOutButton>
        </div>
      );
    }
  } else {
    return <SignInButton></SignInButton>;
  }
}

function SignInButton() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <button onClick={signInWithGoogle}>Sign in with GoOgLe</button>;
}
function SignOutButton() {
  const signOutHandler = async () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <button onClick={signOutHandler}>SignOut</button>;
}
function UsernameForm() {
  return (
    <form>
      <input type="text" placeholder="Enter your Username" />
    </form>
  );
}
