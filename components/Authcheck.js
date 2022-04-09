import { useContext } from "react";
import { authContext } from "../lib/Context";

export default function Authcheck(props) {
  const ctx = useContext(authContext);
  const username = ctx.username;

  return username ? (
    props.children
  ) : (
    <p>You need to be signed in to access this page</p>
  );
}
