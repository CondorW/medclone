import Authcheck from "../../components/Authcheck";
import PostFeed from "../../components/PostFeed";
import { authContext } from "../../lib/Context";

import { useContext, useState, useEffect } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { postToJSON } from "../../lib/firebase";

//TODO fix double execution of getUserPostsWithID

export default function AdminPage() {
  const { userID } = useContext(authContext);
  const [postState, setPostState] = useState([]);

  useEffect(() => {
    const getUserPostsWithID = async (userID) => {
      const q = query(collection(db, `users/${userID}/posts`));
      const querySnapshot = await getDocs(q);
      console.log("Database Read Executed");
      const postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push(postToJSON(doc));
      });
      setPostState(postArr);
    };
    getUserPostsWithID(userID);
  }, []);

  

  return (
    <Authcheck>
      <h1>The Admin Page</h1>
      <PostFeed posts={postState}></PostFeed>
      <div>
        <input type="text" placeholder="Title" />
        <p>Slug: {}</p>
        <button></button>
      </div>
    </Authcheck>
  );
}
