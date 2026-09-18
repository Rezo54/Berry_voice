# Berry Voice — Interruption Qualification & Noise Resilience Standard

## Principle
A detected sound is not automatically an interruption. Berry should yield to meaningful caller speech, not every cough, click, chair movement, breath, background voice or microphone spike.

## Behavioural goal
While Berry is speaking:
1. a possible interruption may cause a brief conversational pause;
2. the runtime qualifies whether meaningful caller speech follows;
3. if meaningful speech is confirmed, Berry yields and processes it;
4. if it is only noise/inaudible/non-lexical sound, Berry resumes the current response from the same conversational thought rather than abandoning it.

## Two-stage interruption
### Stage 1 — Candidate
VAD/audio activity during Berry output creates `INTERRUPTION_CANDIDATE`. Do not immediately mutate business/conversation state.

### Stage 2 — Qualified
A candidate becomes `MEANINGFUL_SPEECH` only when sufficient evidence exists, such as sustained speech duration plus usable transcription/semantic content. Otherwise classify as `NOISE_OR_INAUDIBLE`.

Provider VAD is a signal, not the final business-policy decision.

## Default development tuning
- Raise VAD threshold from the initial sensitive setting.
- Require a short sustained speech window before treating activity as a likely barge-in.
- Keep prefix padding sufficient to avoid clipping genuine first syllables.
- Do not treat isolated non-lexical sounds as confirmation, cancellation or correction.

Exact thresholds are tuning parameters and must be validated against real microphones, telephone audio and South African speech patterns rather than treated as universal constants.

## Resume semantics
If Berry paused for an interruption candidate and it resolves to noise:
- resume the current response/thought;
- do not restart the entire paragraph;
- do not apologise unnecessarily;
- do not lose the active order/context;
- do not count it as a caller turn.

If the provider has already cancelled audio generation, the orchestrator may generate a concise continuation from the stored response intent/context rather than replaying the whole response.

## Meaningful interruption examples
“Wait.”
“No, make that ten.”
“Hold on.”
“I said Brown, not White.”
A substantive new customer utterance.

## Non-meaningful examples
Cough; throat clear; breath; keyboard tap; door noise; microphone pop; brief background speech not directed at Berry; inaudible fragment with no recoverable words.

## Safety
An ambiguous/noisy sound never constitutes explicit confirmation of an order or other consequential action.

## Telephony
Browser microphone tuning is only the first calibration. PSTN/SIP audio has different noise characteristics. Interruption thresholds/profile may therefore be channel-specific while preserving the same qualification policy.

## Tests
- cough while Berry speaks → brief pause/resume, no caller turn;
- short microphone spike → no interruption;
- background sound → no transaction-state change;
- clear “wait” → meaningful interruption;
- clear correction → Berry yields and applies correction only after normal business validation;
- noise during final confirmation → never treated as yes;
- repeated noise does not trigger off-topic policy;
- genuine soft-spoken caller remains interruptible.
