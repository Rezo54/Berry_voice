# Berry Voice

Berry Voice is a TES (Task Expert Systems) product for AI-powered customer operations.

## Initial product
The first implementation is **Berry Order Desk**: a South African voice agent that can answer a telephone call, identify a customer, capture and amend an order, confirm it, create the transaction through a controlled API, and record the outcome.

## Core principles
- Conversation is not authority.
- Voice never talks directly to the database.
- All consequential actions are confirmed before commit.
- Business actions use structured schemas, not transcript parsing.
- Every mutation is authorised server-side and designed to be idempotent.
- Human handoff is always available.
- The smallest, simplest change that satisfies the requirement is preferred.
- Development and production environments remain separate.

See `docs/` for the build plan, architecture and rules of engagement.
