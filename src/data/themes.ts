// src/data/themes.ts
import type { ThemePreset } from '../types/portfolio';

/**
 * Theme presets untuk desain
 * User bisa pilih preset atau custom colors
 */
export const themePresets: ThemePreset[] = [
  // DARK THEMES
  {
    name: 'Midnight Tech',
    type: 'Gelap',
    colors: ['#0A0A0F', '#161622', '#E8FF47']
  },
  {
    name: 'Obsidian Gold',
    type: 'Gelap',
    colors: ['#12100E', '#1C1916', '#EAB308']
  },
  {
    name: 'Deep Navy',
    type: 'Gelap',
    colors: ['#060C1A', '#0F1828', '#14B8A6']
  },
  {
    name: 'Dark Coral',
    type: 'Gelap',
    colors: ['#110A08', '#1C1210', '#F97316']
  },
  {
    name: 'Noir Minimal',
    type: 'Gelap',
    colors: ['#000000', '#111111', '#E8E8E8']
  },
  {
    name: 'Dark Forest',
    type: 'Gelap',
    colors: ['#060E08', '#0E1A10', '#84CC16']
  },

  // LIGHT THEMES
  {
    name: 'Cream & Ink',
    type: 'Terang',
    colors: ['#F8F4EE', '#F0EAE2', '#C2410C']
  },
  {
    name: 'Paper White',
    type: 'Terang',
    colors: ['#FFFFFF', '#F4F4F6', '#1E3A8A']
  },
  {
    name: 'Sage Studio',
    type: 'Terang',
    colors: ['#F2F4F2', '#E8ECE8', '#4D7C0F']
  },
  {
    name: 'Warm Sand',
    type: 'Terang',
    colors: ['#FAF8F5', '#F5F0E8', '#B45309']
  }
];

/**
 * Get theme by name
 */
export function getThemeByName(name: string): ThemePreset | undefined {
  return themePresets.find(t => t.name === name);
}

/**
 * Get themes by type
 */
export function getThemesByType(type: 'Gelap' | 'Terang'): ThemePreset[] {
  return themePresets.filter(t => t.type === type);
}

/**
 * Font pair presets
 */
export const fontPairs = [
  'Syne + DM Sans',
  'Playfair Display + Inter',
  'Space Grotesk + Outfit',
  'Cabinet Grotesk + Sora',
  'Clash Display + Inter',
  'Plus Jakarta Sans + DM Sans',
  'Bricolage Grotesk + Nunito'
];

/**
 * Hero layout options
 */
export const heroLayouts = [
  { value: 'center', label: 'Rata tengah (tanpa gambar samping)' },
  { value: 'split', label: '2 kolom dengan gambar/icon di sisi kanan' }
];

/**
 * Suasana visual options
 */
export const suasanaOptions = [
  'Profesional & bersih',
  'Kreatif & berani',
  'Mewah & elegan',
  'Hangat & personal',
  'Modern & techy',
  'Minimalis & rapi',
  'Editorial & artistik',
  'Playful & fun'
];

/**
 * Border style options
 */
export const borderStyles = [
  'Rounded penuh',
  'Sedikit rounded',
  'Sharp/kotak'
];

/**
 * Efek visual options
 */
export const efekVisualOptions = [
  'Dot grid',
  'Garis diagonal',
  'Noise texture',
  'Gradient mesh',
  'Geometric pattern',
  'Bintang/partikel',
  'Polos dengan overlay warna'
];