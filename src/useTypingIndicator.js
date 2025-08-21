import { useRef, useCallback } from 'react';
import { post } from './api';

export const useTypingIndicator = (username) => {
  const typingTimeout = useRef(null);

  const startTyping = useCallback(() => {
    post('/api/typing', { user_name: username });
  }, [username]);

  const stopTyping = useCallback(() => {
    post('/api/stopped-typing', { user_name: username });
  }, [username]);

  const handleTyping = useCallback(() => {
    startTyping();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      stopTyping();
    }, 1000);
  }, [startTyping, stopTyping]);

  return { handleTyping, stopTyping };
};
