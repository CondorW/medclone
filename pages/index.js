import { collectionGroup, limit, query, getDocs, startAfter, orderBy, Timestamp } from "firebase/firestore";
import { db, postToJSON } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import { useState } from "react";
import Loader from "../components/Loader";

const LIMIT = 1;

export async function getServerSideProps(context) {
  const postQuery = query(collectionGroup(db, "posts"), limit(LIMIT));
  const querySnapshot = await getDocs(postQuery);
  console.log("Database Read Executed");
  const postArr = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    postArr.push(postToJSON(doc));
  });
  const timeStamp = JSON.stringify(querySnapshot.docs[querySnapshot.docs.length - 1].data().createdAt);

  return { props: { postArr, timeStamp } };
}

export default function Home(props) {
  const [postArr, setPostArr] = useState(props.postArr);
  const [isLoading, setIsLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);

  const cursor = new Timestamp((postArr[postArr.length - 1].createdAt)/1000, 0);
  


  const getMorePostsHandler = async () => {
    setIsLoading(true);

    const nextQuery = query(collectionGroup(db, "posts"), limit(LIMIT),orderBy("createdAt","asc"),startAfter(cursor));
    const nextQuerySnapshot = await getDocs(nextQuery);
    console.log("Database Read Executed");
    const nextPostsArr = [];
    nextQuerySnapshot.forEach((doc) => {
      nextPostsArr.push(postToJSON(doc));
    });
    setPostArr((postArr)=>{
      return [...postArr,...nextPostsArr];
    })
    //TODO setPostEnd to true, when there are no more new posts
    if(nextQuerySnapshot.docs.length < LIMIT){
      setPostEnd(true);
    }
    setIsLoading(false);
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
