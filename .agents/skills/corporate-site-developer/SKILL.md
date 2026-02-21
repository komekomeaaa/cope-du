---
name: corporate-site-developer
description: Guidelines and workflows for developing, maintaining, and adding new pages to the corporate site. Use this skill when the user asks to modify the corporate website, build new pages (like AI Consulting), or apply the "Dark Navy & Silver" design system. It contains specific constraints and rules to ensure a consistent, IT-focused, and highly professional aesthetic.
---

# Corporate Site Developer Skill

This skill provides guidelines and development workflows for maintaining and extending the corporate website. The site is built with Next.js App Router, Tailwind CSS v4, and Radix UI components. 

**Core Objective**: Ensure all new additions and modifications adhere to the established "Dark Navy & Silver" IT-focused branding, avoiding generic AI-generated aesthetics, while maintaining modern, clean, and performant Next.js code.

## 1. Design & Aesthetic Rules

When modifying the site's styling or building new UI components, you MUST adhere strictly to the established design system. The user's preference is a highly professional, trustworthy, and sophisticated look.

**CRITICAL CONSTRAINT**:
Do not invent generic or arbitrary color schemes. Do not default to plain white backgrounds or cliché purple/pink AI gradients. You must use the established Dark Navy (`#0a192f` / `#112240`) and Silver (`#ccd6f6` / `#8892b0`) palette.

**For full color palette mapping, typography, and motion rules:**
See [design-system.md](references/design-system.md)

## 2. Adding the AI Consulting Page

The user plans to add a page dedicated to AI Consulting and Strategy Meetings. When asked to construct this page, follow the specific content and structural guidelines provided in the reference document.

**For the recommended page structure, messaging, and component specifications:**
See [ai-consulting-page.md](references/ai-consulting-page.md)

## 3. Development Workflow

When tasked with modifying the site:

1. **Understand the Goal**: Identify if the task is modifying an existing component (e.g., updating global CSS) or building a new page (e.g., `/app/ai-consulting/page.tsx`).
2. **Apply the Design System**: Read `references/design-system.md` to ensure your Tailwind classes match the Dark Navy & Silver constraints (e.g., using `bg-[#0a192f]` or corresponding custom CSS variables where applicable).
3. **Use Existing Components**: Leverage installed Radix UI components (`components/ui/`) before building custom interactive elements from scratch.
4. **Implement**: Write or modify the code directly in the user's workspace using standard file manipulation tools. Ensure code is accessible, semantic, and uses proper Next.js App Router conventions (Server Components by default, `"use client"` only when necessary).

## Summary of Reference Materials

- **`references/design-system.md`**: The strict UI and aesthetic rules (Dark Navy & Silver).
- **`references/ai-consulting-page.md`**: Guide for constructing the AI Consulting services page.
