'use client';  // Pasta app renderiza do lado do servidor. Essa linha informa que é para renderizar do lado cliente.
import ChatInput from '@/components/ChatInput';
import Sidebar from '../components/Sidebar';
import Checklist from '@/components/Checklist';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { type: 'user', text: 'Olá, o que você faz?' },
    { type: 'bot', text: 'Eu sou um chatbot que responde perguntas sobre sua empresa!' },
  ]);

  // Adicionar uma nova mensagem (exemplo com mock)
  const addMessage = (message: string, type: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { type, text: message }]);
  };

  return (
    <div className="w-full h-screen flex bg-gray-600 p-6">

      <div className="w-1/4 bg-gray-400 p-6 rounded-2xl">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col px-6 gap-6">
        {/* Histórico de Conversa */}
        <div className="h-[85%] bg-gray-400 rounded-2xl p-6 overflow-y-auto">
          <div className="h-full w-full bg-gray-300 rounded-2xl p-8 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.type === 'user' ? 'bg-blue-500 self-end text-white' : 'bg-gray-200 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* Campo de Input */}
        <div className="flex-1 p-4 bg-gray-400 rounded-2xl">
          <ChatInput
            onSubmit={(message: string) => addMessage(message, 'user')} // Exemplo: Adiciona mensagem do usuário
          />
        </div>
      </div>
      <div className="w-1/4 bg-gray-100 p-6 rounded-2xl">
        <Checklist/>
      </div>
    </div>
  );
}
