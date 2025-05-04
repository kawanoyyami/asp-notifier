import 'dotenv/config';
import cron from 'node-cron';
import { runApp } from './services/index';
import { BranchIds } from './utils/configs';

console.log('Monitoring ASP - DECA Chisinau (str. Salcâmilor, 28)');

const sector: string = BranchIds.Chisinau_Buiucani;

cron.schedule('*/5 * * * *', () => {
  runApp(sector);
});

runApp(sector); 