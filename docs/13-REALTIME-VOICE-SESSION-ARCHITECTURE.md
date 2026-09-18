# Berry Voice — Realtime Voice Session Architecture

## Objective
Provide a provider-neutral realtime conversation runtime shared by INBOUND and OUTBOUND telephone sessions.

## Separation
Telephony controls call establishment/transfer/hangup. Realtime voice controls audio conversation. Business tools control authoritative operations. None may silently inherit another layer's authority.

## Ports
`TelephonyPort`: acceptInboundCall, startOutboundCall, transferCall, endCall.
`RealtimeVoicePort`: start, interrupt, end.
`VoiceEventSink`: append structured session events.

Provider implementations are adapters. Core domain code imports no provider SDK.

## Runtime events
SESSION_STARTED; CALLER_SPEECH_STARTED; CALLER_SPEECH_ENDED; BERRY_RESPONSE_STARTED; BERRY_INTERRUPTED; SILENCE_TIMEOUT; SESSION_ENDED.

## Barge-in
Caller speech while Berry is responding is a normal event. Berry's response is interrupted and the runtime returns to listening. Business state is not mutated merely because speech was interrupted.

## Silence
Silence handling is policy-driven. A silence timeout may cause a concise reprompt, callback/handoff policy or safe end. Silence never implies confirmation.

## Persona
Baseline locale is en-ZA. Delivery is warm, professional, natural and concise, with careful handling of South African names and explicit verification of quantities/order details.

## Provider boundary
Day 2 must not embed OpenAI or a carrier SDK in domain/policy modules. Provider adapters may translate external events into these internal contracts.

## Security
Audio/transcript content is untrusted input. Tool calls remain schema-validated and independently authorised. Voice/session identity never expands data or transaction permissions.

## Day-2 acceptance
A development realtime session must demonstrate:
1. two-way speech;
2. Berry response;
3. caller interruption/barge-in;
4. correction without losing relevant conversation context;
5. silence handling;
6. structured session/audit events;
7. clean session termination.
