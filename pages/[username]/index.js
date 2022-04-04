import { useContext } from "react";
import { authContext } from "../../lib/Context";
import { getUserWithUsername, db, postToJSON } from "../../lib/firebase";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { collection, getDocs, limit } from "firebase/firestore";
import { query as fbQuery } from "firebase/firestore";


export async function getServerSideProps({ query }) {
  const { username } = query;
  

  const userID = await getUserWithUsername(username);
  const postRef = collection(db, `users/3XcL6borLNMZlpqufms1YUCQwA72/posts`);
  const postQuery =  fbQuery(postRef);
  const querySnapshot = await getDocs(postQuery);
  const postArr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    postArr.push(postToJSON(doc));
  });
  console.log(postArr);

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
