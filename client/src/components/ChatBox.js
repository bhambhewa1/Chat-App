import React, { useEffect, useState } from "react";
import Toastify from "../premade_ui_components/Toastify";
import { toast } from "react-toastify";
import Loading from "../premade_ui_components/Loading";
import { IoSendSharp } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { API } from "../api/Request";

const ChatBox = ({ RecipitentUser, user, currentChatId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState();
  //   console.log("update ", textMessage);

  const getMessagesforCurrentChat = async () => {
    setIsLoading(true);
    const res = await API.GetRequest(`/message/${currentChatId}`);
    if (res?.status === 200) {
      console.log("res of get messages", res?.data);
      setMessages(res?.data);
    } else {
      toast.error(res?.data?.Error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const sendTextMessage = async () => {
    const data = {
      chatId: currentChatId,
      senderId: user.userId,
      text: textMessage,
    };
    try {
      setIsLoading(true);
      const res = await API.PostRequest(`/message`, data);
      if (res?.status === 200) {
        console.log("res of sended message", res?.data);
      } else {
        toast.error(res?.data?.Error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getMessagesforCurrentChat();
  }, [currentChatId]);

  return (
    <div style={{ minHeight: "90vh", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "rgb(229 227 231)",
          padding: "10px",
        }}
      >
        <b>{RecipitentUser.name}</b>
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        {messages &&
          messages.map((message, index) => (
            <div
              style={
                message.senderId === user.userId
                  ? Style.rightSideText
                  : Style.leftSideText
              }
            >
              <p style={{ margin: "0px" }} key={index}>
                {message.text}
              </p>
              <p style={{ margin: "0px", fontSize: "11px" }}>
                {" "}
                {new Date(message.updatedAt).toLocaleString("en-US")}{" "}
              </p>
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "10px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          cleanOnEnter
          onEnter={sendTextMessage}
          placeholder="Type a message"
        />
        <IoSendSharp
          style={{
            fontSize: "19px",
            marginLeft: "15px",
            marginRight: "20px",
            cursor: "pointer",
          }}
          onClick={sendTextMessage}
        />
      </div>
      <Loading isLoading={isLoading} height={80} width={80} color="#4fa94d" />
      <Toastify />
    </div>
  );
};

export default ChatBox;

const Style = {
  rightSideText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: "10px",
  },
  leftSideText: { marginTop: "10px" },
};
