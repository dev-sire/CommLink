import { UserButton } from "@/features/auth/components/user-button"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { SidebarButton } from "./sidebar-button"
import { Home, Info, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
    const pathname = usePathname()

    return(
        <aside className="w-[70px] h-full bg-[#001a6e] flex flex-col items-center gap-y-4 pt-[9px] pd-4">
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
            <SidebarButton icon={MessageSquare} label="DMs" />
            <SidebarButton icon={Info} label="About" />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>
    )
}