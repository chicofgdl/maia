// src/components/Sidebar/index.tsx
import { User, LayoutDashboard, Database, Bot, MessageSquare, MessageCircleQuestion, BookText } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-20">
        <h1 className="h-30 rounded-xl flex items-center justify-center">
        <img
              src={'/assets/images/onboarding_icon.png'}
              alt="Ícone onboarding"
            />
        </h1>
        <div className="flex flex-col gap-4">     
          <Link href="/">
            <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
              <MessageSquare className="w-6 h-6 text-gray-800 mr-2" /><h2>Chats</h2>
            </div>
          </Link>
          <Link href="/databases">
            <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
              <Database className="w-6 h-6 text-gray-800 mr-2" /><h2>Databases</h2>
            </div>
          </Link>
          <Link href="/dashboards">
            <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
              <LayoutDashboard className="w-6 h-6 text-gray-800 mr-2" /><h2>Dashboards</h2>
            </div>
          </Link>
          <Link href="/profile">
            <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
              <User className="w-6 h-6 text-gray-800 mr-2" /><h2>Profile</h2>
            </div>
          </Link>
          <Link href="/instructions">
            <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
              <BookText className="w-6 h-6 text-gray-800 mr-2" /><h2>Instruções</h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/feedback">
          <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
            <MessageCircleQuestion className="w-6 h-6 text-gray-800 mr-2" /><h2>Feedback</h2>
          </div>
        </Link>
        <Link href="/bassist">
          <div className="bg-gray-500 font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2">
            <Bot className="w-6 h-6 text-gray-800 mr-2" /><h2>Bassist</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
