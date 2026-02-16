import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/daee/Home";
import Create from "./pages/daee/Create";
import AllTashkils from "./pages/daee/AllTashkils";
import Register from "./pages/daee/Register";
import Login from "./pages/daee/Login";
import Profile from "./pages/daee/Profile";
import UpdateProfile from "./pages/daee/UpdateProfile";
import UpdateTashkil from "./pages/daee/UpdateTashkil";
import Dashboard from "./pages/amir/Dashboard";
import AllDaees from "./pages/daee/AllDaees";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Main layout (with Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tashkils"
            element={
              <ProtectedRoute>
                <AllTashkils />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tashkils/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tashkils/:id/update"
            element={
              <ProtectedRoute>
                <UpdateTashkil />
              </ProtectedRoute>
            }
          />

          {/* Amir routes */}
          <Route
            path="/amir/dashboard"
            element={
              <ProtectedRoute roles={["amir"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/amir/dashboard/daees"
            element={
              <ProtectedRoute roles={["amir"]}>
                <AllDaees />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth layout (no navbar/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
