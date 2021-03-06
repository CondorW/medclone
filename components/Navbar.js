import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../lib/Context";

export default function Navbar() {
  const {user,username} = useContext(authContext);

  if (user !== null && username !== null) {
    return (
      <nav>
        <div className="flex justify-between px-20">
          <Link href="/">
            <button className="bg-black px-6 py-3 rounded-md text-2xl font-bold  text-white m-2">
              FEED
            </button>
          </Link>
          <Link href="/admin">
            <button className="bg-black px-6 py-3 rounded-md text-2xl font-bold  text-white m-2">
              Write Post
            </button>
          </Link>
          <Link href={`/${username}`}>
            <button className="bg-black px-6 py-3 rounded-md text-2xl font-bold  text-white m-2">
              Profile
            </button>
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="flex justify-between px-20">
          <Link href="/">
            <button className="bg-black px-6 py-3 rounded-md text-2xl font-bold  text-white m-2">
              NXT
            </button>
          </Link>
          <Link href="/enter">
            <button className="bg-black px-6 py-3 rounded-md text-2xl font-bold  text-white m-2">
              LOGIN
            </button>
          </Link>
        </div>
      </nav>
    );
  }
}
