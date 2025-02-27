"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface Database {
    id: number;
    name: string;
    type: string;
    setor: string;
    content?: string; // armazenar conteúdo de arquivos .txt
    url?: string; // armazenar links
}

const Databases = () => {
    const [databases, setDatabases] = useState<Database[]>([]);
    const [newLink, setNewLink] = useState("");
    const [selectedContent, setSelectedContent] = useState<string | null>(null);

    useEffect(() => {
        const storedDatabases = localStorage.getItem("databases");
        if (storedDatabases) {
            try {
                setDatabases(JSON.parse(storedDatabases));
            } catch (error) {
                console.error(
                    "Erro ao carregar databases do localStorage:",
                    error
                );
            }
        }
    }, []);

    useEffect(() => {
        if (databases.length > 0) {
            localStorage.setItem("databases", JSON.stringify(databases));
        }
    }, [databases]);

    // Caso queira ver o conteúdo dos arquivos .txt no console
    // useEffect(() => {
    //   databases.forEach((db) => {
    //     if (db.content) {
    //       console.log(db.content);
    //     }
    //   });
    // }, [databases]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target?.result as string;
                const newDatabase: Database = {
                    id: Date.now(),
                    name: file.name,
                    type: file.type || "Desconhecido",
                    setor: "Desenvolvimento",
                    content: file.type.includes("text") ? content : undefined,
                };

                setDatabases((prev) => [...prev, newDatabase]);
            };

            if (file.type.includes("text")) {
                reader.readAsText(file);
            } else {
                const newDatabase: Database = {
                    id: Date.now(),
                    name: file.name,
                    type: file.type || "Desconhecido",
                    setor: "Desenvolvimento",
                };
                setDatabases((prev) => [...prev, newDatabase]);
            }
        }
    };

    const handleAddLink = () => {
        if (newLink.trim() === "") return;
        const newDatabase: Database = {
            id: Date.now(),
            name: newLink,
            type: "Link",
            setor: "Desenvolvimento",
            url: newLink,
        };

        setDatabases((prev) => [...prev, newDatabase]);
        setNewLink("");
    };

    return (
        <div className="w-full h-screen flex bg-gray-700 p-6 gap-6 justify-center">
            <Sidebar />

            {/* Conteúdo da página Databases */}
            <div
                className="w-10/12 bg-gray-800 p-6 rounded-2xl overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <h1 className="text-2xl font-bold mb-6 bg-[#4C8CE6] rounded-xl p-3 flex justify-center text-white">
                    Databases
                </h1>

                {/* Upload de Arquivo e Adicionar Link */}
                <div className="mb-4 p-4 bg-gray-700 rounded-2xl flex gap-4">
                    {/* Botão de Upload */}
                    <button
                        onClick={() =>
                            document.getElementById("fileInput")?.click()
                        }
                        className="p-3 bg-[#50A296] text-white rounded-xl flex items-center justify-center w-12 h-12"
                    >
                        <Image
                            src="/assets/images/folder-open.svg"
                            alt="Ícone de cursor"
                            className="w-6 h-6"
                            width={6}
                            height={6}
                        />
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                    {/* Input de Link */}
                    <input
                        type="text"
                        placeholder="Link..."
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="p-3 flex-1 rounded-xl bg-gray-200"
                    />
                    <button
                        onClick={handleAddLink}
                        className="p-3 bg-[#629E44] text-white rounded-xl font-bold"
                    >
                        Adicionar
                    </button>
                </div>

                {/* Lista de arquivos e links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {databases.map((db) => (
                        <div
                            key={db.id}
                            className="bg-gray-700 p-4 rounded-2xl shadow-lg cursor-pointer hover:bg-gray-600 flex flex-col justify-between"
                            onClick={() => {
                                if (db.url) {
                                    window.open(db.url, "_blank");
                                } else if (db.content) {
                                    setSelectedContent(db.content);
                                }
                            }}
                        >
                            {/* Conteúdo do database */}
                            <div>
                                <h2 className="font-semibold text-xl text-gray-100">
                                    {db.name.slice(0, -4)
                                    }
                                </h2>
                                <p className="text-[#50A296]">
                                    <strong>Tipo:</strong> {db.type}
                                </p>
                                <p className="text-[#50A296]">
                                    <strong>Setor:</strong> {db.setor}
                                </p>
                            </div>

                            {/* Botão de remoção */}
                            <button
                                className="mt-4 p-3 bg-gray-800 rounded-2xl flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que clique remova e também abra a URL
                                    // removeDatabase(db.id);
                                }}
                            >
                                <Trash size={24} className="text-red-700"/>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal para exibir conteúdo do arquivo */}
                {selectedContent && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                        onClick={() => setSelectedContent(null)} // Fecha ao clicar fora
                    >
                        <div
                            className="bg-white p-6 rounded-xl w-96"
                            onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar dentro
                        >
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                Conteúdo de {selectedContent.split("\n")[0]}
                            </h2>
                            <pre className="text-sm whitespace-pre-wrap text-gray-700">
                                {selectedContent}
                            </pre>
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="mt-4 bg-blue-900/80 text-white p-3 rounded-xl"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Databases;
