import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMessages, sendMessage, getUsers } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
}

interface User {
  id: number;
  username: string;
}

const Chat = () => {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Fetch messages when receiverId changes
  useEffect(() => {
    if (isAuthenticated && receiverId) {
      fetchMessages();
    }
  }, [isAuthenticated, receiverId]);

  // Fetch messages every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        if (isAuthenticated && receiverId) {
            fetchMessages();
        }
        }, 3000);
        return () => clearInterval(interval);
    }, [isAuthenticated, receiverId]);

  // Fetch all users except the current user
  const fetchUsers = async () => {
    try {
      const response = await getUsers(user?.id || 0);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // Fetch messages for the selected conversation
  const fetchMessages = async () => {
    try {
      const response = await getMessages(user?.id || 0, receiverId || 0);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() && receiverId) {
      try {
        await sendMessage({
          sender_id: user?.id || 0,
          receiver_id: receiverId,
          content: newMessage,
        });
        setNewMessage(''); // Clear the input field
        fetchMessages(); // Refresh the message list
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      <div className="mb-4">
        <label htmlFor="receiverId" className="block text-sm font-medium text-gray-700">
          Select a user to chat with:
        </label>
        <select
          id="receiverId"
          value={receiverId || ''}
          onChange={(e) => setReceiverId(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded-lg"
        >
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="h-96 overflow-y-auto border p-4 rounded-lg mb-4">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`mb-4 p-3 rounded-lg ${
              message.sender_id === user?.id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
            style={{ maxWidth: '70%' }}
          >
            <p className="text-sm text-gray-700">{message.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          className="flex-1"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;