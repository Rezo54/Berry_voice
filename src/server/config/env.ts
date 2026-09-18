import {z} from "zod";
const schema=z.object({APP_ENV:z.enum(["development","test","production"]).default("development"),BERRY_TENANT_ID:z.string().min(1).default("demo-tenant"),BERRY_DATA_MODE:z.enum(["mock","integration"]).default("mock")});
export const env=schema.parse({APP_ENV:process.env.APP_ENV,BERRY_TENANT_ID:process.env.BERRY_TENANT_ID,BERRY_DATA_MODE:process.env.BERRY_DATA_MODE});
