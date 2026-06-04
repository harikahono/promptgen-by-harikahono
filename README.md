```markdown
<div align="center">

```text
██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗ ██████╗ ███████╗███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝██╔════╝ ██╔════╝████╗  ██║
██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║   ██║  ███╗█████╗  ██╔██╗ ██║
██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║   ██║   ██║██╔══╝  ██║╚██╗██║
██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║   ╚██████╔╝███████╗██║ ╚████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═══╝

```

**AI Portfolio Prompt Generator**

---

## 🚀 Overview

**PromptGen** adalah *web app* berbasis Vue 3 yang dirancang untuk mempermudah pembuatan *prompt* kontekstual bagi AI Web Builders (seperti Claude, Lovable.dev, atau v0.dev). Dengan menggunakan *5-step form wizard*, aplikasi ini menyusun data portofolio pengguna menjadi spesifikasi *prompt* yang sangat terstruktur, siap untuk di-*copy-paste* demi menghasilkan *website* portofolio yang dipersonalisasi.

Mengusung desain **Neobrutalism UI**, aplikasi ini cepat, responsif, dan memastikan validasi data yang ketat sebelum *prompt* dihasilkan.

## 🛠️ Tech Stack & Features

* **Framework:** Vue 3 (Composition API & `<script setup>`) + Vite
* **Styling:** Tailwind CSS v4
* **State Management:** Pinia
* **Validation:** Zod
* **Data Persistence:** LocalStorage + LZ-String (untuk URL State Compression)
* **Architecture:** Menggunakan **Adapter Pattern** untuk menghasilkan *prompt* dengan format dan instruksi spesifik tergantung pada *AI engine* target.

## 🏗️ Project Structure

```text
src/
├── adapters/      # Logic konversi JSON ke prompt spesifik (Claude, Lovable, v0)
├── components/    # Reusable UI components & Layouts
│   ├── ui/        # Base components (Neobrutalism UI style)
│   └── wizard/    # Komponen untuk setiap step form (Identitas, Layanan, Proyek, dll)
├── data/          # Mock data & Themes configuration
├── stores/        # Pinia state management (portfolio.ts)
├── types/         # Zod schemas & TypeScript definitions
└── utils/         # Helper functions (LZ-String URL encoding, dll)

```

## 💻 Local Development

Pastikan Node.js (versi LTS direkomendasikan) dan `pnpm` sudah terinstal di mesin Anda.

1. **Clone repository:**

```bash
   git clone [https://github.com/harikahono/promptgen-by-harikahono.git](https://github.com/harikahono/promptgen-by-harikahono.git)
   cd promptgen-by-harikahono

```

2. **Install dependencies:**

```bash
   pnpm install

```

3. **Run development server:**

```bash
   pnpm dev

```

4. **Build for production:**

```bash
   pnpm build

```

```

```