export type OffTopicAction="REDIRECT"|"FIRM_REDIRECT"|"FINAL_WARNING"|"TERMINATE";

export type OffTopicPolicy={finalWarningAt:number;terminateAt:number};
export const defaultOffTopicPolicy:OffTopicPolicy={finalWarningAt:3,terminateAt:4};

export function offTopicAction(count:number,policy=defaultOffTopicPolicy):OffTopicAction{
 if(count>=policy.terminateAt)return "TERMINATE";
 if(count>=policy.finalWarningAt)return "FINAL_WARNING";
 if(count>=2)return "FIRM_REDIRECT";
 return "REDIRECT";
}
