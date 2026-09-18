# Berry Voice — Language & Code-Switching Architecture

## Principle
Berry may support multiple tenant-approved languages while retaining the same business scope, transaction controls and security boundaries.

## South African baseline
Initial target languages:
- English (en-ZA) — primary development baseline.
- isiZulu (zu-ZA) — first additional South African language candidate.

## Behaviour
Where enabled for the tenant/workflow, Berry may:
- greet/respond in isiZulu;
- continue an order conversation in isiZulu;
- understand natural code-switching between South African English and isiZulu;
- switch language when the customer explicitly asks;
- preserve product/SKU identifiers and quantities accurately across language switches.

Language switching never expands Berry beyond the approved business domain.

## Voice quality
Language understanding and spoken accent/naturalness are separate acceptance criteria. A model may understand isiZulu while a selected provider voice still sounds unnatural. Each TES voice profile therefore records approved languages and tested quality.

## Tenant configuration
Future voice profile metadata includes `supportedLanguages`, `primaryLanguage`, and `codeSwitchingPolicy`. Clients preview/test the actual voice-language combination before production approval.

## Tests
- English → isiZulu switch;
- isiZulu → English switch;
- natural English/isiZulu code-switching;
- South African names/place names;
- quantities and SKU names while speaking isiZulu;
- correction after a language switch;
- off-topic question in isiZulu still follows domain policy;
- confirmation remains explicit and unambiguous.

## Release rule
Do not market a language as production-supported merely because the model can generate it. TES must pass behavioural, pronunciation, number/SKU and voice-quality acceptance tests for the selected voice profile.
