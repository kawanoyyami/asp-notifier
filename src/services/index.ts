import { Services, Branches, BranchKey } from '../utils/configs';
import { getAvailableDates, getAvailableTimes, sleep } from './api';
import { AvailableDate, AvailableTime, RunAppOptions } from '../utils/types';
import { sendTelegramNotification } from './telegram';

export async function runApp(branchKey: BranchKey, options: RunAppOptions = {}) {
  const { id: branchId, displayName: branchName } = Branches[branchKey];
  let summaryMsg = `*Available appointments at ASP - ${branchName}*\n`;
  let found = false;
  for (const service of Services) {
    const dates = await getAvailableDates(branchId, service.id);
    if (Array.isArray(dates) && dates.length > 0) {
      found = true;
      summaryMsg += `\n*${service.name}*\n`;
      const firstTwoDates = dates.slice(0, 2);
      for (const day of firstTwoDates) {
        const date = (day as AvailableDate).date || (day as any).date || day;
        const times = await getAvailableTimes(branchId, service.id, date);
        if (Array.isArray(times) && times.length > 0) {
          const hourList = times.map(time => (time as AvailableTime).time || time).join(', ');
          summaryMsg += `- ${date}: ${hourList}\n`;
        } else {
          summaryMsg += `- ${date}: no times available\n`;
        }
      }
    }
    await sleep(5000);
  }
  if (found) {
    await sendTelegramNotification(summaryMsg.trim());
  } else if (options.notifyIfEmpty !== false) {
    await sendTelegramNotification(`No appointments available for ${branchName}.`);
  }
} 