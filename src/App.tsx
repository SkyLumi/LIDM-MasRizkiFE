import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Contexts
import { AuthProvider } from './contexts/AuthContext';

// Import Layouts
import MainLayout from './layouts/MainLayout';
import GuestLayout from './layouts/GuestLayout';

// Import Pages
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import TeacherDashboardPage from './pages/teacher/DashboardPage';
import TeacherReportPage from './pages/teacher/ReportPage';
import TeacherGameDetailPage from './pages/teacher/GameDetailPage';
import AdminGamesPage from './pages/admin/Games/AdminGamesPage'
import TeacherSettingsPage from './pages/teacher/SettingsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (No Layout) */}
          <Route path="/" element={
            <GuestLayout>
              <Home />
            </GuestLayout>
          } />

          {/* Auth Routes (No need to login) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (Need to login) */}
          {/* Untuk development: tambahkan devRole="admin" untuk test menu admin */}
          <Route path="/admin" element={<MainLayout devRole="admin"><DashboardPage /></MainLayout>} />
          <Route path="/admin/dashboard" element={<MainLayout devRole="admin"><DashboardPage /></MainLayout>} />
          <Route path="admin/games" element={<MainLayout devRole="admin"><AdminGamesPage /> </MainLayout>} />
          
          {/* Teacher */}
          {/* Untuk development: tambahkan devRole="teacher" untuk test menu teacher */}
          <Route path="/teacher" element={<MainLayout devRole="teacher"><TeacherDashboardPage /></MainLayout>} />
          <Route path="/teacher/dashboard" element={<MainLayout devRole="teacher"><TeacherDashboardPage /></MainLayout>} />
          <Route path="/teacher/reports" element={<MainLayout devRole="teacher"><TeacherReportPage /></MainLayout>} />
          <Route path="/reports" element={<MainLayout devRole="teacher"><TeacherReportPage /></MainLayout>} />
          <Route path="/teacher/games/:id" element={<MainLayout devRole="teacher"><TeacherGameDetailPage /></MainLayout>} />
          <Route path="/teacher/settings" element={<MainLayout devRole="teacher"><TeacherSettingsPage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout devRole="teacher"><TeacherSettingsPage /></MainLayout>} />
          
          {/* Student */}
          {/* <Route path="/student/game" element={<MainLayout><GamePlayContainer /></MainLayout>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
