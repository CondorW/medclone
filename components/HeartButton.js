import { doc, onSnapshot } from "firebase/firestore";
import { db, getPostIDWithSlug } from "../lib/firebase";
import toast from "react-hot-toast";

import { useContext, useState } from "react";

import { authContext } from "../lib/Context";

export default function HeartButton(props) {
  //TODO implement a realtime subscription to hearts subcollection of corresponding post, if the uid of the currently authenticated user, already
  //exists in the hearts collection, return true, if not return false - according to that conditionally render heart and unheart.
  //When the heart button is clicked, post hearts get incremented by 1, and the uid of the currently authenticated user is added to the hearts collection
  //of the corresponding post.
  const [isLiked, setIsLiked] = useState(false);
  let { user, userID } = useContext(authContext);

  const unsub = onSnapshot(
    doc(db, `users/${userID}/posts/${props.postID}/hearts/${userID}`),
    (snapshot) => {
      snapshot.exists ? setIsLiked(true) : setIsLiked(false);
      console.log("hearts snapshot", snapshot);
    }
  );
  if (isLiked) {
    return (
      <button
        className="bg-indigo-600 w-20 rounded p-1 font-semibold"
        onClick={() => toast.error("UNHEARTED")}
      >
        {props.heartCount} Hearts
      </button>
    );
  } else {
    return (
      <button
        className="bg-red-600 w-20 rounded p-1 font-semibold"
        onClick={() => toast.success("HEART")}
      >
        {props.heartCount} Hearts
      </button>
    );
  }
}
