import {
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

import { useContext, useState } from "react";

import { authContext } from "../lib/Context";

export default function HeartButton(props) {
  //TODO implement a realtime subscription to hearts subcollection of corresponding post, if the uid of the currently authenticated user, already
  //exists in the hearts collection, return true, if not return false - according to that conditionally render heart and unheart.
  //When the heart button is clicked, post hearts get incremented by 1, and the uid of the currently authenticated user is added to the hearts collection
  //of the corresponding post.
  const [isLiked, setIsLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  let { user, userID } = useContext(authContext);

  const unsubWhoHearted = onSnapshot(
    doc(db, `users/${userID}/posts/${props.postID}/hearts/${userID}`),
    (snapshot) => {
      snapshot.exists() ? setIsLiked(true) : setIsLiked(false);
    }
  );
  const unsubHeartCount = onSnapshot(
    doc(db, `users/${userID}/posts/${props.postID}`),
    (snapshot) => {
      snapshot.data() ? setHeartCount(snapshot.data().heartCount) : null;
    }
  );

  const heartClickHandler = async () => {
    const batch = writeBatch(db);
    if (!isLiked) {
      batch.set(
        doc(db, `users/${userID}/posts/${props.postID}/hearts/`, userID),
        { uid: userID }
      );
      batch.update(doc(db, `users/${userID}/posts/${props.postID}`), {
        heartCount: increment(1),
      });
      toast.success("Post LIKED");
    } else {
      batch.delete(
        doc(db, `users/${userID}/posts/${props.postID}/hearts/${userID}`)
      );
      batch.update(doc(db, `users/${userID}/posts/${props.postID}`), {
        heartCount: increment(-1),
      });
      toast.error("Post UNLIKED");
    }
    await batch.commit();
  };

  if (isLiked) {
    return (
      <button
        className="bg-indigo-600 w-20 rounded p-1 font-semibold"
        onClick={heartClickHandler}
      >
        {heartCount} Hearts
      </button>
    );
  } else {
    return (
      <button
        className="bg-red-600 w-20 rounded p-1 font-semibold"
        onClick={heartClickHandler}
      >
        {heartCount} Hearts
      </button>
    );
  }
}
