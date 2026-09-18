import type {CommitOrder,DraftOrder} from "@/domain/order";
export function canCommitOrder(draft:DraftOrder,command:CommitOrder){if(draft.status!=="AWAITING_CONFIRMATION")return false;if(draft.revision!==command.draftRevision)return false;if(draft.draftId!==command.draftId)return false;return command.confirmationEventId.length>0&&command.idempotencyKey.length>=8;}
