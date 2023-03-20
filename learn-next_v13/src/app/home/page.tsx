"use client";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";

const HomePage = ({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const handlePushURL = () => {
    router.push("/home/create");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handlePushURL}>Create</button>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  };
}

export default HomePage;
