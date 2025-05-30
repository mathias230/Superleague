
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamDisplay } from "@/components/team-display";
import type { Match, Team } from "@/lib/types";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface MatchCardProps {
  match: Match;
  homeTeam?: Team;
  awayTeam?: Team;
}

export function MatchCard({ match, homeTeam, awayTeam }: MatchCardProps) {
  const matchDate = new Date(match.date);
  // Format date and time using Ecuador's timezone (America/Guayaquil) and Spanish locale
  const formattedDate = matchDate.toLocaleDateString('es-EC', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: 'America/Guayaquil' 
  });
  const formattedTime = matchDate.toLocaleTimeString('es-EC', { 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZone: 'America/Guayaquil',
    hour12: false // Use 24-hour format e.g., 23:00
  });

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
      {match.round && (
         <CardHeader className="pb-2 pt-4">
           <CardTitle className="text-sm font-medium text-muted-foreground text-center">Jornada {match.round}</CardTitle>
         </CardHeader>
      )}
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-start justify-between w-full gap-3">
            <div className="flex-1 min-w-0">
              <TeamDisplay team={homeTeam} showLogo={true} imageSize={48} />
            </div>
            
            <div className="flex-shrink-0 px-2 pt-3">
              {match.status === 'played' ? (
                <span className="text-3xl font-bold text-primary tabular-nums">
                  {match.homeScore} - {match.awayScore}
                </span>
              ) : (
                <span className="text-2xl font-semibold text-muted-foreground">VS</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <TeamDisplay team={awayTeam} showLogo={true} imageSize={48} />
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
