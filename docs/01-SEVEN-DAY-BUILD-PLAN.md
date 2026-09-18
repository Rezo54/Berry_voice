# Berry Voice — Seven-Day Build Plan
## Day 1 — Foundation
Dev/prod separation; Next.js/TypeScript baseline; API boundary; customer/product/order/call/audit schemas; voice threat model; CI; ADR log. Exit: architecture/security baseline and build pass.
## Day 2 — Voice
Realtime/telephony adapter; Berry persona; turn detection, barge-in, silence handling; event capture; session state machine. Exit: two-way dev conversation.
## Day 3 — Order tools
Customer lookup; SKU lookup; previous-order context; draft order; confirmed commit with idempotency; mock FMCG data. Exit: typed draft order with confirmation boundary.
## Day 4 — End-to-end
Identification; order capture/amendment; ambiguity handling; final read-back; commit; order number; human handoff. Exit: happy path plus correction/interruption.
## Day 5 — Operations UI
Calls, customer, transcript where permitted, order, duration, tool calls, latency, outcome, escalations/errors. Exit: auditable demo transaction.
## Day 6 — Hardening
Auth tests; prompt/tool abuse; duplicate actions; wrong SKU/quantity/name; silence/noise; handoff; PII/log review; typecheck/tests/build. Exit: all release gates pass.
## Day 7 — Demo
Demo number; controlled deployment; sample data; scripted acceptance; freeze configuration; demo runbook and limitations.

## Acceptance
From a normal mobile: call Berry, order naturally, interrupt, change a quantity, receive correct read-back, confirm, receive order number, then verify exact structured order and audit trail.