import {NextResponse} from "next/server";
import {createRealtimeClientSecret} from "@/server/providers/openai/realtime-session";

export async function POST(){
 try{
  const secret=await createRealtimeClientSecret();
  return NextResponse.json(secret,{headers:{"Cache-Control":"no-store"}});
 }catch(error){
  console.error("realtime client secret creation failed",error instanceof Error?error.message:"unknown");
  return NextResponse.json({error:"Realtime session unavailable"},{status:503});
 }
}
