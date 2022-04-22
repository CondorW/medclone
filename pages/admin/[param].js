import { collection, query, where, getDocs } from "firebase/firestore";

import Authcheck from "../../components/Authcheck";
import { authContext } from "../../lib/Context";
import { useContext } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";

export default function AdminParam(props) {
  //TODO Fetch the post with the url param containing the slug of the post from database
  //Display its content in an html form, where the text area is prepopulated with the content of the post but also editable
  //Create an update function which saves the updates made to the content property to the database

  const router = useRouter();
  const slug = router.query.param;

  const { userID } = useContext(authContext);
  console.log(userID);

  const getPost = async () => {
    const docRef = collection(db, `users/${userID}/posts`);
    const q = query(docRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    console.log("Database Read Executed");
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <Authcheck>
      <h1>Slug And Admin Route combined lead you to this route, Catch All</h1>
      <button onClick={getPost}>Let me edit my post</button>
    </Authcheck>
  );
}
