import MatchingGame from "@/components/game/MatchingGame";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8">
        <MatchingGame />
      </div>
    </main>
  );
}
