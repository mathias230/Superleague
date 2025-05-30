
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RelampagoPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Relámpago SAP Edición 1" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 space-y-6">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Relámpago SAP Edición 1</CardTitle>
            <CardDescription className="text-card-foreground">
              Información y detalles sobre el torneo relámpago.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground">
              ¡Bienvenido a la sección del torneo Relámpago SAP Edición 1! Aquí encontrarás toda la información relevante sobre este emocionante evento.
            </p>
            {/* Puedes añadir más contenido aquí, como reglas, equipos participantes, calendario específico del torneo relámpago, etc. */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
