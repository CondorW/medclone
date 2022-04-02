import { useContext } from "react";
import { authContext } from "../../lib/Context";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";

export default function UserPage() {
  const {user, username} = useContext(authContext);
  
  return (
  <>
  <div className="flex flex-col w-2/3 mx-auto h-screen">
  <UserProfile user={user} username={username}></UserProfile>
  <PostFeed></PostFeed>
  </div>
  </>    
  );
}
