import {
  collectionGroup,
  limit,
  query,
  getDocs,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db, postToJSON } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const LIMIT = 2;

export default function Home(props) {
  const [postArr, setPostArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);
  const [querySnap, setQuerySnap] = useState(null);

  const initialPosts = async () => {
    const postQuery = query(
      collectionGroup(db, "posts"),
      limit(LIMIT),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(postQuery);
    console.log("Database Read Executed");
    const stackArr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      stackArr.push(postToJSON(doc));
    });
    setPostArr(stackArr);
    setQuerySnap(querySnapshot);
  };

  useEffect(() => {
    initialPosts();
  }, []);

  const getMorePostsHandler = async () => {
    setIsLoading(true);

    console.log(querySnap);

    const nextQuery = query(
      collectionGroup(db, "posts"),
      limit(LIMIT),
      orderBy("createdAt", "asc"),
      startAfter(querySnap.docs[querySnap.docs.length - 1])
    );
    const nextQuerySnapshot = await getDocs(nextQuery);
    console.log("Database Read Executed");
    const nextPostsArr = [];
    nextQuerySnapshot.forEach((doc) => {
      nextPostsArr.push(postToJSON(doc));
    });
    setPostArr((postArr) => {
      return [...postArr, ...nextPostsArr];
    });
    //TODO setPostEnd to true, when there are no more new posts
    if (nextQuerySnapshot.docs.length < LIMIT) {
      setPostEnd(true);
    }
    setIsLoading(false);
    setQuerySnap(nextQuerySnapshot);
  };

  return (
    <div className="mx-4 my-4">
      <PostFeed posts={postArr} />
      {!isLoading && !postEnd && (
        <button onClick={getMorePostsHandler}>Load More</button>
      )}
      <Loader show={isLoading}></Loader>
      {postEnd && <p>No more posts</p>}
    </div>
  );
}
