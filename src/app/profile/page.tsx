'use client';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

const mockUserProfile = {
  name: 'Chico',
  email: 'fglb@cin.ufpe.br',
  role: 'Administrador',
  createdAt: '30/01/2025',
  profilePicture: '/assets/images/profile_mock.png',
};

const mockCompanies = [
  {
    id: 1,
    name: 'Empresa A',
    image: '/assets/images/company_icon.png',
    employees: [
      { id: 1, name: 'Funcionário 1', role: 'Desenvolvedor' },
      { id: 2, name: 'Funcionário 2', role: 'Designer' },
    ],
  },
  {
    id: 2,
    name: 'Empresa B',
    image: '/assets/images/company_icon.png',
    employees: [
      { id: 3, name: 'Funcionário 3', role: 'Gerente' },
      { id: 4, name: 'Funcionário 4', role: 'Analista' },
    ],
  },
];

const Profile = () => {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);

  const handleCompanyClick = (companyId: number) => {
    setSelectedCompany(companyId);
    const selected = mockCompanies.find((company) => company.id === companyId);
    setEmployees(selected ? selected.employees : []);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(employees.filter((employee) => employee.id !== employeeId));
  };

  return (
    <div className="w-full h-screen flex bg-gray-600 p-6 gap-6">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-400 p-6 rounded-2xl">
        <Sidebar />
      </div>

      {/* Conteúdo da página Profile */}
      <div className="w-8/12 bg-gray-400 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 bg-blue-200 rounded-xl p-2 flex justify-center">Perfil</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg flex gap-6">
          {/* Foto de perfil e informações do usuário */}
          <div className="flex-none w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={mockUserProfile.profilePicture}
              alt="Foto de Perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{mockUserProfile.name}</h2>
            <p><strong>Email:</strong> {mockUserProfile.email}</p>
            <p><strong>Cargo:</strong> {mockUserProfile.role}</p>
            <p><strong>Membro desde:</strong> {mockUserProfile.createdAt}</p>
          </div>
        </div>

        {/* Empresas */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Empresas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

            {mockCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-slate-300 p-4 rounded-xl shadow-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleCompanyClick(company.id)}
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="mt-2 text-center font-semibold">{company.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Funcionários */}
        {selectedCompany && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-lg cursor-pointer">
            <h3 className="text-xl font-semibold mb-4 flex justify-center">Funcionários</h3>
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center bg-slate-300 p-4 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src="/assets/images/profile_mock.png" // Usar a imagem de perfil do funcionário se disponível
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 pl-4">
                    <p className="font-semibold">{employee.name} | {employee.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
