import { useState, useEffect } from 'react';
import axios from 'axios';

const useMessages = (channel, userId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMessages, setNoMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found.');
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        let response;
        if (channel?._id) {
          response = await axios.get(`http://localhost:5000/api/messages/channel/${channel._id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
        } else if (userId) {
          response = await axios.get(`http://localhost:5000/api/directMessages/messages/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
        } else {
          console.error('No channel or userId provided.');
          setLoading(false);
          return;
        }

        // Validate and process the response
        if (response && response.data && Array.isArray(response.data.messages)) {
          const fetchedMessages = response.data.messages;
          setMessages(fetchedMessages);
          setNoMessages(fetchedMessages.length === 0);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        // Log detailed error information
        if (error.response) {
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
          console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error Request:', error.request);
        } else {
          console.error('Error Message:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channel, userId]);

  return { messages, noMessages, setMessages };
};

export default useMessages;
