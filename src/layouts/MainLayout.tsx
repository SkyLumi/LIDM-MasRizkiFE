import React from "react";
import GlobalSidebar from "../components/GlobalSidebar";
import GlobalNavbar from "../components/GlobalNavbar";

interface MainLayoutProps {
  children: React.ReactNode;
  devRole?: 'admin' | 'teacher' | 'student'; // Untuk development/testing
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, devRole }) => {
  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden">
      {/* Sidebar - Fixed di kiri */}
      <div className="w-[288px] flex-shrink-0  lg:block hidden">
        <GlobalSidebar devRole={devRole} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar - Fixed di atas */}
        <div className="h-[84px] flex-shrink-0 z-40">
          <GlobalNavbar />
        </div>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
