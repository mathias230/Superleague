
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
  // Adjusted existing matches (m1-m12)
  { id: 'm1', homeTeamId: '5', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // Alev W vs LM L
  { id: 'm2', homeTeamId: '8', awayTeamId: '2', homeScore: 1, awayScore: 0, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // LT W vs Crim L
  { id: 'm3', homeTeamId: '4', awayTeamId: '1', homeScore: 1, awayScore: 0, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // Wonkru W vs LN L
  { id: 'm4', homeTeamId: '6', awayTeamId: '3', homeScore: 0, awayScore: 1, date: '2025-05-24T23:00:00Z', status: 'played', round: 1 }, // V07 L vs BA W
  { id: 'm5', homeTeamId: '8', awayTeamId: '4', homeScore: 1, awayScore: 0, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // LT W vs Wonkru L
  { id: 'm6', homeTeamId: '7', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // LM W vs V07 L
  { id: 'm7', homeTeamId: '1', awayTeamId: '3', homeScore: 0, awayScore: 1, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // LN L vs BA W
  { id: 'm8', homeTeamId: '2', awayTeamId: '5', homeScore: 0, awayScore: 1, date: '2025-05-24T23:20:00Z', status: 'played', round: 2 }, // Crim L vs Alev W
  { id: 'm9', homeTeamId: '7', awayTeamId: '2', homeScore: 0, awayScore: 1, date: '2025-05-24T23:40:00Z', status: 'played', round: 3 }, // LM L vs Crim W
  { id: 'm10', homeTeamId: '5', awayTeamId: '4', homeScore: 1, awayScore: 0, date: '2025-05-24T23:40:00Z', status: 'played', round: 3 }, // Alev W vs Wonkru L
  { id: 'm11', homeTeamId: '3', awayTeamId: '8', homeScore: 1, awayScore: 1, date: '2025-05-24T23:40:00Z', status: 'played', round: 3 }, // BA D vs LT D
  { id: 'm12', homeTeamId: '6', awayTeamId: '1', homeScore: 1, awayScore: 0, date: '2025-05-24T23:40:00Z', status: 'played', round: 3 }, // V07 W vs LN L

  // New matches (m13-m19) to complete standings
  { id: 'm13', homeTeamId: '3', awayTeamId: '2', homeScore: 1, awayScore: 0, date: '2025-05-25T20:00:00Z', status: 'played', round: 4 }, // BA W vs Crim L (BA:3W1D, Crim:1W3L - Crim Done)
  { id: 'm14', homeTeamId: '3', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-25T20:00:00Z', status: 'played', round: 4 }, // BA W vs LM L (BA:4W1D - BA Done, LM:1W3L)
  { id: 'm15', homeTeamId: '8', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-25T20:20:00Z', status: 'played', round: 4 }, // LT W vs LM L (LT:3W1D, LM:1W4L - LM Done)
  { id: 'm16', homeTeamId: '8', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-25T20:20:00Z', status: 'played', round: 4 }, // LT W vs V07 L (LT:4W1D - LT Done, V07:1W3L)
  { id: 'm17', homeTeamId: '5', awayTeamId: '1', homeScore: 1, awayScore: 0, date: '2025-05-25T20:40:00Z', status: 'played', round: 5 }, // Alev W vs LN L (Alev:4W, LN:4L)
  { id: 'm18', homeTeamId: '5', awayTeamId: '4', homeScore: 0, awayScore: 1, date: '2025-05-25T20:40:00Z', status: 'played', round: 5 }, // Alev L vs Wonkru W (Alev:4W1L - Alev Done, Wonkru:2W2L - Wonkru Done)
  { id: 'm19', homeTeamId: '1', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-25T21:00:00Z', status: 'played', round: 5 }, // LN W vs V07 L (LN:1W4L - LN Done, V07:1W4L - V07 Done)
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
  { id: 'r6', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
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

    