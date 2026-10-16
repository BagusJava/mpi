# MPI HTML Interactive Lab — Modern UI

Media Pembelajaran Interaktif HTML untuk siswa SMK PPLG/RPL.

## File utama
- `index.html` — struktur halaman dan konten MPI.
- `style.css` — desain responsif, tema dark navy, dan aksen cyan neon.
- `script.js` — navigasi, tab materi, simulator/puzzle, kuis 25 soal, dan dashboard Top 5.

## Konsep visual
- Latar dark navy/black `#0B1118`.
- Cyan neon `#00E5FF` untuk aksen, tombol utama, garis, dan status aktif.
- Putih terang untuk keterbacaan dan garis penghubung pada menu beranda.
- Kartu bergaya modern dengan border halus, sudut membulat, dan efek glow secukupnya.
- Responsif untuk laptop, tablet, dan ponsel.

## Menjalankan lokal
Buka `index.html` melalui browser. Semua file utama berada dalam satu folder. Video membutuhkan internet.

## Deploy ke GitHub Pages atau Vercel
1. Letakkan `index.html`, `style.css`, dan `script.js` di root repository.
2. Commit dan push ke GitHub.
3. Untuk Vercel, pilih repository tersebut; framework preset dapat memakai `Other`, dengan build command dan output directory dikosongkan/default untuk situs HTML statis.
4. Setelah deployment, lakukan hard refresh (`Ctrl + Shift + R`) bila browser masih menampilkan CSS lama.

## Catatan
- Hasil dan ranking Top 5 kuis disimpan di `localStorage` browser/perangkat masing-masing. Ranking lintas perangkat membutuhkan backend/database.
- Pratinjau simulator mengisolasi hasil HTML; jangan memasukkan kode tidak tepercaya di luar fungsi pembelajaran.
