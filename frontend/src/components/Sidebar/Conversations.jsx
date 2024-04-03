import useConversations from "../../hooks/useConversations";
import { getRandomEmoji } from "../../utils/emoji";
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
          emoji={getRandomEmoji()}
        />
      ))}
    </div>
  );
};
export default Conversations;
