// src/data/demoProfessions.ts
import { nanoid } from 'nanoid';
import type { DemoProfession } from '../types/portfolio';

/**
 * Demo data untuk berbagai profesi
 * User bisa klik dropdown untuk auto-fill semua field
 */
export const demoProfessions: Record<string, DemoProfession> = {
  uiux: {
    identitas: {
      nama: 'Sarah Wijaya',
      profesi: 'UI/UX Designer',
      tagline: 'Crafting delightful digital experiences that users love',
      deskripsi: 'UI/UX Designer dengan 5+ tahun pengalaman di startup dan agency. Spesialisasi dalam user research, wireframing, prototyping, dan design systems. Telah membantu 30+ produk digital meningkatkan user satisfaction hingga 40%.',
      kota: 'Jakarta, WIB',
      jamKerja: 'Senin–Jumat, 09.00–18.00',
      email: 'sarah.wijaya@email.com',
      whatsapp: '+6281234567890',
      instagram: 'sarahwijaya.design',
      linkedin: 'sarahwijaya',
      github: '',
      cvUrl: '',
      keunggulan: [
        {
          judul: 'User-Centered Design',
          deskripsi: 'Selalu mulai dari riset pengguna untuk memastikan solusi yang tepat'
        },
        {
          judul: 'Fast Iteration',
          deskripsi: 'Prototipe cepat untuk validasi ide sebelum development'
        },
        {
          judul: 'Design Systems',
          deskripsi: 'Membangun sistem desain yang konsisten dan scalable'
        }
      ]
    },
    layanan: [
      {
        id: nanoid(),
        nama: 'UI/UX Design',
        deskripsi: 'Desain antarmuka yang intuitif dan menarik',
        fitur: 'User research, Wireframe, Prototype, Usability testing'
      },
      {
        id: nanoid(),
        nama: 'Design System',
        deskripsi: 'Sistem desain untuk konsistensi produk',
        fitur: 'Component library, Style guide, Documentation'
      }
    ],
    proyek: [
      {
        id: nanoid(),
        nama: 'E-Commerce Redesign',
        kategori: 'Web Design',
        deskripsi: 'Redesign platform e-commerce yang meningkatkan conversion rate 35%'
      },
      {
        id: nanoid(),
        nama: 'Mobile Banking App',
        kategori: 'Mobile Design',
        deskripsi: 'Design sistem untuk mobile banking dengan 500K+ users'
      },
      {
        id: nanoid(),
        nama: 'SaaS Dashboard',
        kategori: 'Web Design',
        deskripsi: 'Dashboard analytics untuk startup B2B SaaS'
      }
    ],
    desain: {
      suasana: 'Profesional & bersih',
      borderStyle: 'Rounded penuh'
    }
  },

  web: {
    identitas: {
      nama: 'Ahmad Rizky',
      profesi: 'Web Developer',
      tagline: 'Building fast, scalable, and beautiful web applications',
      deskripsi: 'Full-stack Web Developer dengan 6+ tahun pengalaman. Spesialisasi dalam React, Node.js, dan PostgreSQL. Passionate tentang clean code, performance optimization, dan developer experience.',
      kota: 'Bandung, WIB',
      jamKerja: 'Senin–Jumat, 10.00–19.00',
      email: 'ahmad.rizky@email.com',
      whatsapp: '+6282123456789',
      instagram: 'ahmadrizky.dev',
      linkedin: 'ahmadrizky',
      github: 'ahmadrizky',
      cvUrl: '',
      keunggulan: [
        {
          judul: 'Clean Code',
          deskripsi: 'Kode yang mudah dibaca, maintain, dan scale'
        },
        {
          judul: 'Performance First',
          deskripsi: 'Optimasi performa untuk loading cepat dan UX smooth'
        },
        {
          judul: 'Full-Stack Expertise',
          deskripsi: 'Handle frontend, backend, dan deployment secara end-to-end'
        }
      ]
    },
    layanan: [
      {
        id: nanoid(),
        nama: 'Web Development',
        deskripsi: 'Pembuatan website dan web app modern',
        fitur: 'React, Next.js, Node.js, PostgreSQL, TypeScript'
      },
      {
        id: nanoid(),
        nama: 'API Development',
        deskripsi: 'RESTful dan GraphQL API yang robust',
        fitur: 'Node.js, Express, tRPC, Authentication, Rate limiting'
      }
    ],
    proyek: [
      {
        id: nanoid(),
        nama: 'E-Learning Platform',
        kategori: 'Full-Stack',
        deskripsi: 'Platform pembelajaran online dengan 10K+ users aktif'
      },
      {
        id: nanoid(),
        nama: 'Real-time Chat App',
        kategori: 'Backend',
        deskripsi: 'Aplikasi chat dengan WebSocket dan Redis untuk scalability'
      },
      {
        id: nanoid(),
        nama: 'Corporate Website',
        kategori: 'Frontend',
        deskripsi: 'Website perusahaan dengan Next.js dan headless CMS'
      }
    ],
    desain: {
      suasana: 'Modern & techy',
      borderStyle: 'Sedikit rounded'
    }
  },

  writer: {
    identitas: {
      nama: 'Dina Pratiwi',
      profesi: 'Content Writer',
      tagline: 'Mengubah ide menjadi kata-kata yang menjual',
      deskripsi: 'Professional Content Writer dengan 4+ tahun pengalaman di digital marketing dan SEO. Spesialisasi dalam blog post, copywriting, dan content strategy. Telah menulis 500+ artikel untuk berbagai industri.',
      kota: 'Yogyakarta, WIB',
      jamKerja: 'Senin–Jumat, 08.00–17.00',
      email: 'dina.pratiwi@email.com',
      whatsapp: '+6283123456789',
      instagram: 'dinapratiwi.writer',
      linkedin: 'dinapratiwi',
      github: '',
      cvUrl: '',
      keunggulan: [
        {
          judul: 'SEO Optimization',
          deskripsi: 'Artikel yang ranking di page 1 Google dengan keyword research matang'
        },
        {
          judul: 'Engaging Copy',
          deskripsi: 'Tulisan yang menarik perhatian dan mendorong action'
        },
        {
          judul: 'Fast Turnaround',
          deskripsi: 'Deliver konten berkualitas dalam deadline ketat'
        }
      ]
    },
    layanan: [
      {
        id: nanoid(),
        nama: 'Blog Writing',
        deskripsi: 'Artikel blog yang SEO-friendly dan engaging',
        fitur: 'Keyword research, SEO optimization, Editing, Proofreading'
      },
      {
        id: nanoid(),
        nama: 'Copywriting',
        deskripsi: 'Copy untuk landing page, ads, dan email marketing',
        fitur: 'Sales page, Product description, Email campaign, Ad copy'
      }
    ],
    proyek: [
      {
        id: nanoid(),
        nama: 'Tech Blog Series',
        kategori: 'Blog Writing',
        deskripsi: 'Series 20+ artikel tentang AI yang total reach 100K+ views'
      },
      {
        id: nanoid(),
        nama: 'E-Commerce Product Copy',
        kategori: 'Copywriting',
        deskripsi: 'Menulis product description untuk 200+ SKU yang boost conversion'
      },
      {
        id: nanoid(),
        nama: 'Email Campaign',
        kategori: 'Copywriting',
        deskripsi: 'Email marketing campaign dengan open rate 40% di atas industry average'
      }
    ],
    desain: {
      suasana: 'Hangat & personal',
      borderStyle: 'Rounded penuh'
    }
  },

  sales: {
    identitas: {
      nama: 'Budi Santoso',
      profesi: 'Sales Executive',
      tagline: 'Closing deals and building lasting relationships',
      deskripsi: 'Sales Executive dengan 7+ tahun pengalaman di B2B dan enterprise sales. Track record menutup deals hingga nilai Rp 5M+. Spesialisasi dalam consultative selling, pipeline management, dan customer relationship.',
      kota: 'Jakarta, WIB',
      jamKerja: 'Senin–Sabtu, 09.00–18.00',
      email: 'budi.santoso@email.com',
      whatsapp: '+6281987654321',
      instagram: 'budisantoso.sales',
      linkedin: 'budisantoso',
      github: '',
      cvUrl: '',
      keunggulan: [
        {
          judul: 'Consultative Approach',
          deskripsi: 'Memahami kebutuhan klien sebelum offering solusi'
        },
        {
          judul: 'Pipeline Management',
          deskripsi: 'Tracking dan nurturing prospects secara sistematis'
        },
        {
          judul: 'Proven Track Record',
          deskripsi: 'Konsisten mencapai 120%+ dari target penjualan'
        }
      ]
    },
    layanan: [
      {
        id: nanoid(),
        nama: 'B2B Sales',
        deskripsi: 'Penjualan enterprise dan corporate',
        fitur: 'Lead generation, Prospecting, Pitching, Negotiation, Closing'
      },
      {
        id: nanoid(),
        nama: 'Sales Training',
        deskripsi: 'Training untuk sales team dan startup',
        fitur: 'Sales methodology, Pipeline management, Cold calling, Presentation skills'
      }
    ],
    proyek: [
      {
        id: nanoid(),
        nama: 'SaaS Enterprise Deal',
        kategori: 'B2B Sales',
        deskripsi: 'Closing kontrak enterprise SaaS senilai Rp 2M dengan perusahaan fintech'
      },
      {
        id: nanoid(),
        nama: 'Channel Partnership',
        kategori: 'Partnership',
        deskripsi: 'Membangun network partnership yang generate Rp 10M+ revenue'
      },
      {
        id: nanoid(),
        nama: 'Sales Team Training',
        kategori: 'Training',
        deskripsi: 'Training sales team startup yang meningkatkan close rate dari 15% ke 35%'
      }
    ],
    desain: {
      suasana: 'Profesional & bersih',
      borderStyle: 'Sharp/kotak'
    }
  },

  marketer: {
    identitas: {
      nama: 'Rina Marlina',
      profesi: 'Digital Marketer',
      tagline: 'Data-driven marketing that delivers ROI',
      deskripsi: 'Digital Marketing Specialist dengan 5+ tahun pengalaman di growth marketing, paid ads, dan analytics. Telah manage campaign dengan budget total Rp 1B+ dan deliver ROI hingga 400%.',
      kota: 'Surabaya, WIB',
      jamKerja: 'Senin–Jumat, 09.00–18.00',
      email: 'rina.marlina@email.com',
      whatsapp: '+6285123456789',
      instagram: 'rinamarlina.marketing',
      linkedin: 'rinamarlina',
      github: '',
      cvUrl: '',
      keunggulan: [
        {
          judul: 'Data-Driven Strategy',
          deskripsi: 'Setiap keputusan berdasarkan data dan testing'
        },
        {
          judul: 'Multi-Channel Expertise',
          deskripsi: 'Menguasai Google Ads, Meta Ads, TikTok Ads, dan SEO'
        },
        {
          judul: 'ROI Focused',
          deskripsi: 'Fokus pada metrics yang matter: revenue dan profit'
        }
      ]
    },
    layanan: [
      {
        id: nanoid(),
        nama: 'Paid Advertising',
        deskripsi: 'Campaign ads yang profitable di berbagai platform',
        fitur: 'Google Ads, Meta Ads, TikTok Ads, Campaign setup, Optimization'
      },
      {
        id: nanoid(),
        nama: 'Marketing Strategy',
        deskripsi: 'Strategi marketing yang comprehensive',
        fitur: 'Market research, Funnel optimization, Analytics, Reporting'
      }
    ],
    proyek: [
      {
        id: nanoid(),
        nama: 'E-Commerce Growth',
        kategori: 'Performance Marketing',
        deskripsi: 'Scale e-commerce dari 50 juta ke 500 juta revenue dalam 6 bulan'
      },
      {
        id: nanoid(),
        nama: 'B2B Lead Gen',
        kategori: 'B2B Marketing',
        deskripsi: 'Generate 200+ qualified leads per bulan untuk SaaS startup'
      },
      {
        id: nanoid(),
        nama: 'Brand Campaign',
        kategori: 'Brand Marketing',
        deskripsi: 'Campaign awareness yang reach 5M+ impressions dengan engagement rate 8%'
      }
    ],
    desain: {
      suasana: 'Kreatif & berani',
      borderStyle: 'Sedikit rounded'
    }
  }
};

/**
 * Get list of available professions untuk dropdown
 */
export function getProfessionList() {
  return [
    { id: 'uiux', label: 'UI/UX Designer' },
    { id: 'web', label: 'Web Developer' },
    { id: 'writer', label: 'Content Writer' },
    { id: 'sales', label: 'Sales Executive' },
    { id: 'marketer', label: 'Digital Marketer' }
  ];
}

/**
 * Get demo data by profession ID
 */
export function getDemoData(profesiId: string): DemoProfession | null {
  return demoProfessions[profesiId] || null;
}