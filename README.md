# MPI — HTML Interactive Lab

Media pembelajaran HTML dasar untuk siswa SMK, dibuat dengan HTML, CSS, dan JavaScript murni. Paket ini ditujukan untuk hosting statis di GitHub Pages atau Vercel.

## Fitur
- Beranda tema gelap dan cyan neon dengan logo HTML besar, tujuh menu lingkaran yang tetap menampilkan ikon dan label, serta garis cahaya putih bercahaya yang menghubungkan logo ke menu.
- Materi Bab 1–7, video pembelajaran, latihan, serta kuis akhir 25 soal pilihan ganda (masing-masing lima opsi).
- Halaman Bab dibuat bertab. Bagian Uraian dipecah lagi menjadi **Konsep**, **Contoh Kode**, dan **Hasil & Catatan** supaya isi panjang tidak perlu menumpuk pada satu layar.
- Simulator level Pemula, Menengah, dan Expert. Bagian **Misi**, **Puzzle Pemula**, **Editor & Hasil**, dan **Contoh Jawaban** dipisahkan menjadi tab.
- Puzzle Pemula menggunakan dua langkah ringkas: pilih kotak urutan, lalu pilih potongan kode. Setelah susunan benar, kode otomatis masuk ke editor dan hasil tampil di pratinjau.
- Editor HTML dengan pratinjau pada kanvas Shadow DOM. Tag script, atribut event (misalnya onclick), iframe, dan pengiriman formulir dari kode latihan tidak dijalankan.
- XP dan progres simulator disimpan di `localStorage` browser.
- Kuis dimulai dengan pengisian nama dan kelas, lalu 25 soal dibagi ke beberapa tab sesuai ukuran layar, pemeriksaan nilai otomatis, dan tab Dashboard Hasil dengan statistik serta ranking Top 5.

## Tata letak responsif
- Tampilan diuji pada Chromium dengan viewport laptop **1366×768** dan ponsel **390×844**.
- Pada ukuran tersebut, halaman luar dan panel aktif yang diperiksa tidak memerlukan scroll; bagian panjang dipecah menjadi tab.
- Pada layar yang lebih pendek, browser atau teks yang diperbesar bisa mengubah kebutuhan ruang. Jika menguji pada layar lain, pastikan juga menguji tab Video dan semua level simulator.

## Menjalankan secara lokal
Buka `index.html` di browser atau jalankan server statis dari folder ini:

```bash
python3 -m http.server 8000
```

Kemudian buka `http://127.0.0.1:8000`. Server lokal disarankan untuk menguji `localStorage`, karena perilaku penyimpanan browser dapat berbeda saat halaman dibuka melalui `file://`.

## Deploy ke GitHub Pages atau Vercel
1. Unggah `index.html`, `style.css`, `script.js`, `.nojekyll`, dan README ini ke root repository GitHub.
2. GitHub Pages: buka **Settings → Pages**, pilih branch `main` dan folder root.
3. Vercel: impor repository, pilih preset **Other**, tanpa build command; root repository menjadi output directory.
4. Setelah deployment, lakukan hard refresh (`Ctrl + Shift + R`) lalu tes beranda, uraian Bab, puzzle, pratinjau, kuis, dan dashboard.

## Catatan
- XP dan progres simulator disimpan lokal pada perangkat/browser siswa, bukan di database guru.
- Ranking kuis juga tersimpan lokal. Untuk ranking gabungan yang sama di semua perangkat, perlu menghubungkan leaderboard ke database online (misalnya Supabase atau Firebase) beserta aturan keamanan.
- Video YouTube memerlukan internet dan izin embed dari pemilik video. Jika embed diblokir, gunakan tautan cadangan untuk membuka YouTube.
- Form feedback saat ini belum dikirim ke server.
