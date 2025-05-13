const TypingIndicator = ({ users }) => {
  if (users.length === 0) return null;
  return <div>{users.join(', ')} typing...</div>;
};

export default TypingIndicator;