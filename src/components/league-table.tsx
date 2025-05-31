
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamDisplay } from "@/components/team-display";
import type { StandingEntry } from "@/lib/types";

interface LeagueTableProps {
  standings: StandingEntry[];
  title?: string;
}

export function LeagueTable({ standings, title = "Tabla de Posiciones" }: LeagueTableProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-primary sm:text-2xl">{title}</CardTitle> {/* Responsive title */}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">#</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">MP</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center font-semibold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((entry, index) => (
                <TableRow key={entry.teamId} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-center">{index + 1}</TableCell>
                  <TableCell>
                    <TeamDisplay team={{id: entry.teamId, name: entry.teamName, logoUrl: entry.teamLogoUrl}} />
                  </TableCell>
                  <TableCell className="text-center">{entry.played}</TableCell>
                  <TableCell className="text-center">{entry.wins}</TableCell>
                  <TableCell className="text-center">{entry.draws}</TableCell>
                  <TableCell className="text-center">{entry.losses}</TableCell>
                  <TableCell className="text-center">{entry.goalsFor}</TableCell>
                  <TableCell className="text-center">{entry.goalsAgainst}</TableCell>
                  <TableCell className="text-center">{entry.goalDifference}</TableCell>
                  <TableCell className="text-center font-semibold text-primary">{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
         {standings.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No hay datos de clasificación para mostrar.</p>
        )}
      </CardContent>
    </Card>
  );
}
