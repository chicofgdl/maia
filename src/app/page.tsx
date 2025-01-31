'use client';  // Pasta app renderiza do lado do servidor. Essa linha informa que é para renderizar do lado cliente.
import Sidebar from '../components/Sidebar';
import Checklist from '@/components/Checklist';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  

  return (
    <div className="w-full h-screen flex bg-gray-300 p-6 gap-6 flex justify-center">

      <div className="w-1/6 bg-blue-300/50 p-4 rounded-2xl">
        <Sidebar />
      </div>
      <div className="w-2/4 bg-blue-300/50 p-4 rounded-2xl">
        <Chatbot/>
      </div>
      <div className="w-1/4 bg-blue-300/50 p-4 rounded-2xl">
        <Checklist/>
      </div>
    </div>
  );
}
