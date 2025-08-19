'use client';

import { useEffect } from 'react';

export default function ClientRefresh({ shouldRefresh }) {
  useEffect(() => {
    if (!shouldRefresh) return;

    const refreshToken = async () => {
      const handleError = (message, details) =>
        console.error('Refresh error:', message, details);

      try {
        const res = await fetch('/api/refresh', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          handleError(`Status ${res.status}`, data || await res.text());
          return;
        }

        console.log('Refresh succeeded:', data);
      } catch (err) {
        handleError('Fetch failed', err);
      }
    };

    refreshToken();
  }, [shouldRefresh]);

  return null;
}
