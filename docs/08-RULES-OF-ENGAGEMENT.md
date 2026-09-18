# Berry Voice — Rules of Engagement

These are the working rules for Benedict/TES and any AI or coding agent working on Berry Voice.

## Repository and decisions
1. This repository is the source of truth. Architecture, security, standards, plans and material decisions must not live only in chat.
2. Work from agreed architecture. Reuse existing patterns before inventing new ones.
3. Material architecture changes get an ADR: context, decision, alternatives and consequences.
4. Preserve known-good checkpoints before risky changes.

## Engineering behaviour
5. Prefer the smallest safe change: the smallest, simplest change that satisfies the requirement, reuses existing architecture and passes independent behavioural and security checks.
6. Development and production remain separate. New work is tested in development before production publication.
7. Do not silently expand scope with speculative features, frameworks, abstractions or refactors.
8. Do not claim completion without evidence. State which checks actually ran and what remains unverified.
9. Never treat UI visibility, prompt wording or model behaviour as an access-control boundary.
10. Authentication/authorisation is enforced server-side/API-side by identity, tenant/workspace, permission, project/domain and data rights as applicable.
11. Do not commit secrets, tokens, private keys or production credentials. Commit safe examples only.
12. Provider-specific voice/telephony/model code stays behind adapters; business policy remains provider-neutral.

## Voice rules
13. Conversation is not authority.
14. Consequential actions use controlled APIs, explicit confirmation and idempotency.
15. Berry never guesses critical names, quantities, identifiers, SKUs, prices or transaction success.
16. Human handoff remains available.
17. Voice behavioural/security regression tests are release gates.
18. Transcript truth and transaction truth are separate and correlated by IDs.

## Chat / agent rules
19. Carry forward decisions already made; do not repeatedly ask questions answered by the repository or current conversation.
20. When a requirement is directionally clear, implement the reasonable smallest version and report assumptions.
21. Ask before an irreversible or externally consequential action when approval has not already been given.
22. Do not push/merge/publish to production when the agreed checkpoint requires Benedict's approval.
23. Never invent repository state, test results, credentials, account details or external-system state; inspect the authoritative source.
24. Keep status updates concrete: changed files, checks run, failures/blockers and next action.
25. When a discovered issue affects architecture/security, update the living docs in the same work cycle.

## Campaign rules
26. Prospect research uses publicly legitimate business information; do not guess personal email formats.
27. Compliance/consent and suppression status are checked before outreach.
28. Start outreach one prospect at a time: research → draft → human review → send → record outcome.
29. A decline or do-not-contact instruction is durable and respected.
30. Email/campaign permissions never grant access to Berry product/customer data, and vice versa.

## Definition of done
A change is done only when its code/docs are present, relevant automated and behavioural checks pass, security implications are addressed, and the change is recoverable/auditable.