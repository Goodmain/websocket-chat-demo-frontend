import React, { useState, useRef } from 'react';

const MessageInput = () => {
  const [text, setText] = useState('');
  const typingTimeout = useRef(null);
  const username = 'User1';

  const API_URL = 'http://localhost:8081';

  const sendTypingEvent = async (event) => {
    await fetch(`${API_URL}/api/typing`, {
      method: 'POST',
      body: JSON.stringify({ user_name: username }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const sendStoppedTypingEvent = async () => {
    await fetch(`${API_URL}/api/stopped-typing`, {
      method: 'POST',
      body: JSON.stringify({ user_name: username }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
    sendTypingEvent();

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      sendStoppedTypingEvent();
    }, 1000);
  };

  const sendMessage = async () => {
    await fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify({ user_name: username, text }),
      headers: { 'Content-Type': 'application/json' },
    });
    setText('');
    sendStoppedTypingEvent();
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