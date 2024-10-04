"use client";
import { useState, useEffect } from "react";
// import Loader from "@/Components/Loader";
import "@/app/globals.css";
import dynamic from "next/dynamic";
// import { Analytics } from "@vercel/analytics/react";

const Home = dynamic(() => import("@/app/Home/page"), {
  ssr: false,
});

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  return (
    <>
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head> */}
      <main className="">
        {/* <Analytics /> */}
        {/* {loading && <Loader />} */}
        <div className={loading ? "blur-sm" : ""}>
          <Home />
        </div>
      </main>
    </>
  );
}
