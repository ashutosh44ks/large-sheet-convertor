import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDatabase, IconUpload, IconMenu2 } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  separator?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Books",
    href: "/listings",
    description: "Manage your book collection",
    icon: <IconDatabase size={16} />,
    separator: true,
  },
  {
    title: "Import Data",
    href: "/",
    description: "Upload and process files",
    icon: <IconUpload size={16} />,
  },
];

export function MainNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <IconMenu2 size={16} />
          <span className="md:inline hidden">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {navItems.map((item, index) => (
          <Link key={item.href} to={item.href}>
            <DropdownMenuItem>
              <div className="flex items-center gap-2 w-full">
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            {item.separator && index < navItems.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}