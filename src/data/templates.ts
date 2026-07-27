// src/data/templates.ts
import type { PortfolioData, TargetTool } from '@/types/portfolio';

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  targetTool: TargetTool;
  data: PortfolioData;
}

export const templates: PromptTemplate[] = [
  {
    id: 'freelancer-designer',
    name: 'Freelancer Designer',
    description: 'Template untuk desainer freelance dengan portofolio kreatif',
    targetTool: 'claude',
    data: {
      identitas: {
        nama: 'Jane Doe',
        profesi: 'UI/UX Designer',
        tagline: 'Membuat desain yang user-friendly dan estetik untuk pengalaman pengguna yang optimal',
        deskripsi: 'Desainer UI/UX dengan pengalaman 5 tahun dalam menciptakan antarmuka yang intuitif dan menarik. Spesialis dalam desain web, mobile app, dan branding. Berfokus pada user research, wireframing, prototyping, dan visual design yang memukau.',
        kota: 'Jakarta',
        jamKerja: 'Senin - Jumat, 09:00 - 17:00 WIB',
        email: 'jane.design@example.com',
        whatsapp: '+6281234567890',
        instagram: '@janedesign',
        linkedin: 'linkedin.com/in/janedesign',
        github: 'github.com/janedesign',
        cvUrl: 'https://example.com/cv-jane.pdf',
        keunggulan: [
          { judul: 'User-Centered Design', deskripsi: 'Desain yang berfokus pada kebutuhan dan pengalaman pengguna' },
          { judul: 'Visual Storytelling', deskripsi: 'Kemampuan untuk menyampaikan cerita melalui desain visual' },
          { judul: 'Prototyping Cepat', deskripsi: 'Membuat prototipe interaktif dengan cepat untuk validasi konsep' }
        ]
      },
      layanan: [
        {
          id: '1',
          nama: 'Web Design',
          deskripsi: 'Desain website yang responsif dan menarik untuk berbagai jenis bisnis',
          fitur: 'UI/UX Design, Responsive Layout, Visual Identity'
        },
        {
          id: '2',
          nama: 'Mobile App Design',
          deskripsi: 'Desain aplikasi mobile yang intuitif dan user-friendly',
          fitur: 'Wireframing, Prototyping, Visual Design'
        },
        {
          id: '3',
          nama: 'Branding',
          deskripsi: 'Pembuatan identitas merek yang kuat dan konsisten',
          fitur: 'Logo Design, Color Palette, Brand Guidelines'
        }
      ],
      proyek: [
        {
          id: '1',
          nama: 'E-Commerce Platform',
          kategori: 'Web Design',
          deskripsi: 'Desain platform e-commerce dengan navigasi yang intuitif dan pengalaman belanja yang menyenangkan'
        },
        {
          id: '2',
          nama: 'Fitness App',
          kategori: 'Mobile App',
          deskripsi: 'Aplikasi fitness dengan antarmuka yang bersih dan motivasi untuk penggunanya'
        },
        {
          id: '3',
          nama: 'Corporate Website',
          kategori: 'Web Design',
          deskripsi: 'Website perusahaan dengan desain profesional yang mencerminkan identitas merek'
        }
      ],
      desain: {
        theme: 'custom',
        customColors: {
          primary: '#735C00',
          secondary: '#006877',
          accent: '#A43073'
        },
        fontPair: 'Hanken Grotesk',
        heroLayout: 'Full-screen dengan gambar background',
        suasana: 'Profesional namun kreatif',
        borderStyle: 'Tepi kotak 4px solid hitam',
        efekVisual: 'Bayangan kotak 4px'
      },
      selectedTarget: 'claude'
    }
  },
  {
    id: 'fullstack-agency',
    name: 'Fullstack Agency',
    description: 'Template untuk agensi pengembangan web fullstack',
    targetTool: 'lovable',
    data: {
      identitas: {
        nama: 'TechSolutions Agency',
        profesi: 'Web Development Agency',
        tagline: 'Solusi digital lengkap untuk bisnis Anda, dari ide hingga implementasi',
        deskripsi: 'Agensi pengembangan web fullstack dengan tim ahli yang berfokus pada pembuatan website dan aplikasi web berkualitas tinggi. Kami menggabungkan desain modern dengan teknologi terkini untuk menghasilkan solusi digital yang efektif.',
        kota: 'Bandung',
        jamKerja: 'Senin - Sabtu, 08:00 - 18:00 WIB',
        email: 'hello@techsolutions.com',
        whatsapp: '+6281234567891',
        instagram: '@techsolutions',
        linkedin: 'linkedin.com/company/techsolutions',
        github: 'github.com/techsolutions',
        cvUrl: 'https://techsolutions.com/portfolio.pdf',
        keunggulan: [
          { judul: 'Tim Ahli', deskripsi: 'Tim pengembang dengan pengalaman bertahun-tahun' },
          { judul: 'Solusi Lengkap', deskripsi: 'Dari desain hingga deployment, kami tangani semuanya' },
          { judul: 'Support 24/7', deskripsi: 'Dukungan penuh untuk klien kami setelah proyek selesai' }
        ]
      },
      layanan: [
        {
          id: '1',
          nama: 'Web Development',
          deskripsi: 'Pengembangan website custom sesuai dengan kebutuhan bisnis Anda',
          fitur: 'Frontend, Backend, Database, API Integration'
        },
        {
          id: '2',
          nama: 'E-Commerce Solutions',
          deskripsi: 'Pembuatan toko online dengan fitur lengkap untuk bisnis Anda',
          fitur: 'Payment Gateway, Shopping Cart, Product Management'
        },
        {
          id: '3',
          nama: 'Web Maintenance',
          deskripsi: 'Pemeliharaan website untuk memastikan kinerja optimal',
          fitur: 'Security Updates, Performance Optimization, Bug Fixes'
        },
        {
          id: '4',
          nama: 'SEO Optimization',
          deskripsi: 'Optimasi website untuk mesin pencari agar lebih mudah ditemukan',
          fitur: 'Keyword Research, On-Page SEO, Technical SEO'
        }
      ],
      proyek: [
        {
          id: '1',
          nama: 'E-Commerce Marketplace',
          kategori: 'Web Development',
          deskripsi: 'Platform marketplace dengan fitur lengkap untuk penjual dan pembeli'
        },
        {
          id: '2',
          nama: 'Corporate Portal',
          kategori: 'Web Development',
          deskripsi: 'Portal perusahaan dengan sistem manajemen konten yang canggih'
        },
        {
          id: '3',
          nama: 'SaaS Platform',
          kategori: 'Web Application',
          deskripsi: 'Aplikasi web berbasis langganan dengan fitur kolaborasi tim'
        }
      ],
      desain: {
        theme: 'custom',
        customColors: {
          primary: '#006877',
          secondary: '#735C00',
          accent: '#A43073'
        },
        fontPair: 'Hanken Grotesk',
        heroLayout: 'Hero section dengan call-to-action yang menonjol',
        suasana: 'Profesional dan modern',
        borderStyle: 'Tepi kotak 4px solid hitam',
        efekVisual: 'Bayangan kotak 4px'
      },
      selectedTarget: 'lovable'
    }
  },
  {
    id: 'student-portfolio',
    name: 'Student Portfolio',
    description: 'Template untuk mahasiswa yang ingin menampilkan proyek dan keterampilan',
    targetTool: 'v0',
    data: {
      identitas: {
        nama: 'John Smith',
        profesi: 'Computer Science Student',
        tagline: 'Mahasiswa ilmu komputer dengan minat dalam pengembangan web dan AI',
        deskripsi: 'Mahasiswa semester 6 jurusan Ilmu Komputer dengan pengalaman dalam pengembangan web, machine learning, dan data analysis. Aktif dalam organisasi kampus dan memiliki minat yang besar dalam teknologi open source.',
        kota: 'Yogyakarta',
        jamKerja: 'Flexible',
        email: 'john.smith@student.university.edu',
        whatsapp: '+6281234567892',
        instagram: '@johncs',
        linkedin: 'linkedin.com/in/johnsmith',
        github: 'github.com/johnsmith',
        cvUrl: 'https://example.com/cv-john.pdf',
        keunggulan: [
          { judul: 'Fast Learner', deskripsi: 'Cepat mempelajari teknologi dan framework baru' },
          { judul: 'Problem Solver', deskripsi: 'Kemampuan analitis yang kuat untuk memecahkan masalah' },
          { judul: 'Team Player', deskripsi: 'Bekerja baik dalam tim dan berkomunikasi dengan efektif' }
        ]
      },
      layanan: [
        {
          id: '1',
          nama: 'Web Development',
          deskripsi: 'Pembuatan website sederhana hingga menengah menggunakan HTML, CSS, dan JavaScript',
          fitur: 'Responsive Design, Clean Code, Modern UI'
        },
        {
          id: '2',
          nama: 'Data Analysis',
          deskripsi: 'Analisis data menggunakan Python dan library seperti Pandas, NumPy, dan Matplotlib',
          fitur: 'Data Cleaning, Visualization, Statistical Analysis'
        },
        {
          id: '3',
          nama: 'Machine Learning',
          deskripsi: 'Penerapan model machine learning sederhana untuk proyek akademis',
          fitur: 'Supervised Learning, Unsupervised Learning, Model Evaluation'
        }
      ],
      proyek: [
        {
          id: '1',
          nama: 'Student Portal',
          kategori: 'Web Development',
          deskripsi: 'Portal mahasiswa untuk mengakses jadwal, nilai, dan informasi kampus'
        },
        {
          id: '2',
          nama: 'Movie Recommendation System',
          kategori: 'Machine Learning',
          deskripsi: 'Sistem rekomendasi film menggunakan collaborative filtering'
        },
        {
          id: '3',
          nama: 'Personal Blog',
          kategori: 'Web Development',
          deskripsi: 'Blog pribadi dengan konten tentang teknologi dan pengalaman belajar'
        }
      ],
      desain: {
        theme: 'custom',
        customColors: {
          primary: '#A43073',
          secondary: '#735C00',
          accent: '#006877'
        },
        fontPair: 'Hanken Grotesk',
        heroLayout: 'Simple dan minimalis',
        suasana: 'Muda dan energik',
        borderStyle: 'Tepi kotak 4px solid hitam',
        efekVisual: 'Bayangan kotak 4px'
      },
      selectedTarget: 'v0'
    }
  }
];

export function getTemplateById(id: string): PromptTemplate | undefined {
  return templates.find(t => t.id === id);
}

export function getAllTemplates(): PromptTemplate[] {
  return [...templates];
}
