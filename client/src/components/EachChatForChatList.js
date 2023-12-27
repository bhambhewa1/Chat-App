import React, { useEffect, useState } from "react";
import { API } from "../api/Request";
import { BsCircleFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";


const EachChatForChatList = ({ singleChatForChatList, user }) => {
  const [recipientUser, setRecipientUser] = useState();
  const [message,setMessage] = useState("Text message fljgl dfjgldj gj lgjadl jfajlkfdaflsd ejl lfj");

  const findUsersChatWithMe = async (recipientId) => {
    const res = await API.GetRequest(`/user/find/${recipientId}`);
    if (res?.status === 200) {
      setRecipientUser(res.data);
    } else {
      alert(res?.data?.Error);
    }
  };
  useEffect(() => {
    const recipientId = singleChatForChatList?.members.find(
      (id) => id !== user.userId
    );
    findUsersChatWithMe(recipientId);
  }, []);
  return (
    <>
      {recipientUser && (
        <div style={{ display: "flex", justifyContent: "space-between", }}>
            
            <div><IoPersonCircleSharp fontSize={"50px"} /></div>
          <div>
            <p style={{margin:"0px",marginTop:"5px"}}><b>{recipientUser?.name}</b></p>
            <p style={{margin:"0px", fontSize:"13px", width:"200px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{message}</p>
            </div>
          <div>
            <p style={{display:"flex",flexDirection:"row",margin:"0px",marginTop:"5px",marginBottom:"2px",fontSize:"14px"}}><span>12/12/2023</span> <BsCircleFill style={{fontSize:"7px", color:"red"}} /></p>
            <p style={{textAlign:"right",margin:"0px", fontSize:"13px",}}>notification 2</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EachChatForChatList;
