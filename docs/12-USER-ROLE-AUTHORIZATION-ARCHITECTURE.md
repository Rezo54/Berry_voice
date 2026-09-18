# Berry Voice — User, Role & Authorization Architecture

## Principle
Access is decided by backend/API policy, never by UI visibility or model/prompt behaviour.

Every request is evaluated against:
`identity → tenantId → permission → scope → dataRight → decision`

## Initial roles
- TES_SUPER_ADMIN — platform administration; cross-tenant data access is exceptional, reasoned, time-bounded and audited.
- TES_SUPPORT — technical diagnostics; customer content is redacted by default.
- TENANT_ADMIN — manages own tenant users, Berry configuration, approved integrations and retention settings.
- OPERATIONS_MANAGER — manages daily inbound/outbound operations and approved campaigns.
- SUPERVISOR — monitors queues, exceptions, callbacks and handoffs.
- AGENT — receives handoffs and performs authorised human customer interactions.
- VIEWER — read-only operational/analytics access.
- AUDITOR — read-only compliance/audit access without operational mutation.
- SERVICE_ACCOUNT — non-human, narrowly scoped integration identity.

## Permission catalogue — initial
calls.read; calls.initiate; calls.transfer;
campaigns.read; campaigns.create; campaigns.start; campaigns.pause;
customers.read;
orders.read; orders.create; orders.amend;
transcripts.read; recordings.read;
users.read; users.manage;
analytics.read; analytics.export;
integrations.read; integrations.manage;
tenant.settings.read; tenant.settings.manage;
audit.read.

Roles are bundles. APIs authorise permissions, not role-name strings.

## Scope
Permissions are further constrained by tenant and optional operational scope such as bakery, depot, region, campaign or assigned queue. A tenant role never implies cross-tenant access.

## Data rights
Transcript and recording access are separate permissions because they may expose more information than an order/outcome record. Support tooling must prefer redacted technical telemetry.

## Service accounts
No interactive login. Credentials/scopes are independently managed, rotated and audited. A service account receives only the APIs required for its integration.

## Human handoff
Handoff does not transfer Berry's authority to the human. The receiving agent is independently authorised. The handoff packet may include only data the receiving identity is permitted to read.

## Administration
Tenant administrators cannot grant TES/platform permissions or escape tenant scope. TES support cannot silently elevate itself into customer-content access.

## Audit
Record identity, tenant, permission, scope, resource/action, decision, reason where applicable, timestamp and correlation/call ID for consequential or sensitive access.
