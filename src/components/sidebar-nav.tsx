
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, ListChecks, CalendarDays, InfoIcon, Zap } from 'lucide-react'; // Added Zap, removed Settings
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Tabla de Posiciones', icon: Trophy },
  { href: '/results', label: 'Resultados', icon: ListChecks },
  { href: '/schedule', label: 'Calendario', icon: CalendarDays },
  { href: '/info', label: 'Información', icon: InfoIcon },
  { href: '/relampago', label: 'Relámpago SAP', icon: Zap }, // Added Relampago link
];

export function SidebarNav() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior onClick={handleLinkClick}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
              className={cn(
                "w-full justify-start",
                (pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')) ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

