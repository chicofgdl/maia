'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Checklist from '@/components/Checklist';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  
  const router = useRouter();
  
      useEffect(() => {
          console.log("Login useEffect");
          console.log("token: " + localStorage.getItem("token"));
          const isAuthenticated = localStorage.getItem("token");
          if (!isAuthenticated) {
              router.push("/login");
          }
      }, [router]);

  return (
    <div className="w-full h-screen flex bg-blue-900 p-6 gap-6 justify-center">

      <div className="w-1/6 bg-gray-300/70 p-2 rounded-2xl">
        <Sidebar />
      </div>
      <div className="w-2/4 bg-gray-300/70 p-2 rounded-2xl">
        <Chatbot/>
      </div>
      <div className="w-1/4 bg-blue-300/50 p-2 rounded-2xl">
        <Checklist/>
      </div>
    </div>
  );
}
