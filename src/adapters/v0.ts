// src/adapters/v0.ts
import type { PromptGenerator } from './base';
import type { PortfolioData, GeneratorOutput } from '../types/portfolio';
import { formatters } from './base';

/**
 * Generator untuk v0 by Vercel
 * Style: Component-focused, Next.js + shadcn/ui aware
 * Stack assumption: Next.js App Router + Tailwind + shadcn/ui
 */
export const v0Generator: PromptGenerator = {
  targetName: 'v0 by Vercel',
  targetIcon: '▲',

  generate(data: PortfolioData): GeneratorOutput {
    const { identitas, layanan, proyek, desain } = data;

    // Component-oriented prompt
    const componentSpec = `
Create a modern portfolio website for ${identitas.nama}, a ${identitas.profesi}.

PERSONA:
Name: ${identitas.nama}
Role: ${identitas.profesi}
Tagline: "${identitas.tagline}"
Bio: ${identitas.deskripsi}
${identitas.kota ? `Location: ${identitas.kota}` : ''}

KEY STRENGTHS:
${identitas.keunggulan.map((k, i) => `${i + 1}. ${k.judul}: ${k.deskripsi}`).join('\n')}
`.trim();

    const servicesSpec = layanan.length > 0 ? `
SERVICES OFFERED:
${layanan.map((s, i) => {
  let spec = `${i + 1}. ${s.nama}`;
  if (s.deskripsi) spec += `\n   Description: ${s.deskripsi}`;
  if (s.fitur) spec += `\n   Features: ${s.fitur}`;
  return spec;
}).join('\n\n')}
`.trim() : '';

    const projectsSpec = proyek.length > 0 ? `
PORTFOLIO PROJECTS:
${proyek.map((p, i) => {
  let spec = `${i + 1}. ${p.nama}`;
  if (p.kategori) spec += ` [${p.kategori}]`;
  if (p.deskripsi) spec += `\n   ${p.deskripsi}`;
  return spec;
}).join('\n\n')}

Implement a filterable grid with category tabs.
`.trim() : '';

    const contactSpec = `
CONTACT INFORMATION:
Email: ${identitas.email}
${identitas.whatsapp ? `WhatsApp: ${identitas.whatsapp}` : ''}
${identitas.instagram ? `Instagram: ${identitas.instagram}` : ''}
${identitas.linkedin ? `LinkedIn: ${identitas.linkedin}` : ''}
${identitas.github ? `GitHub: ${identitas.github}` : ''}
${identitas.cvUrl ? `Resume: ${identitas.cvUrl}` : ''}
`.trim();

    const designSpec = `
DESIGN SYSTEM:
${formatters.formatColors(desain)}

${desain.fontPair ? `Typography: ${desain.fontPair}` : 'Use modern font pairing (e.g., Inter + Space Grotesk)'}

Visual Style: ${desain.suasana || 'Professional & modern'}
${desain.borderStyle ? `Border Radius: ${desain.borderStyle}` : ''}
${desain.efekVisual ? `Background Pattern: ${desain.efekVisual}` : ''}
${desain.heroLayout ? `Hero Layout: ${desain.heroLayout}` : ''}

Use shadcn/ui components where appropriate (Button, Card, Badge, Tabs, etc.)
Implement dark mode with next-themes.
`.trim();

    const technicalRequirements = `
TECHNICAL STACK:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- next-themes for dark mode

COMPONENTS STRUCTURE:
1. Hero Section
   - Large heading with gradient
   - Subheading (tagline)
   - CTA buttons (Contact, View Work)
   - Optional: avatar/image on side

2. About Section
   - Bio paragraph
   - 3 strengths displayed as Cards with icons
   - Stats (if applicable)

3. Services Section (if data exists)
   - Grid of service Cards
   - Each card: icon, title, description, features list

4. Portfolio Section
   - Filterable grid with Tabs
   - Project Cards with hover effects
   - Category badges

5. Contact Section
   - Email + social links as interactive buttons
   - Contact form (optional)

6. Navigation
   - Sticky header with smooth scroll links
   - Mobile: hamburger menu

INTERACTIONS:
- Smooth scroll between sections
- Fade-in animations on scroll
- Hover effects on cards/buttons
- Filter transition animations
`.trim();

    const fullPrompt = `
${componentSpec}

${servicesSpec}

${projectsSpec}

${contactSpec}

---

${designSpec}

---

${technicalRequirements}

---

DELIVERABLE:
Generate Next.js 14 App Router components with TypeScript.
Use shadcn/ui for UI primitives.
Implement responsive design with Tailwind.
Code should be production-ready and follow Next.js best practices.

Focus on: clean component composition, type safety, and performance.
`.trim();

    const estimatedTokens = formatters.estimateTokens(fullPrompt);

    return {
      prompt: fullPrompt,
      targetName: this.targetName,
      estimatedTokens,
      tips: [
        'Go to v0.dev dan paste prompt',
        'v0 akan generate multiple design variants — pilih yang terbaik',
        'Edit via v0 visual editor kalau ada yang perlu tweaking',
        'Download code atau fork ke StackBlitz',
        'Deploy ke Vercel (seamless integration)',
        'v0 cocok untuk Next.js + shadcn/ui stack'
      ]
    };
  }
};