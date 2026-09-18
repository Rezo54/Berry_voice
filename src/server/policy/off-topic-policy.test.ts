import {describe,expect,it} from "vitest";
import {offTopicAction} from "./off-topic-policy";
describe("repeated off-topic policy",()=>{
 it("redirects first occurrence",()=>expect(offTopicAction(1)).toBe("REDIRECT"));
 it("becomes firm on second",()=>expect(offTopicAction(2)).toBe("FIRM_REDIRECT"));
 it("warns before termination",()=>expect(offTopicAction(3)).toBe("FINAL_WARNING"));
 it("terminates at bounded threshold",()=>expect(offTopicAction(4)).toBe("TERMINATE"));
});
