import "antd/dist/antd.css";
import Head from "next/head";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Twitter</title>
      </Head>
      <Component />
    </>
  );
};

export default App;
