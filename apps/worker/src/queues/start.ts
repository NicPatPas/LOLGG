
import { refreshSummoner } from "../jobs/refreshSummoner";

export async function startQueues() {
  // Placeholder: run a single job once at startup (replace with BullMQ later)
  const seed = process.env.SEED_NAME ?? "Faker#KR1";
  console.log("[worker] refreshing", seed);
  await refreshSummoner(seed, "kr");
  console.log("[worker] done");
}
