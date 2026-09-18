import {z} from "zod";
export const auditEventSchema=z.object({eventId:z.string().min(1),callId:z.string().min(1),tenantId:z.string().min(1),timestamp:z.string().datetime(),actor:z.enum(["CALLER","BERRY","SYSTEM","HUMAN"]),eventType:z.string().min(1),toolName:z.string().optional(),latencyMs:z.number().nonnegative().optional(),outcome:z.string().optional()});
export type AuditEvent=z.infer<typeof auditEventSchema>;
