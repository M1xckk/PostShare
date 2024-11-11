import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { Button, Container, Title, Text, Image, Group, Center, Loader } from "@mantine/core";
import useBoundStore from "../../store/Store";
import axios from "axios";
import DOMAIN from "../../services/endpoint";

function PostDetailsPage() {
  const post = useLoaderData();
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();

  // Check if the post belongs to the logged-in user
  const isAuthor = user?.email && post.authorName === user.email.split("@")[0];

  // If post is not loaded, show a loading indicator
  if (!post) {
    return (
      <Center>
        <Loader size="lg" variant="dots" />
        <p>Loading post details...</p>
      </Center>
    );
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <Text color="dimmed" size="sm">Author: {post.authorName}</Text>
      <Text size="sm">Category: {post.category}</Text>
      <Text mt="md">{post.content}</Text>
      {post.image && (
        <Image src={post.image} alt={post.title} mt="md" radius="md" />
      )}

      <Group mt="md">
        <Button component={Link} to="/posts">Back to Posts</Button>
        {isAuthor && (
          <Button onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit Post</Button>
        )}
      </Group>
    </Container>
  );
}

// Loader function to fetch the post details by ID
export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Response("Post not found", { status: 404 });
  }
};

export default PostDetailsPage;
