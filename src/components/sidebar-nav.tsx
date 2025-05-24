"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, ListChecks, CalendarDays, InfoIcon } from 'lucide-react'; // Changed Info to InfoIcon for clarity if Info is a common var name
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'League Table', icon: Trophy }, // Assuming "League Table" might be translated later if needed
  { href: '/results', label: 'Match Results', icon: ListChecks }, // Assuming "Match Results" might be translated later if needed
  { href: '/schedule', label: 'Match Schedule', icon: CalendarDays }, // Assuming "Match Schedule" might be translated later if needed
  { href: '/info', label: 'Información', icon: InfoIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className={cn(
                "w-full justify-start",
                pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              tooltip={item.label}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
