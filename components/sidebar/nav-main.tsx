"use client";

import { type Icon } from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
    items,
    currentPath,
}: {
    items: {
        title: string;
        url: string;
        icon?: Icon;
    }[];
    currentPath: string;
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} >
                            <SidebarMenuButton
                                size="lg"
                                tooltip={item.title}
                                isActive={item.url === currentPath}
                                asChild
                            >
                                <Link href={item.url} >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarGroupContent>
        </SidebarGroup>
    );
}
