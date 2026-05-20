// src/adapters/claude.ts
import type { PromptGenerator } from './base';
import type { PortfolioData, GeneratorOutput } from '../types/portfolio';
import { formatters } from './base';

/**
 * Generator untuk Claude / ChatGPT
 * Style: Verbose, framework-agnostic, full specification
 * Output: Single HTML file dengan inline CSS & JS
 */
export const claudeGenerator: PromptGenerator = {
  targetName: 'Claude / ChatGPT',
  targetIcon: '🤖',

  generate(data: PortfolioData): GeneratorOutput {
    const { identitas, layanan, proyek, desain } = data;

    // Build prompt sections
    const identitasSection = `
IDENTITAS PORTFOLIO:
Nama         : ${identitas.nama}
Profesi      : ${identitas.profesi}
Tagline      : ${identitas.tagline}
Deskripsi    : ${identitas.deskripsi}
${identitas.kota ? `Lokasi      : ${identitas.kota}` : ''}
${identitas.jamKerja ? `Jam Kerja   : ${identitas.jamKerja}` : ''}

KONTAK:
Email        : ${identitas.email}
${identitas.whatsapp ? `WhatsApp    : ${identitas.whatsapp}` : ''}
${identitas.instagram ? `Instagram   : ${identitas.instagram}` : ''}
${identitas.linkedin ? `LinkedIn    : ${identitas.linkedin}` : ''}
${identitas.github ? `GitHub      : ${identitas.github}` : ''}
${identitas.cvUrl ? `CV/Resume   : ${identitas.cvUrl}` : ''}

KEUNGGULAN UTAMA:
${formatters.formatKeunggulan(identitas.keunggulan)}
`.trim();

    const layananSection = formatters.formatLayanan(layanan);
    const proyekSection = formatters.formatProyek(proyek);

    const desainSection = `
PREFERENSI DESAIN:
Warna           : ${formatters.formatColors(desain)}
${desain.fontPair ? `Font Pair       : ${desain.fontPair}` : ''}
${desain.heroLayout ? `Hero Layout     : ${desain.heroLayout}` : ''}
${desain.suasana ? `Suasana Visual  : ${desain.suasana}` : ''}
${desain.borderStyle ? `Border Style    : ${desain.borderStyle}` : ''}
${desain.efekVisual ? `Efek Background : ${desain.efekVisual}` : ''}
`.trim();

    const systemPrompt = `
Buatkan web portfolio satu halaman (single page) menggunakan HTML, CSS, dan JavaScript murni.

REQUIREMENT TEKNIS:
- Satu file HTML lengkap yang bisa langsung dibuka di browser
- Semua CSS di dalam tag <style> (inline styles)
- Semua JavaScript di dalam tag <script> (inline scripts)
- Gunakan Google Fonts via CDN jika ada spesifikasi font
- Responsive design (mobile-first approach)
- Semantic HTML5 (header, nav, main, section, article, footer)
- Aksesibilitas: aria-labels, alt text, keyboard navigation
- Performance: lazy loading untuk images, smooth scroll behavior

STRUKTUR WAJIB:
1. Navbar sticky dengan glassmorphism effect
2. Hero section dengan CTA
3. Tentang Saya + 3 keunggulan (tampilkan dalam card/grid)
4. Layanan/What I Do (jika ada data layanan)
5. Portfolio/Proyek dengan filter kategori (jika ada)
6. Kontak section dengan social links
7. Footer dengan copyright

STYLE GUIDE:
- Modern, clean, professional
- Animasi: smooth scroll, fade-in on scroll (Intersection Observer)
- Hover effects: subtle shadows, scale transform
- Color scheme: sesuai preferensi desain user
- Typography: hierarchy jelas (display font untuk headers, body font untuk content)
- Spacing: generous whitespace, consistent padding/margin
- Mobile: hamburger menu, stacked layout
`.trim();

    const fullPrompt = `
${systemPrompt}

---

${identitasSection}

---

DAFTAR LAYANAN:
${layananSection}

---

PORTFOLIO PROYEK:
${proyekSection}

---

${desainSection}

---

INSTRUKSI AKHIR:
Generate satu file index.html lengkap dengan semua CSS dan JavaScript inline.
Pastikan kode bersih, terstruktur, dan siap di-copy-paste.
Output harus langsung bisa dibuka di browser tanpa error.
`.trim();

    const estimatedTokens = formatters.estimateTokens(fullPrompt);

    return {
      prompt: fullPrompt,
      targetName: this.targetName,
      estimatedTokens,
      tips: [
        'Paste seluruh prompt ke Claude atau ChatGPT',
        'Jika AI berhenti di tengah: ketik "lanjutkan kode dari bagian yang terpotong"',
        'Untuk output panjang, gunakan Claude (context window lebih besar)',
        'Save output sebagai index.html dan buka di browser',
        'Deploy gratis ke Netlify/Vercel/GitHub Pages'
      ]
    };
  }
};