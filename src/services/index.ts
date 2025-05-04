import { Services, Branches, BranchKey } from '../utils/configs';
import { getAvailableDates, getAvailableTimes } from './api';
import { ASPConnectionRefusedError, AvailableDate, AvailableTime, RunAppOptions } from '../utils/types';
import { sendTelegramNotification } from './telegram';
import { randomSleep } from './helpers';

export async function runApp(branchKey: BranchKey, options: RunAppOptions = {}) {
  const { id: branchId, displayName: branchName } = Branches[branchKey];
  let summaryMsg = `*Available appointments at ASP - ${branchName}*\n`;
  let found = false;

  try {
    const servicesToCheck = Services;
    console.log(`Verify all services (${Services.length})`);

    for (const service of servicesToCheck) {
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
            summaryMsg += `- ${date}: no available times\n`;
          }
        }
      }

      await randomSleep(3000, 8000);
    }

    if (found) {
      await sendTelegramNotification(summaryMsg.trim());
    } else if (options.notifyIfEmpty !== false) {
      await sendTelegramNotification(`No available appointments at ${branchName}.`);
    }
  } catch (err) {
    if (err instanceof ASPConnectionRefusedError) {
      console.error('ECONNREFUSED detected, lock will be set by app.ts');
      await sendTelegramNotification('ECONNREFUSED at ASP. Pause 1 hour.');
      throw err;
    } else {
      throw err;
    }
  }
} 