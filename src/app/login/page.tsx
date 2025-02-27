"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            localStorage.setItem("token", "fake-token"); // Substituir por token real (JSON Web Token)
            router.push("/");
        } else {
            alert("Credenciais inválidas");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            {/* Imagem de fundo */}
            <Image
                src="/assets/images/home_page_mock.png"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            {/* Modal de login */}
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-sm h-auto z-10 bg-opacity-90">
                <div className="flex flex-row items-center justify-center mb-4">
                    <Image
                        src="/assets/images/maia_icon_2.png"
                        width={40}
                        height={40}
                        alt="maia icon"
                    />
                </div>
                <input
                    className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-full h-10 bg-gray-400 text-white p-2 rounded-xl"
                    onClick={handleLogin}
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
