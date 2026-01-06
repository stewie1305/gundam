
import React, { useState, useRef, useEffect } from 'react';
// Fix: Correct import from geminiService
import { getGunplaAdvice } from '../services/geminiService';
// Fix: Correct import from types
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await getGunplaAdvice(newMessages);
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        // Fix: Access chunk.text property
        fullText += chunk.text || '';
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, my comms are jammed. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 h-[450px] bg-card-dark border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 flex items-center justify-between text-black font-bold font-display">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span>Gunpla Master AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
            {messages.length === 0 && (
              <div className="text-zinc-500 text-sm text-center mt-10">
                "Ready to begin your next build, pilot? Ask me about grades, series, or tools!"
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-black font-medium' 
                    : 'bg-zinc-800 text-white'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && !messages[messages.length - 1]?.text && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-2 rounded-xl animate-pulse">
                  <div className="w-8 h-2 bg-zinc-600 rounded"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a master..."
              className="flex-1 bg-zinc-800 border-none rounded-lg text-sm text-white focus:ring-1 focus:ring-primary placeholder-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-black hover:bg-primary-dark transition-colors"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(0,224,84,0.4)] flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <span className="material-symbols-outlined !text-3xl">smart_toy</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-dark"></span>
          </span>
        </button>
      )}
    </div>
  );
};
