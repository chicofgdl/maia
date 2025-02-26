"use client";
import { useEffect, useState } from "react";
import {
    User,
    LayoutDashboard,
    Database,
    MessageSquare,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
    // COMECEI A MUDAR
    const pathname = usePathname();
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    useEffect(() => {
        const storedState = localStorage.getItem("sidebarExpanded");
        setIsExpanded(storedState === "true");
    }, []);

    const handleToggleSidebar = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);
        localStorage.setItem("sidebarExpanded", String(newState));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const isActive = (path: string) =>
        pathname === path ? "bg-[#629E44]" : "bg-[#50A296]";

    return (
        <div
            className={`h-full flex flex-col justify-between bg-gray-800 p-6 transition-all duration-300 rounded-2xl ${isExpanded ? "w-60" : "w-28"
                }`}
        >
            <div className="flex flex-col gap-6">

                <div className="flex flex-row justify-end gap-5">
                    {isExpanded && (<h1 className="text-4xl text-white font-bold">MAIA</h1>)}
                    {/* Botão para Expandir/Recolher */}
                    <button
                        className={`h-10 p-2 rounded-lg bg-[#50A296] hover:bg-[#629E44] text-white ${isExpanded ? "self-end bg-[#629E44]" : "self-center w-full"}`}
                        onClick={handleToggleSidebar}
                    >
                        {isExpanded ? (
                            <ChevronLeft size={20} />
                        ) : (
                            <ChevronRight size={20} />
                        )}
                    </button>
                </div>
                {/* Logo */}
                {isExpanded && (
                    <div className="flex flex-col items-center bg-[#50A296]/20 p-4 rounded-xl">
                        {/* <h1 className="text-white text-2xl mb-2">MAIA</h1> */}
                        <Image
                            src="/assets/images/maia_icon_2.png"
                            alt="Ícone onboarding"
                            width={isExpanded ? 100 : 40}
                            height={isExpanded ? 100 : 40}
                        />
                    </div>
                )}
            {/* Links */}
            <div className="flex flex-col gap-4 mt-4">
                {[
                    { href: "/", icon: MessageSquare, label: "Chats" },
                    { href: "/databases", icon: Database, label: "Databases" },
                    {
                        href: "/dashboards",
                        icon: LayoutDashboard,
                        label: "Dashboards",
                    },
                    // {
                    //     href: "/instructions",
                    //     icon: BookText,
                    //     label: "Instruções",
                    // },
                ].map(({ href, icon: Icon, label }) => (
                    <Link key={href} href={href}>
                        <div
                            className={`${isActive(
                                href
                            )} font-bold hover:bg-[#629E44] text-white h-12 rounded-xl flex items-center px-4`}
                        >
                            <Icon className="w-6 h-6 text-gray-100" />
                            {isExpanded && (
                                <span className="ml-2">{label}</span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            </div>


            <div className="flex flex-col gap-4 mt-4">
                <Link href="/profile">
                    <div
                        className={`${isActive(
                            "/profile"
                        )} font-bold hover:bg-[#629E44] text-white h-12 rounded-xl flex items-center px-4`}
                    >
                        <User className="w-6 h-6 text-gray-100" />
                        {isExpanded && <span className="ml-2">Perfil</span>}
                    </div>
                </Link>
                {/* Logout */}
                <button onClick={handleLogout} className="mt-auto">
                    <div className="bg-[#50A296] font-bold hover:bg-red-900 text-white h-12 rounded-xl flex items-center px-4">
                        <LogOut className="w-6 h-6 text-gray-100" />
                        {isExpanded && <span className="ml-2">Sair</span>}
                    </div>
                </button>
            </div>
        </div>
    );
}
