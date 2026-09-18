import type {VoiceSessionEvent} from "@/domain/voice";

export type VoiceRuntimeState="IDLE"|"LISTENING"|"RESPONDING"|"ENDED";

export function reduceVoiceState(state:VoiceRuntimeState,event:VoiceSessionEvent):VoiceRuntimeState{
 if(state==="ENDED") return "ENDED";
 switch(event.type){
  case "SESSION_STARTED": return "LISTENING";
  case "CALLER_SPEECH_STARTED": return state==="RESPONDING"?"LISTENING":state;
  case "CALLER_SPEECH_ENDED": return "LISTENING";
  case "BERRY_RESPONSE_STARTED": return "RESPONDING";
  case "BERRY_INTERRUPTED": return "LISTENING";
  case "SILENCE_TIMEOUT": return "LISTENING";
  case "SESSION_ENDED": return "ENDED";
 }
}
