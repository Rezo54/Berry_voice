# Berry Voice — Voice Catalogue & Tenant Voice Deployment Specification

## Purpose
Voice selection is a tenant-configurable, versioned Berry platform capability. Provider voice IDs must not be hard-coded into tenant business logic.

## TES Voice Catalogue
TES maintains an approved catalogue of voice profiles. Each profile has:
- voiceProfileId — stable TES identifier, e.g. berry-za-professional-01;
- displayName;
- locale/market;
- persona/style description;
- provider and providerVoiceId;
- compatible realtime model(s);
- conversation-instruction version;
- audition script version;
- lifecycle status: DRAFT, APPROVED, DEPRECATED;
- created/updated/version metadata.

Clients select TES voice-profile IDs. Provider identifiers remain an implementation detail behind the catalogue.

## Tenant configuration
A tenant may have:
- development/test selectedVoiceProfileVersion;
- production selectedVoiceProfileVersion;
- previousProductionVoiceProfileVersion for rollback;
- approvedBy/approvedAt;
- publishedBy/publishedAt.

A voice choice never changes tenant permissions, business tools or transaction authority.

## Selection workflow
CATALOGUE → PREVIEW → TEST → APPROVE → PUBLISH → PROD

1. TENANT_ADMIN with tenant.settings.manage browses TES-approved profiles.
2. Administrator previews candidates using the same controlled audition text.
3. Administrator selects a candidate in development/test.
4. Test calls are performed.
5. An authorised administrator approves the selected profile/version.
6. Publish promotes that exact approved version to production.
7. Prior production version remains available for controlled rollback.

Production voice changes must not occur merely by changing a local environment variable or provider voice ID.

## Audition standard
Candidate voices should be compared against the same script/version so differences are attributable primarily to voice/profile behaviour rather than different wording.

The baseline South African audition corpus must test:
- South African personal names;
- South African place names;
- FMCG product descriptions/SKUs;
- quantities;
- currency;
- order confirmation;
- natural conversational rhythm.

Initial fixed sentence:
“Good afternoon, this is Berry calling from the bakery. Nkosinathi Mthembu, I have your delivery going to Kanyamazane. Your order is fifteen White 700, ten Brown 700 and five Best of Both, with a total value of one thousand two hundred and fifty rand. Before I confirm it, is everything correct?”

## Call audit
Every CallSession must ultimately be traceable to:
- voiceProfileId;
- voiceProfileVersion;
- provider/model version where available;
- prompt/conversation-policy version.

This permits exact investigation of which Berry configuration handled a call.

## Multi-market future
The catalogue may contain ZA, UK, AU, US or other approved profiles. Locale/voice selection is tenant configuration and must not fork Berry's transaction/security architecture.

## Security and governance
TES controls catalogue admission and provider mapping. Tenant admins select only profiles made available to their tenant/market. Client voice choice cannot introduce arbitrary instructions, tools or provider credentials.

## Day-2 development precursor
The current /voice audition control is a development precursor to this platform feature. It should be implemented in a way that can evolve into catalogue-backed selection rather than a permanent hard-coded A/B/C/D switch.
