import {describe,expect,it} from "vitest";
import {buildBerryRealtimeSession} from "./realtime-session";
describe("Berry OpenAI realtime configuration",()=>{
 it("uses a realtime model and Berry safety instruction",()=>{
  const session=buildBerryRealtimeSession();
  expect(session.model).toContain("realtime");
  expect(session.instructions).toContain("TES customer-operations voice agent");
  expect(session.instructions).toContain("Do not claim to create or change a real order");
 });
});
