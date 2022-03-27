export default function Loader(props) {
  const { show } = props;
  return show ? (
    <div>
        <div className="bg-blue-900 h-1 w-6 rounded-full animate-spin"></div>
    </div>
  ) : null;
}
