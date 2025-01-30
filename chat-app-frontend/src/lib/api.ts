import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api', // Laravel backend URL
});

// Register and login functions (already implemented)
export const registerUser = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  return api.post('/register', data);
};

export const loginUser = async (data: { username: string; password: string }) => {
  return api.post('/login', data);
};

// Fetch messages
export const getMessages = async (userId: number, receiverId: number) => {
  return api.get('/getMessages', {
    params: { user_id: userId, receiver_id: receiverId },
  });
};

// Send a message
export const sendMessage = async (data: {
  sender_id: number;
  receiver_id: number;
  content: string;
}) => {
  return api.post('/sendMessage', data);
};