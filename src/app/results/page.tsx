
import { PageHeader } from "@/components/page-header";
import { MatchCard } from "@/components/match-card";
import { matches as allMatches, getTeamById } from "@/lib/data";
import type { Match, Team } from "@/lib/types";

const groupMatchesByRound = (matches: Match[]): Record<number, Match[]> => {
  return matches.reduce((acc, match) => {
    const round = match.round || 0;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
};

export default function MatchResultsPage() {
  const playedMatches = allMatches
    .filter(match => match.status === 'played');

  const groupedMatches = groupMatchesByRound(playedMatches);
  const sortedRounds = Object.keys(groupedMatches)
    .map(Number)
    .sort((a, b) => a - b); // Sort rounds in ascending order

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="Resultados - Liga Principal" />
      {playedMatches.length > 0 ? (
        <div className="animate-in fade-in duration-500 space-y-8">
          {sortedRounds.map(roundNumber => {
            // Sort matches within each round by date (most recent first)
            const matchesInRound = groupedMatches[roundNumber].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            return (
              <section key={roundNumber}>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Jornada {roundNumber}</h2>
                {matchesInRound.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {matchesInRound.map((match: Match) => {
                      const homeTeam = getTeamById(match.homeTeamId);
                      const awayTeam = getTeamById(match.awayTeamId);
                      if (!homeTeam || !awayTeam) return null; // Skip if team data is missing
                      return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No hay partidos jugados para esta jornada.</p>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No hay resultados de partidos para mostrar en este momento.
        </p>
      )}
    </main>
  );
}
    
