ClimateReady
> **Know your risk. Prepare before it happens.**  
> A premium, hyper-localized climate intelligence and household disaster preparedness platform designed for Indian communities, with specialized operational focus on Andhra Pradesh (Rayalaseema region: Tirupati and Anantapur).
![Live Demonstration](https://ais-pre-66aer4cpgfmphg7nvzhpdm-129822735987.asia-northeast1.run.app)
![React 19](https://react.dev/)
![TypeScript](https://www.typescriptlang.org/)
![Vite](https://vitejs.dev/)
![Tailwind CSS](https://tailwindcss.com/)
![Leaflet GIS](https://leafletjs.com/)
---
1. The Climate Preparedness Problem
India faces escalating, compound climate hazards that threaten lives, civic infrastructure, and household livelihoods. In peninsular and south-central India—particularly the semi-arid Rayalaseema plateau of Andhra Pradesh—urban and rural populations grapple with two opposing yet severe seasonal hazards:
Lethal Summer Heatwaves (March – June):
Rayalaseema districts like Anantapur and Tirupati regularly record sustained temperatures exceeding 42°C to 45°C. Combined with solar radiation and high wet-bulb temperatures, this causes acute thermal exhaustion, heat stroke, dehydration, and lost labor productivity for outdoor laborers, agricultural workers, street vendors, and elderly citizens.
Flash Floods & Monsoon Inundation (October – December):
Cyclonic depressions originating in the Bay of Bengal trigger intense, localized cloudbursts across the Swarnamukhi river catchment (affecting Tirupati and surrounding low-lying temple transit corridors) and the Penna river basin (affecting Anantapur urban drainage channels). Inundations overwhelm municipal storm drains, submerge residential settlements, contaminate drinking water supplies, and trap families in vulnerable ground-floor dwellings.
The "Last-Mile Civic Action Gap"
While premier statutory agencies such as the India Meteorological Department (IMD), National Disaster Management Authority (NDMA / SACHET), Central Water Commission (CWC / FloodWatch India), and the Andhra Pradesh State Disaster Management Authority (APSDMA) publish scientific meteorological bulletins, regular citizens and municipal ward secretariats (Grama/Ward Sachivalayams) face significant hurdles:
Alert Fatigue & Opacity: Raw technical bulletins often fail to distinguish between ambient temperature observations, mathematical thermal indices, seasonal reminders, and legally declared disaster warnings.
Absence of Actionable Protocol: Citizens receive numbers ("44°C alert") without concrete, sequential instructions on how to secure their homes, protect vulnerable family members, or access physical civic relief.
Disconnected Local Infrastructure: Residents often do not know where physical, ward-level relief facilities are located—such as municipal Chalivendras (free drinking water/buttermilk kiosks), sandbag distribution depots, or cyclone evacuation assembly havens.
ClimateReady bridges this last-mile gap, transforming complex atmospheric science into hyper-local, actionable household disaster readiness.
---
2. Target Users
ClimateReady is engineered for everyday Indian citizens, civic volunteers, and community administrators:
Civic Households & Families: Residents seeking clear, reliable understanding of day-to-day weather hazards, step-by-step preparation checklists, emergency supply reminders, and printable readiness plans.
Vulnerable Demographics:
Outdoor Workers & Daily Wage Laborers: Construction workers, auto-rickshaw drivers, delivery couriers, and agricultural laborers needing wet-bulb caution, peak-heat advisory windows, and nearest Chalivendra hydration points.
Elderly, Children & Chronically Ill Citizens: Families caring for individuals vulnerable to heat exhaustion, power-outage medical risks, or flood evacuation challenges.
Low-Lying Ward Residents: Inhabitants of flood-prone municipal zones (e.g., Korlagunta, Padmavathipuram in Tirupati; Old Town, Rudrampeta in Anantapur).
Ward Secretariats & Sachivalayam Staff: Grassroots community coordinators in Andhra Pradesh municipal corporations who monitor ward vulnerability matrices and direct citizens to municipal sandbag points and evacuation havens.
---
3. Actual Implemented Features
ClimateReady was built with strict data integrity: every displayed metric, alert, and map point is accurately classified, grounded in real API data, or explicitly marked as an educational simulation.
A. Live Meteorological Intelligence (Open-Meteo Integration)
Real-Time Atmospheric Observation: Fetches current temperature, apparent ("feels-like") temperature, relative humidity, wind speed, and WMO weather condition codes directly from the Open-Meteo API.
24-Hour Hourly Timeline: Interactive bar-and-temperature strip providing hour-by-hour temperature progression and precipitation probability percentages.
7-Day Meteorological Outlook: Multi-day forecast displaying maximum/minimum temperatures and expected weather patterns.
Resilient Fallback & Refresh: In-app manual refresh with live timestamping, network error catching, and local cache retention to ensure uninterrupted access even during connectivity drops.
B. Dual Demonstration Basins & Geocoding Search
Primary Demonstration Scenarios:
Tirupati Municipal Corporation (Swarnamukhi River Basin): Baseline coordinates (13.6288°N, 79.4192°E), vulnerable wards (Korlagunta, Padmavathipuram, Leela Mahal, Bhavani Nagar, Renigunta Road), and specialized temple-transit contingency profiles.
Anantapur Municipal Corporation (Penna River Basin): Baseline coordinates (14.6819°N, 77.6006°E), vulnerable wards (Old Town, Rudrampeta, Clock Tower Ward, Sarada Nagar, Kovur Nagar), and semi-arid drought/heat island profiles.
GPS Auto-Detection: Seamless one-click browser geolocation (`navigator.geolocation`) with non-intrusive permissions, graceful denial handling, and coordinate resolution.
Interactive "Search India" Modal: Integrated modal powered by the Open-Meteo Geocoding API, enabling search and instant live weather loading for any Indian city or municipality (e.g., Visakhapatnam, Vijayawada, Hyderabad, Kurnool, Bengaluru, Delhi).
C. 4-Tier Alert Classification Architecture
To eliminate civic misinformation, all alerts are strictly organized into four color-coded categories:
Verified Official Alerts: Direct statutory advisories attributed to official agencies (IMD, APSDMA, CWC FloodWatch).
Live Weather Observations: Direct, unaugmented empirical readings from the Open-Meteo atmospheric API.
Experimental Risk Indicators: Calculated computational models (e.g., Heat Index algorithms based on temperature and relative humidity).
Standing Preparedness Reminders: Standard operating procedures and seasonal precautions (e.g., maintaining ORS packets, clearing terrace drainage spouts).
D. Dedicated Hazard Command Modules
Heatwave Defense Section:
Wet-bulb and apparent heat index tracking.
Official APSDMA / IMD warning tier thresholds (Yellow: 40–41.9°C Alert; Orange: 42–44.9°C Severe Alert; Red: ≥45°C Disaster Declaration).
Practical preventive protocols tailored to Indian homes (e.g., vetiver/khus blinds, buttermilk/ORS hydration, limiting outdoor work between 11:30 AM and 3:30 PM).
Catchment Flood Defense Section:
River basin hydrological status (Swarnamukhi / Penna).
Rainfall probability indicators and municipal warning stages (Normal Monitoring → Water Level Alert → Evacuation Stage).
Low-lying ward flash flood guidance and electrical safety measures.
E. Leaflet OpenStreetMap GIS & Ward Risk Explorer
Interactive Geospatial Map: Embedded responsive Leaflet GIS engine loaded with clean CartoDB Positron and OpenStreetMap tiles.
Physical Civil Defense Infrastructure Layers:
Chalivendras: Drinking water and spiced buttermilk kiosks established under municipal and NGO patronage across Tirupati and Anantapur.
Municipal Sandbag & Silt Depots: Pre-monsoon drainage stations for household flood prevention.
Evacuation Assembly Havens: Flood and cyclone relief shelters located in elevated municipal schools, community kalyana mandapams, and civic auditoriums.
Ward Vulnerability Matrix: Toggable side-by-side data table highlighting specific ward vulnerabilities, historical inundation risks, and key landmarks.
F. Interactive Household Preparedness Planner
Hazard-Specific Action Checklists: Separate, actionable tasks for Heatwave readiness (e.g., preparing cold packs, stocking electrolyte salts, insulating window panes) and Flood readiness (e.g., waterproofing ration cards and Aadhaar documents, elevating power strips, checking non-return sewer valves).
Dynamic Household Readiness Score: Immediate mathematical calculation of the household readiness score (0% to 100%) that updates in real time as tasks are checked or unchecked.
Local Persistence (`localStorage`): Checkbox progress and custom household notes persist across page reloads via `climateready\_india\_checklist\_v2` and `climateready\_india\_household\_notes`.
Top 3 Priority Actions Widget: Dynamically displays the three highest-impact remaining tasks for immediate execution.
Household Emergency Notes: Private, in-browser editable notepad for local emergency contacts, ration storage locations, and medical details.
G. Synthetic Community Resilience Gap Analysis
Transparently labeled synthetic aggregate metric showing community-level preparedness gaps (e.g., proportion of homes with elderly hydration protocols, battery backups, or sandbag access).
Clearly disclosed as synthetic demonstration data to educate coordinators on neighborhood disaster vulnerabilities without claiming fictitious user accounts.
H. Trilingual Localization Engine
Comprehensive multi-language switching across all application views:
English (Default)
Telugu (తెలుగు) (Native state language of Andhra Pradesh)
Hindi (हिन्दी) (National official language)
I. Printable Household Action Plan
Dedicated Print / Export Plan modal with clean, ink-friendly monochrome styling, generating an emergency document ready to be affixed to a family refrigerator or community notice board.
---
4. Technology Stack
ClimateReady is built on a modern, high-performance, purely client-side React architecture:
Layer	Technology	Details
Frontend Framework	React 19 (`react: ^19.0.1`, `react-dom: ^19.0.1`)	Modern functional components with React Hooks
Language & Typings	TypeScript 7 (`typescript: ^7.0.2`)	Strict type checking with clean domain models
Build Tool & Dev Server	Vite 8 (`vite: ^8.3.0`)	Lightning-fast HMR and optimized production bundling
Styling & Design System	Tailwind CSS v4 (`@tailwindcss/vite: ^4.3.3`)	Clean, non-generic palette (Deep Navy, Forest Green, Teal, Amber, Slate)
Geospatial Mapping	Leaflet (`leaflet: ^1.9.4`, `@types/leaflet: ^1.9.22`)	Responsive map engine with custom SVGs and CartoDB base tiles
Iconography	Lucide React (`lucide-react: ^0.546.0`)	Clean, crisp, purposeful visual hierarchy
Animations	Motion (`motion: ^12.23.24`)	Restrained, accessible transitions
Weather & Geocoding APIs	Open-Meteo REST APIs	Free, open-access meteorological forecast and geocoding services
Client Persistence	HTML5 Web Storage API	Browser `localStorage` for privacy-first, zero-login retention
---
5. Getting Started & Setup Instructions
Prerequisites
Node.js: Version 18.x, 20.x, or 22.x LTS installed.
npm or bun: npm comes bundled with Node.js.
Installation
Clone the repository:
```bash
   git clone https://github.com/Mani-king/ClimateReady.git
   cd ClimateReady
   ```
Install project dependencies:
```bash
   npm install
   ```
Start the local development server:
```bash
   npm run dev
   ```
The application will be accessible at: `http://localhost:3000` (or `http://localhost:5173` depending on available ports).
Run the existing resilience-logic tests:
```bash
   npm test
   ```
(Runs the project's existing tests for checklist progress, priority actions, filtering, and hazard visual classification.)
Run TypeScript lint verification:
```bash
   npm run lint
   ```
(Executes `tsc --noEmit` to verify type safety without errors).
Build for production:
```bash
   npm run build
   ```
(Produces an optimized, statically deployable bundle in the `dist/` directory).
Preview the production build locally:
```bash
   npm run preview
   ```
---
6. Development and Git Workflow
This repository is maintained through incremental, reviewable changes. For each change, review the diff, run the relevant checks, and commit only work that has actually been completed and verified. Suggested local workflow:
```bash
git status
git diff
npm test
npm run lint
npm run build
```
Use a descriptive commit message that matches the actual change (for example, `docs: clarify setup instructions` or `test: add resilience logic test command`). Do not commit credentials, `.env` files, or generated build output.
7. Live Demonstration Link
The platform is deployed and running in Google AI Studio Cloud preview:
🔗 ClimateReady Live Platform
Experience real-time weather retrieval, switch between Tirupati and Anantapur municipal basins, search any Indian city, explore the interactive Leaflet GIS map with Chalivendra hydration markers, test the dynamic household readiness score, and toggle Telugu / Hindi localization.
---
8. Known Limitations & Civic Disclosures
In adherence to scientific integrity and disaster communication ethics, the following operational boundaries are clearly established:
Boundary Between Live Data and Simulation:
Atmospheric Data is Real & Live: Current temperatures, apparent temperatures, relative humidity, wind speed, hourly forecast curves, and 7-day outlooks are fetched in real-time from the Open-Meteo meteorological API.
Disaster Tiers & Hydrological Stages are Pedagogical Scenarios: The warning levels, flood status switches, and river stage thresholds are simulated demonstration models designed to showcase municipal emergency workflows. They do not replace statutory life-safety declarations from the India Meteorological Department (IMD), APSDMA Control Room (Toll-Free 1070), or District Collectorate Emergency Operations Centres (Toll-Free 1077).
Absence of Real-Time Sensor Telemetry:
The application does not connect to automated rain-gauge (ARG) hardware, river telemetry radar sensors, or statutory siren broadcast towers.
No Direct Webhook Push Infrastructure:
National emergency alerts (such as cell broadcast SMS from NDMA SACHET) require telecom-level infrastructure. ClimateReady acts as a civic web dashboard and preparedness planner rather than an automated push SMS gateway.
Synthetic Community Resilience Metrics:
The "Community Preparedness Gaps" section presents aggregate, synthetic demographic data to highlight neighborhood readiness opportunities. It does not reflect or store private census data or registered user information.
Offline Operation:
User checklist selections, emergency notes, and localized preferences persist completely offline via browser `localStorage`. However, initial map tile rendering and live weather updates require an active internet connection.
---
9. Official Statutory Helplines (Andhra Pradesh)
During an active disaster, citizens should immediately consult official statutory emergency services:
State Disaster Control Room (APSDMA): `1070`
District Emergency Operations Centre (DEOC): `1077`
Tirupati Municipal Corporation (MCT) Control Room: `0877-2256766`
Anantapur Municipal Corporation Control Room: `08554-220010`
Police Emergency: `112` / `100`
Medical Emergency / Ambulance: `108`
National Disaster Management Authority (SACHET): sachet.ndma.gov.in
India Meteorological Department (IMD Amaravati): mausam.imd.gov.in
---
ClimateReady — Built for hackathon demonstration to advance digital climate resilience, disaster preparedness, and civic safety across Indian communities.
