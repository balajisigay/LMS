# Lumina LMS - Learning Management System

A full-stack learning management system built with React Native (mobile) and React (web), featuring a modern landing page with TypeScript support.

## 📱 Project Structure

```
LMS/
├── src/                    # Shared TypeScript source (for React Native)
│   ├── screens/           # React Native screens
│   ├── components/        # React Native components
│   └── styles/            # Shared design tokens
├── web/                   # Web application (React + Vite)
│   ├── src/
│   │   ├── components/    # Web components
│   │   ├── pages/         # Web pages
│   │   └── styles/        # Web styling
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── android/               # Android native code
├── ios/                   # iOS native code
├── App.tsx                # React Native entry point
├── package.json           # Mobile dependencies
└── tsconfig.json          # TypeScript config
```

## 🚀 Quick Start

### Mobile (React Native)

#### Prerequisites

- Node.js 20+
- React Native environment set up ([instructions](https://reactnative.dev/docs/environment-setup))
- Android Studio (for Android) or Xcode (for iOS)

#### Installation & Development

```bash
# Install dependencies
npm install

# Start Metro dev server
npm start

# In another terminal, run on Android
npm run android

# OR run on iOS
npm run ios
```

### Web (React)

#### Prerequisites

- Node.js 20+
- npm or yarn

#### Installation & Development

```bash
# Install dependencies
cd web
npm install

# Start dev server (automatically opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Available Scripts

### Mobile

```bash
npm start          # Start Metro dev server
npm run android    # Build and run on Android
npm run ios        # Build and run on iOS
npm run lint       # Run ESLint
npm test           # Run Jest tests
```

### Web

```bash
cd web
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # Check TypeScript types
```

## 🎨 Features

### Landing Page Components

- **Header** - Navigation with logo and authentication buttons
- **Hero Section** - Main promotional area with CTAs
- **Trusted Partners** - Partner company showcase
- **Categories** - Filterable course categories with cards
- **Learning Paths** - Curated learning paths with progress tracking
- **Instructor Section** - Call-to-action for instructors
- **Footer** - Site navigation and company info

### Design System

Centralized design tokens:

- **Colors**: Primary purple (#7C3AED), secondary pink (#EC4899)
- **Spacing**: 8px-based scale
- **Typography**: Clear hierarchy (12px - 32px)
- **Border Radius**: Consistent rounding (4px - 999px)

## 🛠️ Tech Stack

### Mobile

- **React Native** 0.82.1
- **TypeScript** 5.8.3
- **React Native Safe Area** 5.5.2
- **Jest** for testing

### Web

- **React** 19.0.0
- **React Router** 6.20.0
- **Vite** 5.0.0
- **TypeScript** 5.3.0

## 📁 Component Sharing

The design system (`colors.ts`, `spacing`, etc.) is duplicated in both:

- `src/styles/colors.ts` (React Native)
- `web/src/styles/colors.ts` (Web)

To maintain consistency, update both files when changing design tokens.

## 🔧 Development Tips

### React Native

- Use `npx react-native doctor` to verify your environment setup
- Check [React Native docs](https://reactnative.dev/docs/getting-started) for troubleshooting
- Components use React Native primitives (View, Text, ScrollView, etc.)

### Web

- Components use standard HTML elements (div, button, section, etc.)
- Responsive design with CSS Grid and Flexbox
- Hot Module Replacement (HMR) enabled during development
- CSS-in-JS styling with TypeScript support

## 📱 Browser & Platform Support

### Mobile

- Android 5.0+ (API 21+)
- iOS 11.0+

### Web

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
