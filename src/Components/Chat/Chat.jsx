import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import ChatSidebar from "./ChatSidebar";
// import { avatar } from "../Images/chatAvatar.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import bgAdmin from "../Images/chatWallpaper.webp";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import AuthContext from "../../context/AuthContext";


const Chat = () => {
  const [author, setAuthor] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const socketRef = useRef(null);

  const history = useNavigate();
  let { user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    try {
      setAuthor(user.user_id);
    } catch (e) {
      history("/login");
      toast.error("Please Login for community chat", { duration: 5000 });
    }

    axios
      .get(`${BACKEND_BASE_URL}/chat/rooms/${user.user_id}/`)
      .then((response) => {
        console.log("roomssssssssssssssssss", response.data);
        setRooms(response.data);
        setActiveRoomId(response.data[0]?.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const fetchMessages = async () => {
    axios
      .get(`${BACKEND_BASE_URL}/chat/rooms/${activeRoomId}/messages/`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (activeRoomId) {
      socketRef.current = new WebSocket(
        `ws://localhost:8000/ws/chat/${activeRoomId}/`
      );

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      fetchMessages();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [activeRoomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    const message = {
      content: newMessage,
      author: author,
      room_id: activeRoomId,
    };

    axios
      .post(`${BACKEND_BASE_URL}/chat/rooms/${activeRoomId}/messages/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        fetchMessages();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }

    setNewMessage("");
  };

  // useEffect(() => {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  //   async function getUser() {
  //     try {
  //       // const response = await axios.get(`/api/getSingleUser/${author}`);
  //       const response = await axios.get(
  //         `${BACKEND_BASE_URL}/user/details/${author}/`
  //       );

  //       console.log(response);
  //       setUser(response?.data?.userDetails);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getUser();
  // }, [messages]);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedTime;
  };

  return (
    <div className=" flex flex-col w-full h-screen">
 
      <div className="flex h-full items-center justify-center bg-cover bg-center  rounded-md bg-gray-200">
        {/* <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgAdmin})` }}> */}
        <ChatSidebar
          rooms={rooms}
          activeRoomId={activeRoomId}
          setActiveRoomId={setActiveRoomId}
        />
        <div className="flex-grow">
          <div className="flex flex-col h-screen">
            <div className="flex-grow p-6 overflow-y-auto">
              {messages.length > 0 ? (
                messages.map((message, index) => {
                  console.log("messsssssss", message.author);

                  return (
                    <div
                      key={index}
                      ref={scroll}
                      className={`flex ${
                        message.author && message.author.id == user.user_id
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`${
                          message.author && message.author.id == user.user_id
                            ? "bg-green-500 text-white self-end"
                            : "bg-blue-500 text-white self-start"
                        } py-2 px-4 rounded-lg max-w-md`}
                      >
                        <div className="flex items-center">
                          {/* Display sender avatar for non-sender messages */}
                          {message.author &&
                            message.author.id == user.user_id && (
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
                                alt="avatar"
                                className="mr-3 rounded-full h-6 w-6"
                              />
                            )}
                          <div className="flex flex-col">
                            {/* Display sender username for non-sender messages */}
                            {message.author && message.author.username && (
                              <div className="text-sm text-black">
                                {message.author.username}
                              </div>
                            )}

                            <div className="mb-1">{message.content}</div>
                            <div className="text-xs text-black">
                              {formatTimestamp(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500">No messages yet</div>
              )}
            </div>
            <div className="py-4 px-6 bg-gray-300">
              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
