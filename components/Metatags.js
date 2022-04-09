import Head from "next/head";

export default function MetaTags(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
    </Head>
  );
}
