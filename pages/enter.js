import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { authContext } from "../lib/Context";
import { useContext, useState, useEffect } from "react";

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
          <h1>
            Hello Google User {user} with site username {username}
          </h1>
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
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  }

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (username.length > 5 && username !== "") { //second condition should check whether username already exists in firebase
        console.log("valid");
        setIsValid(true);
      }
      else{
        console.log("invalid");
        setIsValid(false);
      }
    },500);

    return () => {
      console.log("Clearing timeout");
      clearTimeout(timerId);
    };
  }, [username]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.username.value);
  };

  return (
    <form className="mx-2" action="submit" onSubmit={submitHandler}>
      <input name="username" type="text" onChange={usernameChangeHandler} value={username} placeholder="Enter your Username" />
      {!isValid ? <p className="text-red-700">Username does not pass validation criteria</p> : <p className="text-green-700">Your username passses validation criteria</p>}
      <button className="text-white bg-black px-2 rounded-full font-bold" disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
}
