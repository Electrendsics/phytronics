import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, FileWarning, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AdminAccessKeyModal from '@/components/AdminAccessKeyModal.jsx';
import pb from '@/lib/pocketbaseClient.js';

function AdminDownloadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('admin_access') === 'true'
  );
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDownloads();
    }
  }, [isAuthenticated]);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('download_logs').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setDownloads(records);
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
      toast.error('Permission Denied', {
        description: 'You need an active authenticated PocketBase admin session.'
      });
      setDownloads([
        { id: '1', documentName: 'Zairun_Resume.pdf', accessType: 'view', timestamp: new Date().toISOString(), ipAddress: '192.168.1.1', accessKeyUsed: 'HR20****', status: 'success' },
        { id: '2', documentName: 'Kasetsart_Transcript.pdf', accessType: 'download', timestamp: new Date().toISOString(), ipAddress: '10.0.0.5', accessKeyUsed: 'INVALID', status: 'failed' }
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
    if (downloads.length === 0) return;
    
    const headers = ['Document', 'Type', 'Timestamp', 'IP Address', 'Access Key Used', 'Status'];
    const csvContent = [
      headers.join(','),
      ...downloads.map(d => 
        `"${d.documentName}","${d.accessType || ''}","${new Date(d.timestamp || d.created).toLocaleString()}","${d.ipAddress || ''}","${d.accessKeyUsed || ''}","${d.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `document_access_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Admin - Document Access</title>
      </Helmet>

      <AdminAccessKeyModal 
        isOpen={!isAuthenticated} 
        onSuccess={handleAuthSuccess} 
      />

      {isAuthenticated && (
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          
          <div className="border-b border-border bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-wrap gap-4 py-4 text-sm font-medium">
              <span className="flex items-center text-muted-foreground mr-4">
                <ShieldAlert className="w-4 h-4 mr-2" /> Admin Dashboard
              </span>
              <Link to="/admin/visitors" className="text-foreground hover:text-primary transition-colors">Visitor Tracking</Link>
              <Link to="/admin/downloads" className="text-primary border-b-2 border-primary pb-1">Doc Downloads</Link>
              <Link to="/admin/project-activity" className="text-foreground hover:text-primary transition-colors">Project Activity</Link>
              <Link to="/admin/tool-downloads" className="text-foreground hover:text-primary transition-colors">Tool Downloads</Link>
            </div>
          </div>

          <main className="flex-1 section-padding">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <FileWarning className="w-8 h-8 text-primary" />
                    Document Access Log
                  </h1>
                  <p className="text-muted-foreground mt-2">Audit trail of all protected document view/download requests.</p>
                </div>
                
                <button
                  onClick={exportCSV}
                  disabled={downloads.length === 0}
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
                        <th className="px-6 py-4 font-semibold">Document</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">IP Address</th>
                        <th className="px-6 py-4 font-semibold">Key Used</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">Loading records...</td>
                        </tr>
                      ) : downloads.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">No access attempts logged yet.</td>
                        </tr>
                      ) : (
                        downloads.map((d) => (
                          <motion.tr 
                            key={d.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(d.timestamp || d.created).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 font-medium text-foreground">{d.documentName}</td>
                            <td className="px-6 py-4">
                              <span className="bg-muted px-2 py-1 rounded text-xs font-semibold uppercase">{d.accessType || 'N/A'}</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{d.ipAddress || 'unknown'}</td>
                            <td className="px-6 py-4 font-mono text-xs">{d.accessKeyUsed || '-'}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                d.status === 'success' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                              }`}>
                                {d.status?.toUpperCase() || 'UNKNOWN'}
                              </span>
                            </td>
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

export default AdminDownloadsPage;