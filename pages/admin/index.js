import Authcheck from "../../components/Authcheck";
import { authContext } from "../../lib/Context";

import AdminFeed from "../../components/AdminFeed";

import { useContext, useState, useEffect } from "react";
import Router from "next/router";

import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

import {
  collection,
  query,
  getDocs,
  Timestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { postToJSON } from "../../lib/firebase";

//TODO fix double execution of getUserPostsWithID

export default function AdminPage() {
  const { userID, username } = useContext(authContext);
  const [postState, setPostState] = useState([]);
  const [titleState, setTitleState] = useState("");
  const [slugState, setSlugState] = useState("");
  const [isValid, setIsValid] = useState(false);

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

  const titleChangeHandler = (e) => {
    setTitleState(e.target.value);
    setSlugState(encodeURI(kebabCase(e.target.value)));
    if (e.target.value.length > 3 && e.target.value.length < 100) {
      setIsValid(true);
    }
  };
  const createPost = async (e) => {
    e.preventDefault();
    const ref = doc(collection(db, `users/${userID}/posts`));
    const data = {
      title: titleState,
      slug: slugState,
      uid: userID,
      username: username,
      content: "Sample Text",
      createdAt: Timestamp.now(),
      heartCount: 0,
    };
    await setDoc(ref, data);
    toast.success("Post Created");

    Router.push(`/admin/${slugState}`);
  };

  return (
    <Authcheck>
      <h1>The Admin Page</h1>
      <AdminFeed posts={postState}></AdminFeed>
      <div>
        <form onSubmit={createPost}>
          <input
            onChange={titleChangeHandler}
            type="text"
            placeholder="Title"
            value={titleState}
          />
          <p>Slug:{slugState}</p>
          <button type="submit" disabled={!isValid}>
            Create New Post
          </button>
        </form>
      </div>
    </Authcheck>
  );
}
