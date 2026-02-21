# Corporate Site Design System (v2)

This site is built with modern Next.js App Router (v15), Tailwind CSS (v4), and Radix UI. 
This document defines the new "IT/Corporate" aesthetic centered around Dark Navy & Silver.

## Core Aesthetic: Refined IT Corporate

- **Tone**: Professional, advanced, trustworthy, sophisticated.
- **Direction**: A "dark-navy and silver" combination, moving away from previous primary blues.

### Color Palette Constraints (Tailwind CSS v4 variables mapping)

Use these defined tokens when building new UI elements.

#### Backgrounds
- **Main Background (`bg-background`)**: Dark Navy (`#0a192f` or similar very dark blue-gray).
- **Surface/Card (`bg-card`, `bg-popover`)**: Slightly lighter Navy (`#112240` or `#1d2d50`). Provide subtle elevation.

#### Text & Foreground
- **Primary Text (`text-foreground`)**: Light Silver/Gray (`#ccd6f6`). Do not use pure white (`#fff`) for extensive reading text.
- **Muted Text (`text-muted-foreground`)**: Slate/Gray (`#8892b0`). Use for secondary info, timestamps, borders.
- **Accent/Heading Text**: Pure Silver, or a metallic gradient text effect.

#### Interactive Elements
- **Primary Action (Buttons, Links)**: Silver (`#e2e8f0` or gradient) or a slightly vibrant Cyan/Teal accent very sparingly if needed for highlighting interactions.
- **Hover States**: Lighten the background slightly (e.g., `hover:bg-[#233554]`).

### Typography Guidelines

- **Font Family**: Use clean, modern sans-serif (e.g., Inter, Geist) built into the framework.
- **Headings**: Bold, well-spaced, often using light silver or gradient text.

### Visual Details

- **Motion**: Use smooth, subtle animations (e.g., `framer-motion` or standard Tailwind `transition-all duration-300`).
- **Borders**: Thin, subtle borders (`border-[#233554]`) instead of heavy dropshadows in dark mode.
- **Gradients**: Use metallic silver to white gradients for key text or subtle background flares to add depth to the dark navy canvas.
- **No "AI Slop"**: Avoid generic purple/pink gradients unless strictly necessary. Stay true to the serious, IT-focused Dark Navy and Silver.
