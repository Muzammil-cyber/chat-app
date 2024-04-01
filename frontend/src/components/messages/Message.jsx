const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble"
            src="https://randomuser.me/api/portraits/men/95.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500 ">
        Hi! What is upp?
      </div>
      <div className="chat-footer opacity-50 flex gap-1 items-center text-xs">
        10:00
      </div>
    </div>
  );
};

export default Message;
