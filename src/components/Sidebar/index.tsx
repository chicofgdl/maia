'use client'; // Certifique-se de que o componente é tratado como Client Component
import { User, LayoutDashboard, Database, Bot, MessageSquare, MessageCircleQuestion, BookText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Substituir useRouter por usePathname

export default function Sidebar() {
  const pathname = usePathname(); // Usa o usePathname para obter a rota atual

  // Função para verificar se a rota atual é igual à rota do link
  const isActive = (path: string) => pathname === path ? 'bg-gray-700' : 'bg-gray-500';

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
            <div className={`${isActive('/')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
              <MessageSquare className="w-6 h-6 text-gray-800 mr-2" /><h2>Chats</h2>
            </div>
          </Link>
          <Link href="/databases">
            <div className={`${isActive('/databases')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
              <Database className="w-6 h-6 text-gray-800 mr-2" /><h2>Databases</h2>
            </div>
          </Link>
          <Link href="/">
            <div className={`${isActive('/dashboards')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
              <LayoutDashboard className="w-6 h-6 text-gray-800 mr-2" /><h2>Dashboards</h2>
            </div>
          </Link>
          <Link href="/profile">
            <div className={`${isActive('/profile')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
              <User className="w-6 h-6 text-gray-800 mr-2" /><h2>Profile</h2>
            </div>
          </Link>
          <Link href="/">
            <div className={`${isActive('/instructions')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
              <BookText className="w-6 h-6 text-gray-800 mr-2" /><h2>Instruções</h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/">
          <div className={`${isActive('/feedback')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
            <MessageCircleQuestion className="w-6 h-6 text-gray-800 mr-2" /><h2>Feedback</h2>
          </div>
        </Link>
        <Link href="/">
          <div className={`${isActive('/bassist')} font-bold hover:bg-gray-600 text-white h-12 rounded-xl flex items-center justify-start px-4 g-2`}>
            <Bot className="w-6 h-6 text-gray-800 mr-2" /><h2>Bassist</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
