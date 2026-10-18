# Panduan membuat .exe Scrcpy Studio

[English](BUILD.md) | [Bahasa Indonesia](BUILD.id.md)

## Syarat (sekali saja)
1. **Windows 10/11** (build .exe harus dilakukan di Windows).
2. **Node.js LTS**: unduh di https://nodejs.org, install, lalu buka ulang terminal.
3. Koneksi internet saat build pertama (mengunduh Electron dan electron-builder, sekitar 200 MB).

## Cara tercepat
Klik dua kali **`build.bat`** di folder ini. Tunggu beberapa menit. Folder `dist` terbuka otomatis setelah selesai.

## Cara manual
Buka CMD di folder ini, lalu:

    npm install
    npm run dist

## Hasil (folder `dist`)
| File | Fungsi |
|---|---|
| `Scrcpy Studio-Setup-1.0.0.exe` | Installer (pilih folder, shortcut Desktop dan Start Menu) |
| `Scrcpy Studio-Portable-1.0.0.exe` | Satu file, langsung jalan tanpa install |

Uji cepat tanpa membuat installer: `npm run pack`, lalu buka `dist\win-unpacked\Scrcpy Studio.exe`.

## Catatan penting
- **scrcpy tidak ikut dibundel.** Saat pertama membuka aplikasi, pilih folder scrcpy (berisi `scrcpy.exe` dan `adb.exe`). Pilihan tersimpan otomatis.
- **Windows SmartScreen** akan memperingatkan "unknown publisher" karena aplikasi belum ditandatangani (code signing berbayar). Klik **More info** lalu **Run anyway**.
- Mengganti ikon: timpa `icon.ico` (minimal 256x256) lalu build ulang.
- Mengganti versi: ubah `"version"` di `package.json`.

## Jika error
| Pesan | Solusi |
|---|---|
| `Cannot create symbolic link` / `winCodeSign` | Jalankan CMD sebagai **Administrator**, atau aktifkan **Developer Mode** (Settings › For developers), lalu build ulang |
| `npm` tidak dikenali | Install Node.js lalu buka CMD baru |
| Build macet saat mengunduh | Cek internet atau matikan VPN, lalu ulangi |
| Aplikasi terbuka tapi layar kosong | Hapus folder `dist` dan `node_modules`, lalu `npm install` ulang |
