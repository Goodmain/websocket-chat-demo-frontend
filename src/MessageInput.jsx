import React, { useState } from 'react';
import { post } from './api';
import { useTypingIndicator } from './useTypingIndicator';

const MessageInput = ({ username }) => {
  const [text, setText] = useState('');
  const { handleTyping, stopTyping } = useTypingIndicator(username);

  const handleChange = (e) => {
    setText(e.target.value);
    handleTyping();
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    await post('/api/messages', { user_name: username, text });
    setText('');
    stopTyping();
  };

  return (
    <div>
      <input value={text} onChange={handleChange} onKeyDown={(e) => {
        if (e.key === 'Enter') sendMessage();
      }} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;