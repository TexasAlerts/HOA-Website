'use client';
import { useEffect, useState } from 'react';
import { getCountdown } from './Countdown';

// IMPORTANT: adjust these dates if needed (America/Chicago assumed)
const DATES = {
  meet: '2025-08-14T18:00:00-05:00',
  open: '2025-08-20T08:00:00-05:00',
  close: '2025-09-02T23:59:59-05:00',
  results: '2025-09-03T18:00:00-05:00'
};

export default function StickyBanner() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const t = setInterval(() => {
      const { phase, days } = getCountdown(new Date().toISOString(), DATES.open, DATES.close);
      if (phase === 'pre') setMsg(`Voting opens in ${days} day${days!==1?'s':''}`);
      else if (phase === 'open') setMsg(`Voting closes in ${days} day${days!==1?'s':''}`);
      else setMsg('Voting period ended');
    }, 60_000);
    // initial
    const { phase, days } = getCountdown(new Date().toISOString(), DATES.open, DATES.close);
    if (phase === 'pre') setMsg(`Voting opens in ${days} day${days!==1?'s':''}`);
    else if (phase === 'open') setMsg(`Voting closes in ${days} day${days!==1?'s':''}`);
    else setMsg('Voting period ended');
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-lagoon text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between py-3">
        <div className="text-sm sm:text-base text-white/95">
          <strong>Meet the Candidates – Aug 14 @ 6 PM</strong> · Ask your questions, hear real answers, hold us accountable
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline"> <strong>Voting Opens – Aug 20</strong> via Vote HOA Now · Your chance to shape our future</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline"><strong>Voting Closes – Sept 2</strong></span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline"><strong>Results Announced – Sept 3</strong> at the Special Meeting</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline"><strong>One vote per home address by a Title Owner</strong></span>
        </div>
        <div className="text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-2xl">{msg}</div>
      </div>
    </div>
  );
}
