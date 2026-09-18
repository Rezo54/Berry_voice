import {describe,expect,it} from "vitest";
import {qualifyInterruption} from "./interruption-policy";
describe("interruption qualification",()=>{
 it("rejects microphone spikes",()=>expect(qualifyInterruption({activityMs:80})).toBe("NOISE_OR_INAUDIBLE"));
 it("does not call sustained unknown audio meaningful speech",()=>expect(qualifyInterruption({activityMs:800})).toBe("CANDIDATE"));
 it("rejects non lexical noise",()=>expect(qualifyInterruption({activityMs:400,transcript:"..."})).toBe("NOISE_OR_INAUDIBLE"));
 it("accepts clear speech",()=>expect(qualifyInterruption({activityMs:350,transcript:"wait"})).toBe("MEANINGFUL_SPEECH"));
});
