"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validUsers, setValidUsers] = useState<
        { username: string; password: string }[]
    >([]);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("");
    const [newCompany, setNewCompany] = useState("");

    useEffect(() => {
        const storedUsers = JSON.parse(
            localStorage.getItem("validUsers") || "[]"
        );
        setValidUsers(storedUsers);
    }, []);

    const handleLogin = () => {
        const validUser = validUsers.find(
            (user) => user.username === username && user.password === password
        );
        if (validUser) {
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            localStorage.setItem("token", "fake-token");
            router.push("/");
        } else {
            alert("Credenciais inválidas");
        }
    };

    const handleRegister = () => {
        if (
            !newUsername ||
            !newPassword ||
            !newEmail ||
            !newRole ||
            !newCompany
        ) {
            alert("Preencha todos os campos!");
            return;
        } else if (validUsers.some((user) => user.username === newUsername)) {
            alert("Nome de usuário já cadastrado!");
            return;
        }

        const newUser = {
            username: newUsername,
            email: newEmail,
            password: newPassword,
            role: newRole,
            company: newCompany,
            createdAt: new Date().toLocaleDateString("pt-BR"),
        };
        const updatedUsers = [...validUsers, newUser];
        setValidUsers(updatedUsers);
        localStorage.setItem("validUsers", JSON.stringify(updatedUsers));

        alert("Conta criada com sucesso!");
        setShowRegisterModal(false);
        setNewUsername("");
        setNewPassword("");
        setNewEmail("");
        setNewRole("");
        setNewCompany("");

        console.log("Usuários cadastrados: ", updatedUsers);
        console.log("Usuário atual: ", newUser
        );
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            <Image
                src="/assets/images/home_page_mock.png"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full z-0"
            />
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-sm h-auto z-10 bg-opacity-95">
                <div className="flex flex-row items-center justify-center mb-4 gap-3">
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
                />
                <input
                    className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-col gap-4">
                    <button
                        className="w-full h-10 bg-[#629E44] text-white p-2 rounded-xl font-bold"
                        onClick={handleLogin}
                        data-test="login-button-entrar"
                    >
                        Entrar
                    </button>
                    <button
                        className="w-full h-10 bg-[#50A296] text-white p-2 rounded-xl font-bold"
                        onClick={() => setShowRegisterModal(true)}
                        data-test="login-button-registrar"
                    >
                        Registrar
                    </button>
                </div>
            </div>

            {/* Modal de Criar conta */}
            {showRegisterModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 z-20">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-2xl font-bold text-center mb-4 text-gray-600">
                            Criar Conta
                        </h2>
                        <input
                            className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                            type="text"
                            placeholder="Novo Usuário"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                            type="email"
                            placeholder="Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                            type="password"
                            placeholder="Nova Senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                            type="text"
                            placeholder="Cargo"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded-xl mb-4 focus:outline-gray-400 text-gray-600 text-lg"
                            type="text"
                            placeholder="Empresa Associada"
                            value={newCompany}
                            onChange={(e) => setNewCompany(e.target.value)}
                        />
                        <div className="flex flex-col gap-4">
                            <button
                                className="w-full h-10 bg-[#50A296] text-white p-2 rounded-xl font-bold"
                                onClick={handleRegister}
                            >
                                Registrar
                            </button>
                            <button
                                className="w-full h-10 bg-[#9E2449] text-white p-2 rounded-xl font-bold"
                                onClick={() => setShowRegisterModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
