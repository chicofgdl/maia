"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";

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
        <div className="w-full h-screen flex bg-gray-600 p-6 gap-6">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-400 p-6 rounded-2xl">
                <Sidebar />
            </div>

            {/* Conteúdo da página Databases */}
            <div className="w-8/12 bg-gray-300 p-6 rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 bg-blue-200 rounded-xl p-2 flex justify-center">
                    Databases
                </h1>

                {/* Upload de Arquivo e Adicionar Link */}
                <div className="mb-4 p-4 bg-green-400 rounded-2xl flex gap-2">
                    {/* Botão de Upload */}
                    <button
                        onClick={() =>
                            document.getElementById("fileInput")?.click()
                        }
                        className="p-2 bg-blue-600 text-white rounded flex items-center justify-center w-10 h-10"
                    >
                        +
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
                        className="p-2 flex-1 rounded"
                    />
                    <button
                        onClick={handleAddLink}
                        className="p-2 bg-blue-600 text-white rounded"
                    >
                        Adicionar
                    </button>
                </div>

                {/* Lista de arquivos e links */}
                <div className="space-y-4">
                    {databases.map((db) => (
                        <div
                            key={db.id}
                            className="bg-white p-4 rounded-xl shadow-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                if (db.url) {
                                    window.open(db.url, "_blank");
                                } else if (db.content) {
                                    setSelectedContent(db.content);
                                }
                            }}
                        >
                            <h2 className="font-semibold">{db.name}</h2>
                            <p>
                                <strong>Tipo:</strong> {db.type}
                            </p>
                            <p>
                                <strong>Setor:</strong> {db.setor}
                            </p>
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
                            <h2 className="text-xl font-bold mb-4">
                                Conteúdo de {selectedContent.split("\n")[0]}
                            </h2>
                            <pre className="text-sm whitespace-pre-wrap">
                                {selectedContent}
                            </pre>
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="mt-4 bg-blue-500 text-white p-2 rounded"
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