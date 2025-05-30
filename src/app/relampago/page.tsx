
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueTable } from "@/components/league-table";
import { MatchCard } from "@/components/match-card";
import {
  relampagoTeams,
  relampagoMatches,
  calculateRelampagoStandings,
  getRelampagoTeamById,
} from "@/lib/data";
import type { Match as MatchType, Team } from "@/lib/types"; // Renamed Match to MatchType to avoid conflict

// Helper function to group matches by round
const groupMatchesByRound = (matches: MatchType[]): Record<number, MatchType[]> => {
  return matches.reduce((acc, match) => {
    const round = match.round || 0; // Default to round 0 if undefined
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {} as Record<number, MatchType[]>);
};

export default function RelampagoPage() {
  const standings = calculateRelampagoStandings(relampagoTeams, relampagoMatches);
  
  const upcomingRelampagoMatches = relampagoMatches.filter(match => match.status === 'upcoming');
  const playedRelampagoMatches = relampagoMatches.filter(match => match.status === 'played');

  const groupedUpcomingMatches = groupMatchesByRound(upcomingRelampagoMatches);
  const sortedUpcomingRounds = Object.keys(groupedUpcomingMatches).map(Number).sort((a, b) => a - b);

  const groupedPlayedMatches = groupMatchesByRound(playedRelampagoMatches);
  const sortedPlayedRounds = Object.keys(groupedPlayedMatches).map(Number).sort((a, b) => a - b);

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Relámpago SAP Edición 1" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6">
        <Tabs defaultValue="classification" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="classification">Clasificación</TabsTrigger>
            <TabsTrigger value="pending">Partidos Pendientes</TabsTrigger>
            <TabsTrigger value="played">Partidos Jugados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classification">
            <LeagueTable standings={standings} title="Clasificación - Relámpago SAP Ed. 1" />
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Partidos Pendientes - Relámpago</CardTitle>
                <CardDescription>Próximos encuentros del torneo relámpago.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingRelampagoMatches.length > 0 ? (
                  sortedUpcomingRounds.map(roundNumber => (
                    <section key={`upcoming-round-${roundNumber}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">Jornada {roundNumber}</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {groupedUpcomingMatches[roundNumber]
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((match: MatchType) => {
                            const homeTeam = getRelampagoTeamById(match.homeTeamId);
                            const awayTeam = getRelampagoTeamById(match.awayTeamId);
                            if (!homeTeam || !awayTeam) return null;
                            return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                          })}
                      </div>
                    </section>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No hay partidos pendientes en el torneo relámpago.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="played">
            <Card>
              <CardHeader>
                <CardTitle>Partidos Jugados - Relámpago</CardTitle>
                <CardDescription>Resultados de los encuentros del torneo relámpago.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {playedRelampagoMatches.length > 0 ? (
                  sortedPlayedRounds.map(roundNumber => (
                     <section key={`played-round-${roundNumber}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">Jornada {roundNumber}</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {groupedPlayedMatches[roundNumber]
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((match: MatchType) => {
                            const homeTeam = getRelampagoTeamById(match.homeTeamId);
                            const awayTeam = getRelampagoTeamById(match.awayTeamId);
                            if (!homeTeam || !awayTeam) return null;
                            return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                          })}
                      </div>
                    </section>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No se han jugado partidos en el torneo relámpago aún.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
