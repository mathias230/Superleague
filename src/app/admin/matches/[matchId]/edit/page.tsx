
"use client";

import { useEffect, useState, useActionState, use } from "react"; // Import 'use'
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { matches as allMatches, getTeamById } from "@/lib/data";
import type { Match } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateMatchAction } from "@/app/admin/matches/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const initialState = {
  message: "",
  success: false,
  errors: null,
};

// Adjust the params prop to be a Promise and rename for clarity.
export default function EditMatchPage({ params: paramsPromise }: { params: Promise<{ matchId: string }> }) {
  // Unwrap the params promise using React.use().
  // This will suspend rendering if the promise is not yet resolved.
  const params = use(paramsPromise);

  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(updateMatchAction, initialState);
  
  const [match, setMatch] = useState<Match | undefined>(undefined);
  const [homeScore, setHomeScore] = useState<string>("");
  const [awayScore, setAwayScore] = useState<string>("");
  const [status, setStatus] = useState<Match["status"]>("upcoming");

  useEffect(() => {
    // 'params.matchId' is now from the resolved 'params' object.
    const currentMatch = allMatches.find(m => m.id === params.matchId);
    if (currentMatch) {
      setMatch(currentMatch);
      setHomeScore(currentMatch.homeScore !== null ? String(currentMatch.homeScore) : "");
      setAwayScore(currentMatch.awayScore !== null ? String(currentMatch.awayScore) : "");
      setStatus(currentMatch.status);
    }
  }, [params.matchId]); // Dependency on resolved params.matchId

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Éxito" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        router.push("/admin/matches");
        router.refresh(); 
      }
    }
  }, [state, toast, router]);

  // Determine page title using resolved params and match state
  let pageTitle = "Editar Partido";
  if (match) {
    const homeTeamObj = getTeamById(match.homeTeamId);
    const awayTeamObj = getTeamById(match.awayTeamId);
    pageTitle = `Editar: ${homeTeamObj?.name || 'Local'} vs ${awayTeamObj?.name || 'Visitante'}`;
  } else if (params.matchId) {
    // Params are resolved, but match data might not be loaded yet or not found
    pageTitle = `Cargando partido ${params.matchId}...`;
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={pageTitle} />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6">
        {match ? (
          <Card>
            <CardHeader>
              <CardTitle>Actualizar Detalles del Partido</CardTitle>
              <CardDescription>
                Modifica el marcador y el estado del partido. Recuerda que para aplicar los cambios
                permanentemente en `data.ts`, debes indicármelo después de enviar el formulario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                {/* Use resolved params.matchId for the hidden input */}
                <input type="hidden" name="matchId" value={params.matchId} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="text-center md:text-right">
                    <p className="font-semibold text-lg">{getTeamById(match.homeTeamId)?.name || 'Equipo Local'}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Input
                      id="homeScore"
                      name="homeScore"
                      type="number"
                      placeholder="Local"
                      className="text-center w-20"
                      value={homeScore}
                      onChange={(e) => setHomeScore(e.target.value)}
                      min="0"
                    />
                    <span className="text-xl font-bold">vs</span>
                    <Input
                      id="awayScore"
                      name="awayScore"
                      type="number"
                      placeholder="Visit."
                      className="text-center w-20"
                      value={awayScore}
                      onChange={(e) => setAwayScore(e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-semibold text-lg">{getTeamById(match.awayTeamId)?.name || 'Equipo Visitante'}</p>
                  </div>
                </div>

                {state.errors?.scores && <p className="text-sm text-destructive">{state.errors.scores}</p>}

                <div>
                  <Label htmlFor="status">Estado del Partido</Label>
                  <Select name="status" value={status} onValueChange={(value) => setStatus(value as Match["status"])}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Próximo</SelectItem>
                      <SelectItem value="played">Jugado</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                  {state.errors?.status && <p className="text-sm text-destructive">{state.errors.status}</p>}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" asChild>
                    <Link href="/admin/matches">
                      <ArrowLeftIcon className="h-4 w-4 mr-2"/>
                      Cancelar
                    </Link>
                  </Button>
                  <Button type="submit">Actualizar Partido</Button>
                </div>
                {state.message && !state.success && (
                  <p className="text-sm text-destructive pt-2">{state.message}</p>
                )}
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center">
            <p>
              {params.matchId ? `Partido ${params.matchId} no encontrado o cargando datos...` : "ID de partido no disponible."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
