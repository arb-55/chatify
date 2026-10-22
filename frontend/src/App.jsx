import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FocusRoomsPage from "./pages/FocusRoomsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/focus-rooms" element={authUser ? <FocusRoomsPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111620",
            color: "#F5F7FA",
            border: "1px solid #242B37",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
          },
          success: {
            iconTheme: { primary: "#1677FF", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#FF1744", secondary: "#fff" },
          },
        }}
      />
    </>
  );
}
export default App;
