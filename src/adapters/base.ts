// src/adapters/base.ts
import type { PortfolioData, GeneratorOutput } from '../types/portfolio';

/**
 * Interface untuk semua generator.
 * Functional approach — bukan OOP abstract class.
 */
export interface PromptGenerator {
  targetName: string;
  targetIcon: string;
  generate(data: PortfolioData): GeneratorOutput;
}

/**
 * Utility helpers untuk formatting data (shared across generators)
 */
export const formatters = {
  /**
   * Format layanan ke string yang readable untuk prompt
   */
  formatLayanan(layanan: PortfolioData['layanan']): string {
    if (layanan.length === 0) return 'Belum ada layanan yang ditambahkan.';

    return layanan
      .map((item, index) => {
        const parts = [
          `LAYANAN ${index + 1}`,
          `- Nama: ${item.nama}`,
        ];
        if (item.deskripsi) parts.push(`- Deskripsi: ${item.deskripsi}`);
        if (item.fitur) parts.push(`- Fitur: ${item.fitur}`);
        return parts.join('\n');
      })
      .join('\n\n');
  },

  /**
   * Format proyek ke string yang readable untuk prompt
   */
  formatProyek(proyek: PortfolioData['proyek']): string {
    if (proyek.length === 0) return 'Belum ada proyek yang ditambahkan.';

    return proyek
      .map((item, index) => {
        const parts = [
          `PROYEK ${index + 1}`,
          `- Nama: ${item.nama}`,
        ];
        if (item.kategori) parts.push(`- Kategori: ${item.kategori}`);
        if (item.deskripsi) parts.push(`- Deskripsi: ${item.deskripsi}`);
        return parts.join('\n');
      })
      .join('\n\n');
  },

  /**
   * Format keunggulan
   */
  formatKeunggulan(keunggulan: PortfolioData['identitas']['keunggulan']): string {
    return keunggulan
      .map((k, i) => `${i + 1}. ${k.judul} — ${k.deskripsi}`)
      .join('\n');
  },

  /**
   * Format warna dari desain
   */
  formatColors(desain: PortfolioData['desain']): string {
    if (desain.theme !== 'custom' && desain.theme) {
      return `Tema preset: ${desain.theme} (AI akan apply tema ini dengan palette yang sesuai)`;
    }

    if (desain.customColors) {
      const { primary, secondary, accent } = desain.customColors;
      return `Custom Colors:
- Primary: ${primary}
- Secondary: ${secondary}
- Accent: ${accent}

(Gunakan warna-warna ini secara fleksibel di seluruh elemen)`;
    }

    return 'Biarkan AI pilih palette yang paling cocok.';
  },

  /**
   * Estimasi token count (rough approximation)
   */
  estimateTokens(text: string): number {
    // Rule of thumb: 1 token ≈ 4 characters untuk English
    // Untuk Indonesian, sedikit lebih banyak (≈ 3.5 chars)
    return Math.ceil(text.length / 3.5);
  }
};