# Vishwakarma website SEO implementation guide

Website: https://vishwakarmapallettrucks.in/
Repository: Sahil7103/vishwakarma-pallet-trucks
Prepared: 22 November 2026

## 1 Purpose and working rules

This guide explains how to grow qualified organic enquiries for Vishwakarma Hand Pallet Truck, from basic discovery in Google to ongoing technical and content improvement. The first release improves machine-readable page information while keeping the current website appearance intact. Use this as an operating manual for the business owner and whoever maintains the repository.

Success means more relevant buyers finding the site and making useful enquiries. A number-one position is not a deliverable: results vary by query, location, competition and Google's systems. Brand searches and broader supplier searches need separate measurement. Paid advertising is a separate channel and does not purchase organic ranking. [1, 2]

Preserve these boundaries during this rollout:
- Keep page bodies, layout, styling, animations, images, navigation and form behaviour unchanged in the first release.
- Make no claims about capacities, stock, prices, manufacturer authorisation, delivery coverage or warranty until the owner confirms them.
- Keep domain and hosting changes separate from ordinary SEO edits. Preserve CNAME and existing working links.
- Do not invent customer reviews, ratings, opening hours, coordinates or Search Console verification tokens.
- Treat later content additions, analytics and image optimisation as separate releases with their own acceptance checks.

Owner responsibilities: confirm business facts, maintain the Google profile, approve product information and review enquiry quality. Developer responsibilities: metadata, crawlability, schema, checks, deployments and technical investigation. Both should review a monthly scorecard.

Read sections 2 to 6 for immediate implementation; sections 7 to 10 for growth; sections 11 to 13 for release control and measurement. Official references are collected in section 14. Steps labelled planned are instructions for future work, not claims that an account has already been configured.

## 2 Repository audit and first implementation

Audit baseline: commit 5ebd9ae. The site is a buildless HTML, CSS and JavaScript website with eight HTML pages and seven SVG image assets. The existing sitemap lists all eight canonical pages. robots.txt allows crawling and points to that sitemap. Each page already has a canonical URL and one h1. Preserve these working foundations.

Confirmed gaps: three electric-truck pages shared the same description and generic Open Graph title; page URLs were absent from Open Graph metadata; the homepage had an Organization entity but the other pages had no JSON-LD. Several titles described a photograph or finish rather than the buyer's likely product enquiry.

Implemented in this release:
- Unique, page-specific titles and descriptions for all eight pages, with Ahmedabad where relevant.
- Open Graph titles and descriptions aligned with each page, plus canonical sharing URLs, site name and locale.
- A linked WebSite and Organization entity on the homepage; WebPage entities and a CollectionPage for the catalogue.
- BreadcrumbList markup for the existing breadcrumb trails, without adding a visible component.
- A preload hint for the existing first homepage showcase image; no image is replaced or recompressed.
- A dependency-free SEO checker and a GitHub Actions workflow to run it on pushes and pull requests.

Preserved: all HTML bodies, CSS, JavaScript, image bytes, product routes, contact form, sitemap, robots.txt and CNAME. Open Graph metadata improves link context; it is not presented as a Google ranking boost.

Deferred: LocalBusiness conversion pending address confirmation; Product rich-result markup pending eligible, visible product facts; Search Console and profile account configuration; conversion analytics; image format changes; visible content expansion. The website uses number 87 while the public Google listing observed in this session used 86. Retain the current address until the owner resolves this discrepancy.

## 3 Search Console and first indexing checks

Owner task: open Google Search Console and add a Domain property for vishwakarmapallettrucks.in. Use the verification TXT value Google supplies at the domain's DNS provider. Add the TXT record without removing the working A or CNAME records. Keep it after verification. Alternatively, use an HTTPS URL-prefix property and the exact HTML verification file or meta tag supplied by Google. Never use a placeholder token. [3]

Submit https://vishwakarmapallettrucks.in/sitemap.xml in the Sitemaps report. Inspect the homepage, catalogue and a representative product page using URL Inspection. Check the indexed canonical, crawl eligibility, rendered page and resource availability. Request indexing after a meaningful change; repeated requests are not a shortcut. Discovery and indexing can take time, and submission does not guarantee inclusion. [4]

Record a baseline before judging results:
- Date, property type, verification method and accountable owner.
- Sitemap processing status and counts of submitted and indexed pages.
- Page Indexing exclusions, their example URLs and whether each exclusion is intentional.
- Search Performance clicks, impressions, click-through rate and average position, split by brand and non-brand queries.
- Mobile versus desktop performance and India traffic.

Interpret exclusions carefully. A duplicate URL with the correct canonical can be normal. A valuable canonical page marked crawled but not indexed needs a review of usefulness, duplication and internal links; it does not automatically mean a technical block. A robots block or noindex on a public product page is a developer issue. A new site with little data needs a longer observation period.

Acceptance: the owner can access the property, the sitemap is processed, intended URLs are eligible, and actionable errors have assigned owners. This release does not create a Search Console account or claim that Google has indexed the changes.

## 4 Crawlability and canonical URL control

The preferred origin is https://vishwakarmapallettrucks.in/. Preserve the trailing-slash URLs already used by product directories. A page's canonical tag, sitemap entry and internal links should agree. Canonicalisation helps consolidate duplicates, but Google can select a different canonical based on its signals. [5]

Check the following after deployment:
- Each of the eight canonical pages returns a successful HTML response and contains its own absolute canonical URL.
- robots.txt and sitemap.xml are reachable. Public CSS, JavaScript and image files remain crawlable.
- HTTP, www and the old GitHub Pages project URL resolve to the intended HTTPS destination without loops or long chains. Record actual redirect behaviour instead of assuming it.
- A deliberately nonexistent route returns HTTP 404. Do not redirect every missing page to the homepage.
- There are no internal links to obsolete project-prefixed paths or missing fragment IDs.

GitHub Pages controls server redirects and headers. An .htaccess file does not configure this host. If a future redirect requirement cannot be implemented with existing host features, document the limitation and evaluate a hosting change separately; do not alter DNS as part of a metadata edit.

Keep only canonical, indexable public pages in the sitemap. Add a new page after it is linked from another relevant page. Use lastmod only when the actual substantive modification date is known; do not update every date on every deploy. The current small sitemap needs neither invented priority values nor unnecessary partitioning.

Repository documentation may be publicly accessible on a static host. Keep this manual out of the sitemap and never put passwords, API secrets or customer details into it. robots.txt is not access control and should not be used to hide confidential files.

## 5 Keyword intent and page ownership

The following map is a starting hypothesis based on the actual catalogue, not measured search-volume research. Validate it with Search Console impressions and qualified enquiries. Assign each intent to a useful page rather than making several near-identical pages compete for the same search.

- Homepage /: hand pallet truck supplier in Ahmedabad; Vishwakarma brand searches. Explain the business and send visitors to the catalogue or contact section.
- /products/: manual and electric pallet truck options. Help visitors browse and compare categories.
- /products/manual-pallet-truck/: manual hand pallet truck enquiries. Keep Classic Yellow as the visible reference until the actual supplied model is confirmed.
- /products/warehouse-pallet-truck/: warehouse pallet handling. Develop useful application guidance rather than duplicating the manual page.
- /products/loading-bay-pallet-truck/: dispatch and loading-bay pallet handling. Explain relevant operating requirements when confirmed by the business.
- /products/automatic-pallet-truck/: Jungheinrich EJE 230 reference enquiries. Do not imply authorised dealership or confirmed stock.
- /products/toyota-bt-levio/: Toyota BT Levio LWE160 reference enquiries, with the same stock and dealership limitations.
- /products/still-exh-16/: STILL EXH 16 Li-Ion reference enquiries, including charging questions when reliable information is available.

The exact implemented title and description values are recorded in docs/seo-page-map.json. Edit HTML and the map together. Titles should clearly identify the page; descriptions should give a truthful reason to visit. Google may rewrite either in results. There is no universal character count that guarantees a particular display. [1]

Do not add a meta keywords tag, repeat Ahmedabad unnaturally, hide keyword paragraphs, or create pages for every nearby locality with only the name changed. Product names are references visible on the site, not evidence of commercial relationships.

## 6 Structured data and business identity

JSON-LD should describe the page and business using facts supported by the visible website. It does not replace useful content or guarantee a special search appearance. Test syntax with the local checker, vocabulary with Schema Markup Validator, and eligible Google features with Rich Results Test. WebPage and WebSite entities may be valid without producing a dedicated rich result. [6]

Current graph: the homepage defines an Organization with a stable #organization identifier and a WebSite with #website. Each page has its own #webpage identifier and references the website and business. The catalogue uses CollectionPage. Existing visible breadcrumbs are represented as BreadcrumbList entries with ordered positions and absolute URLs. [7]

Next local-business step: confirm the exact trading name, street number, locality, postal code, public phone numbers, opening hours and actual customer-facing location. Then use a suitable LocalBusiness subtype and ensure the same facts appear on the page and Google profile. Do not guess coordinates from an approximate map or publish unconfirmed hours. The current Organization address is retained from the existing site, pending reconciliation. [8]

Product markup is a separate decision. These pages currently describe references and request quotes; they do not publish verified offers or reviews. Do not insert a zero price, fabricated availability or AggregateRating to satisfy a validator. Google Product snippets require the appropriate supported properties, including an offer, review or aggregate rating in addition to the product name; eligibility must be checked against the current documentation. [9]

Do not add FAQ markup merely to promise FAQ search results, and do not put business self-reviews into schema to manufacture stars. Update schema whenever the corresponding visible facts change. Remove outdated markup if the underlying offer or business information is no longer true.

## 7 Product content and useful buyer guidance

The largest planned content opportunity is replacing generic enquiry language with confirmed buyer information. This requires a separate content release because the current instruction preserves the visible website. Keep the existing design and image assets when that release is authorised.

For each actual product, collect an owner-approved record: manufacturer and model; whether it is sold, sourced on request or only a reference; rated capacity; fork dimensions; lowered and raised heights; wheel options; operating environment; power system; charging needs; warranty; service terms; availability; and whether prices may be published. Include the source and confirmation date. Never infer capacity from a model number or image.

Suggested product-page outline: what the equipment does, suitable applications, confirmed specifications, practical selection questions, commercial conditions and a clear quote action. Use the existing page components where possible. Do not copy another supplier's description or imply that a reference photograph proves stock ownership.

Proposed educational topics for later releases:
- Manual versus electric pallet trucks for short and frequent warehouse journeys.
- Information to provide when requesting a pallet truck quotation.
- Checking pallet entry dimensions and aisle constraints before purchase.
- A buyer checklist for warehouse and loading-bay use, reviewed by the business.

Publish one useful page at a time with a knowledgeable reviewer, a real update date and relevant links back to product pages. Include original business experience only when it can be substantiated. Avoid unsupported safety or engineering instructions.

If two pages repeatedly answer the same need, improve their distinct purpose or consolidate them with an appropriate redirect. Do not delete a URL that already earns traffic without planning its replacement. Content quality and buyer usefulness take precedence over a fixed word count or publishing quota.

## 8 Performance and preserving the design

Measure before optimising. Run PageSpeed Insights for the homepage, catalogue and one manual and one electric reference page, on mobile and desktop. Record field-data availability separately from Lighthouse lab results. A new or low-traffic site may not have enough public field data; this is not a failure. [10]

Targets for good Core Web Vitals are LCP at most 2.5 seconds, INP at most 200 milliseconds and CLS at most 0.1, evaluated at the 75th percentile. Use them as user-experience targets, not a ranking guarantee. Compare measurements under similar conditions and avoid treating one Lighthouse score as definitive. [10]

This release preloads the existing first homepage showcase image. It keeps the same URL and pixels and does not add a new image download. Measure the resulting loading behaviour before extending preload hints; preloading every slide or every catalogue image can compete with critical resources.

Potential later investigations:
- Identify the actual LCP element in the performance trace and check when its resource request starts.
- Inspect image dimensions and layout shifts before adding attributes that could change rendering.
- Check long tasks around animations, carousel controls and catalogue filters before changing JavaScript.
- Review third-party map loading and existing below-the-fold lazy loading.
- Consider alternative image encodings only with permission to change image files and a visual comparison against the originals.

Current safeguards are stronger than a visual spot check: compare HTML bodies byte for byte, verify unchanged CSS and JavaScript, and compare the image files against the baseline commit. Metadata edits can change a browser-tab title and search snippet while leaving the page itself unchanged. Any later performance release must also test the menu, slideshow, filters and enquiry flow on mobile.

## 9 Local profile consistency and authority

Website code is one part of local discovery. Local results also depend on relevance, distance and prominence, so a website release cannot control every search position. Keep the profile and website aligned around the real business. [2]

Owner tasks for the next phase: resolve the street-number discrepancy, add the correct public phone number if still missing, verify profile ownership, select the most accurate category and maintain holiday hours. Use the genuine business name; do not append a list of search keywords to it. Add real product and premises photos only where the business has permission to use them.

Create a repeatable review process after completed business: ask all eligible customers for honest feedback, provide the direct review link, and respond constructively. Do not buy reviews, offer rewards for positive ratings or selectively request reviews only from satisfied customers. Keep customer contact details out of public replies.

Build useful mentions through genuine supplier relationships, trade associations, local business organisations and relevant industry directories. Use consistent name, address, phone and website details. Verify that a directory is relevant and maintained before spending time or money on it. Do not buy bulk backlinks or exchange links purely for ranking. Google's spam policies cover manipulative links, keyword stuffing and doorway-style pages. [11]

The website should eventually explain the business's real experience and capabilities, with evidence approved by the owner. A legitimate manufacturer listing or published customer case study can be useful; an invented certification cannot. No outreach, profile edit or review request is sent as part of this code release.

## 10 Advanced measurement and lead quality

Begin with Search Console because it measures search discovery without requiring a new site analytics script. Compare complete 28-day periods, then longer periods as data grows. Segment brand queries, supplier/category queries, model queries, device and landing page. Average position is an aggregate indicator, not a universal rank for every user. [3]

Proposed analytics events for a later configured release: quote_success after confirmed provider success, click_phone, click_whatsapp and click_email. A button click is not a delivered enquiry and a WhatsApp click is not a completed conversation. Count successful form submissions only when the provider response confirms success. Deduplicate repeat success events for the same submission.

Before implementing analytics, choose the account, obtain the real measurement ID, document privacy and consent requirements for the chosen setup, and agree event names. Never send names, email addresses, phone numbers or message text as analytics parameters. This release installs no tracking tags or cookies.

Maintain a simple business scorecard: organic sessions if configured, organic enquiries, qualified enquiries, quotes issued and orders attributable to those enquiries. Record attribution uncertainty. Ask the sales team which enquiries match the business's equipment, location and budget rather than optimising for raw traffic alone.

Use an experiment log with date, page, change, hypothesis, measurement period and outcome. Example: improve a relevant page's title after it has meaningful impressions, then compare click-through rate for similar query groups. Check whether position or query mix changed before attributing the result to wording.

Advanced work such as log analysis depends on host access; GitHub Pages does not provide a conventional private web-server access log to this repository. Use Search Console's available reports and consider host capabilities only when a real diagnostic need exists.

## 11 Release checks and rollback

Run from the repository root: python3 scripts/check_seo.py. The checker validates all eight pages' unique metadata, canonical and sharing URLs, JSON-LD, one h1, local links and fragments, image alt attributes, sitemap membership, robots sitemap reference and CNAME. The GitHub Actions workflow repeats these checks on pushes and pull requests.

For this first release, run: python3 scripts/check_seo.py --baseline 5ebd9ae. This also checks that page bodies and tracked visual assets, CSS and JavaScript have not changed. Use the appropriate previous commit for later releases that promise visual preservation. A planned content release will intentionally require a different acceptance policy.

Before release: review git diff, run checks, confirm the correct production branch, and make sure no secrets or temporary files are staged. Commit the guide and implementation together or record their relationship clearly. Keep the working CNAME and existing public routes.

After release: check the hosting deployment result, request the live HTML for all canonical pages, inspect their new title and schema, check sitemap and robots responses, and open the homepage plus a representative product page. Verify the visible navigation and images. Do not submit a real test quote unless the owner has authorised sending it.

If a release causes a regression, revert its commit and push the revert through the normal deployment process. Do not force-push over unrelated work. Rerun the SEO checks and verify the public site after rollback. Record the problem, affected URLs and restored commit.

Passing local checks does not prove indexing, live deployment, Google rich-result eligibility or improved rankings. Keep those outcomes distinct in release notes. The Word document is rendered and visually reviewed before publication; page images used for document QA are not website assets.

## 12 Ninety day implementation plan

Days 1 to 7: release the invisible technical foundations, review the live deployment, establish Search Console access, submit the existing sitemap and record the baseline. Owner resolves address and trading-name consistency. Developer records any genuine crawl failures and fixes those before adding content.

Days 8 to 30: owner supplies confirmed product information and business details. Plan a separate content update using the current design. Validate LocalBusiness markup after the visible contact information is reconciled. Begin a genuine review-request process and check profile accuracy. Measure performance before selecting any optimisation.

Days 31 to 60: improve the highest-opportunity product pages using actual impressions and sales questions. Publish one or two useful buyer resources if the business can review them. Link those resources naturally to relevant catalogue pages. Configure consent-aware analytics only after account details and requirements are agreed. Recheck mobile performance after each material change.

Days 61 to 90: compare complete measurement periods. Investigate pages with impressions but weak relevant clicks, and pages with visits but poor-quality enquiries. Review duplicate intent, broken links and outdated facts. Pursue a small number of relevant business mentions. Extend the content plan only when the first pages demonstrate usefulness.

Suggested cadence: weekly check of indexing errors and lead quality; monthly review of search performance, profile details and technical checks; quarterly review of product facts, business information and the overall plan. Assign a named business owner and developer before work starts.

Decision rule: prioritise a confirmed blocker first, then high-value pages that already attract relevant impressions, then new content that answers an actual buyer need. These are working time windows, not promises of rankings or lead volume. Google discovery and competitive organic growth can take longer.

## 13 Backlog and completion criteria

Completed in the initial implementation: unique metadata across eight pages, consistent Open Graph URLs, website and page entities, existing-trail breadcrumb schema, homepage image preload and repeatable SEO checks. This guide and the JSON page map are part of the repository documentation.

Pending owner input: authoritative address number; business hours; accurate trading name if it differs from the website; confirmed product specifications; dealership or sourcing status; delivery and service coverage; warranty terms; publishable pricing. Completion means these facts are documented and approved, then reflected consistently in visible content and structured data.

Pending account actions: Search Console verification and sitemap submission; Business Profile maintenance; optional analytics setup. Completion means the account owner can access the reports and the real property or identifier has been tested. Do not mark these complete based on the presence of instructions alone.

Pending measurement: indexed page counts, query demand, mobile field metrics, click-through rates and qualified organic lead baseline. Completion means dated evidence is recorded, with missing data clearly distinguished from a zero value.

Pending content and performance releases: approved visible product information, buyer resources, measured performance fixes and any image changes separately authorised by the owner. Completion means the change meets its stated purpose, passes appropriate functional and visual checks, and is verified on the public site.

Maintain a release log with commit, deployment result, checks performed, business facts changed and follow-up owner. Update this guide when routes, hosting, domain, product range or measurement tools change. Never describe the entire SEO programme as finished after a metadata release: it is a cycle of verified facts, useful pages, reliable delivery and measured improvement.

## 14 Official references

Consulted 22 November 2026. Recheck the current guidance before introducing new structured-data features or account integrations.

[1] Google Search Central SEO Starter Guide
https://developers.google.com/search/docs/fundamentals/seo-starter-guide

[2] Google Business Profile local ranking guidance
https://support.google.com/business/answer/7091

[3] Google Search Central Search Console introduction
https://developers.google.com/search/docs/monitor-debug/search-console-start

[4] Google Search Central recrawl requests
https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

[5] Google Search Central canonical URL guidance
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

[6] Google Search Central structured data policies
https://developers.google.com/search/docs/appearance/structured-data/sd-policies

[7] Google Search Central breadcrumb structured data
https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

[8] Google Search Central local business structured data
https://developers.google.com/search/docs/appearance/structured-data/local-business

[9] Google Search Central product snippet structured data
https://developers.google.com/search/docs/appearance/structured-data/product-snippet

[10] Google web.dev Core Web Vitals
https://web.dev/articles/vitals

[11] Google Search Central spam policies
https://developers.google.com/search/docs/essentials/spam-policies
