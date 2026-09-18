import {berryConversationPrinciples} from "@/server/voice/berry-profile";

export type RealtimeSessionConfig={model:string;voice:string;instructions:string;};

export function buildBerryRealtimeSession():RealtimeSessionConfig{
 return {
  model:process.env.OPENAI_REALTIME_MODEL ?? "gpt-realtime-2.1",
  voice:process.env.OPENAI_REALTIME_VOICE ?? "marin",
  instructions:[
   "You are Berry, a TES customer-operations voice agent.",
   ...berryConversationPrinciples,
   "This development session is conversational only. Do not claim to create or change a real order unless an authorised business tool confirms it."
  ].join("\n")
 };
}

export async function createRealtimeClientSecret(){
 const apiKey=process.env.OPENAI_API_KEY;
 if(!apiKey) throw new Error("OPENAI_API_KEY is not configured");
 const config=buildBerryRealtimeSession();
 const response=await fetch("https://api.openai.com/v1/realtime/client_secrets",{
  method:"POST",
  headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},
  body:JSON.stringify({session:{
   type:"realtime",
   model:config.model,
   instructions:config.instructions,
   audio:{
    input:{
     turn_detection:{
      type:"server_vad",
      threshold:0.5,
      prefix_padding_ms:300,
      silence_duration_ms:650,
      create_response:true,
      interrupt_response:true
     }
    },
    output:{voice:config.voice}
   }
  }})
 });
 if(!response.ok){
  const detail=await response.text();
  console.error("Realtime client secret request failed",response.status,detail.slice(0,500));
  throw new Error(`Realtime client secret request failed: ${response.status}`);
 }
 return response.json();
}
