# Day 1 Implementation Record
Branch: dev/day-1-foundation

Implemented:
- Next.js + TypeScript strict baseline.
- Zod runtime validation.
- Explicit environment configuration with safe example only.
- Development-first mock data mode.
- Health endpoint.
- Initial CallSession, DraftOrder/CommitOrder and AuditEvent domain schemas.
- Server-side order commit policy demonstrating confirmation + current revision + idempotency boundary.
- CI for typecheck, tests and production build.
- Provider-neutral baseline: no telephony/model SDK coupled into domain code.

Environment rule: development and production must use distinct credentials, data stores, phone endpoints/webhooks and logging sinks. No production credential belongs in local/dev configuration.

Day 1 does not connect OpenAI, telephony, Firebase or a production database. Those integrations must cross the controlled API/provider boundaries defined in architecture docs.
