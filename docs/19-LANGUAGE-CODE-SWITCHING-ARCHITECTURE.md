# Berry Voice — Language & Code-Switching Architecture

## Principle
Berry supports tenant-approved languages while retaining the same business scope, transaction controls, constraints and security boundaries.

## South African baseline languages
The baseline Berry South Africa language set is:
- **English — en-ZA**
- **Afrikaans — af-ZA**
- **isiZulu — zu-ZA**

These are first-class target languages for Berry ZA. Production approval remains per voice profile and per language after testing.

## Behaviour
Where enabled for the tenant/workflow, Berry may:
- greet and conduct the business workflow in English, Afrikaans or isiZulu;
- switch language when the customer explicitly requests it;
- follow natural code-switching where supported and tested;
- preserve product/SKU identifiers, quantities, currency and confirmation meaning across language switches;
- retain the same business/domain constraints regardless of language.

Language switching never expands Berry beyond the approved business domain or changes transaction authority.

## Language selection
A tenant may configure a default language. A customer/caller preference may be retained as an approved structured preference. Caller speech may also trigger a supported language change during a session.

Berry should not repeatedly ask for language selection when the customer's language is already clear.

## Voice quality
Language understanding and spoken naturalness are separate acceptance criteria. Each TES voice profile records approved languages and tested quality. A voice can therefore be approved for English but not yet approved for Afrikaans or isiZulu.

## Tenant voice profile metadata
Future voice profiles include:
- primaryLanguage;
- supportedLanguages;
- approvedLanguages;
- codeSwitchingPolicy;
- languageTestVersion.

## Test matrix
For every candidate Berry ZA voice:
1. English-only order conversation.
2. Afrikaans-only order conversation.
3. isiZulu-only order conversation.
4. English ↔ Afrikaans switching.
5. English ↔ isiZulu switching.
6. Natural mixed-language conversation where appropriate.
7. South African names and place names.
8. Quantities, money and SKU names in each language.
9. Correction after a language switch.
10. Off-topic request in each language still follows the same domain/cut-off policy.
11. Constraint escalation in each language conveys the same business outcome.
12. Final order confirmation remains explicit and unambiguous.

## Release rule
Do not market a language as production-supported merely because the model can generate it. TES must pass behavioural, pronunciation, number/SKU, constraint and voice-quality acceptance tests for that language on the selected voice profile.


## Current Berry ZA runtime policy — 2026-09-18
Until isiZulu spoken-output quality passes TES acceptance testing:

- Each new call starts with English as the default response language.
- Clear Afrikaans caller speech automatically switches the current call to Afrikaans; Berry responds in Afrikaans without asking the caller to select a language.
- Afrikaans remains active only within that call and until the caller clearly returns to English.
- Call termination resets language state; a future call begins from the tenant/default language again.
- isiZulu is recognition-only: Berry may interpret isiZulu input but responds in English.
- Before acting on critical isiZulu-derived meaning, Berry reads back the interpreted product/quantity/date/name/delivery/confirmation meaning in English and asks for explicit confirmation or correction.
- isiZulu recognition must never silently become transaction confirmation.
- Once an isiZulu voice profile passes pronunciation and behavioural acceptance, TES may change this policy through a versioned voice/language configuration rather than an ad-hoc prompt change.
