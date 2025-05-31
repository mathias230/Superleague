
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
  // Partidos para generar la tabla de la imagen (Jornadas 1-5)
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

  // Partidos del Calendario (Jornadas 6, 7, 8 - upcoming)
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

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const relampagoEdition1PlayoffTeams: Team[] = [
  { id: 're1-t1', name: 'ALEVATOPOCA OFC', logoUrl: 'https://placehold.co/48x48.png?text=AOFC' },
  { id: 're1-t2', name: 'Barrio Alajuela FC', logoUrl: 'https://placehold.co/48x48.png?text=BAFC' },
  { id: 're1-t3', name: 'CF Lyons 1844', logoUrl: 'https://placehold.co/48x48.png?text=CFL' },
  { id: 're1-t4', name: 'Barrio King Fc', logoUrl: 'https://placehold.co/48x48.png?text=BKFC' },
  { id: 're1-t5', name: 'CriminalLife', logoUrl: 'https://placehold.co/48x48.png?text=CLIFE' },
  { id: 're1-t6', name: 'Locos Traidores', logoUrl: 'https://placehold.co/48x48.png?text=LT' },
  { id: 're1-t7', name: 'Wonkru CF', logoUrl: 'https://placehold.co/48x48.png?text=WCF-R' },
  { id: 're1-t8', name: 'Samborondon FC', logoUrl: 'https://placehold.co/48x48.png?text=SFC' },
];

const shuffledPlayoffTeams = shuffleArray(relampagoEdition1PlayoffTeams);
const quarterFinalMatches: Match[] = [];
const playoffDate = '2025-07-15T19:00:00-05:00'; // Example date for playoffs

for (let i = 0; i < shuffledPlayoffTeams.length; i += 2) {
  const matchNumber = i / 2 + 1;
  quarterFinalMatches.push({
    id: `re1-qf-${matchNumber}`,
    homeTeamId: shuffledPlayoffTeams[i].id,
    awayTeamId: shuffledPlayoffTeams[i+1].id,
    homeScore: null,
    awayScore: null,
    date: playoffDate, // All QF matches at the same time for this example
    status: 'upcoming',
    round: `Cuartos de Final ${matchNumber}`,
  });
}

export const relampagoEditions: RelampagoEdition[] = [
  {
    id: "edition-1",
    slug: "edicion-1",
    name: "Edición 1",
    teams: relampagoEdition1PlayoffTeams, // Use the 8 playoff teams
    matches: [], // No group stage matches for this setup as classification was removed
    playoffMatches: quarterFinalMatches,
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
    
