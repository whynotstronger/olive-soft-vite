import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import type { ChatMessage } from '../types.ts';
import { LoadingState } from '../types.ts';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour! I am Olive, your AI concierge. How can I help you improve your digital presence today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || status === LoadingState.LOADING) return;

    const userText = inputValue;
    setInputValue('');
    setStatus(LoadingState.LOADING);

    // Add user message
    const userMessage: ChatMessage = { role: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    // Format history for Gemini
    // We filter out the very first greeting if it wasn't a real API turn (optional, but good for context)
    const history = messages.slice(1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Call API
    const responseText = await sendMessageToGemini(userText, history);

    // Add model response
    setMessages(prev => [
      ...prev, 
      { role: 'model', text: responseText, timestamp: new Date() }
    ]);
    setStatus(LoadingState.IDLE);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-olive-600'}`}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-[360px] bg-white rounded-2xl shadow-2xl z-50 border border-slate-100 flex flex-col overflow-hidden animate-fade-in-up" style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-olive-500 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Olive AI Assistant</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Online powered by Gemini
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200' : 'bg-olive-100'}`}>
                  {msg.role === 'user' ? <User size={14} className="text-slate-600" /> : <Bot size={14} className="text-olive-700" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {status === LoadingState.LOADING && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-olive-100">
                  <Bot size={14} className="text-olive-700" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-olive-400 focus-within:ring-2 focus-within:ring-olive-100 transition-all">
              <input
                type="text"
                placeholder="Ask about our services..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-700"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={status === LoadingState.LOADING}
              />
              <button 
                onClick={handleSend}
                disabled={status === LoadingState.LOADING || !inputValue.trim()}
                className="text-olive-600 hover:text-olive-700 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
