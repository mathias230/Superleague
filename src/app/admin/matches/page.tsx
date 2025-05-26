
import { PageHeader } from "@/components/page-header";
import { matches as allMatches, getTeamById } from "@/lib/data";
import type { Match } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "lucide-react";

export default function AdminMatchesPage() {
  // Sort matches by date, then by round if dates are the same
  const sortedMatches = [...allMatches].sort((a, b) => {
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return (a.round || 0) - (b.round || 0);
  });

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Gestionar Partidos" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Partidos</CardTitle>
            <CardDescription>Selecciona un partido para actualizar sus resultados o detalles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jornada</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Equipo Local</TableHead>
                    <TableHead>Equipo Visitante</TableHead>
                    <TableHead className="text-center">Resultado</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMatches.map((match: Match) => {
                    const homeTeam = getTeamById(match.homeTeamId);
                    const awayTeam = getTeamById(match.awayTeamId);
                    const matchDate = new Date(match.date);
                    const formattedDate = matchDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                    const formattedTime = matchDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                    return (
                      <TableRow key={match.id}>
                        <TableCell className="text-center">{match.round || '-'}</TableCell>
                        <TableCell>{formattedDate}, {formattedTime}</TableCell>
                        <TableCell>{homeTeam?.name || 'N/A'}</TableCell>
                        <TableCell>{awayTeam?.name || 'N/A'}</TableCell>
                        <TableCell className="text-center">
                          {match.status === 'played' ? `${match.homeScore} - ${match.awayScore}` : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={match.status === 'played' ? 'default' : match.status === 'upcoming' ? 'secondary' : 'outline'}>
                            {match.status === 'played' ? 'Jugado' : match.status === 'upcoming' ? 'Próximo' : 'Pendiente'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/admin/matches/${match.id}/edit`}>
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {sortedMatches.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No hay partidos para mostrar.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
