import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { authContext } from "../lib/Context";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Enter(props) {
  const { user, username } = useContext(authContext);

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
  const { user } = useContext(authContext);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    const validationRegex =
      /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    const checkUsername = async () => {
      const docRef = doc(db, `usernames/${username}`);
      const docSnap = await getDoc(docRef);
      console.log("Firestore read executed");
      if (docSnap.exists()) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    };

    let timerId = setTimeout(() => {
      if (username.length > 5 && validationRegex.test(username)) {
        checkUsername();
      } else {
        console.log("invalid");
        setIsValid(false);
      }
    }, 500);

    return () => {
      console.log("Clearing timeout");
      clearTimeout(timerId);
    };
  }, [username]);

  const submitHandler = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "users", auth.lastNotifiedUid), {
      displayName: user,
      username: username,
    });
    await setDoc(doc(db, "usernames", username), { uid: auth.lastNotifiedUid });
    window.location.reload();
  };

  return (
    <form className="mx-2" action="submit" onSubmit={submitHandler}>
      <input
        name="username"
        type="text"
        onChange={usernameChangeHandler}
        value={username}
        placeholder="Enter your Username"
      />
      {!isValid ? (
        <p className="text-red-700">
          Username does not pass validation criteria
        </p>
      ) : (
        <p className="text-green-700">
          Your username passses validation criteria
        </p>
      )}
        <button
          className="text-white bg-black px-2 rounded-full font-bold"
          disabled={!isValid}
          type="submit"
          onClick={() => {
            toast.success("Username set!");
          }}
        >Submit</button>
    </form>
  );
}
