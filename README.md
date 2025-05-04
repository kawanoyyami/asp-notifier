# ASP Appointment Notifier (Node.js)

This application monitors the ASP (Agenția Servicii Publice) website for available driver's license appointments and sends notifications when new slots become available.

## Features

- Monitors ASP appointment availability for the specified branch
- Sends notifications via Telegram when appointments are available
- Configurable to run on hourly schedule via PM2
- Handles connection errors gracefully with a lock mechanism

## Requirements

- Node.js 16+ and npm
- PM2 for process management
- Telegram Bot Token and Chat ID

## Installation

1. Clone the repository
2. Install dependencies
3. Install PM2 globally if not already installed
4. Create a `.env` file in the project root and add your configuration
   ```
   TELEGRAM_BOT_TOKEN=
   TELEGRAM_CHAT_ID=
   BRANCH_KEY=
   NOTIFY_IF_EMPTY=
   ```

## Usage

### Starting the service

The application is configured to run via PM2 on an hourly schedule:

```
npm run pm2:check-hourly
```

This will set up a cron job that runs the application once per hour at a random minute.

### Managing the service

- Check status: `npm run pm2:status`
- View logs: `npm run pm2:logs`
- Stop service: `npm run pm2:stop`
- Restart service: `npm run pm2:restart`
- Clear logs: `npm run pm2:clearlogs`
- Reset connection lock: `npm run pm2:reset-lock`

## How it works

1. The application checks the ASP website for available appointment dates for all configured services
2. For each available date, it checks available time slots
3. Results are compiled into a formatted message
4. If appointments are found, a notification is sent via Telegram
5. If configured, notifications are also sent when no appointments are available
6. After checking, the application exits and waits for the next scheduled run
7. If connection errors occur, a lock mechanism prevents requests for 1 hour

## Troubleshooting

If you encounter a "Connection refused" error, the application will automatically create a lock file that prevents it from making requests for 1 hour. You can manually reset this lock with:

```
npm run pm2:reset-lock
```
