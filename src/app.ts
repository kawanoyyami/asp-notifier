import 'dotenv/config';
import cron from 'node-cron';
import { runApp } from './services/index';

console.log('Monitoring ASP - DECA Chisinau (str. Salcâmilor, 28)');

cron.schedule('*/5 * * * *', () => {
  runApp();
});

runApp(); 