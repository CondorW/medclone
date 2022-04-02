

export default function PostFeed(props) {
  let { posts, admin } = props;
  posts = [{content:"Eins zwei drei vier",slug:"ich bin ein echtes Tier", admin:true}];

  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem(props){
const {post,admin,key} = props;
const wordCount = post?.content.split(" ").length;
const readTime = (wordCount/200).toFixed(2);

    return(
        <div>
            <p>hhkhkhkuji</p>
            <p>{post.content}</p>
            <p>{key}</p>
            <p>{admin}</p>
        </div>
    );
}