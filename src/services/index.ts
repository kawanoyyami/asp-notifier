import { BRANCH_ID, SERVICES } from './services';
import { getAvailableDates, getAvailableTimes, sleep } from './api';
import { AvailableDate, AvailableTime } from '../utils/types';

export async function runApp() {
  for (const service of SERVICES) {
    const dates = await getAvailableDates(BRANCH_ID, service.id);
    if (Array.isArray(dates) && dates.length > 0) {
      console.log(`\n[${service.name}] Available dates:`);
      const firstTwoDates = dates.slice(0, 2);
      for (const day of firstTwoDates) {
        const date = (day as AvailableDate).date || (day as any).date || day;
        console.log(`  - ${date}`);
        const times = await getAvailableTimes(BRANCH_ID, service.id, date);
        if (Array.isArray(times) && times.length > 0) {
          console.log(`    Time for ${date}:`);
          times.forEach(time => {
            console.log(`      * ${(time as AvailableTime).time || time}`);
          });
        } else {
          console.log(`    No time for ${date}.`);
        }
      }
    } else {
      console.log(`\n[${service.name}] No data available.`);
    }
    await sleep(3000);
  }
} 