import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamDisplay } from "@/components/team-display";
import { getTeamById } from "@/lib/data";
import type { Match } from "@/lib/types";
import { CalendarIcon, ClockIcon, VersusIcon } from "lucide-react"; // Assuming VersusIcon exists or using alternative. Let's use a simple text "vs" if not.

const VersusPlaceholder = () => <span className="mx-2 font-semibold text-muted-foreground">vs</span>;


export function MatchCard({ match }: { match: Match }) {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);

  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = matchDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      {match.round && (
         <CardHeader className="pb-2 pt-4">
           <CardTitle className="text-sm font-medium text-muted-foreground text-center">Round {match.round}</CardTitle>
         </CardHeader>
      )}
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full gap-2 text-center">
            <div className="flex justify-center">
              <TeamDisplay team={homeTeam} showLogo={true} imageSize={32} />
            </div>
            {match.status === 'played' ? (
              <span className="text-2xl font-bold text-primary tabular-nums">
                {match.homeScore} - {match.awayScore}
              </span>
            ) : (
              <VersusPlaceholder />
            )}
            <div className="flex justify-center">
               <TeamDisplay team={awayTeam} showLogo={true} imageSize={32} />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{formattedDate}</span>
            {match.status === 'upcoming' && (
              <>
                <span className="mx-1">|</span>
                <ClockIcon className="h-4 w-4" />
                <span>{formattedTime}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
