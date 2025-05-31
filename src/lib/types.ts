
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
  round?: number | string; // Can be a jornada number or a descriptive string like "Cuartos de Final"
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

export interface RelampagoEdition {
  id: string;
  slug: string;
  name: string;
  teams: Team[];
  matches: Match[]; // Group stage matches
  playoffMatches?: Match[]; // Playoff stage matches
}

    
