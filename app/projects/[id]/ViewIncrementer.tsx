'use client';

import { useEffect } from 'react';
import axios from 'axios';

interface ViewIncrementerProps {
  projectId: string;
}

export default function ViewIncrementer({ projectId }: ViewIncrementerProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await axios.post('/api/increment', { id: projectId });
      } catch (error) {
        console.error('Error incrementing view:', error);
      }
    };

    incrementView();
  }, [projectId]);

  // This component renders nothing
  return null;
}
