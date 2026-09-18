import {z} from "zod";
export const constraintActionSchema=z.enum(["ALLOW","WARN_CONFIRM","ESCALATE","BLOCK"]);
export const constraintOperatorSchema=z.enum(["GT","GTE","LT","LTE","EQ"]);
export const businessConstraintSchema=z.object({
 constraintCode:z.string().min(1),tenantId:z.string().min(1),workflow:z.string().min(1),
 metric:z.string().min(1),operator:constraintOperatorSchema,threshold:z.number(),
 action:constraintActionSchema,escalationRole:z.string().optional(),enabled:z.boolean().default(true),
 version:z.string().min(1)
});
export type BusinessConstraint=z.infer<typeof businessConstraintSchema>;
export type ConstraintAction=z.infer<typeof constraintActionSchema>;
