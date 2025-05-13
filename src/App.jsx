import React, { useEffect, useState } from 'react';
import pusher from './pusher';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const channel = pusher.subscribe('chat-channel');

    channel.bind('new-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    channel.bind('typing', (data) => {
      setTypingUsers((prev) => [...new Set([...prev, data.user_name])]);
    });

    channel.bind('stopped-typing', (data) => {
      setTypingUsers((prev) => prev.filter((user) => user !== data.user_name));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <ChatWindow messages={messages} />
      <TypingIndicator users={typingUsers} />
      <MessageInput />
    </div>
  );
};

export default App;
