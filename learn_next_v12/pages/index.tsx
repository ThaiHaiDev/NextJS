import { getCookies, setCookie } from "cookies-next";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import randomID from "../utils/randomID";

export interface HomePageProps {
  ip: string;
  mess: string;
  countServer: number;
}

const Home = ({ ip, mess, countServer }: HomePageProps) => {
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

  console.log("Client", countAccess);

  return (
    <div className={styles.container}>
      <p>
        {tempDay} {tempTime}
      </p>
      <h1>{mess}</h1>
      <h1>{ip}</h1>
      <h2>{`Lượng truy cập: ${countAccess}`}</h2>
      <h2>{`Lượng truy cập tính ở phía Server: ${countServer}`}</h2>
      <button onClick={handleSetCookie}>Set cookie</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress; // Get ip
  const cookies = req.headers.cookie; // Get Cookies native
  setCookie(randomID(), "value", { req, res, maxAge: 60 });
  var count = Number(cookies?.split("=value").length);
  console.log("Server", Number(cookies?.split(";").length));

  return {
    props: {
      ip,
      mess: "Hello NextJS",
      countServer: cookies?.split("=value").length ? count : 1,
    },
  };
};

export default Home;
