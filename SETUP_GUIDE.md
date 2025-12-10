# Lumina LMS - Setup & Development Guide

## 📦 Project Overview

Lumina is a full-stack Learning Management System with:

- **Mobile App**: React Native + TypeScript (iOS & Android)
- **Web App**: React + TypeScript + Vite
- **Shared Design System**: Unified colors, spacing, and typography

## 🔧 Prerequisites

Before starting, ensure you have:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - For version control

### For Mobile Development Only

- **Android Studio** - [Download](https://developer.android.com/studio)
- **Xcode** (Mac only) - [Download](https://apps.apple.com/us/app/xcode/id497799835)
- **Java Development Kit (JDK) 11+** - Required for Android
- **Ruby** (Mac) - For iOS CocoaPods

### For Web Development Only

- **Modern web browser** - Chrome, Firefox, Safari, or Edge (latest versions)

## 🚀 Getting Started

### 1️⃣ Initial Setup (Both Mobile & Web)

```bash
# Clone or navigate to the project
cd C:\Users\user\Desktop\LMS

# Install mobile dependencies
npm install

# Install web dependencies
cd web
npm install
cd ..
```

### 2️⃣ Running the Web App

```bash
# From web directory
cd web
npm run dev
```

The web app will automatically open at `http://localhost:3000`

**Available web commands:**

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build
npm run type-check    # Verify TypeScript types
```

### 3️⃣ Running the Mobile App

#### Terminal 1: Start Metro (JavaScript bundler)

```bash
npm start
```

#### Terminal 2: Build and Run

**For Android:**

```bash
npm run android
```

**For iOS (Mac only):**

```bash
npm run ios
```

**Available mobile commands:**

```bash
npm start             # Start Metro bundler
npm run android       # Build for Android
npm run ios           # Build for iOS
npm run lint          # Run ESLint
npm test              # Run tests
```

## 📁 Project Structure

```
LMS/
├── src/
│   ├── components/          # React Native components (reusable)
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TrustedPartners.tsx
│   │   ├── Categories.tsx
│   │   ├── LearningPaths.tsx
│   │   ├── InstructorSection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── screens/             # Full screens for React Native
│   │   └── LandingScreen.tsx
│   └── styles/              # Design system (shared)
│       └── colors.ts
│
├── web/                     # Web application
│   ├── src/
│   │   ├── components/      # React web components
│   │   ├── pages/           # Web pages
│   │   ├── styles/          # Web styling & design tokens
│   │   ├── App.tsx          # Main app
│   │   └── main.tsx         # Entry point
│   ├── index.html           # HTML template
│   ├── vite.config.ts       # Vite configuration
│   └── package.json         # Web dependencies
│
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # Mobile app entry point
├── package.json             # Mobile dependencies
└── tsconfig.json            # TypeScript config
```

## 🎨 Design System

Both mobile and web use the same design tokens:

**Colors:**

- Primary Purple: `#7C3AED`
- Secondary Pink: `#EC4899`
- Text: `#1F2937`
- Background: `#FFFFFF`
- And more in `src/styles/colors.ts`

**Spacing Scale (8px base):**

- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px, xxl: 32px

**Typography:**

- xs: 12px, sm: 14px, md: 16px, lg: 18px, xl: 20px, xxl: 24px, xxxl: 32px

**Border Radius:**

- sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 999px

## 🧩 Component Overview

### Header

- Logo and branding
- Login and Join buttons
- Sticky positioning

### Hero Section

- Main headline and description
- Call-to-action buttons
- Social proof (student count)
- Placeholder for hero image

### Trusted Partners

- Partner company logos
- Scrollable on mobile

### Categories

- Filterable course chips
- Course cards grid
- Rating, instructor, and pricing info
- Responsive layout

### Learning Paths

- Curated learning paths
- Weekly progress chart
- Dark theme background

### Instructor Section

- Promotional content
- Call-to-action for instructors

### Footer

- Company information
- Navigation links
- Social media links

## 🔄 Development Workflow

### Making Changes

**For Mobile Components:**

1. Edit files in `src/components/` or `src/screens/`
2. Save and view changes in Metro bundler (auto-refresh)
3. Run on Android/iOS to test

**For Web Components:**

1. Edit files in `web/src/components/` or `web/src/pages/`
2. Changes auto-refresh in browser (Vite HMR)
3. No rebuild needed during development

### Updating Design System

If you modify colors or spacing:

1. Update `src/styles/colors.ts` (Mobile)
2. Update `web/src/styles/colors.ts` (Web)
3. Keep them in sync!

## 🐛 Troubleshooting

### Metro Won't Start

```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm start -- --reset-cache
```

### Android Build Issues

```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run android
```

### Web App Not Opening

```bash
# Kill process on port 3000
# Windows: taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:3000 | xargs kill -9

# Try again
cd web
npm run dev
```

### TypeScript Errors

```bash
# Check types
npm run type-check    # Web
tsc --noEmit          # Mobile
```

## 📚 Useful Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚢 Building for Production

### Web

```bash
cd web
npm run build
# Output in web/dist/
```

### Mobile

**Android:**

```bash
cd android
./gradlew assembleRelease
```

**iOS (Mac):**

```bash
npm run ios -- --configuration Release
```

## 📝 Notes

- The mobile and web apps are separate but share design principles
- Components are adapted for each platform (React Native vs React)
- Design tokens are duplicated - keep them in sync
- Future: Consider shared component library or monorepo structure

## ✅ Checklist

- [ ] Node.js 20+ installed
- [ ] Project dependencies installed (`npm install` in root and `web/`)
- [ ] Web app running locally (`npm run dev` in web/)
- [ ] Mobile environment set up (Android Studio/Xcode)
- [ ] Mobile app builds successfully (`npm start` + `npm run android/ios`)
- [ ] Design system colors are consistent

Happy coding! 🎉
