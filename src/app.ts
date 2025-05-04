import 'dotenv/config';
import cron from 'node-cron';
import { runApp } from './services/index';
import { BranchKey } from './utils/configs';

console.log('Monitoring ASP');

const sector: BranchKey = process.env.BRANCH_KEY as BranchKey;
const notifyIfEmpty = process.env.NOTIFY_IF_EMPTY !== 'false';

cron.schedule('*/15 * * * *', () => {
  runApp(sector, { notifyIfEmpty });
});

runApp(sector, { notifyIfEmpty }); 