"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";

const mockUserProfile = {
    name: "Chico",
    email: "fglb@cin.ufpe.br",
    role: "Administrador",
    createdAt: "30/01/2025",
    profilePicture: "/assets/images/profile_mock.png",
};

const mockCompanies = [
    {
        id: 1,
        name: "Empresa A",
        image: "/assets/images/company_icon.png",
        employees: [
            { id: 1, name: "Funcionário 1", role: "Desenvolvedor" },
            { id: 2, name: "Funcionário 2", role: "Desenvolvedor" },
            { id: 3, name: "Funcionário 3", role: "Desenvolvedor" },
            { id: 4, name: "Funcionário 4", role: "Designer" },
            { id: 5, name: "Funcionário 5", role: "Designer" },
            { id: 6, name: "Funcionário 6", role: "Tech leader" },
        ],
    },
    {
        id: 2,
        name: "Empresa B",
        image: "/assets/images/company_icon.png",
        employees: [
            { id: 7, name: "Funcionário 7", role: "Gerente" },
            { id: 8, name: "Funcionário 8", role: "Analista" },
        ],
    },
];

const Profile = () => {
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [employees, setEmployees] = useState<any[]>([]);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        role: "",
        password: "",
    });

    const handleCompanyClick = (companyId: number) => {
        setSelectedCompany(companyId);
        const selected = mockCompanies.find(
            (company) => company.id === companyId
        );
        setEmployees(selected ? selected.employees : []);
    };

    const handleAddEmployee = () => {
        if (!selectedCompany) return;

        const companyIndex = mockCompanies.findIndex(
            (c) => c.id === selectedCompany
        );
        if (companyIndex === -1) return;

        const newId =
            Math.max(
                ...mockCompanies.flatMap((c) => c.employees.map((e) => e.id)),
                0
            ) + 1;

        const newEmployeeData = {
            id: newId,
            name: newEmployee.name,
            role: newEmployee.role,
        };

        // Obtém os usuários existentes do localStorage
        const existingUsers = JSON.parse(
            localStorage.getItem("validUsers") || "[]"
        );
        // Cria um login e salva no localStorage
        const username = newEmployee.name.toLowerCase().replace(/ /g, "");

        // Verifica se o usuário já existe
        const userExists = existingUsers.some(
            (user) => user.username === username
        );

        if (userExists) {
            alert("Erro: Esse usuário já está cadastrado!");
            return;
        }
        // Atualiza a empresa com o novo funcionário
        mockCompanies[companyIndex].employees.push(newEmployeeData);
        setEmployees([...mockCompanies[companyIndex].employees]);

        const newUser = {
            username,
            password: newEmployee.password,
            role: newEmployee.role,
        };

        // Atualiza a lista de usuários e salva no localStorage
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("validUsers", JSON.stringify(updatedUsers));

        console.log("Usuários cadastrados:", updatedUsers);
        console.log(
            "Usuários cadastrados no localStorage:",
            JSON.parse(localStorage.getItem("validUsers"))
        );

        // Reseta o formulário e fecha o modal
        setNewEmployee({ name: "", role: "", password: "" });
        setShowAddEmployeeModal(false);
    };

    const handleDeleteEmployee = (employeeId: number) => {
        setEmployees(
            employees.filter((employee) => employee.id !== employeeId)
        );
    };

    return (
        <div className="w-full h-screen flex bg-gray-700 p-6 gap-6 justify-center">
            <Sidebar />
            {/* Conteúdo da página Profile */}
            <div
                className="w-full bg-gray-800 p-6 rounded-2xl overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <h1 className="text-2xl font-bold mb-6 bg-[#629E44] rounded-xl p-2 flex justify-center text-white">
                    Perfil
                </h1>
                <div className="bg-gray-700 p-6 rounded-xl shadow-lg flex gap-6">
                    <div className="flex-none w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                        <Image
                            src={mockUserProfile.profilePicture}
                            alt="Foto de Perfil"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-1 text-black">
                        <h2 className="text-2xl font-semibold text-white">
                            {mockUserProfile.name}
                        </h2>
                        <p className="text-lg text-white">
                            <strong className="text-[#50A296]">Email:</strong>{" "}
                            {mockUserProfile.email}
                        </p>
                        <p className="text-lg text-white">
                            <strong className="text-[#50A296]">Cargo:</strong>{" "}
                            {mockUserProfile.role}
                        </p>
                        <p className="text-lg text-white">
                            <strong className="text-[#50A296]">
                                Membro desde:
                            </strong>{" "}
                            {mockUserProfile.createdAt}
                        </p>
                    </div>
                </div>

                {/* Empresas */}
                <div className="mt-6 bg-gray-700 p-4 rounded-xl shadow-2xl cursor-pointer">
                    <h2 className="text-xl flex justify-center font-bold mb-6 bg-[#50A296] rounded-xl p-2 text-white">
                        Empresas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {mockCompanies.map((company) => (
                            <div
                                key={company.id}
                                className="bg-[#50A296] p-4 rounded-xl shadow-lg cursor-pointer hover:bg-[#50A296]/80"
                                onClick={() => handleCompanyClick(company.id)}
                            >
                                <Image
                                    src={company.image}
                                    alt={company.name}
                                    width={100}
                                    height={100}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <h3 className="mt-2 text-center font-semibold">
                                    {company.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Funcionários */}
                {selectedCompany && (
                    <div className="mt-6 bg-gray-700 p-4 rounded-xl shadow-lg cursor-pointer">
                        <h3 className="text-xl mb-6 flex justify-center font-bold bg-[#50A296] rounded-xl p-2 text-white">
                            Funcionários
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="flex items-center bg-slate-300 p-4 rounded-xl shadow-lg"
                                >
                                    <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                                        <Image
                                            src="/assets/images/profile_mock.png"
                                            alt={employee.name}
                                            width={100}
                                            height={100}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="flex-1 pl-4">
                                        <p className="font-semibold">
                                            {employee.name} | {employee.role}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteEmployee(employee.id)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAddEmployeeModal(true)}
                            className="bg-[#50A296] text-white font-bold py-2 px-4 rounded mt-4 hover:bg-[#629E44]"
                        >
                            Adicionar Funcionário
                        </button>
                    </div>
                )}
            </div>
            {showAddEmployeeModal && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4 text-gray-600">
                            Novo Funcionário
                        </h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="w-full p-2 border rounded mb-2"
                            value={newEmployee.name}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Cargo"
                            className="w-full p-2 border rounded mb-2"
                            value={newEmployee.role}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    role: e.target.value,
                                })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full p-2 border rounded mb-2"
                            value={newEmployee.password}
                            onChange={(e) =>
                                setNewEmployee({
                                    ...newEmployee,
                                    password: e.target.value,
                                })
                            }
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowAddEmployeeModal(false)}
                                className="px-4 py-2 bg-[#9E2449] text-white rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddEmployee}
                                className="px-4 py-2 bg-[#50A296] text-white rounded"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
