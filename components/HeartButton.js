import toast from "react-hot-toast";

export default function HeartButton(props){
    return(
        <button className="bg-red-600 w-20 rounded p-1 font-semibold" onClick={()=>toast.success('HEART')}>
          {props.heartCount} Hearts
          </button>
    );
}