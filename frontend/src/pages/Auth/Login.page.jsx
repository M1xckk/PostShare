import { useEffect } from "react";
import { TextInput, Button, Paper, Title, Text, Container, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginService(email, password);
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome to PhotoShare</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Please login to continue
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput label="Email" placeholder="you@example.com" name="email" required />
          <TextInput label="Password" placeholder="Your password" name="password" type="password" required mt="md" />
          <Group position="apart" mt="md">
            <Button type="submit" fullWidth loading={authLoading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
