import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { type: "user", text: "Olá, o que você faz?" },
    {
      type: "bot",
      text: "Eu sou um chatbot que responde perguntas sobre sua empresa!",
    },
    { type: "user", text: "Olá, o que você faz?" },
    {
      type: "bot",
      text: "Eu sou um chatbot que responde perguntas sobre sua empresa!",
    },
  ]);

  // Adicionar uma nova mensagem (exemplo com mock)
  const addMessage = (message: string, type: "user" | "bot") => {
    setMessages((prev) => [...prev, { type, text: message }]);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 h-full">
      {/* Histórico de Conversa */}
      <div className="h-full rounded-2xl overflow-y-auto">
        <div className="h-full w-full bg-gray-300 rounded-2xl p-8 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-500 self-end text-white"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      {/* Campo de Input */}
      <div className="flex-1 flex-row h-full gap-6 bg-gray-400 rounded-2xl w-full h-full">
        <div className="flex flex-row h-full gap-6">
          <input
            className="w-full rounded-2xl p-6 bg-gray-300"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Pergunte sobre o banco de dados"
          />
          <button type="button" onClick={() => addMessage(inputValue, "user")}>
            <div className="bg-blue-300 w-24 h-full rounded-2xl flex items-center justify-center">
              Buscar
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
