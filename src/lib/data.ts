
import type { Team, Match, StandingEntry, RelampagoEdition } from './types';

export const teams: Team[] = [
  { id: '1', name: 'Los Naranjas', logoUrl: 'https://placehold.co/48x48.png?text=LN' },
  { id: '2', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CL' },
  { id: '3', name: 'Barrio Alajuela', logoUrl: 'https://placehold.co/48x48.png?text=BA' },
  { id: '4', name: 'Wonkru CF', logoUrl: 'https://placehold.co/48x48.png?text=WCF' },
  { id: '5', name: 'Alevatopoca OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
  { id: '6', name: 'V07A18', logoUrl: 'https://placehold.co/48x48.png?text=V07' },
  { id: '7', name: 'la maquina', logoUrl: 'https://placehold.co/48x48.png?text=LM' },
  { id: '8', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
];

export const matches: Match[] = [
  // Jornadas 1-5 (played)
  { id: 'mBA1', homeTeamId: '3', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-01T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mBA2', homeTeamId: '3', awayTeamId: '2', homeScore: 2, awayScore: 0, date: '2025-05-02T00:00:00-05:00', status: 'played', round: 2 },
  { id: 'mBA3', homeTeamId: '3', awayTeamId: '4', homeScore: 4, awayScore: 0, date: '2025-05-03T00:00:00-05:00', status: 'played', round: 3 },
  { id: 'mBA4', homeTeamId: '3', awayTeamId: '6', homeScore: 3, awayScore: 1, date: '2025-05-04T00:00:00-05:00', status: 'played', round: 4 },
  { id: 'mBA5', homeTeamId: '3', awayTeamId: '8', homeScore: 1, awayScore: 1, date: '2025-05-05T00:00:00-05:00', status: 'played', round: 5 },
  { id: 'mLT1', homeTeamId: '8', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-06T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mLT2', homeTeamId: '8', awayTeamId: '2', homeScore: 1, awayScore: 0, date: '2025-05-07T00:00:00-05:00', status: 'played', round: 2 },
  { id: 'mLT3', homeTeamId: '8', awayTeamId: '5', homeScore: 1, awayScore: 0, date: '2025-05-08T00:00:00-05:00', status: 'played', round: 3 },
  { id: 'mLT4', homeTeamId: '8', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-09T00:00:00-05:00', status: 'played', round: 4 },
  { id: 'mAOFC1', homeTeamId: '5', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-10T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mAOFC2', homeTeamId: '5', awayTeamId: '2', homeScore: 2, awayScore: 0, date: '2025-05-11T00:00:00-05:00', status: 'played', round: 2 },
  { id: 'mAOFC3', homeTeamId: '5', awayTeamId: '4', homeScore: 3, awayScore: 0, date: '2025-05-12T00:00:00-05:00', status: 'played', round: 3 },
  { id: 'mAOFC4', homeTeamId: '5', awayTeamId: '7', homeScore: 4, awayScore: 0, date: '2025-05-13T00:00:00-05:00', status: 'played', round: 4 },
  { id: 'mWCF1', homeTeamId: '4', awayTeamId: '1', homeScore: 5, awayScore: 0, date: '2025-05-14T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mWCF2', homeTeamId: '4', awayTeamId: '6', homeScore: 3, awayScore: 0, date: '2025-05-15T00:00:00-05:00', status: 'played', round: 2 },
  { id: 'mCL1', homeTeamId: '2', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-16T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mLM1', homeTeamId: '7', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-17T00:00:00-05:00', status: 'played', round: 1 },
  { id: 'mLM-vs-BA', homeTeamId: '3', awayTeamId: '7', homeScore: 2, awayScore: 0, date: '2025-05-18T00:00:00-05:00', status: 'played', round: 5 },
  { id: 'mLM-vs-CL', homeTeamId: '2', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-19T00:00:00-05:00', status: 'played', round: 5 },
  { id: 'mLM-vs-V07', homeTeamId: '6', awayTeamId: '7', homeScore: 2, awayScore: 0, date: '2025-05-20T00:00:00-05:00', status: 'played', round: 5 },

  // Jornadas 6, 7, 8 - upcoming
  { id: 'mJ6-1', homeTeamId: '4', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-31T23:00:00-05:00', status: 'upcoming', round: 6 },
  { id: 'mJ6-2', homeTeamId: '3', awayTeamId: '2', homeScore: null, awayScore: null, date: '2025-05-31T23:00:00-05:00', status: 'upcoming', round: 6 },
  { id: 'mJ6-3', homeTeamId: '5', awayTeamId: '8', homeScore: null, awayScore: null, date: '2025-05-31T23:00:00-05:00', status: 'upcoming', round: 6 },
  { id: 'mJ6-4', homeTeamId: '7', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-31T23:00:00-05:00', status: 'upcoming', round: 6 },
  { id: 'mJ7-1', homeTeamId: '8', awayTeamId: '7', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00-05:00', status: 'upcoming', round: 7 },
  { id: 'mJ7-2', homeTeamId: '4', awayTeamId: '3', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00-05:00', status: 'upcoming', round: 7 },
  { id: 'mJ7-3', homeTeamId: '6', awayTeamId: '5', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00-05:00', status: 'upcoming', round: 7 },
  { id: 'mJ7-4', homeTeamId: '2', awayTeamId: '1', homeScore: null, awayScore: null, date: '2025-05-31T23:20:00-05:00', status: 'upcoming', round: 7 },
  { id: 'mJ8-1', homeTeamId: '2', awayTeamId: '8', homeScore: null, awayScore: null, date: '2025-05-31T23:45:00-05:00', status: 'upcoming', round: 8 },
  { id: 'mJ8-2', homeTeamId: '3', awayTeamId: '6', homeScore: null, awayScore: null, date: '2025-05-31T23:45:00-05:00', status: 'upcoming', round: 8 },
  { id: 'mJ8-3', homeTeamId: '1', awayTeamId: '4', homeScore: null, awayScore: null, date: '2025-05-31T23:45:00-05:00', status: 'upcoming', round: 8 },
  { id: 'mJ8-4', homeTeamId: '7', awayTeamId: '5', homeScore: null, awayScore: null, date: '2025-05-31T23:45:00-05:00', status: 'upcoming', round: 8 },
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

const relampagoUserTeams: Team[] = [
  { id: 're1-tAOFC', name: 'ALEVATOPOCA OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
  { id: 're1-tBA', name: 'Barrio Alajuela FC', logoUrl: 'https://placehold.co/48x48.png?text=BAFC' },
  { id: 're1-tCFL', name: 'CF Lyons 1844', logoUrl: 'https://placehold.co/48x48.png?text=CFL' },
  { id: 're1-tBKF', name: 'Barrio King Fc', logoUrl: 'https://placehold.co/48x48.png?text=BKF' },
  { id: 're1-tCL', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CRL' },
  { id: 're1-tLT', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
  { id: 're1-tWCF', name: 'Wonkru CF', logoUrl: 'https://placehold.co/48x48.png?text=WCF' },
  { id: 're1-tSFC', name: 'Samborondon FC', logoUrl: 'https://placehold.co/48x48.png?text=SFC' },
];

const placeholderTeams: Team[] = [
  { id: 're1-placeholderSF1A', name: 'Por Definir SF1-A', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
  { id: 're1-placeholderSF1B', name: 'Por Definir SF1-B', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
  { id: 're1-placeholderSF2A', name: 'Por Definir SF2-A', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
  { id: 're1-placeholderSF2B', name: 'Por Definir SF2-B', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
  { id: 're1-placeholderFA', name: 'Por Definir F-A', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
  { id: 're1-placeholderFB', name: 'Por Definir F-B', logoUrl: 'https://placehold.co/48x48.png?text=TBD' },
];

const relampagoEdition1Teams: Team[] = [...relampagoUserTeams, ...placeholderTeams];

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledUserTeamIds = shuffleArray(relampagoUserTeams.map(team => team.id));

const playoffDate = '2025-07-15T19:00:00-05:00';
const semifinalDate = '2025-07-22T19:00:00-05:00';
const finalDate = '2025-07-29T19:00:00-05:00';

const relampagoEdition1PlayoffMatches: Match[] = [
  // Quarterfinals - Randomized
  { id: 're1-qf-1', homeTeamId: shuffledUserTeamIds[0], awayTeamId: shuffledUserTeamIds[1], homeScore: null, awayScore: null, date: playoffDate, status: 'upcoming', round: 'Cuartos de Final 1' },
  { id: 're1-qf-2', homeTeamId: shuffledUserTeamIds[2], awayTeamId: shuffledUserTeamIds[3], homeScore: null, awayScore: null, date: playoffDate, status: 'upcoming', round: 'Cuartos de Final 2' },
  { id: 're1-qf-3', homeTeamId: shuffledUserTeamIds[4], awayTeamId: shuffledUserTeamIds[5], homeScore: null, awayScore: null, date: playoffDate, status: 'upcoming', round: 'Cuartos de Final 3' },
  { id: 're1-qf-4', homeTeamId: shuffledUserTeamIds[6], awayTeamId: shuffledUserTeamIds[7], homeScore: null, awayScore: null, date: playoffDate, status: 'upcoming', round: 'Cuartos de Final 4' },
  
  // Semifinals - Placeholders
  { id: 're1-sf-1', homeTeamId: 're1-placeholderSF1A', awayTeamId: 're1-placeholderSF1B', homeScore: null, awayScore: null, date: semifinalDate, status: 'upcoming', round: 'Semifinal 1' },
  { id: 're1-sf-2', homeTeamId: 're1-placeholderSF2A', awayTeamId: 're1-placeholderSF2B', homeScore: null, awayScore: null, date: semifinalDate, status: 'upcoming', round: 'Semifinal 2' },

  // Final - Placeholder
  { id: 're1-f-1', homeTeamId: 're1-placeholderFA', awayTeamId: 're1-placeholderFB', homeScore: null, awayScore: null, date: finalDate, status: 'upcoming', round: 'Final' },
];


export const relampagoEditions: RelampagoEdition[] = [
  {
    id: "edition-1",
    slug: "edicion-1",
    name: "Edición 1",
    teams: relampagoEdition1Teams,
    matches: [], 
    playoffMatches: relampagoEdition1PlayoffMatches,
  },
];

export function getRelampagoEditionBySlug(slug: string): RelampagoEdition | undefined {
  return relampagoEditions.find(edition => edition.slug === slug);
}

    