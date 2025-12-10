# 🎨 Landing Page Visual Guide

## Page Layout

```
┌─────────────────────────────────────────┐
│           HEADER (Sticky)               │
│    Logo    [Search]    Login  [Join]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│                                         │
│    ✨ NEW COURSES ADDED                 │
│                                         │
│    "Unlock your potential with         │
│     world-class learning"              │
│                                         │
│    "Choose from 200,000+ online..."    │
│                                         │
│    [Explore Courses]  ▶ Watch Demo     │
│                                         │
│    👥 👥 👥  50k+ Students enrolled    │
│                                         │
├─────────────────────────────────────────┤
│              Hero Image                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    TRUSTED BY INNOVATORS AT             │
│  Google  Spotify  Airbnb  Amazon  Meta  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│     Explore Top Categories              │
│   Find the right path for your goals    │
│                                         │
│  [All]  [Dev]  [Design]  [Marketing]   │
│  [IT]   [Personal]  [View all →]       │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │Course│  │Course│  │Course│  ...    │
│  │ Card │  │ Card │  │ Card │         │
│  │      │  │      │  │      │         │
│  │★4.8  │  │★4.7  │  │★4.9  │        │
│  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Don't know where to start?             │
│  Our curated Learning Paths provide...  │
│                                         │
│  ①  Full Stack Developer Path           │
│      5 courses • 240 hours  →           │
│                                         │
│  ②  Data Science Professional          │
│      6 courses • 262 hours  →           │
│                                         │
│  ╔═ Weekly Progress ═════════════╗     │
│  ║ ▌ ▌▌ ▌ ▌▌ ▌ ▌▌                    ║
│  ╚═══════════════════════════════╝     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    Become an Instructor                 │
│    Inspire millions of learners...      │
│    [Start Teaching Today]               │
│                                         │
│            [Team Image]                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│              FOOTER                     │
│  L Lumina              Learn  Community │
│  Building a better     Dev    Courses   │
│  world through ed.     Design Devs      │
│                                         │
│  © 2025 Lumina Inc.              𝕏 f in ▶
└─────────────────────────────────────────┘
```

## Color Palette

```
PRIMARY COLORS
┌─────────────────────────┐
│ ▓ #7C3AED (Purple)      │ - Primary brand color
│ ▓ #EC4899 (Pink)        │ - Secondary color
└─────────────────────────┘

NEUTRAL COLORS
┌─────────────────────────┐
│ ▓ #FFFFFF (White)       │ - Background
│ ▓ #F5F3FF (Purple Lt)   │ - Light surface
│ ▓ #1F2937 (Dark Gray)   │ - Text
│ ▓ #6B7280 (Gray)        │ - Text light
│ ▓ #9CA3AF (Gray Lt)     │ - Text lighter
│ ▓ #E5E7EB (Border)      │ - Borders
└─────────────────────────┘

STATUS COLORS
┌─────────────────────────┐
│ ▓ #10B981 (Green)       │ - Success
│ ▓ #F59E0B (Amber)       │ - Warning
│ ▓ #EF4444 (Red)         │ - Error
└─────────────────────────┘
```

## Component Sizes

### Spacing Scale (8px base)

```
xs:  4px    ▓
sm:  8px    ▓▓
md:  12px   ▓▓▓
lg:  16px   ▓▓▓▓
xl:  24px   ▓▓▓▓▓▓
xxl: 32px   ▓▓▓▓▓▓▓▓
```

### Typography Scale

```
xs:   12px (small labels)
sm:   14px (body text)
md:   16px (normal text, buttons)
lg:   18px (headings)
xl:   20px (section headings)
xxl:  24px (large headings)
xxxl: 32px (hero titles)
```

### Border Radius

```
sm:   4px   (subtle)
md:   8px   (normal)
lg:   12px  (prominent)
xl:   16px  (cards)
full: 999px (pills, circles)
```

## Header Component

```
┌─────────────────────────────────────────┐
│ [L] Lumina              Log in [Join]   │
└─────────────────────────────────────────┘
   ↑       ↑              ↑
   32px    10px gap       Right aligned
```

**States:**

- Normal: Light background
- Sticky: Maintains position at top
- Mobile: Hamburger menu (future)

## Hero Section

**Desktop (2-column grid):**

```
┌──────────────────┬──────────────────┐
│ Text Content     │                  │
│ - Badge          │   Hero Image     │
│ - Title          │   (Aspect 1:1)   │
│ - Description    │                  │
│ - Buttons        │                  │
│ - Social Proof   │                  │
└──────────────────┴──────────────────┘
```

**Mobile (1-column, stacked):**

```
┌──────────────────┐
│ Text Content     │
│ - Badge          │
│ - Title          │
│ - Description    │
│ - Buttons        │
│ - Social Proof   │
├──────────────────┤
│ Hero Image       │
│ (Aspect 1:1)     │
└──────────────────┘
```

## Course Cards

```
┌──────────────┐
│  Course Img  │
│  (1:1 ratio) │
├──────────────┤
│ Course Title │
│              │
│ Dr. Name     │
│              │
│ ★ 4.8 (831)  │
│              │
│ 3000+       $14.99│
│ Students    │
└──────────────┘
```

**Grid Layout:**

- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns (50% width each)

## Learning Paths

```
┌─────────────────────────────┐
│ Don't know where to start?  │
│ Learning Paths provide...   │
└─────────────────────────────┘

┌──────────────────────────────────┐
│ ① Full Stack Developer Path  →   │
│    5 courses • 240 hours         │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ② Data Science Professional  →   │
│    6 courses • 262 hours         │
└──────────────────────────────────┘

Progress Chart:
┌────────────────────────────┐
│ ▌ ▌▌ ▌ ▌▌ ▌ ▌▌            │
│ Mon Tue Wed Thu Fri Sat Sun│
└────────────────────────────┘
```

**Dark Background:** #1F2937 (text color)
**Cards:** #FFFFFF
**Chart Bars:** #7C3AED (primary)

## Responsive Breakpoints

```
Mobile:  < 640px   (single column, stacked)
Tablet:  640-1024px (2 columns)
Desktop: > 1024px  (full layout)

Max content width: 1400px
```

## Interactive Elements

### Buttons

**Primary Button:**

```
┌─────────────────┐
│ Explore Courses │  bg: #7C3AED, text: white, rounded: full
└─────────────────┘
```

**Secondary Button:**

```
┌──────────────────┐
│ ▶ Watch Demo     │  bg: transparent, text: #7C3AED
└──────────────────┘
```

**Dark Button:**

```
┌──────────────────┐
│ Start Teaching   │  bg: #1F2937, text: white
└──────────────────┘
```

### Category Chips

**Inactive:**

```
┌──────────────────┐
│ Development      │  bg: #F5F3FF, border: #E5E7EB, text: #1F2937
└──────────────────┘
```

**Active:**

```
┌──────────────────┐
│ All Courses      │  bg: #1F2937, text: white
└──────────────────┘
```

## Hover States

- Buttons: Opacity 0.8
- Cards: Shadow, scale up slightly
- Links: Color darken or underline
- Navigation: Highlight active section

## Accessibility

- Color contrast ratios meet WCAG AA standard
- Clear focus states for keyboard navigation
- Semantic HTML (header, nav, main, section, footer)
- Alt text for images (implementation ready)
- ARIA labels where needed

---

**Design System Version:** 1.0  
**Last Updated:** December 2025  
**Designer Notes:** Consistent, modern, and accessible design for web and mobile platforms.
