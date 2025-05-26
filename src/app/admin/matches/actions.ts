
"use server";

import type { Match } from "@/lib/types";
import { z } from "zod";
// import { matches } from "@/lib/data"; // Don't import directly to modify for now
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// Define the schema for form validation
const UpdateMatchSchema = z.object({
  matchId: z.string().min(1, "ID del partido es requerido."),
  homeScore: z.preprocess(
    (val) => (val === "" ? null : Number(val)), // Convert empty string to null, then to number
    z.number().min(0, "Marcador debe ser 0 o más.").nullable()
  ),
  awayScore: z.preprocess(
    (val) => (val === "" ? null : Number(val)), // Convert empty string to null, then to number
    z.number().min(0, "Marcador debe ser 0 o más.").nullable()
  ),
  status: z.enum(["upcoming", "played", "pending"], {
    errorMap: () => ({ message: "Estado inválido." }),
  }),
}).refine(data => {
    // If status is 'played', scores must be provided.
    // If status is 'upcoming' or 'pending', scores should ideally be null (or will be set to null).
    if (data.status === 'played') {
      return data.homeScore !== null && data.awayScore !== null;
    }
    return true;
  }, {
    message: "Si el estado es 'Jugado', ambos marcadores son requeridos.",
    path: ["scores"], // This error will be associated with a general 'scores' path or the first field.
  })
  .refine(data => {
      if (data.status !== 'played' && (data.homeScore !== null || data.awayScore !== null)) {
          // This case is handled by logic below, not a validation error for the user directly,
          // but ensures data consistency.
      }
      return true;
  });


type FormState = {
  message: string;
  success: boolean;
  errors?: {
    matchId?: string;
    homeScore?: string;
    awayScore?: string;
    status?: string;
    scores?: string; // For the refine validation
  } | null;
};

export async function updateMatchAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = UpdateMatchSchema.safeParse({
    matchId: formData.get("matchId"),
    homeScore: formData.get("homeScore"),
    awayScore: formData.get("awayScore"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    const fieldErrors: FormState["errors"] = {};
    validatedFields.error.issues.forEach(issue => {
      const path = issue.path[0] as keyof FormState["errors"];
      if (path) {
        fieldErrors[path] = issue.message;
      }
    });
    return {
      message: "Error de validación. Por favor corrige los campos.",
      success: false,
      errors: fieldErrors,
    };
  }

  const { matchId, status } = validatedFields.data;
  let { homeScore, awayScore } = validatedFields.data;


  // If status is not 'played', scores should be null
  if (status !== 'played') {
    homeScore = null;
    awayScore = null;
  }

  // ** --- SIMULATION / AI INSTRUCTION POINT --- **
  // In a real application, you would now:
  // 1. Find the match in your database using matchId.
  // 2. Update its homeScore, awayScore, and status.
  // 3. Save the changes to the database.

  console.log("Acción del servidor 'updateMatchAction' ejecutada:");
  console.log("Match ID:", matchId);
  console.log("Home Score:", homeScore);
  console.log("Away Score:", awayScore);
  console.log("Status:", status);
  console.log("----");
  console.log("IMPORTANTE: Para que estos cambios se reflejen en src/lib/data.ts,");
  console.log("el Asistente AI debe aplicar estos valores al archivo.");

  // For now, we just return a success message.
  // The AI will be responsible for actually modifying src/lib/data.ts
  // based on this successful action.
  
  // revalidatePath("/admin/matches");
  // revalidatePath("/");
  // revalidatePath(`/admin/matches/${matchId}/edit`);
  // redirect("/admin/matches"); // Redirecting from client is often better with useFormState

  return {
    message: `Partido ${matchId} procesado para actualización: Marcador ${homeScore}-${awayScore}, Estado: ${status}. Pídele al AI que aplique estos cambios a data.ts.`,
    success: true,
    errors: null,
  };
}
