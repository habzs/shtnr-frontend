import { AuthProvider } from "@/components/AuthContext";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

interface PageConfigProps {
  children: React.ReactNode;
}

const PageConfig: React.FC<PageConfigProps> = ({ children }) => {
  return <div className="bg-gray-100 h-screen pb-52">{children}</div>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>shtnr</title>
          <meta name="description" content="A quick link shortener." />
          {/* <link rel="icon" type="image/x-icon" href="/static/favicon.ico"></link> */}
          {/* <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/homescreen_512.png" /> */}
        </Head>
        <Toaster containerStyle={{ top: "80px" }} />
        <Header />
        <PageConfig>
          <Component {...pageProps} />
        </PageConfig>
      </AuthProvider>
    </>
  );
}
