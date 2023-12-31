import React, { useEffect, useState } from "react";
import Toastify from "../premade_ui_components/Toastify";
import { toast } from "react-toastify";
import Loading from "../premade_ui_components/Loading";
import EachChatForChatList from "../components/EachChatForChatList";
import { API } from "../api/Request";
import { BsCircleFill } from "react-icons/bs";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [chatList, setchatList] = useState([]);
  const [potentialChats, setPotentialChats] = useState([]);

  const getChatsForLoggedInUser = async () => {
    setIsLoading(true)
    const res = await API.GetRequest(`/chat/${user.userId}`);
    if (res?.status === 200) {
      setchatList(res.data);
    } else {
      toast.error(res?.data?.Error)
    }
    setTimeout(() => { setIsLoading(false); }, 2000);
  };

  const createChat = async (firstId, secondId) => {
    setIsLoading(true)
    const res = await API.PostRequest(
      `/chat/create`,
      JSON.stringify({ firstId, secondId })
    );
    // console.log("res of creatChat", res?.data);
    if (res?.status === 200) {
      getChatsForLoggedInUser();
    } else {
      toast.error(res?.data?.Error)
    }
    setTimeout(() => { setIsLoading(false); }, 2000);
  };

  const getMessagesforChat = async (chatIdOfChatterPerson) => {
    setIsLoading(true)
    const res = await API.GetRequest(`/message/${chatIdOfChatterPerson}`);
    if (res?.status === 200) {
      console.log("res of get messages", res?.data);
      
    } else {
      toast.error(res?.data?.Error)
    }
    setTimeout(() => { setIsLoading(false); }, 2000);
  }

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      const res = await API.GetRequest(`/user/getUsers`);
      if (res?.status === 200) {
        // console.log("res of get all users", res?.data);
        const pChats = res?.data.filter((u) => {
          let isChatCreated = false;

          if (u?._id === user.userId) return false;

          if (chatList) {
            isChatCreated = chatList?.some((chat) => {
              return chat.members[0] === u?._id || chat.members[1] === u?._id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
      } else {
      toast.error(res?.data?.Error)
      }
      setTimeout(() => { setIsLoading(false); }, 2000);
    };
    getUser();
  }, [chatList]);

  useEffect(() => {
    getChatsForLoggedInUser();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%", padding: "20px" }}>
        <div>
          {potentialChats &&
            potentialChats.map((u, ind) => (
              <p
                key={ind}
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  margin: "0px",
                  marginTop: "5px",
                  marginBottom: "10px",
                  padding: "5px",
                  width: "fit-content",
                  fontSize: "14px",
                }}
                onClick={() => createChat(user.userId, u?._id)}
              >
                <span>{u.name}</span>
                <BsCircleFill style={{ fontSize: "7px", color: "red" }} />
              </p>
            ))}
        </div>

        {/* List of user's Chats */}
        {chatList &&
          chatList.map((singleChatForChatList, ind) => {
            return (
              <div
                key={ind}
                style={{
                  border: "1px solid black",
                  paddingLeft: "5px",
                  paddingRight: "5px"
                }}
                onClick={() => getMessagesforChat(singleChatForChatList?._id)}
              >
                <EachChatForChatList
                  singleChatForChatList={singleChatForChatList}
                  user={user}
                />
              </div>
            );
          })}
      </div>
      <div style={{ width: "50%", background: "#f1dfea52" }}>ChatBox</div>
      
      <Loading isLoading={isLoading} height={80} width={80} color="#4fa94d" />
      <Toastify />
    </div>
  );
};

export default Chat;
