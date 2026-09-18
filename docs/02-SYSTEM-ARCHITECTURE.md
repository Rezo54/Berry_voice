# Berry Voice — System Architecture

## Non-negotiable: bidirectional telephony
**Berry is inherently bidirectional. Every supported Berry voice deployment MUST support the architecture for both `INBOUND` and `OUTBOUND` telephone sessions.**

Direction is session metadata, not a separate application or separate conversation engine.

`CallDirection = INBOUND | OUTBOUND`

Both directions converge into the same governed Berry session, policy, business-tool, transaction, security and audit architecture.

## Inbound flow
Customer → PSTN/client number → carrier/PBX/SIP route → TES Telephony Adapter → Berry Session → Realtime Voice → Conversation Orchestrator/Policy → TES API Gateway → Authorised Business Tools → Customer/Product/Order services → transaction → dashboard/confirmation.

Berry can therefore answer a call made by a customer. The client may use a TES-provisioned number, forward an existing number/extension, or route an existing PBX/SIP queue to Berry.

## Outbound flow
Approved business trigger/schedule → Outbound Call Queue → TES Telephony Adapter → carrier/PSTN → customer answers → Berry Session → Realtime Voice → Conversation Orchestrator/Policy → TES API Gateway → Authorised Business Tools → Customer/Product/Order services → transaction → dashboard/confirmation.

Berry can therefore initiate a call to a customer. For Berry Order Desk this is a primary workflow because bakeries commonly initiate order-taking calls to retailers.

## Convergence rule
Once connected, inbound and outbound sessions use the same:
- conversation engine and persona;
- state machine;
- customer/product/order tools;
- authentication/authorisation boundary;
- confirmation and idempotency rules;
- human handoff;
- audit/observability;
- transaction model.

No separate "inbound Berry" and "outbound Berry" business applications may be created unless a future ADR establishes a compelling architectural reason.

## Outbound-specific controls
Outbound adds orchestration around, not inside, the common conversation engine:
- approved call schedule/campaign;
- customer/contact eligibility;
- caller-ID/number policy;
- retry and maximum-attempt policy;
- callback scheduling;
- time-window/time-zone policy;
- answered/no-answer/busy/voicemail disposition;
- suppression/do-not-contact controls where applicable.

## Inbound-specific controls
Inbound adds:
- number/SIP route resolution to tenant;
- caller reference/caller-ID context, which is not by itself trusted authentication;
- queue/overflow/after-hours policy;
- human transfer destination.

## Tenant routing
Telephone numbers and SIP routes are tenant resources. A number resolves to a tenant/configuration; it does not define Berry's business logic. This permits South African and international numbers/providers while preserving tenant isolation.

## Trust
Caller speech, transcript, caller ID and model-generated arguments are untrusted until validated. Session state, tool schemas, API gateway, authorisation and idempotency are controlled. Customer/product/pricing/order masters are authoritative.

## Mandatory rule
The voice model never receives database credentials and never writes directly to the database.

## State
NEW → IDENTIFYING → ACTIVE → DRAFTING → AWAITING_CONFIRMATION → COMMITTING → COMPLETED. Terminal alternatives: ESCALATED, ABANDONED, FAILED, BLOCKED. Consequential transitions are enforced in code, not prompts.

## Core records
CallSession includes `direction: INBOUND | OUTBOUND`; DraftOrder; OrderLine; Commit(idempotencyKey,draftRevision,confirmationEventId); AuditEvent.

## Provider isolation
Telephony/model providers sit behind adapters. Business policy never lives only in provider webhooks. Inbound and outbound provider operations implement the same TES telephony port.

## Environments
Development and production use separate resources, credentials, databases, phone endpoints/webhooks and logs.