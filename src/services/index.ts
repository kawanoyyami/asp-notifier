import { Services } from '../utils/configs';
import { getAvailableDates, getAvailableTimes, sleep } from './api';
import { AvailableDate, AvailableTime } from '../utils/types';

export async function runApp(branchId: string) {
  for (const service of Services) {
    const dates = await getAvailableDates(branchId, service.id);
    if (Array.isArray(dates) && dates.length > 0) {
      console.log(`\n[${service.name}] Available dates:`);
      const firstTwoDates = dates.slice(0, 2);
      for (const day of firstTwoDates) {
        const date = (day as AvailableDate).date || (day as any).date || day;
        console.log(`\t- ${date}`);
        const times = await getAvailableTimes(branchId, service.id, date);
        if (Array.isArray(times) && times.length > 0) {
          console.log(`\tTime for ${date}:`);
          times.forEach(time => {
            console.log(`\t\t* ${(time as AvailableTime).time || time}`);
          });
        } else {
          console.log(`\tNo time for ${date}.`);
        }
      }
    } else {
      console.log(`\n[${service.name}] No data available.`);
    }
    await sleep(3000);
  }
} 