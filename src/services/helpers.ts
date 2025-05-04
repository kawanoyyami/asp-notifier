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

export function isLockActive(lockTimeMs = 3600_000): boolean {
  try {
    const content = fs.readFileSync(LOCK_FILE_PATH, 'utf-8');
    const lockTime = parseInt(content, 10);
    return Date.now() - lockTime < lockTimeMs;
  } catch (err) {
    console.error('Error reading lock file:', err);
    return false;
  }
}
