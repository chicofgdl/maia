'use client';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { Trash } from "lucide-react";

// Mock de Dados dos Dashboards
const mockDashboards = [
  { id: 1, name: 'Dashboard 1', description: 'Este é o Dashboard 1' },
  { id: 2, name: 'Dashboard 2', description: 'Este é o Dashboard 2' },
  { id: 3, name: 'Dashboard 3', description: 'Este é o Dashboard 3' },
  { id: 4, name: 'Dashboard 4', description: 'Este é o Dashboard 4' },
];

const Dashboards = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<number | null>(null);

  // Função para mudar o dashboard exibido
  const handleDashboardClick = (dashboardId: number) => {
    setSelectedDashboard(dashboardId);
  };

  // Função para renderizar o conteúdo do dashboard selecionado
  const renderDashboardContent = () => {
    const selected = mockDashboards.find(dashboard => dashboard.id === selectedDashboard);
    if (!selected) return <p>Selecione um dashboard para visualizar.</p>;

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{selected.name}</h2>
        <p>{selected.description}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex bg-gray-300 p-6 gap-6 flex justify-center">
      {/* Sidebar */}
      <div className="w-1/6 bg-blue-300/50 p-4 rounded-2xl">
        <Sidebar />
      </div>

      {/* Conteúdo da página Dashboards */}
      <div className="w-3/4 bg-blue-300/50 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 bg-blue-900/70 rounded-xl p-2 flex justify-center text-white">Dashboards</h1>
        
        {/* Seção de Dashboards */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex gap-6">
          <div className="w-1/4">
            <h2 className="text-xl font-semibold">Escolha um Dashboard</h2>
            <div className="space-y-4 mt-4">
              {mockDashboards.map((dashboard) => (
                <div
                  key={dashboard.id}
                  className="bg-slate-300 p-4 rounded-xl shadow-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => handleDashboardClick(dashboard.id)}
                >
                  <h3 className="text-center font-semibold">{dashboard.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Exibição do conteúdo do Dashboard */}
          <div className="flex-1">
            {renderDashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;
