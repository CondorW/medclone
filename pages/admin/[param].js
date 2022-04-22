import { collection, query, where, getDocs } from "firebase/firestore";

import Authcheck from "../../components/Authcheck";
import { authContext } from "../../lib/Context";
import { useContext, useState,useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";

export default function AdminParam(props) {
  //TODO Fetch the post with the url param containing the slug of the post from database
  //Display its content in an html form, where the text area is prepopulated with the content of the post but also editable
  //Create an update function which saves the updates made to the content property to the database

  const [contentState, setContentState] = useState("");

  const router = useRouter();
  const slug = router.query.param;

  const { userID } = useContext(authContext);  

  //TODO Wrap in useEffect, so that the contentState is updated when the post is fetched from the database

  const getPost = async () => {
    const docRef = collection(db, `users/${userID}/posts`);
    const q = query(docRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    console.log("Database Read Executed");
    querySnapshot.forEach((doc) => {
      setContentState(doc.data().content);
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getPost();
  }, []);
  //


  return (
    <Authcheck>
      <h1>Slug And Admin Route combined lead you to this route, Catch All</h1>
      <textarea value={contentState} onChange={(e) => setContentState(e.target.value)}></textarea>
      <button>Save my Edits</button>
    </Authcheck>
  );
}
