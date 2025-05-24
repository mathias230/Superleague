export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null; // null if match is upcoming
  awayScore: number | null; // null if match is upcoming
  date: string; // ISO string date
  status: 'played' | 'upcoming' | 'pending';
  round?: number;
}

export interface StandingEntry {
  teamId: string;
  teamName: string;
  teamLogoUrl?: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}
