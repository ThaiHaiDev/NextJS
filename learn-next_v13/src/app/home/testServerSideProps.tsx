import { InferGetServerSidePropsType } from "next";

const TestServerSideProps = ({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <h1>{message}</h1>;
};

export async function getServerSideProps() {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  };
}

export default TestServerSideProps;
