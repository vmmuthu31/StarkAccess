"use client";
import { useEffect, useState } from "react";
import { BACKENDURI } from "./constant";

export default function Home() {
  const [getInfo, setGetInfo] = useState<any>([]);

  const getData = async () => {
    try {
      const response = await fetch(`${BACKENDURI}`);
      const result = await response.json();
      console.log("Result:", result);
      setGetInfo(result);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Fetch data from backend
      <div>
        {getInfo && getInfo.data && <p>{getInfo.data}</p>}
      </div>
    </div>
  );
}