# Berry Voice — OpenAI Realtime Development Adapter

## Purpose
Connect the provider-neutral Berry voice architecture to an actual browser-based development voice session without exposing the server API key to the browser.

## Flow
Browser /voice → Berry server POST /api/realtime/client-secret → OpenAI client-secret endpoint → ephemeral credential returned → browser WebRTC → OpenAI Realtime.

The long-lived OPENAI_API_KEY remains server-side only.

## Scope
This adapter proves realtime speech and persona behaviour. It is not the PSTN/SIP telephony adapter and cannot create real orders. Business tools remain separate and authorised.

## Configuration
Server environment:
- OPENAI_API_KEY — required secret; never committed.
- OPENAI_REALTIME_MODEL — optional; defaults to gpt-realtime-2.1.
- OPENAI_REALTIME_VOICE — optional; initial development default is marin pending voice evaluation.

## Test path
1. Run Berry dev with server secret configured.
2. Open /voice.
3. Grant microphone access.
4. Connect.
5. Speak naturally.
6. Interrupt Berry while she is responding.
7. Correct a statement and confirm she retains context.
8. Test silence/re-entry.
9. Disconnect cleanly.

## Security
The browser receives only a short-lived client credential. It never receives OPENAI_API_KEY. The development prompt explicitly prevents claims of real transaction success before business tools exist.

## Next
After realtime voice behaviour is verified, connect the common session runtime to the bidirectional telephony adapter for INBOUND and OUTBOUND PSTN calls.
