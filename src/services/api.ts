import axios from 'axios';
import { AvailableDate, AvailableTime } from '../utils/types';

export async function getAvailableDates(branchId: string, serviceId: string): Promise<AvailableDate[]> {
  const url = `https://programaredl.asp.gov.md/qwebbook/rest/schedule/branches/${branchId}/services/${serviceId}/dates`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error for data for service:`, error.message);
    return [];
  }
}

export async function getAvailableTimes(branchId: string, serviceId: string, date: string): Promise<AvailableTime[]> {
  const url = `https://programaredl.asp.gov.md/qwebbook/rest/schedule/branches/${branchId}/services/${serviceId}/dates/${date}/times?numberOfCustomers=1`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error for time for ${date}:`, error.message);
    return [];
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 