import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import { PostPage, postsLoader } from "./pages/Post/Post.page";
import { postDetailsLoader } from "./pages/Post/PostDetails.page";
import PostDetailsPage from "./pages/Post/PostDetails.page";
import EditPostPage, { editPostLoader } from "./pages/Post/EditPost.page";

export const Router = () => {
  const authCheck = useBoundStore((state) => !!state.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/posts"
          element={<ProtectedRoute isAllowed={authCheck}><PostPage /></ProtectedRoute>}
          loader={postsLoader}
        />
        <Route
          path="/posts/:id"
          element={<ProtectedRoute isAllowed={authCheck}><PostDetailsPage /></ProtectedRoute>}
          loader={postDetailsLoader}
        />
        <Route
          path="/posts/create"
          element={<ProtectedRoute isAllowed={authCheck}><CreatePostPage /></ProtectedRoute>}
        />
        <Route
          path="/posts/edit/:id"
          element={<ProtectedRoute isAllowed={authCheck}><EditPostPage /></ProtectedRoute>}
          loader={editPostLoader}
        />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return router;
};
