import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/config/firebaseConfig";
import { useAuthToken } from "@/store/useAuthTokenStore";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  url?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: SidebarItem[];
}

interface Props {
  items: SidebarItem[];
  sidebarTitle: string;
}

export const Sidebar = ({ items, sidebarTitle }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setToken } = useAuthToken();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        setToken(null);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SidebarComponent className="flex flex-col h-full">
      {" "}
      {/* Flex con altura completa */}
      <SidebarContent className="flex-grow">
        {" "}
        {/* Hace que el contenido crezca */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl text-blue-500 p-10">
            {sidebarTitle}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.subItems && item.subItems.length > 0 && (
                    <div style={{ paddingLeft: "20px" }}>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem
                          onClick={() => subItem.url && navigate(subItem.url)}
                          key={subItem.title}
                        >
                          <SidebarMenuButton
                            asChild
                            className={
                              pathname === subItem.url
                                ? "bg-slate-300"
                                : "bg-transparent"
                            }
                          >
                            <a href={subItem.url}>
                              <subItem.icon />
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Button onClick={handleLogout}>
          <LogOutIcon /> Cerrar Sesión
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  );
};
