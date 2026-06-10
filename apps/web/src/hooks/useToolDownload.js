import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export function useToolDownload() {
  const [isLogging, setIsLogging] = useState(false);

  const logDownload = useCallback(async (toolName) => {
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

      await pb.collection('tool_download_logs').create({
        toolName,
        ipAddress,
      }, { $autoCancel: false });
      
      toast.success('Tool access logged successfully.');
    } catch (error) {
      console.error('Failed to log tool download:', error);
    } finally {
      setIsLogging(false);
    }
  }, []);

  return { logDownload, isLogging };
}