import fs from 'fs';
import path from 'path';
import { USER_AGENTS } from '../utils/configs';

const LOCK_FILE_PATH = path.join(__dirname, '..', '..', '.asp-lock');

export async function randomSleep(minMs = 2000, maxMs = 5000): Promise<void> {
  const sleepTime = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  console.log(`Waiting ${sleepTime}ms between requests...`);
  return new Promise(resolve => setTimeout(resolve, sleepTime));
}

export function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export function setLockTime(): void {
  fs.writeFileSync(LOCK_FILE_PATH, Date.now().toString());
}

export function isLockActive(): boolean {
  try {
    if (!fs.existsSync('.asp-lock')) {
      fs.writeFileSync('.asp-lock', '');
      console.log('Created empty lock file');
      return false;
    }
    
    const lockData = fs.readFileSync('.asp-lock', 'utf8');
    
    if (!lockData) {
      return false;
    }
    
    const lockTime = parseInt(lockData, 10);
    if (isNaN(lockTime)) {
      return false;
    }
    
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (currentTime - lockTime < oneHour) {
      const remainingMinutes = Math.ceil((oneHour - (currentTime - lockTime)) / (60 * 1000));
      console.log(`Lock ECONNREFUSED active, remaining time: ${remainingMinutes} minutes. Wait for it to expire or remove manually.`);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error('Error checking lock status:', err);
    return false;
  }
}
