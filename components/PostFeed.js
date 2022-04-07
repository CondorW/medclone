import { toast } from "react-hot-toast";


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

  return (
    <div className="border-solid border-2 border-black rounded p-3 my-2 flex flex-row justify-between">
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{post.slug}</p>
        <p>Estimated Read Time {readTime}</p>
      </div>
      <div className="self-end">
          <button className="bg-red-600 w-20 rounded p-1 font-semibold" onClick={()=>toast.success('HEART')}>
          {post.heartCount} Hearts
          </button>
      </div>
    </div>
  );
}
