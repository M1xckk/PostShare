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
            {/* Giphy embed code adjusted for React */}
            <div style={{ width: "100%", height: 0, paddingBottom: "100%", position: "relative" }}>
              <iframe
                src="https://giphy.com/embed/l3nWhI38IWDofyDrW"
                width="100%"
                height="100%"
                style={{ position: "absolute" }}
                frameBorder="0"
                allowFullScreen
                title="loading-gif"
              ></iframe>
            </div>
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
