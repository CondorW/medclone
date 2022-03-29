import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import AuthenticationContext from "../lib/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthenticationContext>
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Toaster></Toaster>
      </AuthenticationContext>
    </>
  );
}

export default MyApp;
