import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Index = () => {
  const ProtectedRoute = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem("user"));
    return isAuthenticated ? (
      element
    ) : (
      // Redirect to the login page if the user is not authenticated
      <Navigate to="/login" replace />
    );
  };

  return (
    <>
      <div sx={{ width: "100%", bgcolor: "white" }}>
        <Routes>
          {/* <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} /> */}
          <Route path="/" element={<ProtectedRoute element={<Chat />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

export default Index;
