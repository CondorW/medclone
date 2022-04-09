import { useContext } from "react";
import { authContext } from "../../lib/Context";
import { getUserWithUsername, db, postToJSON } from "../../lib/firebase";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { collection, getDocs, limit, orderBy } from "firebase/firestore";
import { query as fbQuery } from "firebase/firestore";


//This page is rendered with SSR, and specific to the user's username.
//The posts are dynamically fetched based on the query parameters

export async function getServerSideProps({ query }) {
  const { username } = query;
  

  const userID = await getUserWithUsername(username);
  const postRef = collection(db, `users/${userID}/posts`);
  const postQuery =  fbQuery(postRef,orderBy("createdAt","desc"),limit(3));
  const querySnapshot = await getDocs(postQuery);
  const postArr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    postArr.push(postToJSON(doc));
  });

  return {
    props: { postArr },
  };
}

export default function UserPage(props) {
  const { user, username } = useContext(authContext);

  return (
    <>
      <div className="flex flex-col w-2/3 mx-auto h-screen">
        <UserProfile user={user} username={username}></UserProfile>
        <PostFeed posts={props.postArr}></PostFeed>
      </div>
    </>
  );
}
