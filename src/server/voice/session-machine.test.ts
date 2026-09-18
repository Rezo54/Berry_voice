import {describe,expect,it} from "vitest";
import {reduceVoiceState} from "./session-machine";
const at="2026-09-18T12:00:00.000Z";
describe("voice session state",()=>{
 it("starts listening",()=>expect(reduceVoiceState("IDLE",{type:"SESSION_STARTED",callId:"c1",at})).toBe("LISTENING"));
 it("marks Berry response",()=>expect(reduceVoiceState("LISTENING",{type:"BERRY_RESPONSE_STARTED",callId:"c1",at})).toBe("RESPONDING"));
 it("supports caller barge-in",()=>expect(reduceVoiceState("RESPONDING",{type:"CALLER_SPEECH_STARTED",callId:"c1",at})).toBe("LISTENING"));
 it("ends terminally",()=>expect(reduceVoiceState("RESPONDING",{type:"SESSION_ENDED",callId:"c1",at,reason:"hangup"})).toBe("ENDED"));
});
