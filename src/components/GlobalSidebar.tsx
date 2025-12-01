import React from "react";
import { Link, useLocation } from "react-router-dom";
import sidebarLogo from "../assets/images/sidebar-logo.svg";
import dashboardIcon from "../assets/images/sidebar/games.svg";
import reportsIcon from "../assets/images/sidebar/laporan.svg";
// import settingsIcon from "../assets/images/sidebar/pengaturan.svg";
// import ProgressTracker from "./ProgressTracker";
import { useAuthContext } from "../contexts/AuthContext";

interface GlobalSidebarProps {
  devRole?: "admin" | "teacher" | "student"; // Untuk development/testing
}

const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ devRole }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  // Untuk development: gunakan devRole jika ada, jika tidak gunakan user dari context
  const activeRole = devRole || user?.role;

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // Render menu berdasarkan role
  const renderMenuItems = () => {
    // Jika tidak ada role (baik dari devRole maupun user), jangan tampilkan menu
    if (!activeRole) return null;

    switch (activeRole) {
      case "admin":
        return (
          <>
            {/* Dashboard */}
            <Link
              to="/admin/dashboard"
              className={`flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/admin/dashboard")
                  ? "bg-white text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <img
                src={dashboardIcon}
                alt="Dashboard"
                className="w-[40px] h-auto mr-[28.4px]"
              />
              Dashboard
            </Link>

            {/* Games */}
            <Link
              to="/admin/games"
              className={`flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/admin/games")
                  ? "bg-white text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <svg
                className="w-[40px] h-auto mr-[28.4px]"
                width="40"
                height="21"
                viewBox="0 0 40 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0007 5.55768V5.05138C20.0007 4.21251 19.3207 3.53248 18.4818 3.53248C17.6429 3.53248 16.9629 2.85244 16.9629 2.01358V1.00098"
                  fill={isActive("/admin/games") ? "#E82D2F" : "white"}
                />
                <path
                  d="M20.0007 5.55768V5.05138C20.0007 4.21251 19.3207 3.53248 18.4818 3.53248C17.6429 3.53248 16.9629 2.85244 16.9629 2.01358V1.00098"
                  stroke={isActive("/admin/games") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                  stroke-linecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.9377 5.30469C11.722 5.30469 9.11523 7.91149 9.11523 11.1271V15.1775C9.11523 18.3932 11.722 21 14.9377 21H25.0637C28.2793 21 30.8861 18.3932 30.8861 15.1775V11.1271C30.8861 7.91149 28.2793 5.30469 25.0637 5.30469H14.9377ZM27.0889 11.6332C27.0889 12.1924 26.6355 12.6458 26.0763 12.6458C25.517 12.6458 25.0637 12.1924 25.0637 11.6332C25.0637 11.0739 25.517 10.6206 26.0763 10.6206C26.6355 10.6206 27.0889 11.0739 27.0889 11.6332ZM24.0512 15.6828C24.6104 15.6828 25.0638 15.2295 25.0638 14.6702C25.0638 14.111 24.6104 13.6576 24.0512 13.6576C23.4919 13.6576 23.0386 14.111 23.0386 14.6702C23.0386 15.2295 23.4919 15.6828 24.0512 15.6828ZM15.9505 10.3774C16.3648 10.3774 16.7005 10.7132 16.7005 11.1274V12.4014H17.9756C18.3898 12.4014 18.7256 12.7372 18.7256 13.1514C18.7256 13.5656 18.3898 13.9014 17.9756 13.9014H16.7005V15.1778C16.7005 15.592 16.3648 15.9278 15.9505 15.9278C15.5363 15.9278 15.2005 15.592 15.2005 15.1778V13.9014H13.9252C13.511 13.9014 13.1752 13.5656 13.1752 13.1514C13.1752 12.7372 13.511 12.4014 13.9252 12.4014H15.2005V11.1274C15.2005 10.7132 15.5363 10.3774 15.9505 10.3774Z"
                  fill={isActive("/admin/games") ? "#E82D2F" : "white"}
                />
              </svg>
              Games
            </Link>

            {/* Reports */}
            <Link
              to="/admin/reports"
              className={`flex items-center px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/admin/reports")
                  ? "bg-white text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <img
                src={reportsIcon}
                alt="Reports"
                className="w-[40px] h-auto mr-[28.4px]"
              />
              Laporan
            </Link>

            {/* Settings */}
            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/admin/settings")
                  ? "bg-white text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <svg
                width="40"
                height="22"
                viewBox="0 0 40 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8889 4.22172C18.8889 3.66944 18.4398 3.21589 17.891 3.2779C16.486 3.43662 15.1341 3.92891 13.9505 4.71976C12.4887 5.69648 11.3494 7.08474 10.6766 8.70897C10.0039 10.3332 9.82782 12.1204 10.1708 13.8447C10.5138 15.569 11.3604 17.1528 12.6035 18.396C13.8466 19.6391 15.4305 20.4857 17.1548 20.8287C18.879 21.1716 20.6663 20.9956 22.2905 20.3228C23.9147 19.6501 25.303 18.5107 26.2797 17.049C27.0706 15.8654 27.5629 14.5134 27.7216 13.1085C27.7836 12.5597 27.33 12.1106 26.7778 12.1106H20.3889C19.5605 12.1106 18.8889 11.439 18.8889 10.6106V4.22172Z"
                  fill={isActive("/admin/reports") ? "#E82D2F" : "white"}
                  stroke={isActive("/admin/reports") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                />
                <path
                  d="M22.2227 1.99998C22.2227 1.4477 22.6722 0.993367 23.22 1.06418C23.8986 1.15192 24.5642 1.32904 25.1991 1.59203C26.1428 1.9829 27.0002 2.55581 27.7224 3.27804C28.4447 4.00027 29.0176 4.85769 29.4084 5.80133C29.6714 6.43625 29.8485 7.10184 29.9363 7.7805C30.0071 8.32823 29.5528 8.77776 29.0005 8.77776H22.4227C22.3123 8.77776 22.2227 8.68821 22.2227 8.57776V1.99998Z"
                  fill={isActive("/admin/reports") ? "#E82D2F" : "white"}
                  stroke={isActive("/admin/reports") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                />
              </svg>
              Pengaturan
            </Link>
          </>
        );

      case "teacher":
        return (
          <>
            {/* Games */}
            <Link
              to="/teacher/dashboard"
              className={`  flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/teacher/dashboard")
                  ? "bg-white text-[#E82D2F] hover:text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white  hover:bg-opacity-10"
              }`}
            >
              <svg
                className="w-[40px] h-auto mr-[28.4px]"
                width="40"
                height="21"
                viewBox="0 0 40 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0007 5.55768V5.05138C20.0007 4.21251 19.3207 3.53248 18.4818 3.53248C17.6429 3.53248 16.9629 2.85244 16.9629 2.01358V1.00098"
                  fill={isActive("/teacher/dashboard") ? "#E82D2F" : "white"}
                />
                <path
                  d="M20.0007 5.55768V5.05138C20.0007 4.21251 19.3207 3.53248 18.4818 3.53248C17.6429 3.53248 16.9629 2.85244 16.9629 2.01358V1.00098"
                  stroke={isActive("/teacher/dashboard") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.9377 5.30469C11.722 5.30469 9.11523 7.91149 9.11523 11.1271V15.1775C9.11523 18.3932 11.722 21 14.9377 21H25.0637C28.2793 21 30.8861 18.3932 30.8861 15.1775V11.1271C30.8861 7.91149 28.2793 5.30469 25.0637 5.30469H14.9377ZM27.0889 11.6332C27.0889 12.1924 26.6355 12.6458 26.0763 12.6458C25.517 12.6458 25.0637 12.1924 25.0637 11.6332C25.0637 11.0739 25.517 10.6206 26.0763 10.6206C26.6355 10.6206 27.0889 11.0739 27.0889 11.6332ZM24.0512 15.6828C24.6104 15.6828 25.0638 15.2295 25.0638 14.6702C25.0638 14.111 24.6104 13.6576 24.0512 13.6576C23.4919 13.6576 23.0386 14.111 23.0386 14.6702C23.0386 15.2295 23.4919 15.6828 24.0512 15.6828ZM15.9505 10.3774C16.3648 10.3774 16.7005 10.7132 16.7005 11.1274V12.4014H17.9756C18.3898 12.4014 18.7256 12.7372 18.7256 13.1514C18.7256 13.5656 18.3898 13.9014 17.9756 13.9014H16.7005V15.1778C16.7005 15.592 16.3648 15.9278 15.9505 15.9278C15.5363 15.9278 15.2005 15.592 15.2005 15.1778V13.9014H13.9252C13.511 13.9014 13.1752 13.5656 13.1752 13.1514C13.1752 12.7372 13.511 12.4014 13.9252 12.4014H15.2005V11.1274C15.2005 10.7132 15.5363 10.3774 15.9505 10.3774Z"
                  fill={isActive("/teacher/dashboard") ? "#E82D2F" : "white"}
                />
              </svg>
              Games
            </Link>

            {/* Reports */}
            <Link
              to="/teacher/reports"
              className={`  flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/teacher/reports")
                  ? "bg-white text-[#E82D2F] shadow-md "
                  : "text-white  hover:bg-opacity-10 hover:bg-white"
              }`}
            >
              <svg
                className="w-[40px] h-auto mr-[28.4px]"
                width="40"
                height="22"
                viewBox="0 0 40 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8889 4.22172C18.8889 3.66944 18.4398 3.21589 17.891 3.2779C16.486 3.43662 15.1341 3.92891 13.9505 4.71976C12.4887 5.69648 11.3494 7.08474 10.6766 8.70897C10.0039 10.3332 9.82782 12.1204 10.1708 13.8447C10.5138 15.569 11.3604 17.1528 12.6035 18.396C13.8466 19.6391 15.4305 20.4857 17.1548 20.8287C18.879 21.1716 20.6663 20.9956 22.2905 20.3228C23.9147 19.6501 25.303 18.5107 26.2797 17.049C27.0706 15.8654 27.5629 14.5134 27.7216 13.1085C27.7836 12.5597 27.33 12.1106 26.7778 12.1106H20.3889C19.5605 12.1106 18.8889 11.439 18.8889 10.6106V4.22172Z"
                  fill={isActive("/teacher/reports") ? "#E82D2F" : "white"}
                  stroke={isActive("/teacher/reports") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                />
                <path
                  d="M22.2227 1.99998C22.2227 1.4477 22.6722 0.993367 23.22 1.06418C23.8986 1.15192 24.5642 1.32904 25.1991 1.59203C26.1428 1.9829 27.0002 2.55581 27.7224 3.27804C28.4447 4.00027 29.0176 4.85769 29.4084 5.80133C29.6714 6.43625 29.8485 7.10184 29.9363 7.7805C30.0071 8.32823 29.5528 8.77776 29.0005 8.77776H22.4227C22.3123 8.77776 22.2227 8.68821 22.2227 8.57776V1.99998Z"
                  fill={isActive("/teacher/reports") ? "#E82D2F" : "white"}
                  stroke={isActive("/teacher/reports") ? "#E82D2F" : "white"}
                  strokeWidth="1.5"
                />
              </svg>
              Laporan
            </Link>

            {/* Settings */}
            <Link
              to="/teacher/settings"
              className={`flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/teacher/settings")
                  ? "bg-white text-[#E82D2F] hover:text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <svg
                className="w-[40px] h-auto mr-[28.4px]"
                width="40"
                height="22"
                viewBox="0 0 40 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4162 0.818449C18.2435 0.609088 19.1093 0.498047 20 0.498047C20.8907 0.498047 21.7566 0.609104 22.584 0.818493C23.2593 0.989373 23.6079 1.57253 23.7201 2.0573C23.853 2.63153 24.2133 3.14882 24.7628 3.46602C25.2679 3.75766 25.839 3.82618 26.3657 3.70199C26.8498 3.58785 27.5257 3.64223 27.9781 4.17014C28.8191 5.15165 29.4825 6.29078 29.9179 7.53769C30.1777 8.28212 29.7751 8.95245 29.3499 9.30273C28.8592 9.70706 28.5483 10.3171 28.5483 11.0003C28.5483 11.6836 28.8592 12.2936 29.3499 12.6979C29.7751 13.0482 30.1777 13.7185 29.9179 14.463C29.4826 15.7097 28.8193 16.8488 27.9784 17.8302C27.526 18.3582 26.85 18.4125 26.3658 18.2984C25.8391 18.1741 25.2679 18.2426 24.7627 18.5343C24.2132 18.8515 23.8528 19.3689 23.72 19.9432C23.6079 20.4281 23.2592 21.0113 22.5839 21.1822C21.7565 21.3916 20.8907 21.5026 20 21.5026C19.1093 21.5026 18.2436 21.3916 17.4162 21.1822C16.7409 21.0113 16.3922 20.4281 16.2801 19.9432C16.1472 19.3689 15.7869 18.8515 15.2374 18.5343C14.7322 18.2426 14.161 18.1741 13.6342 18.2984C13.1501 18.4126 12.474 18.3582 12.0216 17.8302C11.1807 16.8488 10.5174 15.7098 10.0821 14.463C9.82225 13.7186 10.2249 13.0482 10.6501 12.6979C11.1408 12.2936 11.4517 11.6836 11.4517 11.0003C11.4517 10.3171 11.1408 9.70705 10.6501 9.30272C10.2249 8.95244 9.82226 8.2821 10.0821 7.53768C10.5174 6.29076 11.1809 5.15162 12.0219 4.1701C12.4743 3.64219 13.1502 3.58782 13.6343 3.70198C14.1611 3.82619 14.7322 3.75768 15.2374 3.46602C15.7868 3.14881 16.1472 2.63152 16.28 2.05728C16.3922 1.5725 16.7409 0.989322 17.4162 0.818449ZM19.9995 13.9312C18.3808 13.9312 17.0686 12.619 17.0686 11.0003C17.0686 9.38166 18.3808 8.06946 19.9995 8.06946C21.6182 8.06946 22.9304 9.38166 22.9304 11.0003C22.9304 12.619 21.6182 13.9312 19.9995 13.9312Z"
                  fill={isActive("/teacher/settings") ? "#E82D2F" : "white"}
                />
              </svg>
              Pengaturan
            </Link>
          </>
        );

      case "student":
        return (
          <>
            {/* Games - untuk student */}
            <Link
              to="/student/games"
              className={`flex items-center h-[40px] w-[240px] px-4 py-3 text-[18px] font-semibold rounded-[32.63px] transition-all duration-300 ${
                isActive("/student/games") || isActive("/student")
                  ? "bg-white text-[#E82D2F] shadow-md"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <img
                src={dashboardIcon}
                alt="Games"
                className="w-[40px] h-auto mr-[28.4px]"
              />
              Games
            </Link>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" flex flex-col justify-between h-screen w-[288px] bg-gradient-to-b from-[#E82D2F] to-[#C21315] shadow-[inset_0_8px_16px_rgba(255,255,255,0.16),inset_0_2px_rgba(255,255,255,0.1)] ">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center px-6 pt-[41px]">
        <img
          src={sidebarLogo}
          alt="CloudsUp Logo"
          className="w-[158px] h-[158px]"
        />
        {/* <h2 className="text-white text-2xl font-bold">CloudsUp</h2> */}
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 mt-[65px]">
        <div className="space-y-2">{renderMenuItems()}</div>
      </nav>

      {/* Progress Tracker */}
      <div className="mt-[400.2px] items-end">
        {/* <ProgressTracker /> */}
      </div>
    </div>
  );
};

export default GlobalSidebar;