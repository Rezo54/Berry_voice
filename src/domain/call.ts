import {z} from "zod";
export const callStateSchema=z.enum(["NEW","IDENTIFYING","ACTIVE","DRAFTING","AWAITING_CONFIRMATION","COMMITTING","COMPLETED","ESCALATED","ABANDONED","FAILED","BLOCKED"]);
export type CallState=z.infer<typeof callStateSchema>;
export const callSessionSchema=z.object({callId:z.string().min(1),tenantId:z.string().min(1),startedAt:z.string().datetime(),endedAt:z.string().datetime().optional(),callerRef:z.string().optional(),customerId:z.string().optional(),state:callStateSchema,disposition:z.string().optional(),escalationReason:z.string().optional(),modelVersion:z.string().optional(),promptVersion:z.string().optional()});
export type CallSession=z.infer<typeof callSessionSchema>;
