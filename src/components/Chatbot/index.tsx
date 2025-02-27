'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';

interface Database {
    id: number;
    name: string;
    type: string;
    setor: string;
    content?: string;
    url?: string;
}

export default function Chatbot() {
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const [databases, setDatabases] = useState<Database[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "Eu sou MAIA, um chatbot que responde perguntas sobre sua empresa!",
        },
    ]);

    const addMessage = (message: string, type: "user" | "bot") => {
        setMessages((prev) => [...prev, { type, text: message }]);
    };

    useEffect(() => {
        const storedDatabases = localStorage.getItem("databases");
        if (storedDatabases) {
            try {
                setDatabases(JSON.parse(storedDatabases) as Database[]);
            } catch (error) {
                console.error(
                    "Erro ao carregar databases do Local Storage:",
                    error
                );
            }
        }
    }, []);

    const handleSendMessage = async () => {
        await sleep(1000);
        if (!inputValue.trim()) return;

        addMessage(inputValue, "user");

        setInputValue(""); 

        const documentContents = databases
            .slice(0, 2)
            .filter((db) => db.content)
            .map((db) => `Fonte: ${db.name}\n${db.content}`)
            .join("\n\n");
        console.log("DOCUMENT CONTENTSSSSSS " + documentContents);

        try {
            console.log("API KEY:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

            const response = await fetch(
                "https://api.openai.com/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4",
                        messages: [
                            {
                                role: "system",
                                content: `Você é um assistente virtual projetado para apoiar novos funcionários durante o processo de onboarding na empresa. 
    Você pode usar os seguintes documentos como referência para suas respostas:
    ${documentContents}`,
                            },
                            {
                                role: "user",
                                content: `${documentContents}\n\nPergunta: ${inputValue}`,
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();
            const botResponse =
                data.choices[0]?.message?.content ||
                "Desculpe, não consegui entender.";

            addMessage(botResponse, "bot");
        } catch (error) {
            addMessage(
                "Erro ao se comunicar com o bot. Tente novamente.",
                "bot"
            );
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede o comportamento padrão de "Enter", que poderia enviar o formulário
            handleSendMessage(); // Chama a função de envio da mensagem
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-4 h-full">
            {/* Histórico de Conversa */}
            <div className="h-full rounded-2xl overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <div className="min-h-full flex flex-col gap-4 p-8 bg-gray-800 rounded-2xl">
    {messages.map((msg, index) => (
        <div
            key={index}
            className={`flex items-start gap-4 p-3 rounded-lg max-w-[60%] ${
                msg.type === "user"
                    ? "bg-[#629E44] self-end text-white font-bold"
                    : "bg-[#50A296] self-start font-bold text-gray-100"
            }`}
        >
            {msg.type !== "user" && (
                <Image
                src="/assets/images/maia_icon_2.png"
                alt="Bot"
                width={28} // Define a largura da imagem
                height={28} // Define a altura da imagem
                className="rounded-full bg-gray-800"
            />
            )}
            <div className="flex-1 break-words whitespace-pre-wrap">
                {msg.text}
            </div>
        </div>
    ))}
</div>
            </div>
            {/* Campo de Input */}
            <div className="flex-1 flex-row h-full gap-6 rounded-2xl w-full">
                <div className="flex flex-row h-full gap-8">
                    <input
                        className="w-full rounded-2xl p-6 bg-gray-200"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Pergunte sobre o Onboarding"
                    />
                    <button type="button" onClick={handleSendMessage}>
                        <div className="bg-[#4C8CE6] w-24 h-full rounded-2xl flex items-center justify-center text-white font-bold">
                            <img src="/assets/images/send.svg" alt="Ícone de cursor" className="w-6 h-6 mr-2" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}