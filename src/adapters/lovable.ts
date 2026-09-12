// src/adapters/lovable.ts
import type { PromptGenerator } from './base';
import type { PortfolioData, GeneratorOutput } from '../types/portfolio';
import { formatters } from './base';

/**
 * Generator untuk Lovable.dev
 * Style: Conversational, design-forward, app description approach
 * Stack assumption: React + Vite + Tailwind CSS
 */
export const lovableGenerator: PromptGenerator = {
  targetName: 'Lovable',
  targetIcon: '💜',

  generate(data: PortfolioData): GeneratorOutput {
    const { identitas, layanan, proyek, desain } = data;

    // More natural, conversational tone
    const intro = `
Build a polished portfolio website for ${identitas.nama}, a ${identitas.profesi}.

Goal: turn visitors into leads who contact ${identitas.nama}.
Main CTA: contact / hire me.
Tagline: "${identitas.tagline}"

Use this real content, not placeholder text.

About ${identitas.nama.split(' ')[0]}:
${identitas.deskripsi}
`.trim();

    const keunggulanText = `
${identitas.nama.split(' ')[0]} punya 3 keunggulan utama yang harus highlighted:

${identitas.keunggulan.map((k, i) => `${i + 1}. **${k.judul}** — ${k.deskripsi}`).join('\n')}
`.trim();

    const layananText = layanan.length > 0 ? `
Layanan yang ditawarkan:

${layanan.map((item, i) => {
  let text = `**${i + 1}. ${item.nama}**`;
  if (item.deskripsi) text += `\n   ${item.deskripsi}`;
  if (item.fitur) text += `\n   Fitur: ${item.fitur}`;
  return text;
}).join('\n\n')}
`.trim() : '';

    const proyekText = proyek.length > 0 ? `
Portfolio projects yang harus ditampilkan:

${proyek.map((p, i) => {
  let text = `**${i + 1}. ${p.nama}**`;
  if (p.kategori) text += ` (${p.kategori})`;
  if (p.deskripsi) text += `\n   ${p.deskripsi}`;
  return text;
}).join('\n\n')}

Buat portfolio grid dengan filter kategori yang smooth.
`.trim() : '';

    const contactText = `
Kontak info:
- Email: ${identitas.email}
${identitas.whatsapp ? `- WhatsApp: ${identitas.whatsapp}` : ''}
${identitas.instagram ? `- Instagram: @${identitas.instagram}` : ''}
${identitas.linkedin ? `- LinkedIn: ${identitas.linkedin}` : ''}
${identitas.github ? `- GitHub: ${identitas.github}` : ''}
`.trim();

    const designDirection = `
DESIGN VIBE:
${desain.suasana ? `Suasana yang aku mau: **${desain.suasana}**` : 'Bebas, yang penting looks professional & modern'}

${formatters.formatColors(desain)}

${desain.fontPair ? `Font pairing: ${desain.fontPair} (pakai Google Fonts)` : 'Pilih font pair yang modern & readable'}

${desain.heroLayout ? `Hero layout: ${desain.heroLayout}` : ''}
${desain.borderStyle ? `Border style: ${desain.borderStyle}` : ''}
${desain.efekVisual ? `Background effect: ${desain.efekVisual}` : ''}

CRITICAL: Ini portfolio ${identitas.profesi}, bukan template admin dashboard. 
Design harus looks high-end, premium, dan memorable.
`.trim();

    const techRequirements = `
TECH STACK:
- React + TypeScript
- Tailwind CSS untuk styling
- Framer Motion untuk animasi smooth
- Lucide React untuk ikon
- Vite sebagai build tool

BUILD METHOD:
- Think in components: Hero, About, Strengths, Services, Projects, Contact, Footer
- Use real copy from this prompt in every section
- Add responsive mobile, tablet, desktop layouts
- Add loading/empty/error states only where useful
- Keep the page focused: no dashboards, no fake SaaS UI, no placeholder lorem ipsum

REQUIREMENTS:
✅ Fully responsive (mobile-first)
✅ Dark mode by default
✅ Smooth scroll animations (fade-in, slide-up)
✅ Micro-interactions (hover effects, button animations)
✅ Fast loading (lazy load images)
✅ Clean component structure
✅ Type-safe (TypeScript)
`.trim();

    const fullPrompt = `
${intro}

${keunggulanText}

${layananText}

${proyekText}

${contactText}

---

${designDirection}

---

${techRequirements}

---

Build the full page now. If something is ambiguous but not blocking, make a tasteful default and continue.
Jangan bikin generic — ini harus reflect personality dari ${identitas.nama} sebagai ${identitas.profesi}.

Structure:
1. Hero section yang clear, premium, dan conversion-focused
2. About section dengan 3 keunggulan cards
3. Services/Layanan section (kalau ada)
4. Portfolio grid dengan smooth filter
5. Contact section dengan social links yang clickable
6. Footer minimal
`.trim();

    const estimatedTokens = formatters.estimateTokens(fullPrompt);

    return {
      prompt: fullPrompt,
      targetName: this.targetName,
      estimatedTokens,
      tips: [
        'Login ke lovable.dev terlebih dahulu',
        'Paste prompt di chat Lovable',
        'Lovable akan auto-generate React components',
        'Review & edit via visual editor kalau perlu',
        'Deploy langsung dari Lovable (one-click)',
        'Lovable cocok untuk iterasi cepat & design experimentation'
      ]
    };
  }
};
