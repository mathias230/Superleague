
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ListChecks } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Administración" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 space-y-6">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Panel de Administración</CardTitle>
            <CardDescription className="text-card-foreground">
              Gestiona los datos de la liga desde aquí.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-card-foreground">
              Selecciona una opción para comenzar:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/admin/matches" passHref>
                <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                  <ListChecks className="mr-2 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Gestionar Partidos</p>
                    <p className="text-xs text-muted-foreground">Actualizar resultados, fechas, etc.</p>
                  </div>
                </Button>
              </Link>
              {/* Add more admin sections here in the future */}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
