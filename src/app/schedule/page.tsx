import { PageHeader } from "@/components/page-header";
import { MatchCard } from "@/components/match-card";
import { matches as allMatches } from "@/lib/data";
import type { Match } from "@/lib/types";

// Helper function to group matches by round
const groupMatchesByRound = (matches: Match[]): Record<number, Match[]> => {
  return matches.reduce((acc, match) => {
    const round = match.round || 0; // Default to round 0 if undefined
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
};

export default function MatchSchedulePage() {
  const upcomingMatches = allMatches
    .filter(match => match.status === 'upcoming');

  const groupedMatches = groupMatchesByRound(upcomingMatches);
  const sortedRounds = Object.keys(groupedMatches)
    .map(Number)
    .sort((a, b) => a - b); // Sort rounds numerically

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="Match Schedule" />
      {upcomingMatches.length > 0 ? (
        <div className="animate-in fade-in duration-500 space-y-8">
          {sortedRounds.map(roundNumber => {
            // Sort matches within this round by date, earliest first
            const matchesInRound = groupedMatches[roundNumber].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            return (
              <section key={roundNumber}>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Jornada {roundNumber}</h2>
                {matchesInRound.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {matchesInRound.map((match: Match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming matches for this round.</p>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No upcoming matches scheduled.</p>
      )}
    </main>
  );
}
