"use client";

import { Layout,Compass, List, BarChart, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-items";


const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href:"/dashboard",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
        
    }, {
        icon: Video,
        label: "Streams",
        href: "/stream-home"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    }, 
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
]

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {
                routes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
           
        </div>
    )
}