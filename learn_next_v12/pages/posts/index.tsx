import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

export interface PostListPageData {
  posts: any[];
}

const PostPage = (props: PostListPageData) => {
  return (
    <div>
      <h1>About page</h1>
      <ul>
        {props.posts.map((about) => (
          <li key={about.id}>
            <Link href={`/posts/${about.id}`}>{about.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PostListPageData> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // build-time

  const dataResponse = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await dataResponse.json();

  return {
    props: {
      posts: data.data,
    },
  };
};

export default PostPage;
