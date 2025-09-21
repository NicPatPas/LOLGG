
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">LOLGG Starter</h1>
      <p className="opacity-75">Suche nach einem Riot ID wie <code>Faker#KR1</code>.</p>
      <div>
        <Link className="underline" href="/summoner/Faker%23KR1">Beispiel ansehen</Link>
      </div>
    </main>
  );
}
