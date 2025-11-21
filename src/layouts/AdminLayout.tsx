import React from 'react';
import GlobalSidebar from '../components/GlobalSidebar';
import GlobalNavbar from '../components/GlobalNavbar';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white h-screen flex overflow-hidden">
      {/* Sidebar - Fixed di kiri */}
      <div className="w-[288px] flex-shrink-0 z-50">
        <GlobalSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar - Fixed di atas */}
        <div className="h-[84px] flex-shrink-0 z-40">
          <GlobalNavbar />
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
