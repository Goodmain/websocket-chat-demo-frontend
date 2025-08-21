const ChatWindow = ({ messages }) => (
  <div>
    {messages.map((msg) => (
      <div key={msg.id}><strong>{msg?.user_name}:</strong> {msg?.text}</div>
    ))}
  </div>
);

export default ChatWindow;