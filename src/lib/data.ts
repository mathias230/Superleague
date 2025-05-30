
import type { Team, Match, StandingEntry, RelampagoEdition } from './types';

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
  { id: 'm1', homeTeamId: '5', awayTeamId: '7', homeScore: null, awayScore: null, date: '2025-05-24T23:00:00Z', status: 'upcoming', round: 1 },
  { id: 'm2', homeTeamId: '8', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-24T23:00:00Z', status: 'upcoming', round: 1 },
  { id: 'm3', homeTeamId: '4', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-24T23:00:00Z', status: 'upcoming', round: 1 },
  { id: 'm4', homeTeamId: '6', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-05-24T23:00:00Z', status: 'upcoming', round: 1 },
  { id: 'm5', homeTeamId: '8', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 2 },
  { id: 'm6', homeTeamId: '7', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 2 },
  { id: 'm7', homeTeamId: '1', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 2 },
  { id: 'm8', homeTeamId: '2', awayTeamId: '5', homeScore: null, awayScore: null, date: '2025-05-24T23:20:00Z', status: 'upcoming', round: 2 },
  { id: 'm9', homeTeamId: '7', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm10', homeTeamId: '5', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm11', homeTeamId: '3', awayTeamId: '8', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm12', homeTeamId: '6', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-24T23:40:00Z', status: 'upcoming', round: 3 },
  { id: 'm13', homeTeamId: '3', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-24T20:00:00Z', status: 'upcoming', round: 4 },
  { id: 'm14', homeTeamId: '3', awayTeamId: '7', homeScore: null, awayScore: null, date: '2025-05-24T20:00:00Z', status: 'upcoming', round: 4 },
  { id: 'm15', homeTeamId: '8', awayTeamId: '7', homeScore: null, awayScore: null, date: '2025-05-24T20:20:00Z', status: 'upcoming', round: 4 },
  { id: 'm16', homeTeamId: '8', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-24T20:20:00Z', status: 'upcoming', round: 4 },
  { id: 'm17', homeTeamId: '5', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-24T20:40:00Z', status: 'upcoming', round: 5 },
  { id: 'm18', homeTeamId: '5', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-24T20:40:00Z', status: 'upcoming', round: 5 },
  { id: 'm19', homeTeamId: '1', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-24T21:00:00Z', status: 'upcoming', round: 5 },
];

export function getTeamById(teamId: string, sourceTeams: Team[] = teams): Team | undefined {
  return sourceTeams.find(team => team.id === teamId);
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

// --- Relámpago SAP Data ---

export const relampagoEditions: RelampagoEdition[] = [
  {
    id: "edition-1",
    slug: "edicion-1",
    name: "Edición 1",
    teams: [
      { id: 'r1', name: 'ALEVATOPOCA OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
      { id: 'r2', name: 'Barrio alajuela', logoUrl: 'https://placehold.co/48x48.png?text=BA' },
      { id: 'r3', name: 'CF Lyons 1844', logoUrl: 'https://placehold.co/48x48.png?text=CFL' },
      { id: 'r4', name: 'Barrio King Fc', logoUrl: 'https://placehold.co/48x48.png?text=BKFC' },
      { id: 'r5', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CLIFE' },
      { id: 'r6', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
    ],
    matches: [
      // Example matches for Relámpago SAP Edición 1 - replace with actual data
      // { id: 'rm1', homeTeamId: 'r1', awayTeamId: 'r2', homeScore: null, awayScore: null, date: '2025-06-01T18:00:00Z', status: 'upcoming', round: 1 },
      // { id: 'rm2', homeTeamId: 'r3', awayTeamId: 'r4', homeScore: null, awayScore: null, date: '2025-06-01T18:00:00Z', status: 'upcoming', round: 1 },
    ],
    playoffMatches: [],
  },
  // {
  //   id: "edition-2",
  //   slug: "edicion-2",
  //   name: "Edición 2",
  //   teams: [ /* Teams for edition 2 */ ],
  //   matches: [ /* Matches for edition 2 */ ],
  //   playoffMatches: [],
  // }
];

export function getRelampagoEditionBySlug(slug: string): RelampagoEdition | undefined {
  return relampagoEditions.find(edition => edition.slug === slug);
}

// The existing getRelampagoTeamById and calculateRelampagoStandings are now superseded by
// using getTeamById(teamId, edition.teams) and calculateStandings(edition.teams, edition.matches)
// No need for calculateRelampagoStandings anymore as calculateStandings is generic.
// No need for getRelampagoTeamById anymore as getTeamById can take a specific team array.

// Note: If you need to get a team from *any* relampago edition without specifying the edition first,
// you might need a more complex global lookup, or iterate through editions.
// For the [editionId] page, we'll always have the edition context.
    

    
