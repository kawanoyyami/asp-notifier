import axios from 'axios';
import { ASPConnectionRefusedError, AvailableDate, AvailableTime } from '../utils/types';
import { randomSleep, getRandomUserAgent } from './helpers';

export async function getAvailableDates(branchId: string, serviceId: string): Promise<AvailableDate[]> {
  const url = `https://programaredl.asp.gov.md/qwebbook/rest/schedule/branches/${branchId}/services/${serviceId}/dates`;

  await randomSleep();

  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,ro;q=0.8',
        'content-type': 'application/json',
        'user-agent': getRandomUserAgent(),
        'origin': 'https://programaredl.asp.gov.md',
        'referer': 'https://programaredl.asp.gov.md/qwebbook/rest/index',
        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'cache-control': 'no-cache'
      },
      timeout: 10000,
    });
    console.log("respinse from getAvailableDates", response.data);
    return response.data;
  } catch (error: any) {
    if (error.message && error.message.includes('ECONNREFUSED')) {
      throw new ASPConnectionRefusedError(error.message);
    }
    console.error(`Error for data for service:`, error.message);
    return [];
  }
}

export async function getAvailableTimes(branchId: string, serviceId: string, date: string): Promise<AvailableTime[]> {
  const url = `https://programaredl.asp.gov.md/qwebbook/rest/schedule/branches/${branchId}/services/${serviceId}/dates/${date}/times?numberOfCustomers=1`;

  await randomSleep();

  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,ro;q=0.8',
        'content-type': 'application/json',
        'user-agent': getRandomUserAgent(),
        'origin': 'https://programaredl.asp.gov.md',
        'referer': 'https://programaredl.asp.gov.md/qwebbook/rest/index',
        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'cache-control': 'no-cache'
      },
      timeout: 10000,
    });
    console.log("respinse from getAvailableTimes", response.data);
    return response.data;
  } catch (error: any) {
    if (error.message && error.message.includes('ECONNREFUSED')) {
      throw new ASPConnectionRefusedError(error.message);
    }
    console.error(`Error for time for ${date}:`, error.message);
    return [];
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 