import styles from "./page.module.css";
import Link from "next/link";

import { cookies } from "next/headers"; // Import cookies
import { GetServerSideProps } from "next";

export default function Home({ ip }: any) {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("token"); // Find cookie
  console.log("cookie", token);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/home">
          <p>{ip}</p>
        </Link>
        <Link href="/posts">
          <p>List posts</p>
        </Link>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"];
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0);
    } else {
      ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
  }
  return {
    props: {
      ip,
    },
  };
};
