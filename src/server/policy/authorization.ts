import type {Permission,Principal} from "@/domain/auth";

export type AuthorizationRequest={
 tenantId:string;
 permission:Permission;
 scope?:string;
};

export function authorize(principal:Principal,request:AuthorizationRequest):boolean{
 if(!principal.permissions.includes(request.permission)) return false;
 if(principal.role==="TES_SUPER_ADMIN") return true;
 if(!principal.tenantId || principal.tenantId!==request.tenantId) return false;
 if(request.scope && principal.scopes.length>0 && !principal.scopes.includes(request.scope)) return false;
 return true;
}
