import useConversations from "../../hooks/useConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useConversations();

  if (loading) {
    return (
      <div className="py-2 flex flex-col overflow-auto items-center justify-center">
        <span className="loading loading-ring"></span>
      </div>
    );
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
