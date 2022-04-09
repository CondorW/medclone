import Authcheck from "../../components/Authcheck";
import PostFeed from "../../components/PostFeed";


export default function AdminPage() {
  return (
    <Authcheck>
      <h1>The Admin Page</h1>
      <PostList></PostList>
    </Authcheck>
  );
}
function PostList() {

  return <PostFeed></PostFeed>;
}
