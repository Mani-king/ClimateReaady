# ClimateReady 🌦️

### Know your risk. Prepare before it happens.

**ClimateReady** is a climate preparedness and household resilience platform designed to help Indian communities understand local weather conditions, prepare for heatwaves and floods, and take practical steps before emergencies occur.

The project focuses on **Tirupati and Anantapur in Andhra Pradesh's Rayalaseema region**, while supporting location search for other places.

**Live Demo:** [Open ClimateReady](https://ais-pre-66aer4cpgfmphg7nvzhpdm-129822735987.asia-northeast1.run.app)

---

## 📌 Table of Contents

* [Problem Statement](#-problem-statement)
* [Our Solution](#-our-solution)
* [Key Features](#-key-features)
* [Target Users](#-target-users)
* [Technology Stack](#-technology-stack)
* [Data Sources and Transparency](#-data-sources-and-transparency)
* [Getting Started](#-getting-started)
* [Project Structure](#-project-structure)
* [Testing and Quality Checks](#-testing-and-quality-checks)
* [Privacy and Security](#-privacy-and-security)
* [Limitations](#-limitations)
* [Future Improvements](#-future-improvements)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🌍 Problem Statement

Communities face increasing challenges from extreme heat, heavy rainfall, flooding, and other weather-related hazards.

In Andhra Pradesh's Rayalaseema region, households may need to prepare for:

* **Heatwaves:** High temperatures, dehydration, and heat-related illness.
* **Heavy rainfall and flooding:** Waterlogging, unsafe roads, damaged property, and disrupted services.
* **Household preparedness gaps:** Missing emergency supplies, unprotected documents, and unclear family emergency plans.
* **Information gaps:** Difficulty turning weather information into practical, location-relevant preparedness actions.

Weather observations alone do not tell people what to do next. Households also need understandable guidance, preparation checklists, and information that helps them plan ahead.

ClimateReady addresses this challenge by combining weather information, hazard-focused guidance, interactive maps, and household preparedness tools in one interface.

## 💡 Our Solution

ClimateReady transforms weather information and general disaster-preparedness guidance into an accessible, actionable experience.

The platform brings together:

1. Local weather observations and forecasts.
2. Heatwave and flood preparedness information.
3. Location-based weather search.
4. Interactive risk and civic-infrastructure maps.
5. Household emergency checklists.
6. A household readiness progress indicator.
7. Community resilience demonstration data.
8. English, Telugu, and Hindi language support.
9. A printable household action plan.

The goal is simple: **help people understand potential hazards and prepare before conditions become dangerous.**

---

## 🚀 Key Features

### 1. Live Weather Dashboard

ClimateReady retrieves weather information using the Open-Meteo API.

The dashboard can display:

* Current temperature.
* Apparent or feels-like temperature.
* Relative humidity.
* Wind speed.
* Weather conditions.
* Hourly weather information.
* Precipitation probability.
* A seven-day forecast.

A refresh mechanism and cached weather data help the interface handle temporary connectivity problems.

**Important:** Weather observations and forecasts are not the same as official disaster warnings.

### 2. Location Search and Geolocation

Users can explore weather information for different locations.

Features include:

* Search for Indian cities and localities.
* Retrieve weather information for selected coordinates.
* Request the device's current location through browser geolocation.
* Handle denied or unavailable location permissions.
* Display a fallback location when geolocation is unsuccessful.

Browser location access requires user permission and an appropriate browser environment.

### 3. Heatwave Preparedness

The heatwave section provides practical guidance for preparing for hot weather.

Examples include:

* Maintaining drinking-water supplies.
* Preparing oral rehydration supplies where appropriate.
* Reducing unnecessary outdoor activity during extreme heat.
* Checking on children, older adults, and other vulnerable people.
* Planning for power interruptions.
* Recognizing symptoms that require urgent medical attention.

Weather-based indicators should be interpreted as preparedness aids, not medical diagnoses or official emergency declarations.

### 4. Flood Preparedness

The flood section focuses on reducing household risks before and during heavy rainfall.

Preparedness topics include:

* Protecting important documents.
* Keeping emergency supplies accessible.
* Moving electrical equipment away from potential floodwater.
* Planning safe evacuation routes.
* Monitoring official weather and flood warnings.
* Avoiding flooded roads and moving water.
* Understanding household and neighbourhood vulnerabilities.

Never enter floodwater to retrieve belongings or attempt an unsafe crossing.

### 5. Interactive Maps

ClimateReady includes mapping interfaces designed to help users explore locations and civic preparedness information.

The project uses Leaflet for interactive mapping and map tiles from supported mapping providers.

The map experience supports location awareness and exploration of community preparedness information.

**Data transparency:** A marker displayed on a map should not automatically be interpreted as a verified, currently operational emergency facility. Users should confirm facility locations and availability with the relevant authorities.

### 6. Community Resilience Information

The project includes a community resilience section intended to demonstrate how preparedness gaps could be communicated to local coordinators.

Examples of preparedness topics include:

* Household access to emergency supplies.
* Heat-safety preparation.
* Backup arrangements.
* Flood-prevention measures.

Where demonstration figures are synthetic, they must be interpreted as illustrative data rather than verified population statistics or results from real household surveys.

### 7. Household Preparedness Checklist

The household checklist helps users organise preparation tasks for different hazards.

Features include:

* General preparedness tasks.
* Heatwave-specific tasks.
* Flood-specific tasks.
* Task completion tracking.
* A dynamically calculated readiness percentage.
* A list of priority tasks that remain incomplete.
* Household notes saved locally in the browser.

Checklist progress is intended to help households organise their preparations. It is not a scientifically validated prediction of survival or a guarantee of safety.

### 8. Household Emergency Notes

Users can record useful household preparedness information, such as:

* Emergency contacts.
* Important supply locations.
* Family preparation notes.
* Other information needed during an emergency.

The application uses browser-local storage for relevant checklist progress and notes.

**Privacy reminder:** Browser-local data is not an encrypted emergency vault. Avoid storing passwords, financial credentials, or other highly sensitive information.

### 9. Multilingual Interface

ClimateReady supports three interface languages:

* English.
* Telugu.
* Hindi.

The multilingual interface is intended to make preparedness information more accessible to users who prefer different languages.

Users should still verify critical instructions against official guidance, especially where translation or local terminology could affect safety.

### 10. Printable Household Action Plan

The application includes a print-oriented household preparedness plan.

This helps users keep a physical copy of their preparation tasks and important household information.

A printed plan should be reviewed periodically and updated when emergency contacts, household needs, or local conditions change.

---

## 👥 Target Users

ClimateReady is designed for people and groups who need practical, accessible preparedness information.

### Households and Families

Understand weather conditions, organise supplies, and create a household preparation plan.

### Outdoor Workers

Access heat-safety information relevant to people working in agriculture, construction, delivery, transport, and other outdoor occupations.

### Vulnerable Individuals and Caregivers

Organise preparations for children, older adults, people with disabilities, and individuals who may need additional assistance during emergencies.

### Students and Community Volunteers

Explore how weather information and household preparedness tools can support community awareness.

### Local Coordinators

Use the platform as a demonstration of how preparedness information might be organised for neighbourhood-level planning.

---

## 🛠️ Technology Stack

| Technology                     | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| React 19                       | Component-based user interface               |
| TypeScript                     | Type-safe application development            |
| Vite                           | Development server and production build      |
| Tailwind CSS 4                 | Interface styling                            |
| Leaflet                        | Interactive maps                             |
| Lucide React                   | Interface icons                              |
| Open-Meteo Weather API         | Weather observations and forecasts           |
| Open-Meteo Geocoding API       | Location search                              |
| BigDataCloud reverse geocoding | Human-readable location information          |
| Browser Geolocation API        | Optional device-location detection           |
| Browser Local Storage          | Local checklist progress and household notes |
| Node.js test utilities         | Tests for preparedness logic                 |

The project uses a client-side React architecture for its main application interface.

Refer to the dependency manifest for the exact versions and scripts configured in the current repository.

---

## 📊 Data Sources and Transparency

ClimateReady distinguishes between different types of information so users can better understand what the interface is showing.

| Information type             | Meaning                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| Live weather data            | Observations retrieved from a weather API                      |
| Weather forecasts            | Model-based predictions for future conditions                  |
| Calculated indicators        | Values derived from available weather information              |
| Preparedness guidance        | General recommendations for reducing risk                      |
| Community demonstration data | Illustrative data used to demonstrate preparedness analysis    |
| Official warnings            | Advisories that must be verified against the issuing authority |

### External Resources

* [Open-Meteo Weather API](https://open-meteo.com/)
* [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
* [India Meteorological Department](https://mausam.imd.gov.in/)
* [National Disaster Management Authority](https://ndma.gov.in/)
* [Central Water Commission](https://cwc.gov.in/)
* [Andhra Pradesh State Disaster Management Authority](https://apsdma.ap.gov.in/)

These links provide access to external resources. Their inclusion does not imply an active technical integration with every organisation listed.

**Official warnings must be checked directly with the issuing authority.** A locally calculated indicator, weather forecast, or preparedness reminder must not be presented as an officially issued warning unless that status has been verified.

---

## 💻 Getting Started

You can run the project locally using Bun or a compatible Node.js environment.

### Prerequisites

Install one of the following:

* [Bun](https://bun.sh/)
* [Node.js](https://nodejs.org/)

You will also need Git if you want to clone the repository.

### 1. Clone the Repository

```bash
git clone https://github.com/Mani-king/ClimateReady.git
cd ClimateReady
```

### 2. Install Dependencies

Using Bun:

```bash
bun install
```

Alternatively, using npm:

```bash
npm install
```

Use the lockfile and package manager appropriate to your environment. Avoid mixing package managers unnecessarily.

### 3. Start the Development Server

Using Bun:

```bash
bun run dev
```

Using npm:

```bash
npm run dev
```

Open the local address displayed by Vite in your terminal. The project configuration currently specifies port `3000`.

### 4. Create a Production Build

Using Bun:

```bash
bun run build
```

Using npm:

```bash
npm run build
```

The generated production files are placed in the `dist` directory.

### 5. Preview the Production Build

After a successful build, run:

```bash
bun run preview
```

Or:

```bash
npm run preview
```

Use the local address printed by Vite to inspect the production build.

### 6. Type-Check the Project

The project defines a TypeScript checking script.

Using Bun:

```bash
bun run lint
```

Using npm:

```bash
npm run lint
```

This runs TypeScript's no-emit checking command. It is not a full substitute for automated tests or manual application testing.

---

## 📁 Project Structure

```text
ClimateReady/
├── .aistudio/             # AI Studio project artifacts
├── src/
│   ├── components/        # Interface and feature components
│   ├── data/              # Civic and demonstration data
│   ├── locales/           # Language translations
│   ├── services/          # Weather and location services
│   ├── types/             # TypeScript definitions
│   ├── utils/              # Preparedness and resilience logic
│   │   ├── resilienceLogic.ts
│   │   └── resilienceLogic.test.ts
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── .env.example            # Example environment configuration
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── bun.lock
├── tsconfig.json
└── vite.config.ts
```

The structure above describes the main application files. Additional files may be added as the project evolves.

---

## 🧪 Testing and Quality Checks

The repository includes tests for selected preparedness logic, including:

* Checklist completion calculations.
* Filtering checklist items.
* Identifying priority tasks.
* Classifying hazard display tones.

The test file uses Node.js's built-in test utilities.

Before running tests, confirm that the test runner and TypeScript execution tools are available in the installed dependencies.

For example, the existing test file can be run with a compatible TypeScript-aware test command:

```bash
bun test src/utils/resilienceLogic.test.ts
```

If you use another runtime, configure an equivalent test command that supports the project's TypeScript imports.

### Recommended Verification Checklist

Before submitting a release, verify:

* [ ] Dependencies install successfully.
* [ ] TypeScript checks complete without errors.
* [ ] The production build succeeds.
* [ ] Preparedness logic tests pass.
* [ ] Weather loading and error states behave as expected.
* [ ] Location search handles invalid or empty queries.
* [ ] Geolocation works when permission is granted and fails gracefully when denied.
* [ ] Checklist progress updates correctly.
* [ ] Household notes and checklist progress persist as intended.
* [ ] English, Telugu, and Hindi switching works.
* [ ] Maps display correctly on supported screen sizes.
* [ ] The printable action plan is readable.
* [ ] No API keys, passwords, or other secrets are committed.
* [ ] The deployed application is tested independently of the development server.

Do not describe a check as passed until it has actually been run.

---

## 🔐 Privacy and Security

ClimateReady is designed to provide useful preparedness information while minimising unnecessary complexity.

Important considerations:

* **Location permission:** Device geolocation is requested through the browser's permission mechanism.
* **Local storage:** Checklist progress and household notes can remain in the browser on the current device.
* **External APIs:** Weather and geocoding requests may send location coordinates or search terms to the corresponding service providers.
* **Synthetic information:** Demonstration data must not be mistaken for verified personal or community records.
* **Secrets:** Never commit real API keys, access tokens, passwords, or private configuration files.
* **Shared devices:** Other people with access to the same browser profile may be able to view locally stored information.

Review the application's actual data flows and privacy requirements before deploying it for public or sensitive use.

---

## ⚠️ Limitations

ClimateReady is a preparedness-support project and has important limitations.

1. Weather information depends on the availability, coverage, and accuracy of external services.
2. Forecasts and calculated indicators cannot guarantee future weather conditions.
3. Community demonstration data is not a substitute for verified household surveys or official infrastructure records.
4. Map locations should be independently verified before travelling to an emergency facility.
5. Official emergency warnings may change more quickly than the application refreshes.
6. Browser-local information may be lost if the user clears browser data or changes devices.
7. A successful development build does not establish that every application feature works correctly in production.
8. The platform does not replace emergency services, professional medical advice, or instructions from disaster-management authorities.

---

## 🔮 Future Improvements

Potential future development areas include:

* Verified integration with official alert feeds where APIs and permissions are available.
* Clear timestamps and provenance for each warning and observation.
* Improved validation of community infrastructure locations.
* More comprehensive automated tests.
* Offline access to essential preparedness instructions.
* Accessibility improvements and additional language support.
* Optional household export and backup features.
* More robust mobile and low-bandwidth support.
* Better validation of risk indicators against documented scientific methods.
* Community-data collection with appropriate consent, privacy safeguards, and verification.

These items are proposed improvements, not claims about features already implemented.

---

## 🤝 Contributing

Contributions that improve reliability, accessibility, documentation, and preparedness guidance are welcome.

Suggested workflow:

1. Fork the repository or create a separate development branch.
2. Make a focused, meaningful change.
3. Run relevant tests and checks.
4. Review the change for regressions and security issues.
5. Write a descriptive commit message.
6. Submit a pull request or share the change for review.

Keep commits focused on actual changes. Do not add artificial commits solely to increase the commit count.

---

## 📄 License

No explicit open-source license is currently specified in this README.

Before reusing, modifying, or redistributing the project, check the repository for an existing license. If the project owner intends to publish it as open source, add an appropriate license file.

---

## 🙏 Acknowledgements

ClimateReady builds on open-source software and publicly available services, including React, TypeScript, Vite, Tailwind CSS, Leaflet, Open-Meteo, and related geocoding services.

We acknowledge the work of organisations that provide official weather information and disaster-preparedness guidance to the public.

---

### ClimateReady

**Know your risk. Prepare before it happens.**

*Building a more informed, prepared, and resilient community—one household at a time.*
