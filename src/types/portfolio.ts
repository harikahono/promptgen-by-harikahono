// src/types/portfolio.ts
import { z } from 'zod';

// ===== IDENTITAS =====
export const KeunggulanSchema = z.object({
  judul: z.string().min(3, 'Minimal 3 karakter').max(50, 'Maksimal 50 karakter'),
  deskripsi: z.string().min(10, 'Minimal 10 karakter').max(200, 'Maksimal 200 karakter')
});

export const IdentitasSchema = z.object({
  nama: z.string().min(2, 'Minimal 2 karakter').max(50, 'Maksimal 50 karakter'),
  profesi: z.string().min(2, 'Minimal 2 karakter').max(50, 'Maksimal 50 karakter'),
  tagline: z.string().min(10, 'Minimal 10 karakter').max(100, 'Maksimal 100 karakter'),
  deskripsi: z.string().min(20, 'Minimal 20 karakter').max(500, 'Maksimal 500 karakter'),
  kota: z.string().optional(),
  jamKerja: z.string().optional(),
  email: z.string().email('Format email tidak valid'),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  cvUrl: z.string().url('Format URL tidak valid').optional().or(z.literal('')),
  keunggulan: z.array(KeunggulanSchema).length(3, 'Harus tepat 3 keunggulan')
});

export type Keunggulan = z.infer<typeof KeunggulanSchema>;
export type IdentitasData = z.infer<typeof IdentitasSchema>;

// ===== LAYANAN =====
export const LayananSchema = z.object({
  id: z.string(),
  nama: z.string().min(3, 'Minimal 3 karakter').max(50, 'Maksimal 50 karakter'),
  deskripsi: z.string().max(200, 'Maksimal 200 karakter').optional(),
  fitur: z.string().max(200, 'Maksimal 200 karakter').optional()
});

export type LayananItem = z.infer<typeof LayananSchema>;

// ===== PROYEK =====
export const ProyekSchema = z.object({
  id: z.string(),
  nama: z.string().min(3, 'Minimal 3 karakter').max(50, 'Maksimal 50 karakter'),
  kategori: z.string().max(30, 'Maksimal 30 karakter').optional(),
  deskripsi: z.string().max(200, 'Maksimal 200 karakter').optional()
});

export type ProyekItem = z.infer<typeof ProyekSchema>;

// ===== DESAIN =====
export const DesainSchema = z.object({
  theme: z.string().default('custom'),
  customColors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Format HEX tidak valid'),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Format HEX tidak valid'),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Format HEX tidak valid')
  }).optional(),
  fontPair: z.string().optional(),
  heroLayout: z.string().optional(),
  suasana: z.string().optional(),
  borderStyle: z.string().optional(),
  efekVisual: z.string().optional()
});

export type DesainData = z.infer<typeof DesainSchema>;

// ===== TARGET TOOL =====
export type TargetTool = 'claude' | 'lovable' | 'v0';

// ===== PORTFOLIO DATA LENGKAP =====
export const PortfolioDataSchema = z.object({
  identitas: IdentitasSchema,
  layanan: z.array(LayananSchema).max(4, 'Maksimal 4 layanan'),
  proyek: z.array(ProyekSchema).max(6, 'Maksimal 6 proyek'),
  desain: DesainSchema,
  selectedTarget: z.enum(['claude', 'lovable', 'v0']).optional()
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;

// ===== GENERATOR OUTPUT =====
export interface GeneratorOutput {
  prompt: string;
  targetName: string;
  estimatedTokens: number;
  tips: string[];
}

// ===== THEME PRESET =====
export interface ThemePreset {
  name: string;
  type: 'Gelap' | 'Terang';
  colors: [string, string, string]; // [primary, secondary, accent]
}

// ===== DEMO PROFESSION DATA =====
export interface DemoProfession {
  identitas: IdentitasData;
  layanan: LayananItem[];
  proyek: ProyekItem[];
  desain: Partial<DesainData>;
}

// ===== STORAGE SCHEMA (dengan versioning) =====
export interface StoredPortfolioData {
  version: number;
  data: Partial<PortfolioData>;
  lastUpdated: string;
}