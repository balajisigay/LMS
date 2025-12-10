# Lumina LMS - Web Application

A modern, responsive React web application for an online learning management system (LMS). Built with TypeScript, Vite, and React Router.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile browsers
- **Modern UI**: Clean, professional design with smooth interactions
- **TypeScript**: Full type safety across the application
- **Fast Development**: Powered by Vite for instant HMR and optimized builds
- **Component-Based**: Reusable, maintainable React components

## Project Structure

```
web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TrustedPartners.tsx
│   │   ├── Categories.tsx
│   │   ├── LearningPaths.tsx
│   │   ├── InstructorSection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── pages/              # Page components
│   │   └── LandingPage.tsx
│   ├── styles/             # Styling utilities
│   │   ├── colors.ts       # Color palette and design tokens
│   │   └── global.ts       # Global styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
cd web
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript types

## Component Overview

### Header

Navigation bar with logo, login button, and join CTA.

### HeroSection

Main landing section with headline, description, call-to-action buttons, and social proof.

### TrustedPartners

Displays partner companies (Google, Spotify, Airbnb, etc.)

### Categories

Filterable course categories with course cards showing ratings, instructors, and pricing.

### LearningPaths

Curated learning paths and weekly progress visualization.

### InstructorSection

Call-to-action for becoming an instructor.

### Footer

Company information, navigation links, and social media.

## Styling

The application uses inline CSS-in-JS styling with a centralized design system:

- **Colors**: Located in `src/styles/colors.ts`
- **Spacing**: Consistent 8px-based spacing scale
- **Typography**: Clear font size hierarchy
- **Border Radius**: Consistent rounding system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branches from `main`
2. Follow the existing component structure
3. Maintain TypeScript type safety
4. Test responsive design at different breakpoints

## License

MIT
