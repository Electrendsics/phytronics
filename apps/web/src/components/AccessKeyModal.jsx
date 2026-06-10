import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export default function AccessKeyModal({ isOpen, onClose, documentName, accessType, onSuccess }) {
  const [accessKey, setAccessKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessKey.trim()) return;

    setIsVerifying(true);
    let ipAddress = 'unknown';
    
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      ipAddress = ipData.ip;
    } catch (err) {
      // silently fail IP fetch
    }

    try {
      // Validate key against access_keys collection
      await pb.collection('access_keys').getFirstListItem(`key="${accessKey}"`, { $autoCancel: false });
      
      // If successful, log the attempt as success
      await pb.collection('download_logs').create({
        documentName: documentName,
        accessType: accessType,
        ipAddress: ipAddress,
        accessKeyUsed: accessKey,
        status: 'success'
      }, { $autoCancel: false });

      setAccessKey('');
      onSuccess();
    } catch (error) {
      console.error(error);
      
      // Log the failed attempt
      try {
        await pb.collection('download_logs').create({
          documentName: documentName,
          accessType: accessType,
          ipAddress: ipAddress,
          accessKeyUsed: accessKey,
          status: 'failed'
        }, { $autoCancel: false });
      } catch (logErr) {
        console.error('Failed to log invalid attempt', logErr);
      }

      toast.error('Invalid Access Key', { description: 'Please check your key and try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-6 overflow-hidden pointer-events-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Access Required</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Please enter your provided Access Key to {accessType} <strong>{documentName}</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <input
                  type="password"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter Access Key"
                  className="w-full px-4 py-3 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-center tracking-widest"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl font-medium border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!accessKey.trim() || isVerifying}
                  className="flex-1 py-2.5 px-4 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isVerifying ? 'Verifying...' : 'Submit Key'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}