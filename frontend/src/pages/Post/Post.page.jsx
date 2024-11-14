import { useLoaderData, Await, defer } from "react-router-dom";
import { Container, SimpleGrid, Center } from "@mantine/core";
import { Suspense } from "react";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import axios from "axios";
import DOMAIN from "../../services/endpoint";

export const PostPage = () => {
  const data = useLoaderData();

  return (
    <Container>
      <Suspense
        fallback={
          <Center style={{ height: "80vh" }}>
            {/* Reference the GIF using the public folder path */}
            <img src="/loading.gif" alt="Loading..." style={{ width: "120px" }} />
          </Center>
        }
      >
        <Await resolve={data.posts}>
          {(posts) => (
            <SimpleGrid cols={3}>
              {posts.map((post) => (
                <ArticleCardImage key={post.id} {...post} />
              ))}
            </SimpleGrid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
};

// Loader function to fetch posts
export const postsLoader = async () => {
  const response = await axios.get(`${DOMAIN}/api/posts`);
  return defer({ posts: response.data });
};
