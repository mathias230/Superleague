
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { relampagoEditions } from "@/lib/data";

export default function RelampagoLandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Torneos Relámpago SAP" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-primary">Ediciones del Torneo</CardTitle> {/* Responsive title */}
            <CardDescription className="text-card-foreground">
              Selecciona una edición para ver su clasificación, partidos y resultados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {relampagoEditions.length > 0 ? (
              <ul className="space-y-3">
                {relampagoEditions.map((edition) => (
                  <li key={edition.id}>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                      <Link href={`/relampago/${edition.slug}`}>
                        <List className="mr-2 h-5 w-5 text-primary" />
                        <div className="text-foreground"> {/* Added text-foreground here */}
                          <p className="font-semibold text-lg">Relámpago SAP: {edition.name}</p>
                          <p className="text-xs text-muted-foreground">Ver detalles del torneo</p>
                        </div>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">No hay ediciones del torneo relámpago disponibles.</p>
            )}
          </CardContent>
        </Card>
        
        {/* You can add a button or section here to explain how to add new editions if needed */}
        {/* For example:
        <Card>
          <CardHeader>
            <CardTitle>Administrar Ediciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Actualmente, las nuevas ediciones se añaden modificando el archivo <code>src/lib/data.ts</code>.
            </p>
          </CardContent>
        </Card>
        */}
      </div>
    </main>
  );
}
    
