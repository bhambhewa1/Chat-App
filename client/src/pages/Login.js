import React, { useState } from "react";
import "./style.css";
import { API } from "../api/Request";
import { useNavigate } from "react-router-dom";
import Loading from "../premade_ui_components/Loading";
import Toastify from "../premade_ui_components/Toastify";
import { toast } from "react-toastify";      // This is used to show direct message in Toastify


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // const handleCloseSnackbar = () => {
  //   setSnackbar({
  //     open: false,
  //     message: "",
  //     severity: snackbar.severity,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      const res = await API.PostRequest("/user/login", { email, password });
      if (res?.status === 200) {
        // setSnackbar({
        //   open: true,
        //   message: res?.data?.message,
        // });
        toast.success(res?.data?.message)
        setTimeout(() => {
          const localData = {
            userId: res?.data?.userId,
            name: res?.data?.name,
            email: res?.data?.email,
          };
          localStorage.setItem("user", JSON.stringify(localData));
          setIsLoading(false);
          navigate("/");
        }, 3000);
      } else {
        // setSnackbar({
        //   open: true,
        //   severity: "error",
        //   message: res?.data?.message || res?.data?.Error,
        // });
        setTimeout(() => { setIsLoading(false); }, 2000);
        toast.error(res?.data?.message || res?.data?.Error)
      }
    } else {
      // setSnackbar({
      //   open: true,
      //   severity: "error",
      //   message: "please fill the Login form complete !",
      // });
      setTimeout(() => { setIsLoading(false); }, 2000);
      toast.error("Please fill the Login form complete !")
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2> Login </h2>
        <div className="row">
          <label>Email* :</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br></br>

        <div className="row">
          <label>Password* :</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>

        <button type="submit">Login</button>
      </form>
      <Loading isLoading={isLoading} height={80} width={80} color="#4fa94d" />
      <Toastify />
    </div>
  );
};

export default Login;
