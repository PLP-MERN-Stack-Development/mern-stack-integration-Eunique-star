// App.jsx
import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import CategoryList from "./components/CategoryList";
import Login from "./components/Login";
import Register from "./components/Register"; // Import Register
import Navbar from "./components/Navbar"; // Import Navbar
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add Route */}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
