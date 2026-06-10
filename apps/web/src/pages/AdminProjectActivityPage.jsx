import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, Activity, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AdminAccessKeyModal from '@/components/AdminAccessKeyModal.jsx';
import pb from '@/lib/pocketbaseClient.js';

function AdminProjectActivityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('admin_access') === 'true'
  );
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchActivities();
    }
  }, [isAuthenticated]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('project_activity_logs').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setActivities(records);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
      toast.error('Permission Denied', {
        description: 'You need an active authenticated PocketBase admin session.'
      });
      setActivities([
        { id: '1', projectName: 'IoT Hydro Turbines', action: 'view', timestamp: new Date().toISOString(), ipAddress: '192.168.1.1' },
        { id: '2', projectName: 'MoA AI Chatbot', action: 'copy', timestamp: new Date().toISOString(), ipAddress: '10.0.0.2' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    sessionStorage.setItem('admin_access', 'true');
    setIsAuthenticated(true);
  };

  const exportCSV = () => {
    if (activities.length === 0) return;
    const headers = ['Date', 'Project Name', 'Action', 'IP Address'];
    const csvContent = [
      headers.join(','),
      ...activities.map(a => 
        `"${new Date(a.timestamp || a.created).toLocaleString()}","${a.projectName}","${a.action}","${a.ipAddress || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `project_activity_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Admin - Project Activity</title>
      </Helmet>

      <AdminAccessKeyModal 
        isOpen={!isAuthenticated} 
        onSuccess={handleAuthSuccess} 
      />

      {isAuthenticated && (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          
          <div className="border-b border-border bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-wrap gap-4 py-4 text-sm font-medium">
              <span className="flex items-center text-muted-foreground mr-4">
                <ShieldAlert className="w-4 h-4 mr-2" /> Admin Dashboard
              </span>
              <Link to="/admin/visitors" className="text-foreground hover:text-primary transition-colors">Visitor Tracking</Link>
              <Link to="/admin/downloads" className="text-foreground hover:text-primary transition-colors">Doc Downloads</Link>
              <Link to="/admin/project-activity" className="text-primary border-b-2 border-primary pb-1">Project Activity</Link>
              <Link to="/admin/tool-downloads" className="text-foreground hover:text-primary transition-colors">Tool Downloads</Link>
            </div>
          </div>

          <main className="flex-1 section-padding">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Activity className="w-8 h-8 text-primary" />
                    Project Activity Logs
                  </h1>
                  <p className="text-muted-foreground mt-2">Log of project views and code snippet copying.</p>
                </div>
                <button
                  onClick={exportCSV}
                  disabled={activities.length === 0}
                  className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 disabled:opacity-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" /> Export CSV
                </button>
              </div>

              <div className="card-base overflow-hidden border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Project Name</th>
                        <th className="px-6 py-4 font-semibold">Action</th>
                        <th className="px-6 py-4 font-semibold">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">Loading records...</td>
                        </tr>
                      ) : activities.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">No activities tracked yet.</td>
                        </tr>
                      ) : (
                        activities.map((a) => (
                          <motion.tr 
                            key={a.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(a.timestamp || a.created).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 font-medium text-foreground">{a.projectName}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                                a.action === 'view' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/10 text-accent border-accent/20'
                              }`}>
                                {a.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{a.ipAddress || 'unknown'}</td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
}

export default AdminProjectActivityPage;