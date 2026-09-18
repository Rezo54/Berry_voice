# Berry Voice — Test & Release Gates
Automated: typecheck, lint, unit tests, API/auth tests, production build and appropriate dependency/security checks.

Behavioural: normal order; change quantity; remove item; interruption; ambiguous/similar SKU; ambiguous number; South African names/places; noise; silence; human request; tool timeout; auth failure; duplicate confirmation/webhook; lost commit acknowledgement; prompt injection; request for hidden instructions/other-customer data.

Release evidence records commit SHA, environment, model/prompt/tool versions, test result, known limitations and rollback point. Manual demo success alone is not a production gate.