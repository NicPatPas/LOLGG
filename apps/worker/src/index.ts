
import 'dotenv/config';
import { startQueues } from './queues/start';

startQueues().catch(err => {
  console.error(err);
  process.exit(1);
});
