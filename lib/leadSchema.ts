import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Telefone muito curto").optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Mensagem muito curta"),
  source: z.string().optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof LeadSchema>;
