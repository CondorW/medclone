import { doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";

import Authcheck from "../../components/Authcheck";
import { authContext } from "../../lib/Context";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";

import toast from "react-hot-toast";
import Router from "next/router";


export default function AdminParam(props) {

  const [contentState, setContentState] = useState("");
  const [docID, setDocID] = useState("");

  const router = useRouter();
  const slug = router.query.param;

  const { userID } = useContext(authContext);

  const getPost = async () => {
    const docRef = collection(db, `users/${userID}/posts`);
    const q = query(docRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    console.log("Database Read Executed");
    querySnapshot.forEach((doc) => {
      setContentState(doc.data().content);
      setDocID(doc.id);
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getPost();
  }, []);
  
  const updatePost = async () => {
    const docRef = doc(db, `users/${userID}/posts/${docID}`);
    await updateDoc(docRef, { content: contentState }).then(() => {console.log("Document Updated")});
    toast.success("Post Edited");
    Router.push(`/admin/`);

  };

  return (
    <Authcheck>
      <textarea
        value={contentState}
        onChange={(e) => setContentState(e.target.value)}
      ></textarea>
      <button onClick={updatePost}>Save my Edits</button>
    </Authcheck>
  );
}
