// src/utils/urlState.ts
import LZString from 'lz-string';
import type { PortfolioData } from '../types/portfolio';

/**
 * Options untuk encoding state
 */
interface EncodeOptions {
  excludePII?: boolean; // Exclude Personally Identifiable Information (email, whatsapp)
}

/**
 * Encode portfolio data ke URL-safe compressed string
 */
export function encodeStateToUrl(
  data: Partial<PortfolioData>,
  options: EncodeOptions = {}
): string {
  try {
    let dataToEncode = { ...data };

    // Exclude PII jika diminta
    if (options.excludePII && dataToEncode.identitas) {
      const { email, whatsapp, ...restIdentitas } = dataToEncode.identitas;
      dataToEncode = {
        ...dataToEncode,
        identitas: {
          ...restIdentitas,
          email: '', // Clear email
          whatsapp: '' // Clear whatsapp
        }
      };
    }

    const jsonString = JSON.stringify(dataToEncode);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);

    // Cek ukuran — warn jika > 2000 chars (browser/server limit concern)
    if (compressed.length > 2000) {
      console.warn(
        `JARVIS: URL cukup panjang (${compressed.length} chars). Beberapa browser/server mungkin have issues dengan URL > 2083 chars.`
      );
    }

    return compressed;
  } catch (error) {
    console.error('JARVIS: Gagal encode state ke URL.', error);
    return '';
  }
}

/**
 * Decode URL-safe compressed string ke portfolio data
 */
export function decodeStateFromUrl(encodedData: string): Partial<PortfolioData> | null {
  try {
    const jsonString = LZString.decompressFromEncodedURIComponent(encodedData);
    
    if (!jsonString) {
      console.warn('JARVIS: URL kosong atau corrupt.');
      return null;
    }

    const parsed = JSON.parse(jsonString);
    
    // Basic validation — pastikan structure minimal benar
    if (typeof parsed !== 'object' || parsed === null) {
      console.warn('JARVIS: URL decode berhasil tapi format data tidak valid.');
      return null;
    }

    return parsed as Partial<PortfolioData>;
  } catch (error) {
    console.error('JARVIS: Gagal decode state dari URL.', error);
    return null;
  }
}

/**
 * Generate shareable URL dari current location + encoded state
 */
export function generateShareUrl(
  data: Partial<PortfolioData>,
  options: EncodeOptions = {}
): string {
  const encoded = encodeStateToUrl(data, options);
  if (!encoded) return '';

  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?state=${encoded}`;
}

/**
 * Load state dari URL query parameter
 */
export function loadStateFromUrl(): Partial<PortfolioData> | null {
  const params = new URLSearchParams(window.location.search);
  const stateParam = params.get('state');

  if (!stateParam) return null;

  return decodeStateFromUrl(stateParam);
}