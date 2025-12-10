# 📂 File Structure & What's Inside

## Root Level (`/LMS`)

### 📄 Documentation Files

```
├── README.md .............................. Main project overview
├── QUICK_REFERENCE.md .................... Quick lookup guide
├── SETUP_GUIDE.md ........................ Detailed setup instructions
├── DESIGN_GUIDE.md ....................... Visual design reference
├── PROJECT_COMPLETE.md ................... What was built
├── IMPLEMENTATION_SUMMARY.md ............. Technical overview
├── DOCUMENTATION_INDEX.md ................ This index
└── FILE_STRUCTURE.md ..................... (This file)
```

### 🔧 Configuration Files

```
├── package.json .......................... Mobile dependencies & scripts
├── tsconfig.json ......................... TypeScript configuration
├── App.tsx .............................. Mobile app entry point
├── index.js ............................. React Native index
├── app.json ............................. React Native app config
├── metro.config.js ...................... Metro bundler config
├── babel.config.js ...................... Babel configuration
└── jest.config.js ....................... Jest test configuration
```

### 📁 Folders

```
├── src/ ................................. Mobile TypeScript source
├── web/ ................................. Web React application
├── android/ ............................. Android native code
├── ios/ ................................. iOS native code
└── __tests__/ ........................... Mobile tests
```

---

## Mobile Source (`/LMS/src`)

### `/src/components` - Reusable Components

```
src/components/
├── Header.tsx .......................... Header with logo & nav
│   - Sticky positioning
│   - Logo container
│   - Login & Join buttons
│   - TypeScript interfaces & styles
│
├── HeroSection.tsx ..................... Main hero section
│   - Badge "New Courses"
│   - Headline & description
│   - CTA buttons (Explore, Watch Demo)
│   - Avatar group & social proof
│   - Placeholder for hero image
│   - Full TypeScript types
│
├── TrustedPartners.tsx ................. Partner logos
│   - Horizontal scrollable
│   - Google, Spotify, Airbnb, Amazon, Meta
│   - Responsive layout
│
├── Categories.tsx ..................... Course categories
│   - Filterable category chips
│   - Course cards grid
│   - Rating, instructor, pricing display
│   - Interactive filters
│
├── LearningPaths.tsx .................. Learning paths section
│   - Dark theme background
│   - Path cards with icons
│   - Weekly progress chart
│   - Random progress bars
│
├── InstructorSection.tsx .............. Instructor CTA
│   - Promotional text
│   - Call-to-action button
│   - Image placeholder
│
├── Footer.tsx ......................... Footer navigation
│   - Logo & branding
│   - Link sections
│   - Social media
│   - Copyright
│
└── index.ts ........................... Component exports
    - Re-exports all components for easy import
```

### `/src/screens` - Full Screens

```
src/screens/
└── LandingScreen.tsx .................. Main landing screen
    - Imports all components
    - Combines them into one screen
    - Scrollable layout
    - Safe area handling
    - Event handler stubs
```

### `/src/styles` - Design System

```
src/styles/
└── colors.ts .......................... Design tokens
    - Color palette (primary, secondary, neutral)
    - Spacing scale (xs to xxl)
    - Typography sizes (xs to xxxl)
    - Border radius values
```

---

## Web Application (`/LMS/web`)

### `/web/src/components` - Web Components

```
web/src/components/
├── Header.tsx ......................... Web header (HTML/CSS)
├── HeroSection.tsx .................... Web hero section
├── TrustedPartners.tsx ................ Web partners
├── Categories.tsx ..................... Web course cards
├── LearningPaths.tsx .................. Web learning paths
├── InstructorSection.tsx .............. Web instructor CTA
├── Footer.tsx ......................... Web footer
└── index.ts ........................... Component exports
```

**Differences from mobile:**

- Use HTML elements (div, section, button, etc.)
- CSS-in-JS with React.CSSProperties
- Flexbox and CSS Grid layouts
- Responsive breakpoints (640px, 1024px)
- Hover and focus states

### `/web/src/pages` - Web Pages

```
web/src/pages/
└── LandingPage.tsx .................... Main landing page
    - Imports all components
    - Assembles full page
    - Component composition
```

### `/web/src/styles` - Web Styling

```
web/src/styles/
├── colors.ts .......................... Design tokens (same as mobile)
└── global.ts .......................... Global CSS styles
    - HTML/body reset
    - Font setup
    - Base element styles
```

### `/web/src` - Main App Files

```
web/src/
├── App.tsx ............................ Main React component
│   - Router setup
│   - Global style injection
│   - Route definitions
│
├── main.tsx ........................... Vite entry point
    - React DOM render
    - Root element mount
```

### `/web` - Web Configuration

```
web/
├── index.html ......................... HTML template
│   - Root div for React
│   - Script tag for main.tsx
│   - Meta tags
│
├── package.json ....................... Web dependencies
│   - React, React Router, Vite
│   - TypeScript, Build tools
│   - dev dependencies
│
├── vite.config.ts ..................... Vite configuration
│   - React plugin
│   - Dev server (port 3000)
│   - Build output
│
├── tsconfig.json ...................... TypeScript config
│   - ES2020 target
│   - JSX settings
│   - Module resolution
│
├── tsconfig.node.json ................. Node TypeScript config
│   - For vite.config.ts
│
├── .gitignore ......................... Git ignore rules
│   - node_modules/
│   - dist/
│   - .DS_Store
│
└── README.md .......................... Web documentation
    - Web-specific setup
    - Scripts available
    - Browser support
```

---

## Native Code (`/LMS/android` and `/LMS/ios`)

### `/android` - Android Configuration

```
android/
├── build.gradle ....................... Project build config
├── gradle.properties .................. Gradle properties
├── gradlew ............................ Gradle wrapper (Unix)
├── gradlew.bat ........................ Gradle wrapper (Windows)
├── settings.gradle .................... Gradle settings
│
├── gradle/ ............................ Gradle files
└── app/ ............................... Android app source
    ├── build.gradle ................... App build config
    ├── proguard-rules.pro ............. Proguard config
    └── src/
        └── main/
            ├── AndroidManifest.xml ... App manifest
            ├── java/com/lms/ ......... Kotlin source
            └── res/ .................. Resources
                ├── values/ ........... Strings, colors, styles
                └── mipmap-* ......... App icons
```

### `/ios` - iOS Configuration

```
ios/
├── Podfile ............................ CocoaPods config
│
├── LMS/ ............................... iOS app
│   ├── AppDelegate.swift ............. App entry point
│   ├── Info.plist .................... App info
│   ├── LaunchScreen.storyboard ....... Launch screen
│   ├── PrivacyInfo.xcprivacy ......... Privacy config
│   └── Images.xcassets/ .............. App icons & assets
│
└── LMS.xcodeproj/ .................... Xcode project
    ├── project.pbxproj ............... Project settings
    └── xcshareddata/ ................. Shared schemes
        └── xcschemes/ ................ Run configurations
```

---

## Testing (`/LMS/__tests__`)

```
__tests__/
└── App.test.tsx ....................... App component test
    - Basic rendering test
    - Jest configuration
```

---

## How Components Flow

### Mobile App Flow

```
App.tsx (entry)
  ↓
LandingScreen.tsx (imports components)
  ↓
  ├─ Header.tsx
  ├─ HeroSection.tsx
  ├─ TrustedPartners.tsx
  ├─ Categories.tsx
  ├─ LearningPaths.tsx
  ├─ InstructorSection.tsx
  └─ Footer.tsx

All styled with React Native + colors.ts
```

### Web App Flow

```
main.tsx (Vite entry)
  ↓
App.tsx (React Router)
  ↓
LandingPage.tsx (imports components)
  ↓
  ├─ Header.tsx
  ├─ HeroSection.tsx
  ├─ TrustedPartners.tsx
  ├─ Categories.tsx
  ├─ LearningPaths.tsx
  ├─ InstructorSection.tsx
  └─ Footer.tsx

All styled with CSS-in-JS + colors.ts
```

---

## File Statistics

```
📱 MOBILE
├── Components: 8 files (src/components/)
├── Screens: 1 file (src/screens/)
├── Styles: 1 file (src/styles/)
├── Tests: 1 file (__tests__/)
├── Config: 7 files (root level)
└── Total: ~200 lines per component, ~1500 lines total

🌐 WEB
├── Components: 8 files (web/src/components/)
├── Pages: 1 file (web/src/pages/)
├── Styles: 2 files (web/src/styles/)
├── Config: 7 files (web/ root level)
└── Total: ~150 lines per component, ~1500 lines total

📚 DOCUMENTATION
├── Documentation: 7 MD files
├── This guide: 1 file
├── Component docs: inline comments
└── Total: ~400 lines of docs
```

---

## Size Reference

```
Component File Sizes (Approximate)
├── Header: 150-200 lines (both platforms)
├── HeroSection: 180-250 lines
├── Categories: 250-300 lines (most complex)
├── LearningPaths: 200-250 lines
├── Footer: 180-220 lines
├── Others: 100-180 lines each

Total TypeScript/TSX Code: ~2500 lines
Total Documentation: ~600 lines
Total Config Files: ~200 lines
```

---

## Import Patterns

### Mobile Import Pattern

```tsx
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';
import { Header } from '../components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
```

### Web Import Pattern

```tsx
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';
import { Header } from '../components';
import { BrowserRouter as Router } from 'react-router-dom';
```

---

## Running from Different Locations

```
Mobile Commands (run from /LMS):
npm start
npm run android
npm run ios

Web Commands (run from /LMS/web):
npm run dev
npm run build
npm run preview
```

---

## Key Points to Remember

✓ **Duplicated Files**: Design tokens appear in both `src/styles/colors.ts` and `web/src/styles/colors.ts` - keep them in sync!

✓ **Component Adaptation**: Same component logic, different UI library (React Native vs React)

✓ **Styling Approach**:

- Mobile: React Native StyleSheet
- Web: CSS-in-JS with React.CSSProperties

✓ **Entry Points**:

- Mobile: `App.tsx` → `LandingScreen.tsx`
- Web: `web/src/main.tsx` → `web/src/App.tsx` → `LandingPage.tsx`

✓ **Documentation**: Start with `DOCUMENTATION_INDEX.md` for navigation

---

## Quick File Lookup

| Need          | File                   | Location                      |
| ------------- | ---------------------- | ----------------------------- |
| Mobile app    | App.tsx                | Root                          |
| Web app       | web/src/App.tsx        | web/src/                      |
| Colors        | colors.ts              | src/styles/ & web/src/styles/ |
| Setup help    | SETUP_GUIDE.md         | Root                          |
| Quick answers | QUICK_REFERENCE.md     | Root                          |
| Visual guide  | DESIGN_GUIDE.md        | Root                          |
| All docs      | DOCUMENTATION_INDEX.md | Root                          |

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Complete:** ✓
