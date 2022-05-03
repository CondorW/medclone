import {
  getDocs,
  query,
  collectionGroup,
  where,
  collection,
} from "firebase/firestore";
import MetaTags from "../../components/Metatags";
import { db, getUserWithUsername, postToJSON } from "../../lib/firebase";

import HeartButton from "../../components/HeartButton";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post;
  let postID;

  if (userDoc) {
    //create a firestore query, that finds the post of the provided user with the provided slug, then convert that post to json so it is
    //serializable and can be sent to the client
    const postRef = collection(db, `users/${userDoc}/posts`);
    const q = query(postRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    console.log("Database Read Executed");
    querySnapshot.forEach((doc) => {
      post = postToJSON(doc);
      postID = doc.id;
    });
  }
  return {
    props: { post,postID },
    revalidate: 5000,
  };
}
export async function getStaticPaths() {
  const postsQuery = query(collectionGroup(db, "posts"));
  const postsSnap = await getDocs(postsQuery);
  const paths = [];
  postsSnap.forEach((doc) => {
    const { username, slug } = doc.data();
    paths.push({
      params: {
        username: username,
        slug: slug,
      },
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export default function UserParam(props) {
  const { post, postID } = props;
  console.log(postID);
  return (
    <div className="px-8 flex justify-between py-10">
      <MetaTags title="user Post Page"></MetaTags>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>Written by {post.username}</p>
      </div>
      <div>
        <HeartButton heartCount={post.heartCount} postID={postID}/>
      </div>
    </div>
  );
}
