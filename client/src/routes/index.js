import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Index = () => {
  // const user = localStorage.getItem("user");
    return (
      <>
        <div sx={{ width: "100%", bgcolor: 'white', }}>
          <Routes>
          {/* <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} /> */}
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>
      </>
    )
};

export default Index;