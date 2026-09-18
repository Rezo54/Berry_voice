import {z} from "zod";
export const orderLineSchema=z.object({skuId:z.string().min(1),requestedDescription:z.string().min(1),resolvedDescription:z.string().min(1),quantity:z.number().positive(),unit:z.string().min(1)});
export const draftOrderSchema=z.object({draftId:z.string().min(1),callId:z.string().min(1),tenantId:z.string().min(1),customerId:z.string().min(1),lines:z.array(orderLineSchema),deliveryDate:z.string().optional(),notes:z.string().optional(),revision:z.number().int().nonnegative(),status:z.enum(["DRAFT","AWAITING_CONFIRMATION","COMMITTED","CANCELLED"])});
export const commitOrderSchema=z.object({draftId:z.string().min(1),draftRevision:z.number().int().nonnegative(),confirmationEventId:z.string().min(1),idempotencyKey:z.string().min(8)});
export type DraftOrder=z.infer<typeof draftOrderSchema>;
export type CommitOrder=z.infer<typeof commitOrderSchema>;
