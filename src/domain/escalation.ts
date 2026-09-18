import {z} from "zod";

export const escalationReasonSchema=z.enum(["REPEATED_OFF_TOPIC"]);
export const escalationReportSchema=z.object({
 reportId:z.string().min(1),callId:z.string().min(1),tenantId:z.string().min(1),
 direction:z.enum(["INBOUND","OUTBOUND"]),customerId:z.string().optional(),
 reasonCode:escalationReasonSchema,policyVersion:z.string().min(1),
 offTopicCount:z.number().int().nonnegative(),warningIssued:z.boolean(),
 terminatedByPolicy:z.boolean(),timestamp:z.string().datetime(),
 summary:z.string().min(1),eventRefs:z.array(z.string()).default([]),
 recommendedNextAction:z.string().min(1),reviewStatus:z.enum(["OPEN","REVIEWED","CLOSED"]).default("OPEN")
});
export type ConversationEscalationReport=z.infer<typeof escalationReportSchema>;
