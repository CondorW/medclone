import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../../lib/Context";

export default function UserPage() {
  const {user, username} = useContext(authContext);
  
  return (
    <div>
    <h1>This is your profile</h1>
    <div>You are signed in with your google Account named {user}</div>
    <div>Your username on this site is {username}</div>
    </div>
  );
}
