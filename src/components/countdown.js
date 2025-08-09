export function getCountdown(now, openISO, closeISO) {
    const nowTs = new Date(now).getTime();
    const open = new Date(openISO).getTime();
    const close = new Date(closeISO).getTime();
    if (nowTs < open) {
      const diff = open - nowTs;
      return { phase: 'pre', days: Math.ceil(diff / 86400000) };
    }
    if (nowTs >= open && nowTs < close) {
      const diff = close - nowTs;
      return { phase: 'open', days: Math.ceil(diff / 86400000) };
    }
    return { phase: 'post', days: 0 };
  }
  