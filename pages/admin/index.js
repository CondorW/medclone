import Authcheck from "../../components/Authcheck";
import PostFeed from "../../components/PostFeed";
import { authContext } from "../../lib/Context";

import { useContext } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";


const getUserPostsWithID = async (userID) =>{
  const q = query(collection(db,`users/${userID}/posts`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}


export default function AdminPage() {
  return (
    <Authcheck>
      <h1>The Admin Page</h1>
      <PostList></PostList>
    </Authcheck>
  );
}
function PostList() {
  const {userID} = useContext(authContext);
  const posts = getUserPostsWithID(userID);

  return <PostFeed></PostFeed>;
}
