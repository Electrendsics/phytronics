import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export function useProjectActivity() {
  const [isLogging, setIsLogging] = useState(false);

  const logActivity = useCallback(async (projectName, action) => {
    setIsLogging(true);
    try {
      let ipAddress = 'unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch (err) {
        // Silently fail IP fetch
      }

      await pb.collection('project_activity_logs').create({
        projectName,
        action, // 'view' or 'copy'
        ipAddress,
      }, { $autoCancel: false });
      
    } catch (error) {
      console.error('Failed to log project activity:', error);
      // We don't want to disrupt the user experience, so we fail silently
    } finally {
      setIsLogging(false);
    }
  }, []);

  return { logActivity, isLogging };
}