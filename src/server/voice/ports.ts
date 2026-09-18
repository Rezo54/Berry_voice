import type {CallDirection} from "@/domain/call";
import type {VoiceSessionEvent} from "@/domain/voice";

export type StartVoiceSession={
 callId:string;
 tenantId:string;
 direction:CallDirection;
};

export interface RealtimeVoicePort{
 start(input:StartVoiceSession):Promise<void>;
 interrupt(callId:string):Promise<void>;
 end(callId:string,reason:string):Promise<void>;
}

export interface TelephonyPort{
 acceptInboundCall(callId:string):Promise<void>;
 startOutboundCall(input:{callId:string;tenantId:string;destination:string}):Promise<void>;
 transferCall(callId:string,destination:string):Promise<void>;
 endCall(callId:string):Promise<void>;
}

export interface VoiceEventSink{
 append(event:VoiceSessionEvent):Promise<void>;
}
