import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// User login endpoint
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "2 days" });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Token validation endpoint
app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Get all posts with a delay
app.get("/api/posts", async (req, res) => {
  await sleep(3000); // Simulate network delay
  res.json(posts);
});

// Get a single post by ID
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Retrieve the author's name from their email
  const user = findUserById(post.userId);
  const authorName = user ? user.email.split("@")[0] : "Unknown";
  res.json({ ...post, authorName });
});

// Add a new post
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

// Edit an existing post by ID
app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts[postIndex] = { ...posts[postIndex], ...req.body };
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running on port", port));
