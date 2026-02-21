# AI Consulting Page Guidelines

This document outlines the content structure and technical approach for building the "AI Consulting & Strategy" page on the corporate site. The user requires a page dedicated to consulting clients on how to utilize AI effectively.

## Page Goals
- Clearly communicate the company's expertise in practical AI application.
- Emphasize the **consulting/advisory** nature of the service (identifying needs, analyzing workflows, finding the right AI tools, strategy meetings).
- Drive conversions/inquiries for an initial consultation.

## Recommended Page Structure

A typical modern and trustworthy service page in Next.js/Tailwind should consist of these sections:

### 1. Hero Section
- **Headline**: "Transform Your Business with Strategic AI Integration" or "AI活用を、机上の空論から強力な業務基盤へ" (Japanese).
- **Subheadline**: Focus on consulting—"We don't just provide AI; we analyze your specific workflows and help you integrate the optimal AI solutions."
- **Call-to-Action (CTA)**: "Schedule a Free Consultation" or "無料相談を予約する".
- **Visual**: A highly polished, abstract "Dark Navy & Silver" graphic (e.g., stylized network nodes, data streams, or a metallic structural element).

### 2. Core Value Proposition (3 Columns)
- **Workflow Analysis**: Identifying inefficiencies and areas where AI (LLMs, generative AI, automation tools) can make a tangible impact.
- **Tool Selection & Strategy**: Not every business needs the same AI. We curate the best combination of tools for the client.
- **Implementation & Support**: Guiding the client through adoption, providing prompt engineering workshops, and setting up secure environments.

### 3. Consulting Process (Step-by-Step)
- **Step 1: Hearing & Discovery**: Understanding the client's business logic.
- **Step 2: Strategy Drafting**: Proposing specific AI use cases and expected ROI.
- **Step 3: PoC (Proof of Concept)**: Testing the AI solution on a small scale.
- **Step 4: Full Rollout & Training**: Company-wide integration and staff training.

### 4. Case Studies or Expected Outcomes
- Examples of what could be achieved: "Automated customer support saving 40% time," "Document analysis streamlined," etc.

### 5. Final CTA
- Contact form or a clear button leading to the main inquiry page.

## Implementation Details

- **File Location**: Usually `/app/ai-consulting/page.tsx` or `/app/services/ai-consulting/page.tsx`.
- **Styling**: strictly follow the `design-system.md` rules. Use `#0a192f` for the main background sections, and alternate with slightly lighter `#112240` to distinguish the steps or value props.
- **Typography**: Keep it professional, avoiding overly playful fonts. Use neat grids for the "Process" section.
- **Components**: Utilize Radix UI components pre-installed in the workspace (Accordion for FAQs, Cards for Services).
