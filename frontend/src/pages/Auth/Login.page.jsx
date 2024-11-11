import { useEffect } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Container,
  Group,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  // Redirect to posts page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user]);

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginService(email, password);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Welcome back to PhotoShare!
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput 
            label="Email address" 
            placeholder="you@example.com" 
            name="email" 
            size="md" 
            required 
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            name="password" 
            mt="md" 
            size="md" 
            required 
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />

          <Button type="submit" fullWidth mt="xl" size="md" loading={authLoading}>
            Login
          </Button>
        </form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default LoginPage;
