
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
  // Partidos para generar la tabla de la imagen
  // BA: 5PJ, 4W, 1E, 0L, 13 Pts, DG+10
  { id: 'mBA1', homeTeamId: '3', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-01T00:00:00-05:00', status: 'played', round: 1 }, // BA vs LN
  { id: 'mBA2', homeTeamId: '3', awayTeamId: '2', homeScore: 2, awayScore: 0, date: '2025-05-02T00:00:00-05:00', status: 'played', round: 2 }, // BA vs CL
  { id: 'mBA3', homeTeamId: '3', awayTeamId: '4', homeScore: 4, awayScore: 0, date: '2025-05-03T00:00:00-05:00', status: 'played', round: 3 }, // BA vs WCF
  { id: 'mBA4', homeTeamId: '3', awayTeamId: '6', homeScore: 3, awayScore: 1, date: '2025-05-04T00:00:00-05:00', status: 'played', round: 4 }, // BA vs V07
  { id: 'mBA5', homeTeamId: '3', awayTeamId: '8', homeScore: 1, awayScore: 1, date: '2025-05-05T00:00:00-05:00', status: 'played', round: 5 }, // BA vs LT (Empate)

  // LT: 5PJ, 4W, 1E, 0L, 13 Pts, DG+5
  { id: 'mLT1', homeTeamId: '8', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-06T00:00:00-05:00', status: 'played', round: 1 }, // LT vs LN
  { id: 'mLT2', homeTeamId: '8', awayTeamId: '2', homeScore: 1, awayScore: 0, date: '2025-05-07T00:00:00-05:00', status: 'played', round: 2 }, // LT vs CL
  { id: 'mLT3', homeTeamId: '8', awayTeamId: '5', homeScore: 1, awayScore: 0, date: '2025-05-08T00:00:00-05:00', status: 'played', round: 3 }, // LT vs AOFC
  { id: 'mLT4', homeTeamId: '8', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-09T00:00:00-05:00', status: 'played', round: 4 }, // LT vs V07
  // Empate LT vs BA ya cubierto en mBA5

  // AOFC: 5PJ, 4W, 0D, 1L, 12 Pts, DG+10
  { id: 'mAOFC1', homeTeamId: '5', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-10T00:00:00-05:00', status: 'played', round: 1 }, // AOFC vs LN
  { id: 'mAOFC2', homeTeamId: '5', awayTeamId: '2', homeScore: 2, awayScore: 0, date: '2025-05-11T00:00:00-05:00', status: 'played', round: 2 }, // AOFC vs CL
  { id: 'mAOFC3', homeTeamId: '5', awayTeamId: '4', homeScore: 3, awayScore: 0, date: '2025-05-12T00:00:00-05:00', status: 'played', round: 3 }, // AOFC vs WCF
  { id: 'mAOFC4', homeTeamId: '5', awayTeamId: '7', homeScore: 4, awayScore: 0, date: '2025-05-13T00:00:00-05:00', status: 'played', round: 4 }, // AOFC vs LM
  // Derrota AOFC vs LT cubierta en mLT3

  // WCF: 4PJ, 2W, 0D, 2L, 6 Pts, DG+1
  { id: 'mWCF1', homeTeamId: '4', awayTeamId: '1', homeScore: 5, awayScore: 0, date: '2025-05-14T00:00:00-05:00', status: 'played', round: 1 }, // WCF vs LN
  { id: 'mWCF2', homeTeamId: '4', awayTeamId: '6', homeScore: 3, awayScore: 0, date: '2025-05-15T00:00:00-05:00', status: 'played', round: 2 }, // WCF vs V07
  // Derrotas WCF vs BA (0-4) y WCF vs AOFC (0-3) cubiertas.

  // CL: 4PJ, 1W, 0D, 3L, 3 Pts, DG-4
  { id: 'mCL1', homeTeamId: '2', awayTeamId: '6', homeScore: 1, awayScore: 0, date: '2025-05-16T00:00:00-05:00', status: 'played', round: 1 }, // CL vs V07 (Victoria CL)
  { id: 'mCL2', homeTeamId: '2', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-19T00:00:00-05:00', status: 'played', round: 5 }, // CL vs LM (Este era LM3, ahora es CL2 para su 4to PJ, Asumiendo LM pierde aqui)
  // Derrotas CL vs BA (0-2), CL vs LT (0-1), CL vs AOFC (0-2) cubiertas.
  // CL necesita 4PJ. CL vs V07(W), BA(L), LT(L), AOFC(L). mCL2 no es necesario para CL, sino para LM.

  // LM: 5PJ, 1W, 0D, 4L, 3 Pts, DG-5
  { id: 'mLM1', homeTeamId: '7', awayTeamId: '1', homeScore: 2, awayScore: 0, date: '2025-05-17T00:00:00-05:00', status: 'played', round: 1 }, // LM vs LN (Victoria LM)
  // Derrota LM vs AOFC (0-4) cubierta en mAOFC4
  // Derrotas LM adicionales:
  { id: 'mLM-vs-BA', homeTeamId: '3', awayTeamId: '7', homeScore: 2, awayScore: 0, date: '2025-05-18T00:00:00-05:00', status: 'played', round: 5 }, // BA vs LM (Derrota LM)
  { id: 'mLM-vs-CL', homeTeamId: '2', awayTeamId: '7', homeScore: 1, awayScore: 0, date: '2025-05-19T00:00:00-05:00', status: 'played', round: 5 }, // CL vs LM (Derrota LM, este es el 4to partido de CL)
  { id: 'mLM-vs-V07', homeTeamId: '6', awayTeamId: '7', homeScore: 2, awayScore: 0, date: '2025-05-20T00:00:00-05:00', status: 'played', round: 5 }, // V07 vs LM (Derrota LM)

  // V07: 5PJ, 1W, 0D, 4L, 3 Pts, DG-6
  // Victoria V07 vs LM (2-0) cubierta en mLM-vs-V07.
  // Derrotas V07 vs BA (1-3), V07 vs LT (0-1), V07 vs WCF (0-3), V07 vs CL (0-1) cubiertas.

  // LN: 5PJ, 0W, 0D, 5L, 0 Pts, DG-11
  // Derrotas LN vs BA (0-2), LN vs LT (0-2), LN vs AOFC (0-2), LN vs WCF (0-5), LN vs LM (0-2) cubiertas.

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
      // { id: 'rm1', homeTeamId: 'r1', awayTeamId: 'r2', homeScore: null, awayScore: null, date: '2025-06-01T18:00:00-05:00', status: 'upcoming', round: 1 },
      // { id: 'rm2', homeTeamId: 'r3', awayTeamId: 'r4', homeScore: null, awayScore: null, date: '2025-06-01T18:00:00-05:00', status: 'upcoming', round: 1 },
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
    

    





    