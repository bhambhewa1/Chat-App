import React, { useEffect, useState } from 'react'
import { API } from '../api/Request'
import EachChatForChatList from '../components/EachChatForChatList';

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chatList, setchatList] = useState();
  const getChatsForLoggedInUser = async () => {
    const res = await API.GetRequest(`/chat/${user.userId}`);
    if(res?.status === 200) {
       setchatList(res.data);
    } else {
      alert(res?.data?.Error)
    }
  }

  useEffect(() => {
    getChatsForLoggedInUser();
  },[])
  return (
    <div style={{display:"flex"}}>
     <div style={{width:"25%",padding:"20px"}}> 
      {/* List of user's Chats */}
      {chatList && 
      chatList.map((singleChatForChatList, ind) => {
        return (
          <div key={ind} style={{border:"1px solid black", paddingLeft:"5px", paddingRight:"5px"}}>
            <EachChatForChatList singleChatForChatList={singleChatForChatList} user={user}/>
          </div>
        )
      })
      }
     </div>
     <div style={{width:"50%",background:"#f1dfea52"}}>ChatBox</div>
    </div>
  )
}

export default Chat
