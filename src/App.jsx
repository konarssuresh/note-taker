import { Routes, Route } from "react-router";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import Notes from "./pages/notes/notes.jsx";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="notes" element={<Notes />} />
    </Routes>
  );
}

export default App;
