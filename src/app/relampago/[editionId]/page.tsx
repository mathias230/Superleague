
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
import { MatchCard } from "@/components/match-card";
import { getRelampagoEditionBySlug, getTeamById } from "@/lib/data";
import type { Match as MatchType, Team, RelampagoEdition as RelampagoEditionType } from "@/lib/types";
import { ArrowLeftIcon } from 'lucide-react';

// Helper function to group matches by round
const groupMatchesByRound = (matches: MatchType[]): Record<string, MatchType[]> => {
  return matches.reduce((acc, match) => {
    const roundKey = typeof match.round === 'string' ? match.round.split(' ')[0] : (match.round || 0).toString(); // e.g. "Cuartos" or "1"
    const roundDisplay = match.round || 'Ronda Desconocida';
    if (!acc[roundDisplay]) {
      acc[roundDisplay] = [];
    }
    acc[roundDisplay].push(match);
    return acc;
  }, {} as Record<string, MatchType[]>);
};


interface RelampagoEditionPageProps {
  params: Promise<{
    editionId: string;
  }>;
}

export default function RelampagoEditionPage({ params: paramsPromise }: RelampagoEditionPageProps) {
  const params = use(paramsPromise);
  const router = useRouter();

  const [edition, setEdition] = useState<RelampagoEditionType | null | undefined>(undefined);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchType[]>([]);
  const [playedMatches, setPlayedMatches] = useState<MatchType[]>([]);
  const [playoffMatchesForBracket, setPlayoffMatchesForBracket] = useState<MatchType[]>([]); // Renamed for clarity

  useEffect(() => {
    const foundEdition = getRelampagoEditionBySlug(params.editionId);
    setEdition(foundEdition);

    if (foundEdition) {
      const allMatches = [
        ...(foundEdition.matches || []),
        ...(foundEdition.playoffMatches || [])
      ];

      setUpcomingMatches(
        allMatches
          .filter(match => match.status === 'upcoming')
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
      setPlayedMatches(
        allMatches
          .filter(match => match.status === 'played')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
      setPlayoffMatchesForBracket(
        (foundEdition.playoffMatches || [])
          .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    }
  }, [params.editionId]);

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
  const sortedUpcomingRounds = Object.keys(groupedUpcomingMatches).sort((a, b) => {
    // Basic sort for round numbers, then string rounds
    const aIsNum = !isNaN(Number(a.toString().split(' ')[1] || a));
    const bIsNum = !isNaN(Number(b.toString().split(' ')[1] || b));
    if (aIsNum && bIsNum) return Number(a.toString().split(' ')[1] || a) - Number(b.toString().split(' ')[1] || b);
    if (aIsNum) return -1;
    if (bIsNum) return 1;
    return a.localeCompare(b);
  });

  const groupedPlayedMatches = groupMatchesByRound(playedMatches);
  const sortedPlayedRounds = Object.keys(groupedPlayedMatches).sort((a, b) => {
    const aIsNum = !isNaN(Number(a.toString().split(' ')[1] || a));
    const bIsNum = !isNaN(Number(b.toString().split(' ')[1] || b));
    if (aIsNum && bIsNum) return Number(a.toString().split(' ')[1] || a) - Number(b.toString().split(' ')[1] || b);
    if (aIsNum) return -1;
    if (bIsNum) return 1;
    return a.localeCompare(b);
  });
  
  const groupedPlayoffMatches = groupMatchesByRound(playoffMatchesForBracket);
  const sortedPlayoffRounds = Object.keys(groupedPlayoffMatches).sort((a, b) => {
     // Simple sort for playoff rounds, can be enhanced if phases have specific order
    const roundOrder = ["Cuartos de Final", "Semifinal", "Final"]; // Example order
    const indexA = roundOrder.findIndex(r => a.startsWith(r));
    const indexB = roundOrder.findIndex(r => b.startsWith(r));
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    return a.localeCompare(b);
  });


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

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
            <TabsTrigger value="pending">Partidos Pendientes</TabsTrigger>
            <TabsTrigger value="played">Partidos Jugados</TabsTrigger>
            <TabsTrigger value="playoffs">Eliminatorias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Partidos Pendientes - {edition.name}</CardTitle>
                <CardDescription>Próximos encuentros del torneo, incluyendo fases de grupos y eliminatorias.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingMatches.length > 0 ? (
                  sortedUpcomingRounds.map(roundDisplay => (
                    <section key={`upcoming-round-${roundDisplay}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">{roundDisplay}</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {groupedUpcomingMatches[roundDisplay]
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
                <CardDescription>Resultados de los encuentros del torneo, incluyendo fases de grupos y eliminatorias.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {playedMatches.length > 0 ? (
                  sortedPlayedRounds.map(roundDisplay => (
                     <section key={`played-round-${roundDisplay}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">{roundDisplay}</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {groupedPlayedMatches[roundDisplay]
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
                <CardDescription>
                  Partidos de la fase de eliminación directa. Un diseño de "bracket" visual completo es una mejora futura.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {playoffMatchesForBracket.length > 0 ? (
                   sortedPlayoffRounds.map(roundDisplay => (
                    <section key={`playoff-round-${roundDisplay}`}>
                      <h3 className="text-xl font-semibold mb-3 text-primary">{roundDisplay.startsWith("Cuartos") ? "Cuartos de Final" : roundDisplay.startsWith("Semifinal") ? "Semifinales" : roundDisplay.startsWith("Final") ? "Final" : roundDisplay }</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {groupedPlayoffMatches[roundDisplay]
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
    

    