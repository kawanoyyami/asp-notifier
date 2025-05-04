export interface Service {
  name: string;
  id: string;
}

export interface AvailableDate {
  date: string;
}

export interface AvailableTime {
  time: string;
} 

export interface RunAppOptions {
  notifyIfEmpty?: boolean;
}