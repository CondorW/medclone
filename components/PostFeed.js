import Router from "next/router";
import { useContext, useState } from "react";

export default function PostFeed(props) {
  const { posts } = props;

  return posts
    ? posts.map((post) => <PostItem post={post} key={post.slug} />)
    : null;
}



function PostItem(props) {
  const { post } = props;
  const wordCount = post?.content.split(" ").length;
  const readTime = (wordCount / 200).toFixed(2);

  const handleClick = () => {
    Router.push(`/${post.username}/${post.slug}`)
  }

  return (
    <button onClick={handleClick}>
    <div className="border-solid border-2 border-black rounded p-3 my-2 flex flex-row justify-between">
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{post.slug}</p>
        <p>Estimated Read Time {readTime}</p>
      </div>
    </div>
    </button>
  );
}
