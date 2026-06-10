import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAccessKeyModal({ isOpen, onSuccess }) {
  const [accessKey, setAccessKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accessKey.trim()) return;

    setIsVerifying(true);
    
    // Using the seeded admin key to simulate validation.
    // In a fully authenticated environment, this would call authWithPassword.
    setTimeout(() => {
      const isValid = accessKey === 'ADMIN2024SECURE';

      if (isValid) {
        toast.success('Admin Access Granted');
        setAccessKey('');
        onSuccess(true);
      } else {
        toast.error('Invalid Admin Key', { description: 'Access denied.' });
        setAccessKey('');
      }
      setIsVerifying(false);
    }, 600); // Simulate network latency
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-2xl p-8 overflow-hidden"
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Restricted Area</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You are attempting to access an administrative dashboard. Please provide your Admin Key to proceed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="password"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter Admin Key"
                  className="w-full px-4 py-3 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive font-mono text-center tracking-widest"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!accessKey.trim() || isVerifying}
                className="w-full py-3 px-4 rounded-xl font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isVerifying ? 'Authenticating...' : 'Authenticate'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}