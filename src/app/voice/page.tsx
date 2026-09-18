"use client";
import {useRef,useState} from "react";

export default function VoicePage(){
 const pcRef=useRef<RTCPeerConnection|null>(null);
 const audioRef=useRef<HTMLAudioElement|null>(null);
 const [status,setStatus]=useState("Disconnected");

 async function connect(){
  setStatus("Connecting");
  const tokenResponse=await fetch("/api/realtime/client-secret",{method:"POST"});
  if(!tokenResponse.ok){setStatus("Server unavailable");return;}
  const token=await tokenResponse.json();
  const ephemeralKey=token.value;
  if(!ephemeralKey){setStatus("No client secret returned");return;}

  const pc=new RTCPeerConnection();
  pcRef.current=pc;
  const audio=document.createElement("audio");
  audio.autoplay=true;
  audioRef.current=audio;
  pc.ontrack=(event)=>{audio.srcObject=event.streams[0];};

  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  for(const track of stream.getTracks()) pc.addTrack(track,stream);

  const dc=pc.createDataChannel("oai-events");
  dc.onopen=()=>setStatus("Connected — speak naturally");
  dc.onclose=()=>setStatus("Disconnected");
  dc.onmessage=(event)=>{
   try{
    const message=JSON.parse(event.data);
    if(message.type==="error") setStatus("Realtime error");
   }catch{}
  };

  const offer=await pc.createOffer();
  await pc.setLocalDescription(offer);
  const model=encodeURIComponent(token.session?.model ?? "gpt-realtime-2.1");
  const sdpResponse=await fetch(`https://api.openai.com/v1/realtime/calls?model=${model}`,{
   method:"POST",
   body:offer.sdp,
   headers:{"Authorization":`Bearer ${ephemeralKey}`,"Content-Type":"application/sdp"}
  });
  if(!sdpResponse.ok){setStatus("Realtime connection failed");pc.close();return;}
  await pc.setRemoteDescription({type:"answer",sdp:await sdpResponse.text()});
 }

 function disconnect(){
  pcRef.current?.getSenders().forEach(sender=>sender.track?.stop());
  pcRef.current?.close();
  pcRef.current=null;
  setStatus("Disconnected");
 }

 return <main style={{fontFamily:"system-ui",maxWidth:760,margin:"48px auto",padding:24}}>
  <h1>Talk to Berry — Development</h1>
  <p>This browser session tests Berry's realtime voice persona only. It cannot create a real order.</p>
  <p><strong>Status:</strong> {status}</p>
  <button onClick={connect} disabled={status.startsWith("Connect")}>Connect microphone</button>{" "}
  <button onClick={disconnect}>Disconnect</button>
 </main>;
}
