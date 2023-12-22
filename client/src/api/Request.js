import axios from "axios";
// import { storage } from "./storage";


const API_URL = "http://localhost:8000/api";

 const GetRequest = async (url) => {
    try {
        const res = await axios({
          url: API_URL + url,
          method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //   },
        });
        return res;
      } catch (err) {
        // console.log("error",err.response)
        return err.response;
      }
}

 const PostRequest = async (url, data) => {
    try {
      const res = await axios({
        url: API_URL + url,
        method: "POST",
        data,
        // body:JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // return res ? res : res.data;
      return res;
    } catch (err) {
      // console.log("error",err.response)
      return err.response;
    }
  };

  export const API = {
    GetRequest,
    PostRequest
  }