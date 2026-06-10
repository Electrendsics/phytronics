import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import PhytronicsLogo from './PhytronicsLogo.jsx';

export default function VisitorTrackingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    purpose: ''
  });

  const purposeOptions = [
    "Browse",
    "Human Resources",
    "Download Code",
    "Download CLI",
    "Read Projects",
    "Check System",
    "Just Browsing",
    "Contact/Chat",
    "Recruiting",
    "Feedback/Complaint",
    "Donate"
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visitor_tracked');
    if (!hasVisited) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // สร้างฟังก์ชันเซฟแยกสำหรับปุ่ม Retry เพื่อจะได้ไม่ต้องเรียกผ่าน Event e
  const saveVisitorData = async () => {
    if (!formData.name.trim() || !formData.purpose) {
      toast.error('Validation Error', { description: 'Please fill out all fields.' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let ipAddress = 'unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch (err) {
        console.warn('Could not fetch IP address');
      }

      const dummyEmail = `visitor_${Date.now()}@anonymous.local`;

      await pb.collection('visitor_tracking').create({
        name: formData.name,
        email: dummyEmail, 
        position: formData.purpose, 
        userAgent: navigator.userAgent,
        ipAddress: ipAddress
      }, { $autoCancel: false });

      toast.success('Access Granted', {
        description: 'Thank you. Entering the portfolio...'
      });
      sessionStorage.setItem('visitor_tracked', 'true');
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Submission failed', {
        description: 'Could not log your visit. Please try again.',
        action: {
          label: 'Retry',
          onClick: () => saveVisitorData() // เรียกผ่าน Arrow function ปลอดภัยกว่า
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveVisitorData();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pt-20 pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-2xl p-8 overflow-hidden pointer-events-auto"
          >
            <div className="mb-6 flex flex-col items-center text-center">
              <PhytronicsLogo size={48} className="mb-4" />
              <h2 className="text-2xl font-bold">Welcome to Phytronics</h2>
              <p className="text-muted-foreground text-sm mt-2">
                Identify yourself to proceed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">Name <span className="text-destructive">*</span></label>
                <input
                  id="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Preferred Name"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="purpose" className="text-sm font-medium">Purpose of Visit <span className="text-destructive">*</span></label>
                <select
                  id="purpose"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-3 py-2.5 bg-input/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                >
                  <option value="" disabled>Select your purpose</option>
                  {purposeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className="w-full py-3 px-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? 'Authenticating...' : 'Enter'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}