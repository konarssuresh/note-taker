import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import Notes from "./pages/notes/notes.jsx";
import NotFound from "./pages/page-not-found.jsx";

const AuthProtector = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="notes"
        element={
          <AuthProtector>
            <Notes />
          </AuthProtector>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
