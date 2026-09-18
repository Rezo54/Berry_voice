# Berry Voice — Bidirectional Telephony Architecture

## Architecture invariant
Berry MUST support both `INBOUND` and `OUTBOUND`. This is a platform invariant and a release requirement for the Berry Order Desk demo.

## Common telephony port
Provider adapters must expose capabilities equivalent to:
- acceptInboundCall
- startOutboundCall
- attachMediaSession
- transferCall
- endCall
- receiveCallEvents

Core domain/business services must not depend on provider-specific webhook payloads.

## Number ownership patterns
Supported architecture must accommodate:
1. TES-provisioned number.
2. Client-owned number forwarded to Berry.
3. Client PBX/queue routed by SIP to Berry.
4. International/local DID routed to the correct tenant.
5. Verified/authorised outbound caller identity subject to provider and jurisdiction rules.

## Inbound
An inbound route resolves `calledNumber/route → tenantId → voice configuration → permitted workflow/tools`. Caller ID can assist lookup but cannot alone authorise sensitive actions.

## Outbound
An outbound request begins with an authorised server-side call job containing at minimum tenantId, customer/contact reference, intended workflow, eligible destination, schedule/time window and correlation ID. The model cannot invent destinations or autonomously create a new outbound campaign.

## Outbound state
QUEUED → ELIGIBILITY_CHECK → DIALING → CONNECTED → BERRY_SESSION → COMPLETED.
Alternative outcomes: NO_ANSWER, BUSY, VOICEMAIL, CALLBACK, FAILED, SUPPRESSED, ESCALATED.

## Retry safety
Retries are policy-driven and bounded. Each attempt is separately audited and linked to one call job. A call retry never implies a transaction retry; order commits retain their own idempotency boundary.

## International
Country/provider-specific numbering, caller-ID, calling windows and compliance are configuration/policy layers. They do not fork the Berry application. Time-zone handling is mandatory for outbound international scheduling.

## Human handoff
Both inbound and outbound sessions can transfer/escalate to a configured human destination when supported. Handoff includes the session context packet.

## Demo release gate
Week-one demo is not complete until:
- a normal phone successfully calls Berry and completes an inbound order; AND
- Berry successfully initiates a call to a configured demo customer and completes an outbound order;
- both orders pass through the same transaction/security/audit architecture.
