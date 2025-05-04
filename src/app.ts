import 'dotenv/config';
import cron from 'node-cron';
import { runApp } from './services/index';
import { BranchKey } from './utils/configs';

const sector: BranchKey = process.env.BRANCH_KEY as BranchKey;

console.log('Monitoring ASP');

cron.schedule('*/5 * * * *', () => {
  runApp(sector);
});

runApp(sector); 