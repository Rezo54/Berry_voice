export type BerryLanguage="ENGLISH"|"AFRIKAANS";

export type LanguageState={
 active:BerryLanguage;
 afrikaansLocked:boolean;
};

export const initialLanguageState:LanguageState={active:"ENGLISH",afrikaansLocked:false};

export type LanguageSignal=
 | {type:"AFRIKAANS_DETECTED"}
 | {type:"ENGLISH_DETECTED"}
 | {type:"EXPLICIT_ENGLISH_REQUEST"}
 | {type:"CALL_ENDED"};

export function reduceLanguageState(state:LanguageState,signal:LanguageSignal):LanguageState{
 switch(signal.type){
  case "AFRIKAANS_DETECTED": return {active:"AFRIKAANS",afrikaansLocked:true};
  case "ENGLISH_DETECTED": return state.afrikaansLocked?state:{active:"ENGLISH",afrikaansLocked:false};
  case "EXPLICIT_ENGLISH_REQUEST": return {active:"ENGLISH",afrikaansLocked:false};
  case "CALL_ENDED": return initialLanguageState;
 }
}
