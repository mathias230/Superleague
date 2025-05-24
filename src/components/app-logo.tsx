import { Futbol } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 p-4">
      <Futbol className="h-8 w-8 text-primary" />
      <h1 className="text-xl font-bold text-foreground">Pro League Hub</h1>
    </div>
  );
}
