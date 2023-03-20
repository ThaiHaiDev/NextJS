import { getCookie, getCookies, setCookie } from "cookies-next";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import randomID from "../utils/randomID";

export interface HomePageProps {
  mess: string;
  countServer: number;
}

const Home = ({ mess, countServer }: HomePageProps) => {
  const dateCurrent = new Date();
  const cookies = getCookies(); // Find cookies
  const [countAccess, setCountAccess] = useState<number>(0);

  const tempDay = `${dateCurrent.getFullYear()}-${
    dateCurrent.getMonth() + 1
  }-${dateCurrent.getDate()}`;

  const tempTime = `${dateCurrent.getHours()}:${
    dateCurrent.getMinutes() + 1
  }:00`;

  const handleSetCookie = () => {
    setCookie(randomID(), "value", {
      expires: new Date(`${tempDay} ${tempTime}`),
    });
  };

  useEffect(() => {
    // If cookies in browser empty => equal 0
    if (Object.keys(cookies).length > 0) {
      setCountAccess(Object.keys(cookies).length);
    }
  }, [cookies]);

  // console.log("Client", countAccess);

  return (
    <div className={styles.container}>
      <p>
        {tempDay} {tempTime}
      </p>
      <h1>{mess}</h1>
      <h2>{`Lượng truy cập tính ở phía Server: ${countServer}`}</h2>
      <button onClick={handleSetCookie}>Set cookie</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const dateCurrent = new Date();
  const timeDefine = 60000; // milliseconds
  const tempCount = Number(getCookie("count_access", { req, res }));
  const tempTime = getCookie("time_access", { req, res });

  if (new Date(JSON.parse(tempTime)) <= new Date(Date.now() - timeDefine)) {
    setCookie("count_access", tempCount + 1, { req, res });
    setCookie("time_access", JSON.stringify(dateCurrent), {
      req,
      res,
    });
  } else {
    console.log("Not Update");
  }

  // setCookie("time_access", JSON.stringify(dateCurrent), {
  //   req,
  //   res,
  // });
  // var count = Number(cookies?.split("=value").length);

  return {
    props: {
      mess: "Hello NextJS",
      countServer: tempCount,
    },
  };
};

export default Home;
