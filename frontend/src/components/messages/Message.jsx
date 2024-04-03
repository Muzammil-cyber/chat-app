import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/time";

const Message = ({ message }) => {
  const { user } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === user.id;
  const profilePic =
    message.senderId === user.id
      ? user.profilePic
      : selectedConversation.profilePic;

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${fromMe ? "bg-blue-500" : ""} ${
          message.shouldShake ? "shake" : ""
        }`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 flex gap-1 items-center text-xs pb-2">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
