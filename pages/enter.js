import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Enter() {
  const user = null;
  const username = null;

  if (user) {
    if (!username) {
      return <UsernameForm></UsernameForm>;
    } else {
      return <SignOutButton></SignOutButton>;
    }
  } else {
    return <SignInButton></SignInButton>;
  }
}
function SignInButton() {
  // Need to wrap this in a try catch block for the case that authentication fails
  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider).then((result)=>{console.log(result)}).catch((error)=>{console.log(error)})
  };
  //End of ToDO
  return <button onClick={signInWithGoogle}>Sign in with GoOgLe</button>;
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>SignOut</button>;
}
function UsernameForm() {}
