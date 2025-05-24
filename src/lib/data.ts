
import type { Team, Match, StandingEntry } from './types';

export const teams: Team[] = [
  { id: '1', name: 'Los Naranjas', logoUrl: 'https://placehold.co/40x40.png?text=LN' },
  { id: '2', name: 'CriminalLife', logoUrl: 'https://placehold.co/40x40.png?text=CL' },
  { id: '3', name: 'Barrio Alajuela', logoUrl: 'https://placehold.co/40x40.png?text=BA' },
  { id: '4', name: 'Wonkru CF', logoUrl: 'https://placehold.co/40x40.png?text=WCF' },
  { id: '5', name: 'Alevatopoca OFC', logoUrl: 'https://placehold.co/40x40.png?text=AOFC' },
  { id: '6', name: 'V07A18', logoUrl: 'https://placehold.co/40x40.png?text=V07' },
  { id: '7', name: 'la maquina', logoUrl: 'https://placehold.co/40x40.png?text=LM' },
  { id: '8', name: 'Locos Traidores', logoUrl: 'https://placehold.co/40x40.png?text=LT' },
];

export const matches: Match[] = [
  // Jornada 1
  { id: 'm1', homeTeamId: '5', awayTeamId: '7', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 1 }, // Alevatopoca OFC vs La máquina
  { id: 'm2', homeTeamId: '8', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 1 }, // Locos Traidores vs CriminalLife
  
  { id: 'm3', homeTeamId: '4', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-25T23:20:00Z', status: 'upcoming', round: 1 }, // Wonkru CF vs Los Naranjas
  { id: 'm4', homeTeamId: '6', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-05-25T23:20:00Z', status: 'upcoming', round: 1 }, // V07A18 vs Barrio Alajuela

  // Jornada 2
  { id: 'm5', homeTeamId: '8', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00Z', status: 'upcoming', round: 2 }, // Locos Traidores vs Wonkru CF
  { id: 'm6', homeTeamId: '7', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00Z', status: 'upcoming', round: 2 }, // La máquina vs V07A18
  
  { id: 'm7', homeTeamId: '1', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-06-01T23:20:00Z', status: 'upcoming', round: 2 }, // Los Naranjas vs Barrio Alajuela
  { id: 'm8', homeTeamId: '2', awayTeamId: '5', homeScore: null, awayScore: null, date: '2025-06-01T23:20:00Z', status: 'upcoming', round: 2 }, // CriminalLife vs Alevatopoca OFC

  // Jornada 3
  { id: 'm9', homeTeamId: '7', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-06-07T23:20:00Z', status: 'upcoming', round: 3 }, // La máquina vs CriminalLife
  { id: 'm10', homeTeamId: '5', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-06-07T23:20:00Z', status: 'upcoming', round: 3 }, // Alevatopoca OFC vs Wonkru CF
  
  { id: 'm11', homeTeamId: '3', awayTeamId: '8', homeScore: null, awayScore: null, date: '2025-06-08T23:20:00Z', status: 'upcoming', round: 3 }, // Barrio Alajuela vs Locos Traidores
  { id: 'm12', homeTeamId: '6', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-06-08T23:20:00Z', status: 'upcoming', round: 3 }, // V07A18 vs Los Naranjas
];

export function getTeamById(teamId: string): Team | undefined {
  return teams.find(team => team.id === teamId);
}

export function calculateStandings(teamsData: Team[], matchesData: Match[]): StandingEntry[] {
  const standingsMap: Map<string, StandingEntry> = new Map();

  teamsData.forEach(team => {
    standingsMap.set(team.id, {
      teamId: team.id,
      teamName: team.name,
      teamLogoUrl: team.logoUrl,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  });

  matchesData.forEach(match => {
    if (match.status === 'played' && match.homeScore !== null && match.awayScore !== null) {
      const homeTeamStanding = standingsMap.get(match.homeTeamId)!;
      const awayTeamStanding = standingsMap.get(match.awayTeamId)!;

      homeTeamStanding.played++;
      awayTeamStanding.played++;

      homeTeamStanding.goalsFor += match.homeScore;
      homeTeamStanding.goalsAgainst += match.awayScore;
      awayTeamStanding.goalsFor += match.awayScore;
      awayTeamStanding.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        homeTeamStanding.wins++;
        homeTeamStanding.points += 3;
        awayTeamStanding.losses++;
      } else if (match.homeScore < match.awayScore) {
        awayTeamStanding.wins++;
        awayTeamStanding.points += 3;
        homeTeamStanding.losses++;
      } else {
        homeTeamStanding.draws++;
        homeTeamStanding.points++;
        awayTeamStanding.draws++;
        awayTeamStanding.points++;
      }
    }
  });

  const standings: StandingEntry[] = [];
  standingsMap.forEach(standing => {
    standing.goalDifference = standing.goalsFor - standing.goalsAgainst;
    standings.push(standing);
  });

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.teamName.localeCompare(b.teamName); // Alphabetical as a last resort
  });

  return standings;
}
