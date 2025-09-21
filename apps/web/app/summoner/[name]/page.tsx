
import { prisma } from "@lolgg/db";

export default async function Page({ params }: { params:{ name:string } }) {
  const [gameName, tagLine=""] = decodeURIComponent(params.name).split("#");
  const stored = await prisma.summoner.findMany({ take: 5 });
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">{gameName}#{tagLine}</h1>
      <p className="opacity-70">Repo skeleton online. {stored.length} summoners in DB.</p>
    </main>
  );
}
