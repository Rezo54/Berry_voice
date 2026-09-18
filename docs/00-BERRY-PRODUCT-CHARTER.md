# Berry Voice — Product Charter
Owner: TES — Task Expert Systems. Initial module: Berry Order Desk. Target: seven-day demo.

## Purpose
Berry reduces the distance between a customer conversation and a trusted business action. The primary output is a verified operational transaction, not merely speech.

## Non-negotiable product capability
Berry Voice is bidirectional: **it can take a telephone call and it can make a telephone call.** `INBOUND | OUTBOUND` are two directions of the same governed Berry session architecture, not separate products.

## Product family
Order Desk; Bookings; Service; Delivery Desk; Claims; Reception; Collections; Platform.

## Week-one demo
The demo proves both directions:
1. **INBOUND:** a customer phones Berry, places/amends an FMCG order, confirms it, and the structured transaction appears in the TES dashboard.
2. **OUTBOUND:** Berry initiates a scheduled call to a retailer, knows the intended customer/order context, captures/amends the order, receives explicit confirmation, and the same transaction model appears in the dashboard.

Both must support natural interruption/correction and the same security, confirmation, idempotency, handoff and audit rules.

## Success criteria
Real inbound and outbound telephone sessions; natural South African English; interruption/correction; controlled customer/product lookup; typed order lines; explicit confirmation before commit; idempotent writes; safe handoff; auditable events; separate dev/prod.

## Non-goals
Full ERP integration, payments/credit changes, broad multilingual support, autonomous refunds, production-scale outbound campaigns or general-purpose call-centre replacement.