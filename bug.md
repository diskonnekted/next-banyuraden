# 🐛 Analisis Bug — Vercel Deploy Error
**Proyek:** `next-pondokrejo` (Portal Kalurahan Banyuraden)
**Tanggal Analisis:** 2026-08-27

---

## 🔴 CRITICAL — Pasti Menyebabkan Deploy Error

### 1. `next: "16.0.10"` — Versi Next.js Tidak Valid
**File:** [`package.json:59`](file:///I:/banyuraden/next-pondokrejo/package.json#L59)

```json
"next": "16.0.10"
```

Next.js versi `16.0.10` **tidak ada secara resmi**. Versi stabil terakhir adalah `15.x`. Ini akan menyebabkan `npm install` gagal saat Vercel mencoba build karena package tidak ditemukan di npm registry.

**Fix:** Ganti ke versi yang valid:
```json
"next": "15.3.4"
```

---

### 2. `cacheComponents: true` — Config Next.js Tidak Dikenali
**File:** [`next.config.ts:5`](file:///I:/banyuraden/next-pondokrejo/next.config.ts#L5)

```ts
const nextConfig: NextConfig = {
    cacheComponents: true,  // ❌ bukan opsi Next.js yang valid
    ...
}
```

Properti `cacheComponents` bukan bagian dari `NextConfig` yang resmi. Pada `strict: true` TypeScript, ini bisa menyebabkan type error saat build.

**Fix:** Hapus baris ini. Caching komponen dikontrol lewat `experimental` atau React Compiler.

---

### 3. `process.on("SIGTERM"/"SIGINT")` di Route Handler — Tidak Kompatibel Vercel
**File:** [`app/api/iot/stream/route.ts:119-120`](file:///I:/banyuraden/next-pondokrejo/app/api/iot/stream/route.ts#L119-L120)

```ts
process.on("SIGTERM", stopPolling);
process.on("SIGINT", stopPolling);
```

Vercel menjalankan API routes sebagai **serverless functions** (ephemeral). Listener `process.on` tidak akan pernah terpanggil secara reliable di lingkungan ini dan dapat menyebabkan memory leak atau error saat cold start. Selain itu, `setInterval` yang berjalan di module scope (baris 107) juga **tidak kompatibel** dengan serverless karena state tidak persisten antar invokasi.

**Fix:** Hapus `process.on`, `setInterval`, dan seluruh mekanisme polling di route handler. Gunakan on-demand polling per request, atau pindahkan ke Vercel Cron Job.

---

### 4. SSE + `setInterval` di Module Scope — Tidak Berjalan di Serverless
**File:** [`app/api/iot/stream/route.ts`](file:///I:/banyuraden/next-pondokrejo/app/api/iot/stream/route.ts)

```ts
// Module-level mutable state — akan di-reset tiap cold start
const activeConnections: Set<ReadableStreamDefaultController> = new Set();
let pollingInterval: NodeJS.Timeout | null = null;
```

Di Vercel Serverless Functions, **setiap request bisa berjalan di instance terpisah**. `activeConnections` dan `pollingInterval` yang disimpan di module scope tidak akan konsisten. SSE (Server-Sent Events) dengan polling berkelanjutan butuh environment long-lived (Node.js server biasa / VPS).

**Fix:** Tambahkan `export const runtime = 'edge'` atau pertimbangkan arsitektur ulang menggunakan polling dari client-side saja.

---

## 🟠 HIGH — Kemungkinan Besar Menyebabkan Build/Runtime Error

### 5. `import { env } from "process"` di Layout — Bermasalah
**File:** [`app/layout.tsx:11`](file:///I:/banyuraden/next-pondokrejo/app/layout.tsx#L11)

```ts
import { env } from "process";
// ...
siteName: env.APP_NAME || "Portal Kalurahan Banyuraden",
```

`env` dari Node `process` hanya tersedia di server-side. Di Next.js App Router, `layout.tsx` dapat di-render di berbagai konteks. Meskipun ini biasanya aman di server component, pola ini tidak direkomendasikan karena `env` tidak terdefinisi di Edge Runtime dan bisa menyebabkan runtime error jika layout di-bundle ke edge.

**Fix:** Ganti dengan `process.env.APP_NAME` langsung (bukan destructure `env`):
```ts
siteName: process.env.APP_NAME || "Portal Kalurahan Banyuraden",
```

---

### 6. `React` Tidak Di-import di `layout.tsx`
**File:** [`app/layout.tsx:82`](file:///I:/banyuraden/next-pondokrejo/app/layout.tsx#L82)

```tsx
children: React.ReactNode;  // ❌ React tidak diimport
```

File tidak memiliki `import React from "react"` atau `import type { ReactNode } from "react"`. Meskipun Next.js 13+ sering auto-import React, `React.ReactNode` sebagai type reference memerlukan import eksplisit saat TypeScript strict mode aktif.

**Fix:**
```ts
import type { ReactNode } from "react";
// ...
children: ReactNode;
```

---

### 7. BOM Character (`﻿`) di Banyak File Statistik
**Files:** Semua file di [`app/statistik/*/page.tsx`](file:///I:/banyuraden/next-pondokrejo/app/statistik)

Dari hasil search, file-file statistik memiliki prefix `﻿"use client"` (byte `EF BB BF` = UTF-8 BOM) alih-alih `"use client"`. BOM di awal file TypeScript/JavaScript dapat menyebabkan parser gagal mengenali directive `"use client"`, sehingga komponen diperlakukan sebagai server component, menyebabkan error saat menggunakan hooks.

**File yang terdeteksi:**
- `statistik/agama/page.tsx`
- `statistik/bdt/page.tsx`
- `statistik/bpjs-ketenagakerjaan/page.tsx`
- `statistik/bpjs/page.tsx`
- `statistik/buku-nikah/page.tsx`
- Dan banyak lagi...

**Fix:** Simpan ulang semua file ini dengan encoding **UTF-8 tanpa BOM**.
```bash
# Di VS Code: klik encoding di status bar → pilih "Save with Encoding" → "UTF-8"
# Atau dengan PowerShell:
Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object { 
  $content = Get-Content $_.FullName -Raw -Encoding UTF8
  $content = $content -replace "^\xEF\xBB\xBF", ""
  Set-Content $_.FullName -Value $content -Encoding UTF8NoBOM
}
```

---

### 8. `websocket.ts` — Import React di Akhir File
**File:** [`lib/websocket.ts:549-550`](file:///I:/banyuraden/next-pondokrejo/lib/websocket.ts#L549-L550)

```ts
// Line 549-550 — import diletakkan DI BAWAH kode yang menggunakannya
import { useState, useEffect, useRef } from "react";
```

`useState`, `useEffect`, dan `useRef` digunakan oleh fungsi `useWebSocket` di baris 439, tetapi import-nya baru ada di baris 549. Meskipun beberapa bundler/transpiler menangani hoisting import ES modules, ini adalah pola yang tidak valid dan dapat menyebabkan `ReferenceError` atau undefined pada beberapa build configurations.

**Fix:** Pindahkan import ke baris paling atas file:
```ts
import { useState, useEffect, useRef } from "react";  // ← pindahkan ke baris 1
```

---

## 🟡 MEDIUM — Potensi Masalah Runtime

### 9. `AUTH_SECRET` Tidak Didefinisikan di `.env.example`
**File:** [`.env.example`](file:///I:/banyuraden/next-pondokrejo/.env.example)

`auth.ts` mencari `process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET`, namun `.env.example` hanya mendefinisikan `NEXTAUTH_SECRET`. Saat deploy ke Vercel, jika tim tidak tahu perlu menambahkan `AUTH_SECRET`, autentikasi akan gagal.

**Fix:** Tambahkan ke `.env.example`:
```env
AUTH_SECRET=your-secret-key-here
```

---

### 10. `DATABASE_URL` Menunjuk ke MySQL — Tapi Ada `dev.db` (SQLite) di Prisma
**File:** [`prisma/schema.prisma:9`](file:///I:/banyuraden/next-pondokrejo/prisma/schema.prisma#L9) & [`prisma/dev.db`](file:///I:/banyuraden/next-pondokrejo/prisma/dev.db)

Schema menggunakan `provider = "mysql"` tapi ada file `prisma/dev.db` (SQLite). Ini menandakan ada ketidakkonsistenan lingkungan lokal vs production. Vercel memerlukan `DATABASE_URL` yang mengarah ke MySQL cloud (misalnya PlanetScale, Neon, Railway). Jika env var tidak di-set di Vercel, `prisma generate && next build` akan berhasil tapi semua query DB akan gagal di runtime.

---

### 11. `CORS_HEADERS` Default Hardcoded ke Domain Salah
**File:** [`lib/api-service.ts:40`](file:///I:/banyuraden/next-pondokrejo/lib/api-service.ts#L40)

```ts
"Access-Control-Allow-Origin": process.env.CORS_ORIGIN 
  || process.env.NEXT_PUBLIC_SITE_URL 
  || "https://devoneclickbanyuraden.slemankab.go.id",  // ← domain fallback salah
```

Jika `CORS_ORIGIN` dan `NEXT_PUBLIC_SITE_URL` tidak di-set di Vercel, CORS akan default ke domain yang tidak sesuai.

---

## 📋 Ringkasan Prioritas Fix

| # | Severity | File | Masalah |
|---|----------|------|---------|
| 1 | 🔴 CRITICAL | `package.json` | `next: "16.0.10"` tidak ada di npm |
| 2 | 🔴 CRITICAL | `next.config.ts` | `cacheComponents` bukan opsi valid |
| 3 | 🔴 CRITICAL | `api/iot/stream/route.ts` | `process.on` + `setInterval` tidak kompatibel serverless |
| 4 | 🔴 CRITICAL | `api/iot/stream/route.ts` | Module-scope mutable state di serverless |
| 5 | 🟠 HIGH | `app/layout.tsx` | `import { env } from "process"` bermasalah |
| 6 | 🟠 HIGH | `app/layout.tsx` | `React.ReactNode` tanpa import |
| 7 | 🟠 HIGH | `app/statistik/**` | BOM character di banyak file |
| 8 | 🟠 HIGH | `lib/websocket.ts` | React import di bawah penggunaan |
| 9 | 🟡 MEDIUM | `.env.example` | `AUTH_SECRET` tidak terdokumentasi |
| 10 | 🟡 MEDIUM | `prisma/` | Inkonsistensi MySQL vs SQLite dev |
| 11 | 🟡 MEDIUM | `lib/api-service.ts` | CORS fallback ke domain salah |

---

## ✅ Yang Sudah Benar
- Prisma Client setup dengan singleton pattern ✓
- Middleware rate-limiter tidak bergantung DB/external ✓
- Leaflet di-load dengan `dynamic()` + `{ ssr: false }` ✓
- Auth menggunakan `trustHost: true` yang diperlukan di Vercel ✓
- Image remote patterns didefinisikan dengan benar ✓
