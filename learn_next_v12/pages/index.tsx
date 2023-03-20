import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import type { NextRequest } from "next/server";

const Home: NextPage = ({ ip, test }: any) => {
  console.log(ip);
  return (
    <div className={styles.container}>
      <h1>{ip}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  return {
    props: {
      ip,
    },
  };
};

export default Home;
