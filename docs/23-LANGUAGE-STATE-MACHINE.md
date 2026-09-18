# Berry Voice — Language State Machine

## Reason
Prompt instructions alone did not reliably preserve Afrikaans. During live testing the model automatically returned to English after Afrikaans had been selected. Language persistence is therefore application state, not merely model behaviour.

## State
`activeLanguage = ENGLISH | AFRIKAANS`
`afrikaansLocked = boolean`

## Transitions
- call start → ENGLISH, unlocked
- AFRIKAANS_DETECTED → AFRIKAANS, locked
- ENGLISH_DETECTED while Afrikaans locked → no change
- EXPLICIT_ENGLISH_REQUEST → ENGLISH, unlocked
- CALL_ENDED → ENGLISH, unlocked

The orchestrator must inject/maintain the active response language from this state. The model must not infer a language-state transition solely from ordinary English speech once Afrikaans is locked.

isiZulu remains governed by the recognition-only policy: isiZulu input does not set spoken output language to isiZulu.

## Release test
Afrikaans detected → Berry responds Afrikaans → caller speaks ordinary English → Berry continues Afrikaans → caller explicitly requests English → Berry switches English → new call resets English.
