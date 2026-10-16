# MPI: Mari Membuat Web dengan HTML

Media pembelajaran HTML untuk siswa SMK, menggunakan HTML, CSS, dan JavaScript murni.

## Fitur
- Beranda bertema gelap dan cyan neon dengan tujuh menu lingkaran serta logo HTML lebih besar.
- Animasi cahaya cyan lembut pada logo (mengikuti preferensi reduced-motion sistem).
- Materi Bab 1–7: uraian, video YouTube, dan latihan.
- HTML Interactive Lab dengan tiga level: Pemula, Menengah, dan Expert.
- Pratinjau kode langsung pada iframe terisolasi, pemeriksaan misi, petunjuk, XP, dan progres yang disimpan di browser.

## Jalankan lokal
Buka `index.html` langsung, atau jalankan server statis sederhana jika browser membatasi media tertentu. Situs ini tidak membutuhkan build step.

## Deploy GitHub Pages
Unggah semua berkas statis ke root repository. Pada Settings → Pages, pilih branch `main` dan folder `/(root)`.

## Deploy Vercel
Impor repository. Pilih preset `Other`, kosongkan Build Command, dan gunakan root repository sebagai Output Directory. Klik Deploy.

## Catatan simulator
Kode latihan ditampilkan melalui iframe dengan atribut `sandbox` kosong. Script pada kode siswa tidak dieksekusi dan form di area pratinjau tidak diizinkan mengirim data. XP dan progres disimpan hanya di browser/perangkat siswa melalui `localStorage`, bukan ke server.
