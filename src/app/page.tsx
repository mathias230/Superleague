import { LeagueTable } from "@/components/league-table";
import { PageHeader } from "@/components/page-header";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="Tabla de Posiciones" />
      <div className="animate-in fade-in duration-500">
        <LeagueTable />
      </div>
    </main>
  );
}
