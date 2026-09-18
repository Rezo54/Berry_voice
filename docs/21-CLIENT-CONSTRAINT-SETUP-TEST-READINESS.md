# Berry Voice — Client Constraint Discovery, Setup & Test Readiness

## Purpose
A Berry deployment must not begin live customer testing before the client's operational constraints, escalation boundaries and exception owners are understood, configured, validated and approved.

Constraints are part of onboarding, not an afterthought discovered during calls.

## Client setup sequence

### Step 1 — Define the agent/workflow
Agree exactly what Berry is being deployed to do, e.g. ORDER_DESK. Document allowed intents, out-of-scope topics, business actions and human handoff points.

### Step 2 — Map the normal transaction
Walk through real examples with the client: typical customer, products/SKUs, normal quantities, order value, delivery rules, corrections, confirmation and downstream system outcome.

### Step 3 — Identify hard boundaries
Ask the client what Berry must never process autonomously. Examples: maximum line quantity, maximum total units/value, blocked products, account/credit restrictions, special delivery rules, cut-off times.

### Step 4 — Identify unusual-but-possible conditions
Define cases that are not prohibited but need extra confirmation or review: large variance from normal order, unusual SKU mix, first-time product, atypical delivery request.

### Step 5 — Define escalation ownership
For every ESCALATE outcome define the destination role/team, e.g. SALES_MANAGER, CREDIT_CONTROL, CUSTOMER_SERVICE_SUPERVISOR. Define what Berry says and what context the escalation report contains.

### Step 6 — Build constraint workbook
Populate the controlled TES template with tenant/workflow, constraintCode, description, scopeType/scopeValue, metric, operator, threshold, action, escalationRole, effective dates and enabled status.

### Step 7 — Import and validate
UPLOAD → PARSE → VALIDATE. Reject invalid metrics/operators, missing escalation destinations, contradictory/duplicate rules and malformed scopes. No direct spreadsheet-to-production execution.

### Step 8 — Client preview
Show the interpreted rules back to the client in plain language, including examples:
“Orders above 2,000 total units will not be submitted by Berry and will be referred to Sales Manager.”

### Step 9 — Approve and version
Authorised client/TES approver signs off the constraint set. Create immutable version and audit metadata.

### Step 10 — Scenario testing
Run normal, boundary, just-over-boundary and extreme scenarios. Include the 10,000-loaf test, historical-variance cases, corrections and attempts to persuade Berry to ignore the rule.

### Step 11 — Voice/user acceptance testing
Only after constraints pass should client users test natural voice behaviour against the configured workflow.

### Step 12 — Publish
Promote the exact approved constraint version with the approved Berry voice/conversation configuration. Retain rollback.

## Minimum go-live evidence
- workflow scope approved;
- constraint set approved/versioned;
- escalation destinations valid;
- normal and exception scenarios pass;
- client acceptance recorded;
- production configuration references exact constraint version.

## Ongoing change
Constraint changes follow preview → test → approve → publish. Berry must never “learn” a new transaction authority from conversation history.
