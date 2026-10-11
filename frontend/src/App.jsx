import { Routes, Route } from "react-router";
import HomePage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";

function App() {
  const { authUser, isLoggedIn, login } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Decorators (Grid pattern & Glow shapes) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-8 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      {/* Main Routes */}
      <div className="z-10 flex flex-col items-center gap-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>

        {/* Test Section for Zustand Store (Tested by instructor around 3:43:00) */}
        <div className="flex flex-col items-center gap-2 mt-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
          <p className="text-slate-300">Auth User Name: {authUser?.name}</p>
          <p className="text-slate-300">
            Is Logged In: <span className="font-semibold text-emerald-400">{String(isLoggedIn)}</span>
          </p>
          <button onClick={login} className="btn btn-primary z-10">
            Test Login Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;