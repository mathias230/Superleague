
"use client";

import type { Match, Team } from "@/lib/types";
import { getTeamById } from "@/lib/data";

interface PlayoffBracketProps {
  matches: Match[];
  teams: Team[];
}

interface MatchDisplayData extends Match {
  homeTeam?: Team;
  awayTeam?: Team;
}

const MatchBox = ({ matchData }: { matchData?: MatchDisplayData }) => {
  const teamBoxClass = "px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm text-white text-center truncate flex-grow";
  const scoreBoxClass = "w-7 sm:w-8 px-1 py-1 sm:p-1.5 text-xs sm:text-sm text-center text-black font-semibold flex-shrink-0";

  if (!matchData) {
    // Render an empty placeholder box if no match data
    return (
      <div className="match-box bg-gray-700 rounded shadow-md w-full max-w-[160px] sm:max-w-[200px] my-1 opacity-50">
        <div className="flex items-center justify-between">
          <div className={`${teamBoxClass} bg-gray-500 rounded-l`}>-</div>
          <div className={`${scoreBoxClass} bg-gray-400`}>-</div>
        </div>
        <div className="flex items-center justify-between mt-px">
          <div className={`${teamBoxClass} bg-gray-600 rounded-l`}>-</div>
          <div className={`${scoreBoxClass} bg-gray-400`}>-</div>
        </div>
      </div>
    );
  }
  
  const { homeTeam, awayTeam, status, homeScore, awayScore } = matchData;

  return (
    <div className="match-box bg-slate-700 rounded shadow-md w-full max-w-[160px] sm:max-w-[200px] my-1">
      <div className="flex items-center justify-between">
        <div className={`${teamBoxClass} bg-orange-600 rounded-l`}>{homeTeam?.name || "Por Definir"}</div>
        {status === 'played' && homeScore !== null ? (
          <div className={`${scoreBoxClass} bg-yellow-400`}>{homeScore}</div>
        ) : (
          <div className={`${scoreBoxClass} bg-orange-400`}>-</div>
        )}
      </div>
      <div className="flex items-center justify-between mt-px">
        <div className={`${teamBoxClass} bg-red-600 rounded-l`}>{awayTeam?.name || "Por Definir"}</div>
        {status === 'played' && awayScore !== null ? (
          <div className={`${scoreBoxClass} bg-yellow-400`}>{awayScore}</div>
        ) : (
          <div className={`${scoreBoxClass} bg-red-400`}>-</div>
        )}
      </div>
    </div>
  );
};

const ConnectorLine = ({ orientation, length, className }: { orientation: 'horizontal' | 'vertical', length: string, className?: string }) => {
  return (
    <div
      className={cn(
        "bg-gray-400",
        orientation === 'horizontal' ? `h-px ${length}` : `w-px ${length}`,
        className
      )}
    ></div>
  );
};

export function PlayoffBracket({ matches: allMatches, teams }: PlayoffBracketProps) {
  const getMatch = (roundPrefix: string, number?: number): MatchDisplayData | undefined => {
    const roundName = number ? `${roundPrefix} ${number}` : roundPrefix;
    const match = allMatches.find(m => m.round === roundName);
    if (!match) return undefined;
    return {
      ...match,
      homeTeam: getTeamById(match.homeTeamId, teams),
      awayTeam: getTeamById(match.awayTeamId, teams),
    };
  };

  const qfMatches = [getMatch("Cuartos de Final", 1), getMatch("Cuartos de Final", 2), getMatch("Cuartos de Final", 3), getMatch("Cuartos de Final", 4)];
  const sfMatches = [getMatch("Semifinal", 1), getMatch("Semifinal", 2)];
  const finalMatch = getMatch("Final");

  if (!allMatches.length || !teams.length) {
    return <p className="text-center text-muted-foreground">No hay datos de eliminatorias para mostrar.</p>;
  }
  
  // Helper to create a column for a round
  const RoundColumn = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={cn("flex flex-col items-center", className)}>
      <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );

  // Helper for vertical spacing between match groups
  const VerticalSpacer = ({ className = "h-8 sm:h-12" }: { className?: string }) => <div className={className}></div>;


  return (
    <div className="bracket-container flex flex-col md:flex-row justify-center items-stretch p-1 sm:p-2 space-y-4 md:space-y-0 md:space-x-2 sm:md:space-x-4 overflow-x-auto w-full">
      {/* Quarterfinals */}
      <RoundColumn title="Cuartos de Final" className="space-y-1">
        <MatchBox matchData={qfMatches[0]} />
        <MatchBox matchData={qfMatches[1]} />
        <VerticalSpacer />
        <MatchBox matchData={qfMatches[2]} />
        <MatchBox matchData={qfMatches[3]} />
      </RoundColumn>

      {/* Connectors QF -> SF */}
      <div className="flex-col justify-around items-center hidden md:flex min-w-[20px] sm:min-w-[30px]">
        <div className="h-full flex flex-col justify-around items-center">
            <div className="flex-grow flex items-center"> <ConnectorLine orientation="vertical" length="h-[calc(1.5rem+1px)] sm:h-[calc(2.25rem+1px)]" /></div>
            <ConnectorLine orientation="horizontal" length="w-full" />
            <div className="flex-grow flex items-center"> <ConnectorLine orientation="vertical" length="h-[calc(3rem+2px)] sm:h-[calc(4.5rem+2px)]" /></div>
            <ConnectorLine orientation="horizontal" length="w-full" />
            <div className="flex-grow flex items-center"> <ConnectorLine orientation="vertical" length="h-[calc(1.5rem+1px)] sm:h-[calc(2.25rem+1px)]" /></div>
        </div>
      </div>


      {/* Semifinals */}
      <RoundColumn title="Semifinales" className="md:pt-[calc(1.5rem+2px+theme(space.1))] md:pb-[calc(1.5rem+2px+theme(space.1))] space-y-1 justify-around">
        <MatchBox matchData={sfMatches[0]} />
        <VerticalSpacer className="h-16 sm:h-24" /> {/* More space between SF matches */}
        <MatchBox matchData={sfMatches[1]} />
      </RoundColumn>

      {/* Connectors SF -> F */}
       <div className="flex-col justify-around items-center hidden md:flex min-w-[20px] sm:min-w-[30px]">
         <div className="h-full flex flex-col justify-around items-center">
            <div className="flex-grow flex items-center"> <ConnectorLine orientation="vertical" length="h-[calc(3rem+1px)] sm:h-[calc(5rem+1px)]" /></div> {/* Adjusted length */}
            <ConnectorLine orientation="horizontal" length="w-full" />
            <div className="flex-grow flex items-center"> <ConnectorLine orientation="vertical" length="h-[calc(3rem+1px)] sm:h-[calc(5rem+1px)]" /></div> {/* Adjusted length */}
        </div>
      </div>

      {/* Final */}
      <RoundColumn title="Final" className="md:pt-[calc(6rem+6px+theme(space.1))]"> {/* Align with middle of SF */}
        <MatchBox matchData={finalMatch} />
      </RoundColumn>
    </div>
  );
}
