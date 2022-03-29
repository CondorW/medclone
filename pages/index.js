import Loader from "../components/Loader"
import toast from "react-hot-toast"

export default function Home() {
  return (
    <div>
    <button onClick={()=>{toast.success('Damn I did that without reading the docs ;)')}}>Wanna hear a secret</button>
    </div>
  )
}
