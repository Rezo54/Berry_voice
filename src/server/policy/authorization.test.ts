import {describe,expect,it} from "vitest";
import {authorize} from "./authorization";

const operator={principalId:"u1",tenantId:"premier",role:"OPERATIONS_MANAGER" as const,permissions:["calls.read","campaigns.start"] as const,scopes:["waltloo"]};

describe("authorization",()=>{
 it("allows permission in tenant and scope",()=>expect(authorize(operator as any,{tenantId:"premier",permission:"calls.read",scope:"waltloo"})).toBe(true));
 it("rejects cross-tenant access",()=>expect(authorize(operator as any,{tenantId:"other",permission:"calls.read",scope:"waltloo"})).toBe(false));
 it("rejects missing permission",()=>expect(authorize(operator as any,{tenantId:"premier",permission:"users.manage",scope:"waltloo"})).toBe(false));
 it("rejects out-of-scope access",()=>expect(authorize(operator as any,{tenantId:"premier",permission:"calls.read",scope:"other-depot"})).toBe(false));
});
