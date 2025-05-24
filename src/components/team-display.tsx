import Image from 'next/image';
import type { Team } from '@/lib/types';

interface TeamDisplayProps {
  team?: Team;
  showLogo?: boolean;
  imageSize?: number;
}

export function TeamDisplay({ team, showLogo = true, imageSize = 24 }: TeamDisplayProps) {
  if (!team) {
    return <span className="text-muted-foreground">Unknown Team</span>;
  }

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {showLogo && team.logoUrl && (
        <Image
          src={team.logoUrl}
          alt={`${team.name} logo`}
          width={imageSize}
          height={imageSize}
          className="rounded-full"
          data-ai-hint="soccer logo"
        />
      )}
      <span className="text-sm font-medium leading-tight">{team.name}</span>
    </div>
  );
}
