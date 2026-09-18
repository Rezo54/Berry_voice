import type {BusinessConstraint,ConstraintAction} from "@/domain/constraint";
function matches(value:number,rule:BusinessConstraint){switch(rule.operator){case "GT":return value>rule.threshold;case "GTE":return value>=rule.threshold;case "LT":return value<rule.threshold;case "LTE":return value<=rule.threshold;case "EQ":return value===rule.threshold;}}
const rank:Record<ConstraintAction,number>={ALLOW:0,WARN_CONFIRM:1,ESCALATE:2,BLOCK:3};
export function evaluateNumericConstraints(metric:string,value:number,rules:BusinessConstraint[]):{action:ConstraintAction;matched:string[]}{
 const matched=rules.filter(r=>r.enabled&&r.metric===metric&&matches(value,r));
 let action:ConstraintAction="ALLOW";
 for(const rule of matched)if(rank[rule.action]>rank[action])action=rule.action;
 return {action,matched:matched.map(r=>r.constraintCode)};
}
