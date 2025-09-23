import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageToolbarProps {
  children: ReactNode;
  className?: string;
}

export function PageToolbar({ children, className }: PageToolbarProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-muted/50 px-4 py-2 rounded-lg",
      className
    )}>
      {children}
    </div>
  );
}

interface ToolbarSectionProps {
  children: ReactNode;
  className?: string;
}

export function ToolbarSection({ children, className }: ToolbarSectionProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

interface ToolbarActionsProps {
  children: ReactNode;
  className?: string;
}

export function ToolbarActions({ children, className }: ToolbarActionsProps) {
  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center", className)}>
      {children}
    </div>
  );
}
