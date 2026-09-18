# Berry Voice — System Architecture
Caller/PSTN → Telephony/SIP Adapter → Realtime Voice → Conversation Orchestrator/Policy → TES API Gateway → Authorised Business Tools → Customer/Product/Order services → database/client integration → dashboard/confirmation.

## Trust
Caller speech, transcript and model-generated arguments are untrusted until validated. Session state, tool schemas, API gateway, authorisation and idempotency are controlled. Customer/product/pricing/order masters are authoritative.

## Mandatory rule
The voice model never receives database credentials and never writes directly to the database.

## State
NEW → IDENTIFYING → ACTIVE → DRAFTING → AWAITING_CONFIRMATION → COMMITTING → COMPLETED. Terminal alternatives: ESCALATED, ABANDONED, FAILED, BLOCKED. Consequential transitions are enforced in code, not prompts.

## Core records
CallSession; DraftOrder; OrderLine; Commit(idempotencyKey,draftRevision,confirmationEventId); AuditEvent.

## Provider isolation
Telephony/model providers sit behind adapters. Business policy never lives only in provider webhooks.

## Environments
Development and production use separate resources, credentials, databases, phone endpoints/webhooks and logs.