const ChatWindow = ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <div key={index}><strong>{msg?.user_name}:</strong> {msg?.text}</div>
    ))}
  </div>
);

export default ChatWindow;