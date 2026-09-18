export type InterruptionEvidence={
 activityMs:number;
 transcript?:string;
};

export type InterruptionQualification="CANDIDATE"|"MEANINGFUL_SPEECH"|"NOISE_OR_INAUDIBLE";

const lexical=/[A-Za-z0-9]/;

export function qualifyInterruption(evidence:InterruptionEvidence):InterruptionQualification{
 const text=(evidence.transcript??"").trim();
 if(evidence.activityMs<180)return "NOISE_OR_INAUDIBLE";
 if(text.length===0)return evidence.activityMs>=650?"CANDIDATE":"NOISE_OR_INAUDIBLE";
 if(!lexical.test(text))return "NOISE_OR_INAUDIBLE";
 return "MEANINGFUL_SPEECH";
}
