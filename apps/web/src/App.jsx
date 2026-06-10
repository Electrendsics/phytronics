import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import LoadingAnimation from './components/LoadingAnimation.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import ToolsPage from './pages/ToolsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import AdminVisitorsPage from './pages/AdminVisitorsPage.jsx';
import AdminDownloadsPage from './pages/AdminDownloadsPage.jsx';
import AdminProjectActivityPage from './pages/AdminProjectActivityPage.jsx';
import AdminToolDownloadsPage from './pages/AdminToolDownloadsPage.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <LoadingAnimation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/visitors" element={<AdminVisitorsPage />} />
          <Route path="/admin/downloads" element={<AdminDownloadsPage />} />
          <Route path="/admin/project-activity" element={<AdminProjectActivityPage />} />
          <Route path="/admin/tool-downloads" element={<AdminToolDownloadsPage />} />

          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background text-foreground">
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              <a href="/" className="text-primary hover:underline font-medium">Back to home</a>
            </div>
          } />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;