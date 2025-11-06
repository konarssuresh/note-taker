import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-preset-1 mb-2">404 — Page Not Found</h1>
        <p className="text-preset-5 text-neutral-500 mb-4">
          The page you are looking for does not exist.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
