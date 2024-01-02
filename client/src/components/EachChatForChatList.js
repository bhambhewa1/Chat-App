import React, { useEffect, useState } from "react";
import Toastify from "../premade_ui_components/Toastify";
import { toast } from "react-toastify";
import Loading from "../premade_ui_components/Loading";
import { API } from "../api/Request";
import { BsCircleFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";

const EachChatForChatList = ({
  singleChatOfChatList,
  user,
  exportRecipientUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipientUser, setRecipientUser] = useState();
  const [message, setMessage] = useState(
    "Text message fljgl dfjgldj gj lgjadl jfajlkfdaflsd ejl lfj"
  );

  const findAllUsersChatingWithMe = async (recipientId) => {
    setIsLoading(true);
    const res = await API.GetRequest(`/user/find/${recipientId}`);
    if (res?.status === 200) {
      setRecipientUser(res.data);
      exportRecipientUser(res.data);
    } else {
      toast.error(res?.data?.Error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  useEffect(() => {
    const recipientId = singleChatOfChatList?.members.find(
      (id) => id !== user.userId
    );
    findAllUsersChatingWithMe(recipientId);
  }, []);
  return (
    <>
      {recipientUser && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <IoPersonCircleSharp fontSize={"50px"} cursor={"pointer"} />
          </div>
          <div>
            <p style={{ margin: "0px", marginTop: "5px" }}>
              <b>{recipientUser?.name}</b>
            </p>
            <p
              style={{
                margin: "0px",
                fontSize: "13px",
                width: "200px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {message}
            </p>
          </div>
          <div>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0px",
                marginTop: "5px",
                marginBottom: "2px",
                fontSize: "14px",
              }}
            >
              <span>12/12/2023</span>{" "}
              <BsCircleFill style={{ fontSize: "7px", color: "red" }} />
            </p>
            <p style={{ textAlign: "right", margin: "0px", fontSize: "13px" }}>
              notification 2
            </p>
          </div>
        </div>
      )}
      <Loading isLoading={isLoading} height={80} width={80} color="#4fa94d" />
      <Toastify />
    </>
  );
};

export default EachChatForChatList;
