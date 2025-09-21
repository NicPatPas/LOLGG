
import { RiotClient } from "@lolgg/riot-client";
import { prisma } from "@lolgg/db";
import type { Region } from "@lolgg/core-types";

export async function refreshSummoner(riotId: string, region: Region) {
  const [gameName, tagLine] = riotId.split("#");
  if (!gameName || !tagLine) throw new Error("Use Riot ID format: gameName#tagLine");

  const rc = new RiotClient(process.env.RIOT_API_KEY!);
  const acct = await rc.accountByRiotId(region, gameName, tagLine);

  await prisma.summoner.upsert({
    where: { puuid: acct.puuid },
    create: {
      puuid: acct.puuid,
      gameName,
      tagLine,
      profileIcon: 0,
      summonerLevel: 0,
      region
    },
    update: { gameName, tagLine, region }
  });
}
