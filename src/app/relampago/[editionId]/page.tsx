
// This page will display details for a specific Relampago edition
// For example: /relampago/edicion-1
"use client"; 

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation'; 
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/match-card";
import { PlayoffBracket } from "@/components/playoff-bracket"; // Import PlayoffBracket
import { getRelampagoEditionBySlug, getTeamById } from "@/lib/data";
import type { Match as MatchType, Team, RelampagoEdition as RelampagoEditionType } from "@/lib/types";
import { ArrowLeftIcon } from 'lucide-react';

// Helper function to group matches by round
const groupMatchesByRound = (matches: MatchType[]): Record<string, MatchType[]> => {
  return matches.reduce((acc, match) => {
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

  const [edition, setEdition] = useState<RelampagoEditionType | null | undefined>(undefined);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchType[]>([]);
  const [playedMatches, setPlayedMatches] = useState<MatchType[]>([]);
  const [playoffMatchesForBracket, setPlayoffMatchesForBracket] = useState<MatchType[]>([]);

  useEffect(() => {
    const foundEdition = getRelampagoEditionBySlug(params.editionId);
    setEdition(foundEdition);

    if (foundEdition) {
      const allMatchesForTabs = [ // Includes regular and playoff matches for pending/played tabs
        ...(foundEdition.matches || []),
        ...(foundEdition.playoffMatches || [])
      ];

      setUpcomingMatches(
        allMatchesForTabs
          .filter(match => match.status === 'upcoming')
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
      setPlayedMatches(
        allMatchesForTabs
          .filter(match => match.status === 'played')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
      
      setPlayoffMatchesForBracket(
        (foundEdition.playoffMatches || [])
          .sort((a,b) => {
            const roundOrderValue = (round?: string | number): number => {
                if (typeof round === 'string') {
                    if (round.startsWith("Cuartos de Final")) return 1;
                    if (round.startsWith("Semifinal")) return 2;
                    if (round.startsWith("Final")) return 3;
                }
                return 4; // other or undefined
            };
            const orderA = roundOrderValue(a.round);
            const orderB = roundOrderValue(b.round);

            if (orderA !== orderB) return orderA - orderB;
            
            // If same round type (e.g. QF1 vs QF2), sort by the numeric part or full string
            return (a.round || "").toString().localeCompare((b.round || "").toString());
          })
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
    // Sorts "Cuartos de Final X" before "Semifinal X", etc. then by number.
    const roundOrderValue = (roundKey: string): number => {
        if (roundKey.startsWith("Cuartos de Final")) return 1;
        if (roundKey.startsWith("Semifinal")) return 2;
        if (roundKey.startsWith("Final")) return 3;
        if (!isNaN(Number(roundKey.split(' ')[1] || roundKey))) return 0; // For numeric group stage rounds
        return 4;
    };
    const orderA = roundOrderValue(a);
    const orderB = roundOrderValue(b);
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b); // Fallback to string compare if same type
  });

  const groupedPlayedMatches = groupMatchesByRound(playedMatches);
  const sortedPlayedRounds = Object.keys(groupedPlayedMatches).sort((a, b) => {
    const roundOrderValue = (roundKey: string): number => {
        if (roundKey.startsWith("Cuartos de Final")) return 1;
        if (roundKey.startsWith("Semifinal")) return 2;
        if (roundKey.startsWith("Final")) return 3;
        if (!isNaN(Number(roundKey.split(' ')[1] || roundKey))) return 0;
        return 4;
    };
    const orderA = roundOrderValue(a);
    const orderB = roundOrderValue(b);
    if (orderA !== orderB) return orderA - orderB;
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

        <Tabs defaultValue="playoffs" className="w-full"> {/* Default to playoffs tab */}
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
            <TabsTrigger value="pending">Partidos Pendientes</TabsTrigger>
            <TabsTrigger value="played">Partidos Jugados</TabsTrigger>
            <TabsTrigger value="playoffs">Eliminatorias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Partidos Pendientes - {edition.name}</CardTitle>
                <CardDescription>Próximos encuentros del torneo.</CardDescription>
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
                <CardTitle className="text-xl sm:text-2xl">Partidos Jugados - {edition.name}</CardTitle>
                <CardDescription>Resultados de los encuentros del torneo.</CardDescription>
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
                <CardTitle className="text-xl sm:text-2xl">Eliminatorias - {edition.name}</CardTitle>
                <CardDescription>
                  Cuadro de la fase de eliminación directa.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-0 sm:p-6"> {/* Centering and padding adjustment */}
                {playoffMatchesForBracket.length > 0 && edition.teams.length > 0 ? (
                   <PlayoffBracket matches={playoffMatchesForBracket} teams={edition.teams} />
                ) : (
                  <p className="text-center text-muted-foreground py-8">
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
