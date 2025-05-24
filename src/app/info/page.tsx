
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LeagueInfoPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Información de la Liga" />
      <div className="flex-1 animate-in fade-in duration-500 p-4 md:p-6 space-y-6">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Sobre SUPER LEAGUE</CardTitle>
            <CardDescription className="text-card-foreground">¡Bienvenido al centro oficial de nuestra Liga de Clubes Pro FC25!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground">
              Esta liga reúne a 8 equipos competitivos de Clubes Pro para luchar por la gloria. 
              Sigue a tu equipo favorito, consulta la clasificación, mira los resultados de los partidos y mantente actualizado sobre el calendario.
            </p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-card border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-left text-card-foreground">
              Reglas Generales
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0">
              <ul className="list-disc list-inside space-y-2 text-card-foreground">
                <li>Todos los partidos se juegan en EA Sports FC 25, modo Clubes Pro.</li>
                <li>Cada equipo consta de una plantilla de jugadores dedicados.</li>
                <li>Se espera juego limpio de todos los participantes. Cualquier forma de trampa o conducta antideportiva puede resultar en penalizaciones.</li>
                <li>La programación de los partidos será coordinada entre los capitanes de los equipos y los administradores de la liga.</li>
                <li>Los resultados deben informarse puntualmente después de la finalización del partido.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="bg-card border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-left text-card-foreground">
              Sistema de Puntos
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0">
              <ul className="list-disc list-inside space-y-2 text-card-foreground">
                <li>Victoria: 3 puntos</li>
                <li>Empate: 1 punto</li>
                <li>Derrota: 0 puntos</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-card border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-left text-card-foreground">
              Reglas de Desempate
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0">
              <p className="text-card-foreground mb-2">En caso de que los equipos tengan los mismos puntos en la tabla de la liga, se utilizarán los siguientes criterios para clasificarlos (en orden de prioridad):</p>
              <ol className="list-decimal list-inside space-y-1 text-card-foreground">
                <li>Diferencia de Goles (DG)</li>
                <li>Goles a Favor (GF)</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-card border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline text-left text-card-foreground">
              Contacto
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0">
              <p className="text-card-foreground">
                Para cualquier consulta, por favor contacta a los administradores de la liga a través de los canales de comunicación oficiales de la liga.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
