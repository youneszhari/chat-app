import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMessages, sendMessage } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
}

const Chat = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState(2); // Example receiver ID (can be dynamic)

  // Fetch messages when the component mounts or receiverId changes
  /* useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated, receiverId]); */

  useEffect(() => {
    /* const interval = setInterval(() => {
        if (isAuthenticated) {
            fetchMessages();
        }
    }, 5000); // Fetch messages every 5 seconds
        
    return () => clearInterval(interval); // Cleanup interval on unmount */
    fetchMessages();

  }, [isAuthenticated, receiverId]);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await getMessages(1, receiverId); // Example sender ID: 1
      console.log("Messages :" + response)
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage({
          sender_id: 1, // Example sender ID
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
          Receiver ID
        </label>
        <Input
          type="number"
          id="receiverId"
          value={receiverId}
          onChange={(e) => setReceiverId(Number(e.target.value))}
          className="mt-1"
        />
      </div>
      <div className="h-96 overflow-y-auto border p-4 rounded-lg mb-4">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`mb-4 p-3 rounded-lg ${
              message.sender_id === 1 ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
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