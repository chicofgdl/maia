// src/app/databases/page.tsx
import Sidebar from '@/components/Sidebar';
import React from 'react';

const mockDatabases = [
  { id: 1, name: 'Database 1', type: 'Arquivo .txt', status: 'Desenvolvimento' },
  { id: 2, name: 'Database 2', type: 'Figma', status: 'Design' },
  { id: 3, name: 'Database 3', type: 'Planilha', status: 'Negócios' },
];

const Databases = () => {
  return (
    <div className="w-full h-screen flex bg-gray-600 p-6 gap-6">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-400 p-6 rounded-2xl">
        <Sidebar />
      </div>
      {/* Conteúdo da página Databases */}
      <div className="w-8/12 bg-gray-300 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 bg-blue-200 rounded-xl p-2 flex justify-center">Databases</h1>
        <div className="space-y-4">
          {mockDatabases.map((db) => (
            <div key={db.id} className="bg-white p-4 rounded-xl shadow-lg">
              <h2 className="font-semibold">{db.name}</h2>
              <p><strong>Tipo:</strong> {db.type}</p>
              <p><strong>Setor:</strong> {db.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Databases;
