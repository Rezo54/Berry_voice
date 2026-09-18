import {NextRequest,NextResponse} from "next/server";
import {createRealtimeClientSecret,isAuditionVoice} from "@/server/providers/openai/realtime-session";

export async function POST(request:NextRequest){
 try{
  const body=await request.json().catch(()=>({}));
  const requestedVoice=typeof body.voice==="string"&&isAuditionVoice(body.voice)?body.voice:undefined;
  const secret=await createRealtimeClientSecret(requestedVoice);
  return NextResponse.json(secret,{headers:{"Cache-Control":"no-store"}});
 }catch(error){
  console.error("realtime client secret creation failed",error instanceof Error?error.message:"unknown");
  return NextResponse.json({error:"Realtime session unavailable"},{status:503});
 }
}
