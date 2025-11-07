"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    IconChartBar,
    IconClipboard,
    IconDashboard,
    IconDoor,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { usePathname } from "next/navigation";

const data = {

    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: IconDashboard,
        },
        {
            title: "DPT",
            url: "/dpt",
            icon: IconUsers,
        },
        {
            title: "Queue",
            url: "/queue",
            icon: IconDoor,
        },
        {
            title: "Vote Results",
            url: "/result",
            icon: IconChartBar,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const currentPath = usePathname();

    return (
        <Sidebar collapsible="offcanvas" variant="inset"   {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <IconClipboard className="size-5!" />
                                <span className="text-base font-semibold">
                                    Pilketos 25
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} currentPath={currentPath} />
            </SidebarContent>
            <SidebarFooter>
                <NavSecondary
                    items={data.navSecondary}
                    className="mt-auto"
                    currentPath={currentPath}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
