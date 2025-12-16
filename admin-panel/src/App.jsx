import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DahboardPage from "./pages/DahboardPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DahboardPage />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
