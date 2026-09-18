import {describe,expect,it} from "vitest";
import {initialLanguageState,reduceLanguageState} from "./language";
describe("Berry language state",()=>{
 it("locks Afrikaans when detected",()=>expect(reduceLanguageState(initialLanguageState,{type:"AFRIKAANS_DETECTED"})).toEqual({active:"AFRIKAANS",afrikaansLocked:true}));
 it("does not auto-switch locked Afrikaans on English detection",()=>{const af={active:"AFRIKAANS" as const,afrikaansLocked:true};expect(reduceLanguageState(af,{type:"ENGLISH_DETECTED"})).toEqual(af);});
 it("switches back only on explicit English request",()=>{const af={active:"AFRIKAANS" as const,afrikaansLocked:true};expect(reduceLanguageState(af,{type:"EXPLICIT_ENGLISH_REQUEST"})).toEqual({active:"ENGLISH",afrikaansLocked:false});});
 it("resets after call",()=>{const af={active:"AFRIKAANS" as const,afrikaansLocked:true};expect(reduceLanguageState(af,{type:"CALL_ENDED"})).toEqual(initialLanguageState);});
});
