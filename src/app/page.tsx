
import { LeagueTable } from "@/components/league-table";
import { PageHeader } from "@/components/page-header";
import { calculateStandings, teams, matches } from "@/lib/data";

export default function HomePage() {
  const standings = calculateStandings(teams, matches);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="Tabla de Posiciones General" />
      <div className="animate-in fade-in duration-500">
        <LeagueTable standings={standings} title="Tabla de Posiciones - Liga Principal" />
      </div>
    </main>
  );
}
