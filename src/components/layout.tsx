import { Outlet } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { MainNavigation } from "./navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* App Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Large Sheet Converter</h1>
            <MainNavigation />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>

      {/* Footer (for future use) */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Large Sheet Converter. Built for handling large datasets efficiently.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Made with React & Vite</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
