import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

import { KeyRound, Users } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
const items = [
  {
    title: "Seguridad",
    icon: KeyRound,
    subItems: [
      {
        title: "Usuarios",
        url: "/dashboard/users",
        icon: Users,
      },
    ],
  },
];

export const DashboardLayout = () => {
  return (
    <div className=" w-full flex h-screen">
      <SidebarProvider>
        <Sidebar items={items} sidebarTitle="UserFlow" />
        <SidebarTrigger />
        <div className="w-full">
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};
