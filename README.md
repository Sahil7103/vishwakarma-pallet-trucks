# Vishwakarma Pallet Trucks — Website & Operations Runbook

> **Purpose:** Permanent project documentation for the client, developer, future maintainers, domain renewal, deployment recovery, and troubleshooting. Updated 22 November 2026. **Documentation is not a live uptime certificate.**

## Quick reference

| Item | Value |
| --- | --- |
| Business | Vishwakarma Hand Pallet Truck / Vishwakarma Pallet Trucks |
| Custom domain | https://vishwakarmapallettrucks.in |
| WWW alias | https://www.vishwakarmapallettrucks.in |
| Previous GitHub Pages project URL | https://sahil7103.github.io/vishwakarma-pallet-trucks/ |
| GitHub repository | https://github.com/Sahil7103/vishwakarma-pallet-trucks |
| Repository owner | Sahil7103 |
| Production branch | `main` (confirm current Pages source in Settings) |
| GitHub Pages settings | https://github.com/Sahil7103/vishwakarma-pallet-trucks/settings/pages |
| Domain registrar | BigRock India |
| BigRock management | https://myorders.bigrock.in/ |
| Business enquiry email (in site source) | vishwakarmapallet5578@gmail.com |
| Domain registration shown in registrar screenshot | 22 Nov 2026 to 22 Nov 2027 |
| DNS TTL selected during setup | 4 hours |
| Hosting arrangement | Client-registered domain; website source/deployment managed under developer's GitHub account |

**Ownership:** Domain payment/registrant details belong to the client; GitHub account and repository are developer-managed. Keep renewal, registrar access, site ownership, handover and maintenance responsibilities agreed in writing. Never put passwords, card details, identity documents, API secrets or private tokens in this repository.

## 1. Project overview

A responsive, static marketing/catalogue website for a pallet-truck and material-handling business. It showcases manual and automatic pallet trucks, explains applications, and provides business enquiry/contact paths.

**Technology verified in repository:** HTML, CSS, browser-side JavaScript, SVG assets, GitHub Pages and DNS. No `package.json` was found at repository root; do not assume an npm build or backend server is required.

### Pages and features

- Homepage: `index.html`; styles in `style.css`, motion logic in `motion.js`.
- Product catalogue under `products/`, with six product detail routes: `manual-pallet-truck/`, `warehouse-pallet-truck/`, `loading-bay-pallet-truck/`, `automatic-pallet-truck/`, `toyota-bt-levio/`, `still-exh-16/`.
- Homepage showcase: four scenes, next/previous controls, play/pause, automatic change every **5 seconds** in `motion.js`. It respects reduced-motion preferences and pauses in hidden tabs.
- Responsive layouts and contact/quotation enquiry UI. Verify real email delivery separately; HTML form presence does not prove delivery.
- SEO: metadata, organization structured data and `sitemap.xml`.

Product descriptions and photographs must be reviewed with the client before making claims about availability, specifications or brands.

## 2. Development and launch lifecycle

This is a **reconstructed operational history** from the project work and current files, not a verified commit-by-commit audit:

1. Defined business goals: industrial B2B website, product discovery, enquiry conversion, professional visual design.
2. Built the static homepage and product catalogue using HTML/CSS/JavaScript and assets.
3. Added product detail pages, responsive styling, navigation, contact/enquiry UI and motion effects.
4. Added an automatic showcase carousel, later adjusted to a **5-second** interval.
5. Connected source code to GitHub repository `Sahil7103/vishwakarma-pallet-trucks` and published using GitHub Pages.
6. Tested or iterated on mobile layouts and enquiry integration during development; repeat final acceptance tests after domain migration.
7. Client purchased `vishwakarmapallettrucks.in` through BigRock on 22 Nov 2026.
8. Entered BigRock DNS A and CNAME records; screenshots confirmed all five saved in registrar dashboard.
9. Added a root `CNAME` file in the repository containing `vishwakarmapallettrucks.in` (verified in repository).
10. **Pending independent confirmation:** current public DNS resolution, GitHub Pages custom-domain status, HTTPS certificate, redirects, page assets, all routes, and real enquiry delivery.

Do not mark deployment complete until the acceptance checklist below passes.

## 3. How domain and hosting connect

```text
Visitor opens vishwakarmapallettrucks.in
       |
       v
Public DNS (records managed in BigRock)
       |
       +-- A records for apex domain -> GitHub Pages IPv4 servers
       +-- CNAME for www -> sahil7103.github.io
       |
       v
GitHub Pages custom-domain mapping / HTTPS certificate
       |
       v
Published static files from Sahil7103/vishwakarma-pallet-trucks
```

**Domain registration is not hosting.** BigRock registers the name and hosts DNS; GitHub Pages serves website files. Client domain ownership and developer GitHub hosting can coexist. The domain owner can change hosting later by updating DNS.

### BigRock DNS configuration (confirmed saved in screenshots)

| Type | Hostname | Destination |
| --- | --- | --- |
| A | `vishwakarmapallettrucks.in` (apex/root) | `185.199.108.153` |
| A | `vishwakarmapallettrucks.in` (apex/root) | `185.199.109.153` |
| A | `vishwakarmapallettrucks.in` (apex/root) | `185.199.110.153` |
| A | `vishwakarmapallettrucks.in` (apex/root) | `185.199.111.153` |
| CNAME | `www.vishwakarmapallettrucks.in` | `sahil7103.github.io` |

- TTL: **4 hours** selected in BigRock.
- BigRock nameservers were `dns1.bigrock.in` through `dns4.bigrock.in`; do not change them unless deliberately moving DNS hosting.
- In BigRock: **Orders → vishwakarmapallettrucks.in → Name Servers & DNS → DNS Records**.
- The apex A records and www CNAME are separate. Do **not** point the www CNAME to the old repository path or include `https://`.
- Avoid conflicting records for the same host. Preserve any MX/TXT email records and existing verification records.
- BigRock's form may require `@` or another root notation, but the **saved record must display the apex hostname**. Screenshots showed correct apex entries.
- DNS propagation and cached answers can take time; BigRock warned 4–6 hours for changes.

### GitHub Pages custom-domain setup

1. Open [repository Pages settings](https://github.com/Sahil7103/vishwakarma-pallet-trucks/settings/pages).
2. Confirm the intended publishing source (branch/folder or GitHub Actions workflow) without changing a working deployment.
3. Set **Custom domain** to `vishwakarmapallettrucks.in` and save.
4. Confirm repository root `CNAME` file contains exactly `vishwakarmapallettrucks.in` (already verified as present when this README was written).
5. Wait for GitHub's DNS check and certificate provisioning; enable **Enforce HTTPS** when available.
6. Test both apex and www over HTTPS and confirm canonical redirect behavior.
7. Confirm the old project URL redirects as expected; don't rely on it as the primary customer-facing URL.

Official references: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) and [GitHub HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

### Important migration issue: hardcoded old paths

At README creation time, `index.html` still contained links such as `/vishwakarma-pallet-trucks/products/`, `/vishwakarma-pallet-trucks/motion.js`, and `/vishwakarma-pallet-trucks/assets/...`. It also referenced the **old** GitHub URL in its canonical tag and organization structured data. `sitemap.xml` also used old URLs.

**These are a known migration risk:** on the new root domain, absolute `/vishwakarma-pallet-trucks/...` paths may break. Audit all HTML, CSS and JS references, product pages, metadata, sitemap and robots links; convert to correct root-domain paths (or appropriately relative URLs) in a separate reviewed code change. Do not simply declare the new domain fully functional because DNS is correct.

## 4. Updating the website

### Through GitHub

1. Open the repository and inspect the latest `main` commit.
2. Create a feature branch for meaningful changes, especially navigation, contact forms and domain paths.
3. Edit the relevant HTML/CSS/JS/assets. Keep mobile layout and accessibility intact.
4. Test locally (for example `python -m http.server 8000` from the repository root) and check in browser DevTools for 404s and JavaScript errors.
5. Open a pull request or review diff; merge to the branch configured for GitHub Pages.
6. Inspect GitHub Pages deployment status and retest the public domain after deployment.

**Caution:** local root paths behave differently from the old `/vishwakarma-pallet-trucks/` project URL. Test using the same path structure as production.

### Git commands

```bash
git clone https://github.com/Sahil7103/vishwakarma-pallet-trucks.git
cd vishwakarma-pallet-trucks
git checkout -b docs-or-fix
# make changes and test
git add .
git commit -m "Describe change"
git push -u origin docs-or-fix
```

Merge the reviewed branch to the Pages publishing branch. For an emergency rollback, use GitHub history to revert the problematic commit rather than deleting the repository.

## 5. Enquiry/contact operations

The business enquiry email configured in the site is `vishwakarmapallet5578@gmail.com`. During development the quotation form was integrated with FormSubmit. **Confirm the current form `action` and configuration in the deployed HTML before assuming a provider or recipient.**

After a change, ask the client for permission before sending a real test enquiry. Verify receipt in Inbox and Spam, validate success/error feedback, and confirm mobile submission. Never commit an email password. For higher reliability and reporting, consider a maintained form service or backend with spam protection and clear consent/privacy language.

## 6. Domain registration, verification and renewal

- BigRock screenshots showed registration **22 Nov 2026 – 22 Nov 2027**, with **auto-renew switched off** at the time of the screenshot. Recheck the live registrar dashboard; screenshots are not proof of current renewal state.
- BigRock displayed **Registrant Verification in process**. The client must complete email verification and required `.in` eKYC within the registrar's deadline to avoid suspension.
- The client should retain control of domain registration, registrant contact details and renewal billing.
- Check renewal pricing, payment method and expiry well before the deadline.
- **Never share** Aadhaar/PAN documents, OTPs, card details or account passwords in this README or public issues.
- If the registrar or hosting account changes, record the change date, responsible person, new nameservers, DNS records and rollback plan here.

## 7. Troubleshooting playbook

| Symptom | Checks / response |
| --- | --- |
| Domain not resolving | Verify BigRock registration/verification status, nameservers, all four A records and public DNS propagation. |
| `www` fails | Confirm `www` CNAME points to `sahil7103.github.io`, no conflicting record, and GitHub custom domain is configured. |
| GitHub shows DNS check failure | Verify saved records publicly, check GitHub Pages settings and wait for DNS cache expiry. |
| HTTPS unavailable | Check DNS and Pages custom domain; wait for certificate provisioning; then enable Enforce HTTPS. |
| Homepage loads but images/styles fail | Check browser Network tab for 404s; search code for hardcoded `/vishwakarma-pallet-trucks/` paths. |
| Product links fail | Audit internal links and all six product routes for new root-domain paths. |
| Carousel stops | Check `motion.js` loads, console errors, reduced-motion preference, tab visibility and pause button. |
| Enquiry email missing | Confirm current form endpoint, provider activation, recipient inbox/spam and response codes; don't expose credentials. |
| Old site shows after changes | Confirm branch/deployment commit, browser cache and DNS; inspect GitHub Pages settings. |
| Domain suspended | Resolve BigRock eKYC/email verification, renewal or registrar compliance issue with the client. |
| Site down due to GitHub account/repo | Restore repository/Pages settings or move static files to alternative hosting; update DNS if necessary. |

Useful checks:

```bash
nslookup vishwakarmapallettrucks.in
nslookup www.vishwakarmapallettrucks.in
curl -I https://vishwakarmapallettrucks.in/
curl -I https://www.vishwakarmapallettrucks.in/
```

Check redirects, HTTPS certificates and response bodies too; a successful DNS lookup alone does not prove the application works.

## 8. Production acceptance checklist

- [ ] BigRock registrant email verified and `.in` eKYC completed.
- [ ] Public DNS resolves apex to GitHub Pages and www to `sahil7103.github.io`.
- [ ] GitHub Pages custom domain confirmed and HTTPS enforced.
- [ ] Homepage works on the new domain with no 404s or console errors.
- [ ] Navigation and all six product pages work on the new domain.
- [ ] Images, CSS, motion.js and carousel load and work.
- [ ] Desktop, iPhone-width and Android-width layouts tested.
- [ ] WhatsApp, phone, map and other outbound links tested.
- [ ] Quotation submission tested with client's permission; email received.
- [ ] Canonical tags, sitemap, structured data and internal links updated to custom domain.
- [ ] Client approves content and has documented access, maintenance and renewal arrangements.

## 9. AdSense and commercial hosting

**AdSense is not automatically enabled by buying a domain.** It requires the site to meet Google's policies, an approved publisher account, site verification, suitable privacy disclosures, and any required `ads.txt`. No AdSense approval or revenue is claimed here. Obtain the client's permission before placing advertisements or connecting a developer-owned publisher account.

**Hosting policy warning:** GitHub Pages is intended for static sites and has restrictions concerning sites primarily directed at commercial transactions. Review [GitHub Pages limits and terms](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) and consider a commercial-friendly static host for a client business. The custom domain can be retained when moving hosts by updating DNS.

## 10. Future handover / disaster recovery

Keep a current clone or archive of the repository, export or document DNS records, and maintain a secure client-owned record of registrar ownership, renewal date, hosting provider, form provider and responsible support contacts. Never store account secrets in Git.

When transferring hosting: deploy a verified copy to the new provider, confirm all pages and forms, update DNS at BigRock, wait for propagation, confirm HTTPS, then retire the old deployment. Keep a rollback window.

### Change log

| Date | Event |
| --- | --- |
| Before 22 Nov 2026 | Static site developed and published via GitHub Pages; catalogue, enquiry UI and showcase carousel added. |
| 22 Nov 2026 | Client purchased `.in` domain at BigRock; screenshots confirmed four apex A records and one www CNAME. |
| 22 Nov 2026 | Repository root `CNAME` confirmed; old hardcoded asset/link paths and SEO URLs identified for migration review. |
| 22 Nov 2026 | This operations README added. No live deployment success asserted by this documentation change. |

**Maintenance rule:** Update this runbook whenever the registrar, hosting provider, DNS, form integration, repository structure or deployment procedure changes.
