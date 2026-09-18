# Berry Voice — Security, Privacy & Threat Model
## Threats
Impersonation; spoken prompt injection; cross-tenant exposure; hallucinated customer/SKU data; tool manipulation; duplicate writes; webhook spoof/replay; recording leakage; secret exposure; behavioural drift.

## Controls
Server-side auth on every tool; tenant scope on every data access; narrow schemas; state-based tool allow-lists; validated provider webhooks where supported; idempotency and reconciliation; secret isolation; redaction/minimum retention; audit trail with versions; rate/abuse controls; explicit state machine; human escalation.

Caller ID alone is not sufficient authentication for sensitive changes.

## Release security gates
Unauthorised and cross-tenant calls rejected; schema violations rejected; duplicate commit creates one order; prompt injection cannot unlock tools; uncertain commit reconciles before success is claimed; secrets absent from browser/logs.