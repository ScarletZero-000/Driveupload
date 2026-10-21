# 📁 Drive Uploader — Auto Public

Upload file ke Google Drive otomatis jadi publik, deploy di Vercel.

---

## ✅ Fitur

- Drag & drop upload
- Auto-set permission `anyone can view`
- Dapat 4 jenis link (view, download, direct, embed)
- Riwayat upload dalam sesi
- Maks 500 MB per file

---

## 🛠️ Setup: Step by Step

### 1. Buat Google Cloud Project

1. Buka https://console.cloud.google.com
2. Klik **New Project** → beri nama → **Create**
3. Pastikan project terpilih di dropdown atas

---

### 2. Aktifkan Google Drive API

1. Pergi ke **APIs & Services → Library**
2. Cari **Google Drive API**
3. Klik **Enable**

---

### 3. Buat Service Account

1. Pergi ke **APIs & Services → Credentials**
2. Klik **+ Create Credentials → Service Account**
3. Isi nama (misal: `drive-uploader`)
4. Klik **Create and Continue**
5. Role: skip (klik **Continue** → **Done**)

---

### 4. Buat & Unduh JSON Key

1. Klik service account yang baru dibuat
2. Tab **Keys** → **Add Key → Create new key**
3. Pilih **JSON** → **Create**
4. File JSON akan otomatis terunduh

Dari file JSON tersebut, ambil 2 nilai:
- `client_email` → untuk `GOOGLE_CLIENT_EMAIL`
- `private_key` → untuk `GOOGLE_PRIVATE_KEY`

---

### 5. (Opsional) Siapkan Folder Drive

Jika ingin file masuk ke folder tertentu:

1. Buka Google Drive
2. Klik kanan folder → **Share**
3. Masukkan `client_email` dari service account → beri akses **Editor**
4. Salin ID folder dari URL:
   `https://drive.google.com/drive/folders/INI_ID_FOLDERNYA`

---

### 6. Setup Environment Variables

Salin `.env.local.example` → `.env.local`:

```
GOOGLE_CLIENT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEow...\n-----END RSA PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=optional_folder_id
```

> ⚠️ Pastikan `private_key` ditulis dengan `\n` (bukan newline asli) di dalam tanda kutip ganda.

---

### 7. Jalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

---

### 8. Deploy ke Vercel

#### Cara 1: Via GitHub (direkomendasikan)

1. Push project ke GitHub
2. Buka https://vercel.com → **New Project**
3. Import repo dari GitHub
4. Masuk ke **Environment Variables**, isi:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_DRIVE_FOLDER_ID` (opsional)
5. Klik **Deploy**

#### Cara 2: Via CLI

```bash
npm i -g vercel
vercel
```

Ikuti promptnya, lalu tambah env vars:

```bash
vercel env add GOOGLE_CLIENT_EMAIL
vercel env add GOOGLE_PRIVATE_KEY
vercel env add GOOGLE_DRIVE_FOLDER_ID
```

---

## 🔗 Link yang dihasilkan per file

| Tipe        | Keterangan                               |
|-------------|------------------------------------------|
| View Link   | Buka file di Google Drive                |
| Download    | Link download langsung                   |
| Direct Link | URL gambar/file langsung (untuk embed)   |
| Embed Link  | Untuk ditaruh di `<iframe>`              |

---

## ⚠️ Catatan

- File yang diupload **bisa dilihat siapa saja** yang punya link
- Service Account yang digunakan harus punya akses ke folder tujuan
- Private key di Vercel harus ditulis dalam satu baris dengan `\n`

---

## 📦 Tech Stack

- **Next.js 14** — framework
- **Vercel** — hosting
- **Google Drive API v3** — storage
- **googleapis** — client library
- **formidable** — parse multipart upload
