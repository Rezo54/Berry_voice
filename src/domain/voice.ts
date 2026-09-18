import {z} from "zod";

export const voiceSessionEventSchema=z.discriminatedUnion("type",[
 z.object({type:z.literal("SESSION_STARTED"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("CALLER_SPEECH_STARTED"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("CALLER_SPEECH_ENDED"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("BERRY_RESPONSE_STARTED"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("BERRY_INTERRUPTED"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("SILENCE_TIMEOUT"),callId:z.string().min(1),at:z.string().datetime()}),
 z.object({type:z.literal("SESSION_ENDED"),callId:z.string().min(1),at:z.string().datetime(),reason:z.string().min(1)})
]);
export type VoiceSessionEvent=z.infer<typeof voiceSessionEventSchema>;

export const berryVoiceProfileSchema=z.object({
 locale:z.literal("en-ZA"),
 style:z.literal("warm-professional-natural"),
 interruptionEnabled:z.literal(true),
 conciseTurns:z.literal(true)
});
export type BerryVoiceProfile=z.infer<typeof berryVoiceProfileSchema>;
