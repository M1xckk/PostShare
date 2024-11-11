import { useLoaderData, useNavigate } from "react-router-dom";
import { TextInput, Button, Textarea, Container, Loader, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import DOMAIN from "../../services/endpoint";

function EditPostPage() {
  const post = useLoaderData();
  const navigate = useNavigate();

  // If post data is not loaded, show a loader
  if (!post) {
    return (
      <Center>
        <Loader size="lg" variant="dots" />
        <p>Loading post data...</p>
      </Center>
    );
  }

  const form = useForm({
    initialValues: {
      title: post.title,
      category: post.category,
      content: post.content,
      image: post.image,
    },
  });

  const handleUpdate = async (values) => {
    await axios.put(`${DOMAIN}/api/posts/${post.id}`, values);
    navigate(`/posts/${post.id}`);
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <TextInput label="Category" {...form.getInputProps("category")} />
        <Textarea label="Content" {...form.getInputProps("content")} mt="md" />
        <TextInput label="Image URL" {...form.getInputProps("image")} mt="md" />
        <Button type="submit" mt="md">Update Post</Button>
      </form>
    </Container>
  );
}

export const editPostLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default EditPostPage;
