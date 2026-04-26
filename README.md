# psp-calculator
# Positive Salary Packaging Calculator

A web-based salary packaging calculator built with React and Vite, compliant with the Fringe Benefits Tax Assessment Act 1986 (FBTAA). Hosted via GitHub and Netlify.

---

## Features

- 2025–26 ATO resident tax rates
- 2025–26 HELP/HECS marginal repayment system
- FBT exempt, charitable institution, rebatable and full FBT employer types
- All major packaged benefit types including mortgage, rent, credit card, meal entertainment, remote area benefits, LAFHA, relocation, portable electronic devices, mobile phone, tools of trade and more
- Remote area eligibility checker using ATO List 1 and List 2 suburbs
- LAFHA exempt amount calculator with ATO reasonable food amounts (TR 2022/1)
- FBT rebatable employer treatment with gross FBT, rebate and net cost to employee
- Remote area pre-tax and post-tax splits (s.60 rent 50/50)
- Cap enforcement with acceleration option across pay cycles
- Pay cycle aware outputs (weekly, fortnightly, monthly)
- Annual packaging fee (incl. GST) split across pay cycles
- Benefit-specific substantiation and documents checklist
- Printable quote with Employee Authority to Proceed and General Advice Warning

---

## Project Structure

```
psp-calculator/
├── .gitignore
├── netlify.toml
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── main.jsx
    └── App.jsx
```

---

## Local Development

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Setup

```bash
git clone https://github.com/YOUR_ORG/psp-calculator.git
cd psp-calculator
npm install
npm run dev
```

App runs at `http://localhost:5173`

```bash
npm run build     # production build to dist/
npm run preview   # preview production build locally
```

---

## Deployment

### GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_ORG/psp-calculator.git
git push -u origin main
```

### Netlify

1. Log in to [netlify.com](https://netlify.com)
2. Click **Add new site** > **Import an existing project** > **GitHub**
3. Select the `psp-calculator` repository
4. Netlify auto-detects build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

Live in approximately 60 seconds at `https://psp-calculator.netlify.app`

### Custom Domain (optional)

1. Netlify > **Domain management** > **Add custom domain**
2. Enter e.g. `calculator.positivesp.com.au`
3. Update DNS with CNAME record as instructed by Netlify
4. SSL certificate provisioned automatically via Let's Encrypt

### Automatic Deploys

Every push to `main` triggers an automatic rebuild and redeploy. No manual action required.

---

## Making Updates

### Tax rates and thresholds

Located at the top of `src/App.jsx`:

```js
const FRATE = 0.47    // FBT rate
const XCAP  = 9010    // FBT exempt general cap
const CCAP  = 15900   // Charitable institution cap
const MCAP  = 2650    // Meal entertainment cap
const RCAP  = 30000   // Rebatable employer cap
```

Tax brackets are in the `TB` array. HELP thresholds are in the `cHELP` function.

### Default packaging fee

```js
const [pkgFee, setPkgFee] = useState("257.40");
```

Update this value for a new default annual fee incl. GST.

### Remote area suburb lists

`L1R` and `L2R` arrays near the top of `src/App.jsx`. Update when ATO publishes revised lists.

---

## Compliance References

| Area | Reference |
|---|---|
| General salary packaging | s.20 FBTAA 1986 |
| FBT exempt employers | s.57A FBTAA 1986 |
| Remote area housing | s.58ZC FBTAA 1986 |
| Remote area rent | s.60 FBTAA 1986 |
| Remote area utilities | s.58ZD FBTAA 1986 |
| Remote area holiday travel | s.60AA FBTAA 1986 |
| LAFHA | s.30–31 FBTAA 1986 |
| Portable electronic devices | s.58X FBTAA 1986 |
| Relocation expenses | s.58B FBTAA 1986 |
| LAFHA reasonable food amounts | ATO TR 2022/1 |
| HELP repayment thresholds | ATO 2025–26 |
| Resident tax rates | ATO 2025–26 |

---

## Important Notices

This calculator provides general information only and does not constitute financial, taxation or legal advice. Salary packaging outcomes vary depending on individual circumstances. Always verify current ATO rates at [ato.gov.au](https://www.ato.gov.au) before each FBT year. Positive Salary Packaging is not a licensed financial adviser.

---

## Support

- **Phone:** 1300 946 527
- **Email:** psp@positivesp.com.au
- **Web:** [positivesp.com.au](https://www.positivesp.com.au)

---

## Licence

Proprietary — Positive Salary Packaging. All rights reserved.
