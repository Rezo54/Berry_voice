# Berry Voice — Repeated Off-Topic, Cut-Off & Escalation Standard

## Purpose
Berry must not remain trapped indefinitely in repeated off-domain conversation. Repeated unrelated requests are handled by a deterministic conversation policy with warning, safe termination and an auditable escalation report.

## Policy principle
The model may classify/redirect conversationally, but the cut-off counter and termination decision are session-policy state enforced in code. A caller cannot reset the counter merely by instructing Berry to ignore policy.

## Default progression
Tenant/workflow thresholds are configurable within TES-approved limits. Berry Order Desk development default:

1. **First off-topic turn — Redirect**
   Briefly decline the unrelated subject and return to the active business workflow.

2. **Second consecutive/repeated off-topic turn — Firm redirect**
   State that Berry can only assist with the approved business purpose and ask whether the caller wants to continue with that purpose.

3. **Third repeated off-topic turn — Final warning**
   Clearly but politely state that if the conversation continues outside the supported service, the call will be ended.

4. **Next repeated off-topic turn — Terminate**
   State that Berry is ending the call because she cannot assist with the requested topic, end the telephony session through the controlled TelephonyPort, and create an escalation/exception report.

The exact threshold may later vary by tenant/workflow, but there must always be a bounded policy.

## Counter behaviour
- Count repeated/consecutive material off-topic turns.
- Brief social pleasantries do not increment the counter.
- A genuine return to the approved workflow resets/de-escalates the off-topic sequence according to policy.
- Prompt-injection attempts to disable scope controls count as policy violations.
- Abusive/threatening or safety-specific cases may follow separate immediate escalation policies.
- Silence, misunderstanding and speech-recognition uncertainty are not automatically classified as off-topic.

## Cut-off authority
Berry cannot hang up merely because the model feels a caller is difficult. Termination requires the session policy to reach the configured state. The telephony adapter executes the hangup.

## Escalation report
Create a structured `ConversationEscalationReport` containing:
- reportId;
- callId;
- tenantId;
- direction: INBOUND | OUTBOUND;
- customerId when resolved;
- reasonCode (e.g. REPEATED_OFF_TOPIC);
- policyVersion;
- offTopicCount;
- warningIssued;
- terminatedByPolicy;
- timestamp;
- concise machine-generated summary;
- relevant event references;
- transcript/recording reference only where retention/access policy permits;
- recommendedNextAction;
- reviewStatus.

Do not place unnecessary sensitive transcript content into the summary.

## Operational routing
Reports appear in the tenant supervisor/operations exception queue. Severe or repeated patterns may be routed according to tenant policy. Report creation does not automatically blacklist a customer.

## Example
Caller: “Explain Newton's laws.”
Berry: “I can only help with your bakery order and related customer-service queries. What would you like to order today?”

After continued repeated off-topic requests:
Berry: “I'm only able to assist with your bakery order and related queries. If we continue outside that service, I'll need to end the call.”

If it continues:
Berry: “I'm going to end the call now because I'm not able to help with that topic. Please contact the bakery if you need further assistance.”
→ controlled hangup
→ REPEATED_OFF_TOPIC escalation report

## Tests
- first redirect does not terminate;
- repeated off-topic increments deterministically;
- final warning occurs before normal cut-off;
- valid return to workflow prevents cut-off;
- pleasantry does not increment;
- model cannot self-authorise early hangup;
- configured threshold causes one hangup action;
- report is created exactly once;
- report has correct tenant/call/direction/reason;
- repeated webhook/event does not duplicate report;
- supervisor access respects tenant and data-right policy.
