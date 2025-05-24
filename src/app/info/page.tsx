import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeagueInfoPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader title="League Information" />
      <div className="animate-in fade-in duration-500">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">About Pro League Hub</CardTitle>
            <CardDescription>Welcome to the official hub for our FC25 Pro Clubs League!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">League Overview</h2>
              <p className="text-foreground/80">
                This league brings together 8 competitive Pro Clubs teams to battle it out for glory. 
                Follow your favorite team, check standings, view match results, and stay updated on the upcoming schedule.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">General Rules</h2>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>All matches are played on EA Sports FC 25, Pro Clubs mode.</li>
                <li>Each team consists of a dedicated squad of players.</li>
                <li>Fair play is expected from all participants. Any form of cheating or unsportsmanlike conduct may result in penalties.</li>
                <li>Match scheduling will be coordinated between team captains and league administrators.</li>
                <li>Results must be reported promptly after match completion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Points System</h2>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>Win: 3 points</li>
                <li>Draw: 1 point</li>
                <li>Loss: 0 points</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Tie-Breaker Rules</h2>
              <p className="text-foreground/80">In case of teams having equal points in the league table, the following criteria will be used to rank them (in order of priority):</p>
              <ol className="list-decimal list-inside space-y-1 text-foreground/80 mt-1">
                <li>Goal Difference (GD)</li>
                <li>Goals For (GF)</li>
                <li>Head-to-head results</li>
                <li>If still tied, a play-off match may be organized.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <p className="text-foreground/80">
                For any inquiries, please contact the league administrators via the official league communication channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
