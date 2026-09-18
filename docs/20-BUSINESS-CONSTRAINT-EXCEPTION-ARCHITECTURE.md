# Berry Voice — Business Constraint & Exception Architecture

## Principle
Berry must never rely on the language model alone to decide whether a business transaction is reasonable. Each agent/workflow has deterministic, tenant-approved constraints evaluated by server policy before consequential actions.

## Example
A bakery customer normally orders tens of loaves and suddenly requests 10,000. Berry may understand the request perfectly, but the transaction policy flags it before commit.

Berry response should be concise and operational, e.g.:
“That's outside the order limit I'm authorised to process. I'll need to refer this to the sales manager.”

Berry must not negotiate around or override the constraint.

## Constraint sources
Constraints are tenant/workflow configuration. Initial administration may support controlled Excel import, but Excel is an input format, not the runtime source of truth. Imports are validated, versioned and converted into structured constraint records before activation.

## Agent/workflow examples
ORDER_DESK: maximum line quantity, maximum total units, maximum order value, permitted SKUs/categories, percentage/absolute variance from customer history, delivery-day restrictions, cut-off time, credit/status restrictions.
BOOKINGS: maximum advance period, service duration, branch/service eligibility.
CLAIMS: amount/type thresholds requiring human handling.
COLLECTIONS: contact/time/frequency and permitted-action limits.

## Constraint evaluation
Authoritative flow:
draft action → schema validation → customer/context lookup → constraint evaluation → ALLOW | WARN_CONFIRM | ESCALATE | BLOCK → authorised business action.

A constraint can never grant authority; it can only further restrict an otherwise authorised action.

## Actions
- ALLOW — continue normal workflow.
- WARN_CONFIRM — unusual but permitted; explicitly highlight and reconfirm.
- ESCALATE — Berry cannot complete; create exception and route to configured role/team.
- BLOCK — prohibited action; do not commit.

## Example quantity rules
A tenant may define:
- lineQtyMaxAbsolute = 500;
- orderUnitsMaxAbsolute = 2000;
- historyVarianceWarnPercent = 100;
- historyVarianceEscalatePercent = 300.

Absolute limits protect even where historical data is absent. Historical rules detect unusual behaviour below the absolute maximum.

## Excel import
Initial workbook schema should include:
tenant/workflow, constraintCode, description, scopeType, scopeValue, metric, operator, threshold, action, escalationRole, effectiveFrom, effectiveTo, enabled.

Import process:
UPLOAD → PARSE → VALIDATE → PREVIEW ERRORS/CHANGES → APPROVE → VERSION → ACTIVATE.

Never apply a spreadsheet directly to production without validation and approval.

## Versioning and audit
Each evaluation records constraintSetId/version, matched rule(s), result and escalation/report reference. Calls/orders remain traceable to the exact constraint version active at the time.

## Escalation
Constraint escalation creates a structured exception linked to call, customer, draft transaction, matched rule and recommended destination (e.g. SALES_MANAGER). It must not silently submit the order.

## Multi-tenant
Constraint sets are tenant + workflow scoped. A Premier bakery rule cannot affect another tenant. Operational sub-scopes may include bakery, depot, region, route, customer group, customer or SKU/category.

## Security
TENANT_ADMIN may manage approved constraint configuration subject to permissions. OPERATIONS_MANAGER may view/apply operational sets where permitted. Changes to production constraints require approval/publish workflow and are audited.

## Tests
- normal order allowed;
- 10,000-loaf order escalates/blocks as configured;
- one oversized line caught;
- total order threshold caught;
- unusual historical variance warns/escalates;
- missing history still protected by absolute limit;
- caller cannot prompt Berry to ignore rule;
- Excel invalid operator/threshold rejected;
- cross-tenant constraint access rejected;
- constraint version recorded;
- repeated event does not duplicate escalation.
