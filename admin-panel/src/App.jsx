import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DahboardPage from "./pages/DahboardPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateTaskPage from "./pages/CreateTaskPage";
import UsersPage from "./pages/UsersPage";
import TaskListPage from "./pages/TaskListPage";
import SettingPage from "./pages/SettingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="home" replace />} />

            {/* Nested Routes*/}
            <Route path="home" element={<DahboardPage />} />
            <Route path="create-task" element={<CreateTaskPage />} />

            <Route path="users" element={<UsersPage />} />
            <Route path="all-tasks" element={<TaskListPage />} />
            <Route path="settings" element={<SettingPage />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer theme="light" />
    </>
  );
}

export default App;
