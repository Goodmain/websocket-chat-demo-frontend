import Pusher from 'pusher-js';

const pusher = new Pusher('change_me', {
  cluster: 'change_me',
});

export default pusher;