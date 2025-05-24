import { PageHeader } from "@/components/page-header";
import { MatchCard } from "@/components/match-card";
import { matches as allMatches } from "@/lib/data";
import type { Match } from "@/lib/types";

export default function MatchResultsPage() {
  const playedMatches = allMatches
    .filter(match => match.status === 'played')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Show most recent first

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="Match Results" />
      {playedMatches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
          {playedMatches.map((match: Match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No matches played yet.</p>
      )}
    </main>
  );
}
