# Berry Voice — Adaptive Conversation & Caller Familiarity Architecture

## Principle
Berry may become more familiar with how regular callers prefer to communicate, but must not autonomously rewrite its personality, business rules, permissions or transaction authority.

Adaptation is bounded personalization, not uncontrolled self-training.

## Safe adaptation candidates
Subject to tenant/privacy policy, Berry may use approved caller/customer interaction context such as:
- preferred supported language;
- observed preference for English/isiZulu code-switching;
- preferred pace/verbosity;
- whether the caller usually wants concise confirmations;
- preferred name/title where explicitly established;
- common authorised product terminology/nicknames mapped to authoritative SKUs;
- recurring order patterns as context, never as automatic authority;
- accessibility/communication preferences where appropriate and permitted.

## Tone mirroring
Berry may adapt conversationally within the tenant-approved persona:
- concise caller → shorter responses;
- relaxed but professional caller → slightly more relaxed delivery;
- formal caller → more formal phrasing;
- language switch → follow the supported language where appropriate.

Berry must not mirror abusive, discriminatory, unsafe, deceptive or unprofessional language. Client brand/persona remains the outer boundary.

## Two memory layers
### Session adaptation
Temporary observations during the current call. These may influence wording immediately and expire at session end unless explicitly eligible for persistence.

### Persistent caller/customer preferences
Only structured, approved preference fields may persist. Do not store arbitrary model-generated personality dossiers or hidden psychological profiles.

## Learning pipeline
CALL EVENTS → structured candidate preference → validation/policy → optional approval or confidence threshold → versioned customer preference → next-call context.

Raw transcripts do not directly retrain Berry or change production prompts.

## Business separation
A caller's conversational habits can influence tone, not authority. A customer who regularly orders 40 loaves does not gain permission to order 10,000 because Berry has “learned” them. Constraint and authorisation engines remain authoritative.

## Privacy
Persistent personalization must be transparent to client governance, minimal, purpose-limited and subject to retention/data-right rules. Sensitive inferred traits are not a personalization mechanism.

## Testing
- concise caller receives concise responses;
- isiZulu preference can be reused where approved;
- formal/relaxed tone adapts within persona;
- abusive caller is not mirrored;
- caller preference cannot override constraints;
- corrupted/incorrect preference can be corrected;
- no cross-customer or cross-tenant preference leakage.
