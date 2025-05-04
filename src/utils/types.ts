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

export class ASPConnectionRefusedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ASPConnectionRefusedError';
  }
} 