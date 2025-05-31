
// This page will display details for a specific Relampago edition
// For example: /relampago/edicion-1
"use client"; // Required for useState, useEffect, and event handlers in Tabs

import { useEffect, useState, use } from 'react'; // Import 'use'
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation'; // To handle case where editionId is not found
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// LeagueTable and calculateStandings are no longer needed here as Clasificacion tab is removed
import { MatchCard } from "@/components/match-card";
import { getRelampagoEditionBySlug, getTeamById } from "@/lib/data"; // calculateStandings removed
import type { Match as MatchType, Team, RelampagoEdition as RelampagoEditionType } from "@/lib/types"; // StandingEntry removed
import { ArrowLeftIcon } from 'lucide-react';

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

interface RelampagoEditionPageProps {
  params: Promise<{ // Type params as a Promise
    editionId: string; // This will be the slug, e.g., "edicion-1"
  }>;
}

export default function RelampagoEditionPage({ params: paramsPromise }: RelampagoEditionPageProps) { // Rename prop
  const params = use(paramsPromise); // Unwrap the promise
  const router = useRouter();

  const [edition, setEdition] = useState<RelampagoEditionType | null | undefined>(undefined); // undefined for loading, null if not found
  // standings state is no longer needed
  const [upcomingMatches, setUpcomingMatches] = useState<MatchType[]>([]);
  const [playedMatches, setPlayedMatches] = useState<MatchType[]>([]);
  const [playoffMatches, setPlayoffMatches] = useState<MatchType[]>([]);


  useEffect(() => {
    const foundEdition = getRelampagoEditionBySlug(params.editionId); // params.editionId is now from resolved params
    setEdition(foundEdition);

    if (foundEdition) {
      // calculateStandings and setStandings are removed
      setUpcomingMatches(foundEdition.matches.filter(match => match.status === 'upcoming'));
      setPlayedMatches(foundEdition.matches.filter(match => match.status === 'played'));
      setPlayoffMatches(foundEdition.playoffMatches || []);
    }
  }, [params.editionId]); // Dependency on resolved params.editionId

  if (edition === undefined) {
    return (
      <main className="flex flex-1 flex-col">
        <PageHeader title="Cargando Torneo..." />
        <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 text-center">
          <p>Cargando datos de la edición...</p>
        </div>
      </main>
    );
  }

  if (edition === null) {
    notFound();
  }
  
  const pageTitle = `Relámpago SAP: ${edition.name}`;
  const groupedUpcomingMatches = groupMatchesByRound(upcomingMatches);
  const sortedUpcomingRounds = Object.keys(groupedUpcomingMatches).map(Number).sort((a, b) => a - b);
  const groupedPlayedMatches = groupMatchesByRound(playedMatches);
  const sortedPlayedRounds = Object.keys(groupedPlayedMatches).map(Number).sort((a, b) => a - b);


  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={pageTitle} />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/relampago">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Volver a la Lista de Ediciones
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="pending" className="w-full"> {/* Default tab changed to "pending" */}
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6"> {/* Adjusted grid columns */}
            {/* TabsTrigger for "classification" removed */}
            <TabsTrigger value="pending">Partidos Pendientes</TabsTrigger>
            <TabsTrigger value="played">Partidos Jugados</TabsTrigger>
            <TabsTrigger value="playoffs">Eliminatorias</TabsTrigger>
          </TabsList>
          
          {/* TabsContent for "classification" removed */}
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Partidos Pendientes - {edition.name}</CardTitle>
                <CardDescription>Próximos encuentros del torneo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingMatches.length > 0 ? (
                  sortedUpcomingRounds.map(roundNumber => (
                    <section key={`upcoming-round-${roundNumber}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">Jornada {roundNumber}</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
                        {groupedUpcomingMatches[roundNumber]
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((match: MatchType) => {
                            const homeTeam = getTeamById(match.homeTeamId, edition.teams);
                            const awayTeam = getTeamById(match.awayTeamId, edition.teams);
                            if (!homeTeam || !awayTeam) return null;
                            return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                          })}
                      </div>
                    </section>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No hay partidos pendientes en este torneo.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="played">
            <Card>
              <CardHeader>
                <CardTitle>Partidos Jugados - {edition.name}</CardTitle>
                <CardDescription>Resultados de los encuentros del torneo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {playedMatches.length > 0 ? (
                  sortedPlayedRounds.map(roundNumber => (
                     <section key={`played-round-${roundNumber}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">Jornada {roundNumber}</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
                        {groupedPlayedMatches[roundNumber]
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((match: MatchType) => {
                            const homeTeam = getTeamById(match.homeTeamId, edition.teams);
                            const awayTeam = getTeamById(match.awayTeamId, edition.teams);
                            if (!homeTeam || !awayTeam) return null;
                            return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                          })}
                      </div>
                    </section>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No se han jugado partidos en este torneo aún.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playoffs">
            <Card>
              <CardHeader>
                <CardTitle>Eliminatorias - {edition.name}</CardTitle>
                <CardDescription>Llaves y resultados de la fase de eliminación directa.</CardDescription>
              </CardHeader>
              <CardContent>
                {playoffMatches.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
                    {playoffMatches.map((match: MatchType) => {
                        const homeTeam = getTeamById(match.homeTeamId, edition.teams);
                        const awayTeam = getTeamById(match.awayTeamId, edition.teams);
                        if (!homeTeam || !awayTeam) return null;
                        return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                      })}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Las eliminatorias aún no han comenzado o no hay partidos definidos para esta edición.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
    
