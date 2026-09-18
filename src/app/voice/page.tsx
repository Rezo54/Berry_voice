"use client";
import {useRef,useState} from "react";

type Diagnostic={at:string;label:string;detail?:string};
const eventLabels:Record<string,string>={
 "session.created":"Session created",
 "session.updated":"Session configured",
 "input_audio_buffer.speech_started":"Speech detected",
 "input_audio_buffer.speech_stopped":"Speech ended",
 "response.created":"Berry thinking",
 "response.output_audio.delta":"Berry speaking",
 "response.audio.delta":"Berry speaking",
 "response.done":"Berry response complete",
 "input_audio_buffer.timeout_triggered":"Silence timeout",
 "error":"Realtime error"
};

export default function VoicePage(){
 const pcRef=useRef<RTCPeerConnection|null>(null);
 const [status,setStatus]=useState("Disconnected");
 const [diagnostics,setDiagnostics]=useState<Diagnostic[]>([]);
 const speakingRef=useRef(false);

 function log(label:string,detail?:string){
  setDiagnostics(current=>[...current.slice(-19),{at:new Date().toLocaleTimeString(),label,detail}]);
 }

 async function connect(){
  setDiagnostics([]);setStatus("Connecting");log("Requesting Berry session");
  try{
   const tokenResponse=await fetch("/api/realtime/client-secret",{method:"POST"});
   if(!tokenResponse.ok){setStatus("Server unavailable");log("Client secret failed",String(tokenResponse.status));return;}
   const token=await tokenResponse.json();
   const ephemeralKey=token.value;
   if(!ephemeralKey){setStatus("No client secret returned");log("No client secret");return;}

   const pc=new RTCPeerConnection();pcRef.current=pc;
   pc.onconnectionstatechange=()=>log("WebRTC",pc.connectionState);
   pc.ontrack=(event)=>{
    const audio=document.createElement("audio");audio.autoplay=true;audio.srcObject=event.streams[0];
    audio.play().catch(()=>log("Audio playback blocked","Click the page and reconnect"));
    log("Berry audio track received");
   };

   const stream=await navigator.mediaDevices.getUserMedia({audio:true});
   for(const track of stream.getTracks()) pc.addTrack(track,stream);
   log("Microphone connected");

   const dc=pc.createDataChannel("oai-events");
   dc.onopen=()=>{setStatus("Connected — speak naturally");log("Realtime data channel open");};
   dc.onclose=()=>{setStatus("Disconnected");log("Realtime data channel closed");};
   dc.onmessage=(event)=>{
    try{
     const message=JSON.parse(event.data);
     const label=eventLabels[message.type];
     if(label){
      if(label==="Berry speaking"){
       if(speakingRef.current)return;
       speakingRef.current=true;
      }else if(message.type==="response.done"){speakingRef.current=false;}
      log(label,message.type);
     }
     if(message.type==="error")setStatus("Realtime error — see diagnostics");
    }catch{log("Unreadable realtime event");}
   };

   const offer=await pc.createOffer();await pc.setLocalDescription(offer);
   const model=encodeURIComponent(token.session?.model ?? "gpt-realtime-2.1");
   const sdpResponse=await fetch(`https://api.openai.com/v1/realtime/calls?model=${model}`,{
    method:"POST",body:offer.sdp,
    headers:{"Authorization":`Bearer ${ephemeralKey}`,"Content-Type":"application/sdp"}
   });
   if(!sdpResponse.ok){setStatus("Realtime connection failed");log("SDP failed",String(sdpResponse.status));pc.close();return;}
   await pc.setRemoteDescription({type:"answer",sdp:await sdpResponse.text()});
   log("WebRTC answer accepted");
  }catch(error){setStatus("Connection error");log("Connection error",error instanceof Error?error.message:"unknown");}
 }

 function disconnect(){
  pcRef.current?.getSenders().forEach(sender=>sender.track?.stop());
  pcRef.current?.close();pcRef.current=null;setStatus("Disconnected");log("Disconnected");
 }

 return <main style={{fontFamily:"system-ui",maxWidth:760,margin:"48px auto",padding:24}}>
  <h1>Talk to Berry — Development</h1>
  <p>This browser session tests Berry's realtime voice persona only. It cannot create a real order.</p>
  <p><strong>Status:</strong> {status}</p>
  <button onClick={connect} disabled={status==="Connecting"||status.startsWith("Connected")}>Connect microphone</button>{" "}
  <button onClick={disconnect}>Disconnect</button>
  <h2>Diagnostics</h2>
  {diagnostics.length===0?<p>No events yet.</p>:<ol>{diagnostics.map((item,index)=><li key={index}><strong>{item.at}</strong> — {item.label}{item.detail?` (${item.detail})`:""}</li>)}</ol>}
 </main>;
}
