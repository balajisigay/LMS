# ⚡ Quick Reference Guide

## 🚀 Start Here

### First Time Setup (5 minutes)

```bash
# 1. Install all dependencies
npm install
cd web && npm install && cd ..

# 2. Run web app
cd web
npm run dev
# Opens http://localhost:3000

# 3. In new terminal, run mobile (if needed)
npm start
npm run android  # or npm run ios
```

## 📂 Key Directories

| Path                  | Purpose                         |
| --------------------- | ------------------------------- |
| `src/components/`     | React Native components         |
| `src/screens/`        | Full React Native screens       |
| `src/styles/`         | Design tokens (colors, spacing) |
| `web/src/components/` | React web components            |
| `web/src/pages/`      | React web pages                 |
| `web/src/styles/`     | Web styling                     |
| `App.tsx`             | Mobile app entry                |
| `web/src/App.tsx`     | Web app entry                   |

## 🎨 Design Tokens

### Quick Access

- Primary Color: `#7C3AED`
- Secondary Color: `#EC4899`
- Text: `#1F2937`
- Background: `#FFFFFF`

Location: `src/styles/colors.ts` and `web/src/styles/colors.ts`

## 🧩 Components Quick List

| Component        | File                    | Location          |
| ---------------- | ----------------------- | ----------------- |
| Header           | `Header.tsx`            | Both mobile & web |
| Hero Section     | `HeroSection.tsx`       | Both              |
| Trusted Partners | `TrustedPartners.tsx`   | Both              |
| Categories       | `Categories.tsx`        | Both              |
| Learning Paths   | `LearningPaths.tsx`     | Both              |
| Instructor       | `InstructorSection.tsx` | Both              |
| Footer           | `Footer.tsx`            | Both              |
| Landing Screen   | `LandingScreen.tsx`     | Mobile only       |
| Landing Page     | `LandingPage.tsx`       | Web only          |

## 💻 Common Commands

### Web Development

```bash
cd web
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build
npm run type-check       # Check types
```

### Mobile Development

```bash
npm start                # Start Metro
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run lint             # Run linter
npm test                 # Run tests
```

## 🔧 File Organization

### Mobile Component Structure

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/colors';

interface MyComponentProps {
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
```

### Web Component Structure

```tsx
import React from 'react';
import { colors, spacing } from '../styles/colors';

interface MyComponentProps {
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ onPress }) => {
  return (
    <div style={styles.container}>
      <p style={styles.text}>Content</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
};
```

## 🎯 Common Tasks

### Adding a New Component

**Mobile:**

1. Create `src/components/MyComponent.tsx`
2. Import React Native components
3. Export from `src/components/index.ts`
4. Use in screens

**Web:**

1. Create `web/src/components/MyComponent.tsx`
2. Use HTML elements
3. Export from `web/src/components/index.ts`
4. Use in pages

### Updating Design System

1. Edit `src/styles/colors.ts` (mobile)
2. Edit `web/src/styles/colors.ts` (web) - KEEP THEM IN SYNC!
3. Use new tokens in components
4. Test on both platforms

### Adding Event Handlers

**Mobile:**

```tsx
const handlePress = () => {
  console.log('Pressed');
};

<TouchableOpacity onPress={handlePress}>
  <Text>Press Me</Text>
</TouchableOpacity>;
```

**Web:**

```tsx
const handleClick = () => {
  console.log('Clicked');
};

<button onClick={handleClick}>Press Me</button>;
```

## 📊 Spacing Reference

| Token | Value | Usage            |
| ----- | ----- | ---------------- |
| `xs`  | 4px   | Tiny gaps        |
| `sm`  | 8px   | Small gaps       |
| `md`  | 12px  | Normal padding   |
| `lg`  | 16px  | Standard padding |
| `xl`  | 24px  | Large sections   |
| `xxl` | 32px  | Page sections    |

## 🎨 Typography Reference

| Token  | Size | Usage              |
| ------ | ---- | ------------------ |
| `xs`   | 12px | Labels, captions   |
| `sm`   | 14px | Small text, labels |
| `md`   | 16px | Body text, buttons |
| `lg`   | 18px | Subheadings        |
| `xl`   | 20px | Section titles     |
| `xxl`  | 24px | Large titles       |
| `xxxl` | 32px | Hero title         |

## 🐛 Quick Troubleshooting

| Issue                | Solution                              |
| -------------------- | ------------------------------------- |
| Web won't start      | Kill port 3000, clear cache, restart  |
| Metro won't start    | `npm start -- --reset-cache`          |
| TypeScript errors    | Run `npm run type-check` to see all   |
| Styles not updating  | Hard refresh browser or restart Metro |
| Components not found | Check export in `index.ts` files      |

## 📱 Testing

### Mobile

```bash
npm test
npm test -- --watch
```

### Web

```bash
cd web
npm run type-check
```

## 🚀 Deployment

### Web

```bash
cd web
npm run build
# Upload dist/ folder to hosting
```

### Mobile

Android:

```bash
cd android
./gradlew assembleRelease
# APK at android/app/build/outputs/apk/release/
```

iOS (Mac):

```bash
npm run ios -- --configuration Release
```

## 📚 Documentation Files

| File                        | Purpose           |
| --------------------------- | ----------------- |
| `README.md`                 | Project overview  |
| `SETUP_GUIDE.md`            | Detailed setup    |
| `DESIGN_GUIDE.md`           | Visual guide      |
| `IMPLEMENTATION_SUMMARY.md` | What was built    |
| `web/README.md`             | Web-specific info |

## ✅ Checklist for New Features

- [ ] Create component file (TypeScript)
- [ ] Add proper types/interfaces
- [ ] Import design tokens
- [ ] Style with spacing and colors
- [ ] Add event handlers
- [ ] Export from index.ts
- [ ] Test on target platform
- [ ] Check responsive (web)
- [ ] Update type-check passes

## 🔗 Useful Links

- React Native: https://reactnative.dev
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com

## 💡 Pro Tips

1. **Keep files small** - One component per file
2. **Reuse design tokens** - Don't hardcode colors/spacing
3. **Use TypeScript** - Catch errors early
4. **Test responsive** - Check mobile and desktop
5. **Keep sync** - Update both platforms for design changes
6. **Document changes** - Comment complex logic

---

**Need help? Check the full SETUP_GUIDE.md**
