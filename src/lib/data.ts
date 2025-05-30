
import type { Team, Match, StandingEntry } from './types';

export const teams: Team[] = [
  { id: '1', name: 'Los Naranjas', logoUrl: 'https://placehold.co/48x48.png?text=LN' },
  { id: '2', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CL' },
  { id: '3', name: 'Barrio Alajuela', logoUrl: 'https://placehold.co/48x48.png' },
  { id: '4', name: 'Wonkru CF', logoUrl: 'https://placehold.co/48x48.png?text=WCF' },
  { id: '5', name: 'Alevatopoca OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
  { id: '6', name: 'V07A18', logoUrl: 'https://placehold.co/48x48.png?text=V07' },
  { id: '7', name: 'la maquina', logoUrl: 'https://placehold.co/48x48.png?text=LM' },
  { id: '8', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
];

export const matches: Match[] = [
  // Jornada 1
  { id: 'm1', homeTeamId: '5', awayTeamId: '7', homeScore: 2, awayScore: 1, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // Alevatopoca OFC 2-1 la maquina
  { id: 'm2', homeTeamId: '8', awayTeamId: '2', homeScore: 2, awayScore: 1, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // Locos Traidores 2-1 CriminalLife
  { id: 'm3', homeTeamId: '4', awayTeamId: '1', homeScore: 6, awayScore: 2, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // Wonkru CF 6-2 Los Naranjas
  { id: 'm4', homeTeamId: '6', awayTeamId: '3', homeScore: 2, awayScore: 5, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // V07A18 2-5 Barrio Alajuela

  // Jornada 2
  { id: 'm5', homeTeamId: '8', awayTeamId: '4', homeScore: 3, awayScore: 0, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // Locos Traidores 3-0 Wonkru CF
  { id: 'm6', homeTeamId: '7', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // la maquina 1-0 V07A18
  { id: 'm8', homeTeamId: '2', awayTeamId: '5', homeScore: 0, awayScore: 2, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // CriminalLife 0-2 Alevatopoca OFC
  { id: 'm7', homeTeamId: '1', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 2 },

  // Jornada 3
  { id: 'm12', homeTeamId: '6', awayTeamId: '1', homeScore: 0, awayScore: 1, date: '2025-05-24T23:40:00Z', status: 'played', round: 3 }, // V07A18 0-1 Los Naranjas
  { id: 'm9', homeTeamId: '7', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm10', homeTeamId: '5', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm11', homeTeamId: '3', awayTeamId: '8', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
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
      const homeTeamStanding = standingsMap.get(match.homeTeamId);
      const awayTeamStanding = standingsMap.get(match.awayTeamId);

      if (!homeTeamStanding || !awayTeamStanding) return;

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
    return a.teamName.localeCompare(b.teamName);
  });

  return standings;
}

// --- Relámpago SAP Edición 1 Data ---
export const relampagoTeams: Team[] = [
  { id: 'r1', name: 'ALEVATOPOCA OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
  { id: 'r2', name: 'Barrio alajuela', logoUrl: 'https://placehold.co/48x48.png?text=BA' },
  { id: 'r3', name: 'CF Lyons 1844', logoUrl: 'https://placehold.co/48x48.png?text=CFL' },
  { id: 'r4', name: 'Barrio King Fc', logoUrl: 'https://placehold.co/48x48.png?text=BKFC' },
  { id: 'r5', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CLIFE' },
];

export const relampagoMatches: Match[] = [
  // Matches for Relámpago SAP Edición 1 will be added here later
];

export function getRelampagoTeamById(teamId: string): Team | undefined {
  return relampagoTeams.find(team => team.id === teamId);
}

export function calculateRelampagoStandings(teamsData: Team[], matchesData: Match[]): StandingEntry[] {
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
      const homeTeamStanding = standingsMap.get(match.homeTeamId);
      const awayTeamStanding = standingsMap.get(match.awayTeamId);

      if (!homeTeamStanding || !awayTeamStanding) {
        console.warn(`Relampago: Team not found in standings map for match ${match.id}. Skipping.`);
        return;
      }

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
    return a.teamName.localeCompare(b.teamName);
  });

  return standings;
}
