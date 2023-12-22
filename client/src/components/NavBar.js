import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {!user && (
        <div
          style={{
            background: "lightcyan",
            padding:"15px",
            paddingBottom:"0px",
            display: "flex",
            justifyContent: "flex-end",
            minHeight: "40px",
          }}
        >
          <Link
            to={"/login"}
            style={{ textDecoration: "none", marginRight: "20px" }}
          >
            Login
          </Link>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", marginRight: "15px" }}
          >
            Register
          </Link>
        </div>
      )}

      {user && (
        <div
          style={{
            background: "lightcyan",
            padding:"15px",
            paddingBottom:"0px",
            display: "flex",
            justifyContent: "flex-end",
            minHeight: "40px",
          }}
        >
          <span>Logged in {user.name}</span>
          <div
            style={{
              width: "45%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              onClick={logOut}
              style={{ textDecoration: "none", marginRight: "15px" }}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
