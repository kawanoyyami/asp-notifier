import 'dotenv/config';
import { runApp } from './services/index';
import { BranchKey, Branches } from './utils/configs';
import { isLockActive, setLockTime } from './services/helpers';
import { ASPConnectionRefusedError } from './utils/types';

console.log('Monitorizare ASP');

const envBranch = process.env.BRANCH_KEY as BranchKey;
const notifyIfEmpty = process.env.NOTIFY_IF_EMPTY !== 'false';

if (!Object.keys(Branches).includes(envBranch)) {
  console.error(`Invalid branch: ${envBranch}. Using Chisinau_Buiucani.`);
}

async function main() {
  if (isLockActive()) {
    console.log('Lock ECONNREFUSED active, skipping verification. Wait for it to expire or remove manually.');
    return;
  }

  const branchToCheck = envBranch;
  console.log(`Checking ASP - ${Branches[branchToCheck].displayName}`);

  try {
    await runApp(branchToCheck, { notifyIfEmpty });
  } catch (err) {
    if (err instanceof ASPConnectionRefusedError) {
      console.error('ECONNREFUSED detected, set lock for 1 hour');
      setLockTime();
    } else {
      console.error('Error during execution:', err);
    }
  }
}

main().then(() => {
  console.log('Verification complete, process will exit.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 