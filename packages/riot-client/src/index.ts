
import { setTimeout as sleep } from "node:timers/promises";
import type { Region } from "@lolgg/core-types";

const REGIONAL: Record<"americas"|"asia"|"europe", string> = {
  americas: "https://americas.api.riotgames.com",
  asia: "https://asia.api.riotgames.com",
  europe: "https://europe.api.riotgames.com"
};

const PLATFORM: Record<Region, string> = {
  euw1:"https://euw1.api.riotgames.com",
  eun1:"https://eun1.api.riotgames.com",
  na1:"https://na1.api.riotgames.com",
  kr:"https://kr.api.riotgames.com",
  br1:"https://br1.api.riotgames.com",
  jp1:"https://jp1.api.riotgames.com",
  la1:"https://la1.api.riotgames.com",
  la2:"https://la2.api.riotgames.com",
  oc1:"https://oc1.api.riotgames.com",
  ru:"https://ru.api.riotgames.com",
  tr1:"https://tr1.api.riotgames.com"
};

function matchHostFor(region: Region){
  if (["na1","br1","la1","la2","oc1"].includes(region)) return REGIONAL.americas;
  if (["kr","jp1"].includes(region)) return REGIONAL.asia;
  return REGIONAL.europe;
}

export class RiotClient {
  constructor(private apiKey: string){}

  private async req(url: string){
    const r = await fetch(url, { headers: { "X-Riot-Token": this.apiKey } });
    if (r.status === 429) {
      // naive backoff; you can enhance with Retry-After headers
      await sleep(1200);
      return this.req(url);
    }
    if (!r.ok) throw new Error(`${r.status} ${r.statusText} ${url}`);
    return r.json();
  }

  accountByRiotId(region: Region, gameName: string, tagLine: string){
    // NOTE: Official docs use the "account-v1" endpoint under platform routing host
    const base = PLATFORM[region];
    const gn = encodeURIComponent(gameName);
    const tl = encodeURIComponent(tagLine);
    return this.req(`${base}/riot/account/v1/accounts/by-riot-id/${gn}/${tl}`);
  }

  matchIdsByPUUID(region: Region, puuid: string, start=0, count=20){
    const base = matchHostFor(region);
    return this.req(`${base}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`);
    }

  matchById(region: Region, matchId: string){
    const base = matchHostFor(region);
    return this.req(`${base}/lol/match/v5/matches/${matchId}`);
  }

  timelineById(region: Region, matchId: string){
    const base = matchHostFor(region);
    return this.req(`${base}/lol/match/v5/matches/${matchId}/timeline`);
  }
}
