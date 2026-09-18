import {z} from "zod";

export const roleSchema=z.enum(["TES_SUPER_ADMIN","TES_SUPPORT","TENANT_ADMIN","OPERATIONS_MANAGER","SUPERVISOR","AGENT","VIEWER","AUDITOR","SERVICE_ACCOUNT"]);
export type Role=z.infer<typeof roleSchema>;

export const permissionSchema=z.enum([
"calls.read","calls.initiate","calls.transfer",
"campaigns.read","campaigns.create","campaigns.start","campaigns.pause",
"customers.read","orders.read","orders.create","orders.amend",
"transcripts.read","recordings.read","users.read","users.manage",
"analytics.read","analytics.export","integrations.read","integrations.manage",
"tenant.settings.read","tenant.settings.manage","audit.read"
]);
export type Permission=z.infer<typeof permissionSchema>;

export const principalSchema=z.object({
 principalId:z.string().min(1),
 tenantId:z.string().min(1).optional(),
 role:roleSchema,
 permissions:z.array(permissionSchema),
 scopes:z.array(z.string()).default([])
});
export type Principal=z.infer<typeof principalSchema>;
