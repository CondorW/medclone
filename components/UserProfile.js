export default function UserProfile(props) {
  const { user,username } = props;

  return (
    <div className="self-center my-10">
      <h1>Hello {user}/{username}</h1>
      <div>Dummy Content for UserProfile Component</div>
    </div>
  );
}
