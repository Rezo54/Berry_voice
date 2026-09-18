# TES Voice Agent Development Standards
Base TES principle: the preferred change is the smallest, simplest change that satisfies the requirement, reuses existing architecture and passes independent behavioural and security checks.

1. Conversation is not authority.
2. Voice/model never accesses databases directly.
3. Business actions use validated typed schemas, never transcript parsing.
4. Consequential actions require explicit confirmation policy.
5. Read authoritative context before write; never invent business facts.
6. Mutations are idempotent against retries, duplicate webhooks and repeated confirmations.
7. Human escape/handoff is always available.
8. Ambiguous names, quantities, identifiers, prices or SKUs trigger clarification, never guessing.
9. Interruption/barge-in and correction are first-class events.
10. Regression corpus includes South African names, places, numbers, varied English accents, noise and controlled code-switching.
11. Every call is observable: correlation IDs, state, tool calls, latency, disposition, errors and versions.
12. Privacy minimisation, redaction and explicit retention.
13. AI/recording/transcription disclosure is configurable and testable.
14. Prompts cannot expand tool/data authority.
15. Voice behavioural regression is a release gate.
16. Invalid schema, stale state, auth failure or uncertain commit fails closed.
17. Transcript truth and transaction truth are separate.
18. Version model, prompt, tool schema and policy per call.
19. Retries are bounded and observable.
20. Provider-specific code remains behind adapters.