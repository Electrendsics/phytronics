import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AccessKeyModal from '@/components/AccessKeyModal.jsx';

function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [actionType, setActionType] = useState(null); // 'view' | 'download'
  const [viewingDoc, setViewingDoc] = useState(null);

  const documents = [
    {
      id: 'resume',
      title: 'Resume',
      description: 'Comprehensive overview of professional experience and technical skills.',
      size: '178 KB',
      filename: 'Resume.pdf'
    },
    {
      id: 'cover_letter',
      title: 'Cover Letter',
      description: 'A tailored introduction to my background and engineering philosophy.',
      size: '83 KB',
      filename: 'Cover_Letter.pdf'
    },
    {
      id: 'bsc_transcript',
      title: "Bachelor's Transcript",
      description: 'Official academic record for B.Sc in Electronics Physics.',
      size: '2.1 MB',
      filename: 'Bachelor_Transcript.pdf'
    },
    {
      id: 'meng_transcript',
      title: "Master's Transcript",
      description: 'Official academic record for M.Eng in Electrical & Engineering.',
      size: '253 KB',
      filename: 'Master_Transcript.pdf'
    }
  ];

  const handleActionClick = (doc, type) => {
    setSelectedDoc(doc);
    setActionType(type);
  };

  const handleSuccess = () => {
    if (actionType === 'download') {
      toast.success('Download starting...', { description: `Preparing ${selectedDoc.title}` });
      // Dummy download trigger
      const link = document.createElement('a');
      link.href = `/pdfs/${selectedDoc.filename}`; 
      link.download = selectedDoc.filename;
      document.body.appendChild(link);
      // link.click(); // Commented to prevent browser 404 navigation
      document.body.removeChild(link);
    } else if (actionType === 'view') {
      toast.success('Access Granted', { description: `Loading preview for ${selectedDoc.title}` });
      setViewingDoc(selectedDoc);
    }
    setSelectedDoc(null);
    setActionType(null);
  };

  return (
    <>
      <Helmet>
        <title>Documents - Phytronics</title>
        <meta name="description" content="Secure downloads for professional and academic documents." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="section-padding">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h1 className="heading-primary mb-6">Secured Documents</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  Select a document to view or download. Due to privacy and security, access to these files requires a valid Access Key provided during correspondence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="card-base p-6 md:p-8 flex flex-col h-full relative overflow-hidden border border-border">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted px-3 py-1 rounded-full">
                          PDF • {doc.size}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                      <p className="text-muted-foreground flex-1 mb-8">
                        {doc.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button
                          onClick={() => handleActionClick(doc, 'view')}
                          className="flex items-center justify-center py-2.5 px-4 bg-muted text-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors active:scale-[0.98]"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </button>
                        <button
                          onClick={() => handleActionClick(doc, 'download')}
                          className="flex items-center justify-center py-2.5 px-4 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/90 transition-colors active:scale-[0.98]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <AccessKeyModal 
        isOpen={!!selectedDoc}
        onClose={() => { setSelectedDoc(null); setActionType(null); }}
        documentName={selectedDoc?.title || ''}
        accessType={actionType}
        onSuccess={handleSuccess}
      />

      <AnimatePresence>
        {viewingDoc && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setViewingDoc(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl h-full max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> 
                  {viewingDoc.title}
                </h3>
                <button 
                  onClick={() => setViewingDoc(null)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 bg-muted/20 flex items-center justify-center p-8 text-center text-muted-foreground">
                {/* Simulated PDF Viewer */}
                <div>
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="font-medium text-lg">PDF Viewer Initialized</p>
                  <p className="text-sm mt-2 opacity-70 max-w-sm mx-auto">
                    In a production environment, this frame would display the secure remote asset: {viewingDoc.filename}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DocumentsPage;