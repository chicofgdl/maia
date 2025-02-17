'use client';
import Sidebar from '@/components/Sidebar';
import React, { useState, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const mockCompanies = [
  {
    id: 1,
    name: 'Empresa A',
    employees: [
      { id: 1, name: 'Funcionário 1', role: 'Desenvolvedor', progress: 75, tasksDone: 4, tasksTotal: 5, questionsAsked: 12, dataInicio: '01/01/2024', dataFim: '-' },
      { id: 2, name: 'Funcionário 2', role: 'Designer', progress: 50, tasksDone: 3, tasksTotal: 5, questionsAsked: 8, dataInicio: '05/02/2024', dataFim: '10/03/2024' },
      { id: 3, name: 'Funcionário 3', role: 'Tester', progress: 60, tasksDone: 3, tasksTotal: 5, questionsAsked: 5, dataInicio: '10/03/2024', dataFim: '-' },
    ],
  },
  {
    id: 2,
    name: 'Empresa B',
    employees: [
      { id: 4, name: 'Funcionário 4', role: 'Gerente', progress: 90, tasksDone: 5, tasksTotal: 5, questionsAsked: 15, dataInicio: '15/01/2024', dataFim: '-' },
      { id: 5, name: 'Funcionário 5', role: 'Analista', progress: 40, tasksDone: 2, tasksTotal: 5, questionsAsked: 10, dataInicio: '20/02/2024', dataFim: '25/04/2024' },
      { id: 6, name: 'Funcionário 6', role: 'Estagiário', progress: 30, tasksDone: 1, tasksTotal: 5, questionsAsked: 20, dataInicio: '01/04/2024', dataFim: '-' },
    ],
  },
  {
    id: 3,
    name: 'Empresa C',
    employees: [
      { id: 7, name: 'Funcionário 7', role: 'Desenvolvedor', progress: 80, tasksDone: 4, tasksTotal: 5, questionsAsked: 10, dataInicio: '10/01/2024', dataFim: '-' },
      { id: 8, name: 'Funcionário 8', role: 'Designer', progress: 55, tasksDone: 3, tasksTotal: 5, questionsAsked: 12, dataInicio: '15/02/2024', dataFim: '20/04/2024' },
      { id: 9, name: 'Funcionário 9', role: 'Analista de Dados', progress: 70, tasksDone: 4, tasksTotal: 5, questionsAsked: 9, dataInicio: '05/03/2024', dataFim: '-' },
    ],
  },
  {
    id: 4,
    name: 'Empresa D',
    employees: [
      { id: 10, name: 'Funcionário 10', role: 'Gerente de Projetos', progress: 85, tasksDone: 5, tasksTotal: 5, questionsAsked: 7, dataInicio: '02/01/2024', dataFim: '-' },
      { id: 11, name: 'Funcionário 11', role: 'Tester', progress: 50, tasksDone: 3, tasksTotal: 5, questionsAsked: 14, dataInicio: '12/03/2024', dataFim: '30/05/2024' },
      { id: 12, name: 'Funcionário 12', role: 'DevOps', progress: 60, tasksDone: 3, tasksTotal: 5, questionsAsked: 11, dataInicio: '25/02/2024', dataFim: '-' },
    ],
  },
];

const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 relative">
    <div
      className="bg-blue-600 h-4 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
    <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
      {value}%
    </div>
  </div>
);

const Dashboards = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleCompanyChange = (event) => {
    const companyId = Number(event.target.value);
    setSelectedCompany(companyId);
    const selected = mockCompanies.find(company => company.id === companyId);
    setEmployees(selected ? selected.employees : []);
    setSelectedEmployee(null);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(Number(event.target.value));
  };

  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);

  const pieData = useMemo(() => {
    return selectedEmployeeData
      ? {
          labels: ['Tasks Concluídas', 'Tasks Pendentes'],
          datasets: [
            {
              data: [selectedEmployeeData.tasksDone, selectedEmployeeData.tasksTotal - selectedEmployeeData.tasksDone],
              backgroundColor: ['#4CAF50', '#F44336'],
            },
          ],
        }
      : null;
  }, [selectedEmployeeData]);

  const renderFilterContent = () => {
    if (!selectedEmployeeData) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-4xl">
          <h3 className="text-lg font-bold mb-4">Aproveitamento do Funcionário</h3>
          {pieData && <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right' } } }} />}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-white p-4 rounded-xl shadow-lg text-center w-full">
            <h3 className="text-md font-bold mb-2">Progresso do Funcionário</h3>
            <Progress value={selectedEmployeeData.progress} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg text-center w-full">
            <h3 className="text-md font-bold mb-2">Perguntas feitas à MAIA</h3>
            <p>{selectedEmployeeData.questionsAsked}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg text-center w-full">
            <h3 className="text-md font-bold mb-2">Data de Início do Onboarding</h3>
            <p>{selectedEmployeeData.dataInicio}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg text-center w-full">
            <h3 className="text-md font-bold mb-2">Data de Fim do Onboarding</h3>
            <p>{selectedEmployeeData.dataFim}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-300 p-6 gap-6 justify-center">
      <div className="w-full md:w-1/6 bg-blue-300/50 p-4 rounded-2xl">
        <Sidebar />
      </div>
      <div className="w-full md:w-3/4 bg-blue-300/50 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 bg-blue-900/70 rounded-xl p-2 flex justify-center text-white">Dashboards</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <select onChange={handleCompanyChange} className="p-3 rounded-lg bg-white shadow w-full">
            <option value="">Selecione uma empresa da nossa base de dados</option>
            {mockCompanies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
          </select>
          <select onChange={handleEmployeeChange} className="p-3 rounded-lg bg-white shadow w-full" disabled={!selectedCompany}>
            <option value="">Selecione um funcionário da empresa escolhida</option>
            {employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name} - {employee.role}</option>)}
          </select>
        </div>
        {renderFilterContent()}
      </div>
    </div>
  );
};

export default Dashboards;
