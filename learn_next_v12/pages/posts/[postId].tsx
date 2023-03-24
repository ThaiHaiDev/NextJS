import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

export interface PostDetaillData {
  post: any;
}

const PostDetail = (props: PostDetaillData) => {
  return (
    <div>
      <h1>Post detail</h1>
      <p>{props.post.title}</p>
      <p>{props.post.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dataResponse = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await dataResponse.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetaillData> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // build-time

  const postId = context.params?.postId;
  if (!postId) return { notFound: true };

  const dataResponse = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await dataResponse.json();

  return {
    props: {
      post: data,
    },
  };
};

export default PostDetail;
