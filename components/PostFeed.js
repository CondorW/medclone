

export default function PostFeed(props) {
    const {posts} = props;

  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} />) : null;
}

function PostItem(props){
const {post,key} = props;
const wordCount = post?.content.split(" ").length;
const readTime = (wordCount/200).toFixed(2);

    return(
        <div>
            <p>{post.content}</p>
            <p>{post.slug}</p>
            <p>{key}</p>
            <p>Estimated Read Time {readTime}</p>
        </div>
    );
}