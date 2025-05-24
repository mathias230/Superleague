import { Goal } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 p-4">
      <Goal className="h-8 w-8 text-primary" />
      <h1 className="text-xl font-bold text-foreground">SUPER LEAGUE</h1>
    </div>
  );
}
