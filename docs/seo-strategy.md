# SEO & Findability Strategy

**Sites:** luigiandreamoretti.com (personal) and memopad.luigiandreamoretti.com (MEMoPAD project)
**Owner:** Luigi Andrea Moretti
**Started:** 30 Sep 2026
**Next review:** 14 Oct 2026 (see [Review schedule](#6-review-schedule))

This file is not served publicly: `_redirects` sends `/docs/*` to the homepage. Update the [results log](#9-results-log) at every checkpoint.

---

## 1. Goal

People should find Luigi Andrea Moretti and MEMoPAD when they search for:

- **The name.** "luigi moretti", "luigi andrea moretti", "moretti luigi". The architect Luigi Moretti (Watergate, Casa del Girasole) competes for these.
- **Topics plus a person or place.** For example, "affective computing researcher UK", "digital mental health researcher Bristol", "wearables mental health research", "co-design digital health", "healthtech Bristol", "digital health product manager Bristol".
- **Research topics,** on MEMoPAD. For example, "affective computing anxiety disorders", "smartwatch emotions", "co-designing digital mental health with patients and carers", and the paper titles through Google Scholar.

**Not a goal:** broad head terms like "affective computing" or "digital mental health" on their own. Wikipedia, MIT, journals and the NHS own those, and health queries face Google's stricter quality bar for health content (YMYL). The global "memopad" query is also not a goal. It is a generic product word in Asia; see [Noise](#noise-to-ignore).

**Division of labour:**
- **MEMoPAD** holds the topic content: co-design, the affective computing explainer, and publications with PDFs.
- **The personal site** answers "who works on this, in Bristol" and links to the MEMoPAD pages.
- Don't create competing topic pages on both sites.

---

## 2. Baseline (Google Search Console, 16 months to 27 Sep 2026)

One Search Console property covers both sites.

| Metric | Value |
|---|---|
| Total clicks / impressions | 128 / 61,203 |
| Last 27 days (1–27 Sep 2026) | 10 clicks / 8,622 impressions, avg position ~7.6 |
| Personal site homepage | 50 clicks / 2,006 impressions, CTR 2.49%, pos 8.2 |
| Personal site `/privacy` | 3 / 140 |
| Personal site `/sitemap.xml` (shown as a page) | 0 / 99, now noindexed |
| MEMoPAD homepage | 65 / 58,222, CTR 0.11%, pos 7.8 |
| MEMoPAD other pages | project-story 5/197, achievements 2/131, research 1/639 |
| Query "memopad" | 37 / 57,456, CTR 0.06%, pos 7.8 |
| Query "luigi moretti" | 0 / 301, **pos 11.2** (page 2) |
| Query "moretti luigi" | 0 / 32, pos 35.8 |
| Non-brand topical queries | about 0 clicks, under 20 impressions in 16 months (e.g. "mental health emotion monitoring", pos 88) |
| Core countries (UK / DE / IT / NL) | clicks 39 / 18 / 13 / 5 |
| Noise countries (PH / MY / US / ID / IN) | 33k impressions, 23 clicks in total |
| Devices | desktop 92 clicks, mobile 36, tablet 0 |

Bing Webmaster (30 Sep 2026) flagged two issues: "Set up IndexNow" and "page titles too short".

### Noise to ignore

About 57k impressions come from the generic query "memopad" in the Philippines, Malaysia, the US, Indonesia and India. The jump on 20 Mar 2026, from about 20 to 300–400 impressions a day, was Google widening that query, not a ranking win. Always exclude it (filters in section 5).

---

## 3. What changed

### 30 Sep 2026: personal site (`luigiandreamoretti-2025`)

**Name**
- "Luigi Andrea Moretti" is now used everywhere. Short forms appear only in the JSON-LD `alternateName`.
- JSON-LD `disambiguatingDescription`: "medical doctor and PhD researcher at UWE Bristol…".

**Title and description**
- Title: "Luigi Andrea Moretti | Affective Computing & Digital Health" (59 chars; shortened on 1 Oct from a 66-char version to stay under Bing's 60–65 limit and Google's ~60-char display).
- Meta description: Bristol, UK plus the topics.

**New "What I Work On" section**
- Heading: "Affective Computing & Digital Mental Health". The intro starts "Based in Bristol, UK".
- Four topic cards, each linking to the matching MEMoPAD page: affective computing and emotion recognition; wearables for mental health; co-design in digital health; digital health product.

**Section headings now carry topics**
- "Experience in Medicine, Healthtech and Research"
- "Talks, Conferences and Prototypes"
- "Funding, Awards and Publications"

**Facts aligned with MEMoPAD**
- 10–25 participants per phase.
- Sensors listed by phase.
- "mental health clinicians" instead of "NHS clinicians".

**JSON-LD**
- `homeLocation` / `workLocation` set to Bristol, GB.
- `knowsAbout` gains "Digital Mental Health" and "Health Technology".
- Topic URLs point to the new MEMoPAD pages.
- The ResearchProject `@id` now matches MEMoPAD (`#research-project`), so Google can merge the two graphs.

**Technical**
- Privacy and 404 titles lengthened.
- `/privacy` added to the sitemap.
- IndexNow key file added.
- `sitemap.xml` set to noindex.

### 30 Sep 2026: MEMoPAD site (`PhD_project_website`)

**New pages**
- `/co-design/`, the QR target for the MHP Research Summit talk on 8 Oct 2026.
- `/research/affective-computing/`
- `/research/publications/` plus 4 paper pages, with PDFs and Google Scholar `citation_*` tags.

**Titles and descriptions**
- All titles are 40–60 characters.
- Newsletter titles now start with "MEMoPAD Newsletter, Month Year".
- The research description is trimmed.

**Technical**
- Sitemap `lastmod` added.
- `robots.txt` points to `sitemap-index.xml`.
- The Person JSON-LD matches the personal site.
- An IndexNow ping runs on every deploy.
- "Publications" added to the navigation.
- Stale sensor claims fixed.

---

## 4. Expected effects (planning estimates, not forecasts)

These are estimates for a low-authority personal site and project subdomain in a topic where Google applies its stricter health-content bar. Treat them as hypotheses to test at each checkpoint, and adjust them once we have two data points.

"Non-brand" means queries that do not match the brand regex in section 5.

| KPI | Baseline | 2 weeks (14 Oct) | 3 months (6 Jan 2027) | 6 months (7 Apr 2027) |
|---|---|---|---|---|
| New MEMoPAD URLs indexed (of 7) | 0 | 5–7 | 7 | 7 |
| Bing: IndexNow + short-title warnings | flagged | cleared | cleared | cleared |
| "luigi moretti" avg position | 11.2 | 10–12 (no change yet) | **6–10** | **4–8** |
| Name-query clicks per month (all variants) | ~0 | ~0 | 1–5 | 3–8 |
| Personal homepage CTR | 2.5% | – | 3–4% | 3–5% |
| Personal homepage clicks per month | ~3 | – | 4–7 | 5–10 |
| **Non-brand impressions per month (both sites)** | ~1 | 0–30 | low 50 · **expected 250** · high 800 | low 150 · **expected 600** · high 2,000 |
| **Non-brand clicks per month (both sites)** | 0 | 0 | low 0 · **expected 5** · high 15 | low 2 · **expected 12** · high 40 |
| `/co-design/` + `/research/affective-computing/` impressions per month | – | first ones | 30–200 each | 50–300 each |
| Google Scholar: memopad paper pages listed as versions | 0 of 4 | 0 | 2–4 | 4 |

Why these ranges:
- New pages usually take 2–8 weeks to be indexed and 3–6 months to settle.
- Name queries move faster than topic queries because the entity signals (JSON-LD, disambiguation, consistent name) apply straight away.
- The ranges widen later because backlinks (section 8) are the biggest unknown.
- The Summit on 8 Oct should bring direct and referral visits to `/co-design/`. Search Console doesn't count those; see section 5.

---

## 5. How to measure

### Google Search Console → Performance → Search results

1. **Date range:** use *Compare → Custom*, with the 3 months before the change as the baseline (1 Jul – 29 Sep 2026). Always compare periods of the same length.
2. **Brand vs non-brand:** *+ Add filter → Query → Custom (regex)*.
   - **Non-brand:** *Doesn't match regex* `moretti|morete|memo|meopad|menopad|momopad|mopead|luigi|luygi`
   - **Name only:** *Matches regex* `moretti|morete|luigi|luygi`
3. **Per site:** *+ Add filter → Page*.
   - Personal site: *URL doesn't contain* `memopad`.
   - MEMoPAD: *URL contains* `memopad.luigiandreamoretti.com`.
4. **Core audience:** *+ Add filter → Country* (United Kingdom first, then Germany, Italy, Netherlands one at a time), and compare against no country filter.
5. **Record:** clicks, impressions, CTR and position for (a) non-brand on both sites, (b) name only, (c) each new MEMoPAD page. Also note the top 10 non-brand queries. They show which words people actually use, which is what we tune titles to.

### Search Console → Indexing → Pages
- Count indexed pages per site. The 7 new MEMoPAD URLs should be listed.
- Check "Why pages aren't indexed" for any of our URLs.

### Bing Webmaster Tools
- *Recommendations*: the two warnings should be gone.
- *Search Performance*: the same brand and non-brand split (Bing uses keyword filters, not regex).
- *IndexNow*: shows URLs received from Cloudflare (personal site) and from the GitHub deploy (MEMoPAD).

### Google Scholar
- Search each paper title, then open *All N versions*. A version at `memopad.luigiandreamoretti.com/research/publications/...` means Scholar picked up the page.
- Check that the CHI 2026 workshop paper's authors are correct (previously wrong: "M Paul, L Michael").

### Visits that search consoles don't show
- **Personal site:** Cloudflare dashboard → Analytics & Logs → Web Analytics: referrers, and top pages after 8 Oct.
- **MEMoPAD:** GitHub Pages has no analytics. Summit traffic will only show up indirectly, e.g. as newsletter sign-ups.

---

## 6. Review schedule

| Date | Checkpoint | What to check |
|---|---|---|
| **14 Oct 2026** | 2 weeks | Indexing of new URLs; Bing warnings cleared; the new personal-site title showing in Google; Summit visits in Cloudflare analytics |
| **11 Nov 2026** | 6 weeks | "luigi moretti" position trend; first non-brand queries; Scholar versions; start the off-site links (section 8) |
| **6 Jan 2027** | 3 months | First real evaluation against section 4; apply the decision rules; tune titles and descriptions to the real queries |
| **7 Apr 2027** | 6 months | Full review; decide on new content (e.g. Insights pages) and on the next strategy cycle |

---

## 7. Decision rules

| If… | Then… |
|---|---|
| A new URL is not indexed after 4 weeks | URL Inspection: check canonical, noindex and robots, then *Request indexing*; add a link to it from the other site |
| A page has under 20 impressions a month after 3 months | Strengthen internal links, get 1–2 relevant external links, and rewrite the H1 and title in the words people search with |
| A page has 200+ impressions a month but CTR under 1% at position 10 or better | Rewrite the title and meta description to match the top queries |
| A target query sits at position 11–20 | Add a short section that answers that query directly, and link to it from the other site with that phrase |
| "luigi moretti" is still worse than position 10 at 3 months | More authoritative profiles in the full name that link back (UWE staff page, event speaker pages); check that Google's knowledge panel isn't mixing you up with the architect |
| Non-brand impressions are growing but come from outside the UK/EU | Fine for research reach; for Bristol and UK roles, add more local signals (Bristol events, local ecosystem links) |
| Nothing moves by 6 months | The limit is authority, not on-page work: prioritise backlinks and publishing (Insights pages or guest posts) |

---

## 8. Backlog: next levers, in priority order

1. **Off-site links from the Bristol and health ecosystem.** This is the biggest lever for "healthtech Bristol" and topic queries. Start after the Summit, around 11 Nov:
   - MHP Summit speaker or programme page
   - TechSPARK directory
   - Health Innovation West of England
   - Bristol Health Partners
   - SETsquared Bristol and Engine Shed
   - the UWE staff or research profile, using the full name
2. **OG image:** it still shows "Luigi A. Moretti". Regenerate it with the full name.
3. **CV PDF:** it still uses "Luigi A. Moretti" (12 times).
4. **Insights pages** on the personal site (2 short posts to start). Decide at the 3-month review.
5. **memopad-demo:** add `noindex` to its 4 HTML files. The demo login page is currently indexed.
6. **Copy:** review "clinically valid" in the MEMoPAD spotlight on the personal site. It's an untested claim.

---

## 9. Results log

Add one row per checkpoint. Use non-brand filters as in section 5, per month unless stated.

| Date | Non-brand impr. (both) | Non-brand clicks | "luigi moretti" pos | Personal home clicks / CTR | New MEMoPAD URLs indexed | Scholar versions | Notes and actions taken |
|---|---|---|---|---|---|---|---|
| 27 Sep 2026 (baseline) | ~1 | 0 | 11.2 | ~3 / 2.5% | 0/7 | 0/4 | Strategy started |
| 1 Oct 2026 (note) | | | | | | | Bing still flags "IndexNow" and "title too short" (`/newsletter/august-2025/`). Stale crawl: before 28 Sep that title was "August 2025" (11 chars); it is 60 chars since 30 Sep. IndexNow is confirmed working on both sites (MEMoPAD deploy step succeeded twice, personal-site ping returned 202). Expect both warnings to clear by 14 Oct; if not, use URL Inspection → Live URL in Bing. |
| 1 Oct 2026 (note) | | | | | | | Bing URL Inspection on `/` (Bing Index tab) flagged "Title too long" and "Meta description too long": that is the pre-28 Sep version (title 81, description 169 chars). Homepage title shortened to 59 chars anyway (66 was borderline for Bing); description is 152 (Bing range 25–160). |
| 14 Oct 2026 | | | | | | | |
| 11 Nov 2026 | | | | | | | |
| 6 Jan 2027 | | | | | | | |
| 7 Apr 2027 | | | | | | | |
