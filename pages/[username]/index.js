import Link from "next/link";

export default function UserPage() {
  return (
    <div>
      <Link prefetch={true} href={{ pathname: "../enter" }}>
        <a>Go to Landing Page</a>
      </Link>
      <h1>Catch all Routes that do not match other specified routes</h1>
    </div>
  );
}
