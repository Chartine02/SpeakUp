import { useState, useEffect, useRef } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { useUser } from '../context/UserContext';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  messages: Message[];
}

const Chat = () => {
  const { user } = useUser();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: "general",
      name: "General Support",
      description: "A place to share general mental health questions and support",
      messages: [
        {
          id: "1",
          text: "Hello everyone! How are you doing today?",
          sender: "Moderator",
          timestamp: "10:30 AM",
        },
        {
          id: "2",
          text: "I'm having a good day so far. Been practicing mindfulness techniques that have been helping.",
          sender: "JohnD",
          timestamp: "10:35 AM",
        },
      ],
    },
    {
      id: "anxiety",
      name: "Anxiety Support",
      description: "A dedicated space to discuss anxiety and coping mechanisms",
      messages: [
        {
          id: "1",
          text: "What techniques do you all use to manage anxiety attacks?",
          sender: "AnxiousButTrying",
          timestamp: "9:45 AM",
        },
      ],
    },
    {
      id: "depression",
      name: "Depression Support",
      description: "For those dealing with depression - you're not alone",
      messages: [
        {
          id: "1",
          text: "Remember that small steps are still progress. Be kind to yourself today.",
          sender: "Moderator",
          timestamp: "8:15 AM",
        },
      ],
    },
  ]);

  const [activeRoomId, setActiveRoomId] = useState("general");
  const [newMessage, setNewMessage] = useState("");
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [chatRooms, activeRoomId]);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: user?.username || "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatRooms(rooms => 
      rooms.map(room => 
        room.id === activeRoomId 
          ? { ...room, messages: [...room.messages, message] } 
          : room
      )
    );
    
    setNewMessage("");
  };

  const activeRoom = chatRooms.find(room => room.id === activeRoomId) || chatRooms[0];

  return (
    <div className="min-h-screen py-8 px-4 md:px-20">
      <Title text="Community Chat" />
      <p className="text-center text-black mb-8">
        Connect with others, share experiences, and find support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white/10 rounded-lg p-4 shadow-md" style={{
            background: "linear-gradient(to bottom, var(--color-primary), #2a0134)",
          }}>
            <h3 className="text-xl font-medium mb-4 text-white">Your Profile</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="bg-white/10 border border-white/30 text-white rounded px-3 py-1 text-sm flex-1">
                {user?.username}
              </div>
            </div>
            {/* <div className="text-white/80 text-sm">
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone_number}</p>
              <p>Member since: {new Date(user?.created_at || '').toLocaleDateString()}</p>
            </div> */}
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 shadow-md" style={{
            background: "linear-gradient(to bottom, var(--color-primary), #2a0134)",
          }}>
            <h3 className="text-xl font-medium mb-4 text-white">Chat Rooms</h3>
            <div className="space-y-2">
              {chatRooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeRoomId === room.id 
                      ? "bg-secondary/50 text-white" 
                      : "bg-white/10 text-gray-200 hover:bg-white/20"
                  }`}
                >
                  <div className="font-medium">{room.name}</div>
                  <div className="text-xs opacity-80">{room.messages.length} messages</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="md:col-span-3 flex flex-col h-[600px] rounded-lg shadow-md overflow-hidden" style={{
          background: "linear-gradient(135deg, var(--color-primary), #2a0134)",
        }}>
          {/* Chat Header */}
          <div className="p-4 border-b border-white/20">
            <h3 className="text-xl font-medium text-white">{activeRoom.name}</h3>
            <p className="text-sm text-gray-300">{activeRoom.description}</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeRoom.messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === user?.username ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === user?.username 
                    ? 'bg-secondary/40 text-white' 
                    : 'bg-white/10 text-white'
                }`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-medium text-sm">
                      {message.sender === user?.username ? 'You' : message.sender}
                    </span>
                    <span className="text-xs opacity-70 ml-2">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/20 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-white/10 border border-white/30 text-white rounded-lg px-4 py-2"
              placeholder="Type your message..."
            />
            <div className="w-24">
              <Button value="Send" small />
            </div>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 p-6 rounded-lg shadow-md" style={{
        background: "linear-gradient(to right, var(--color-primary), var(--color-vivid-purple))",
      }}>
        <h2 className="text-2xl font-medium mb-4 text-white">Community Guidelines</h2>
        <ul className="list-disc list-inside space-y-2 text-white">
          <li>Be respectful and kind to other members</li>
          <li>Maintain confidentiality - what's shared here stays here</li>
          <li>This is a peer support space, not professional therapy</li>
          <li>For crisis situations, please contact emergency services</li>
          <li>Report any concerning or harmful content to moderators</li>
        </ul>
      </div>
    </div>
  );
};

export default Chat; 