# MPI — HTML Interactive Lab

Media pembelajaran HTML dasar untuk siswa SMK, dibuat dengan HTML, CSS, dan JavaScript murni.

## Fitur
- Beranda tema gelap dan cyan neon dengan logo HTML besar, efek kedip lembut, dan tujuh menu lingkaran.
- Kilatan cahaya animatif dari logo ke menu untuk tampilan desktop; animasi dinonaktifkan jika perangkat memilih `prefers-reduced-motion`.
- Materi Bab 1–7, video pembelajaran, latihan, serta kuis akhir 25 soal pilihan ganda (masing-masing lima opsi) dengan form nama dan kelas.
- Simulator dengan level Pemula, Menengah, dan Expert.
- Level Pemula memiliki puzzle tempel tiga keping (Judul → Paragraf → Daftar), mendukung drag-and-drop dan interaksi ketuk di layar sentuh.
- Editor HTML dengan pratinjau langsung dalam iframe terisolasi. JavaScript dan pengiriman formulir dari kode latihan tetap dinonaktifkan.
- XP dan progres simulator disimpan di `localStorage` browser. Data ini lokal pada perangkat/browser siswa dan tidak masuk ke database guru.
- Kuis menampilkan hasil nilai dan tab Dashboard Hasil dengan statistik dan ranking Top 5, tersimpan lokal di browser yang digunakan. Ranking belum digabung lintas perangkat/siswa karena versi statis belum memakai backend/database.

## Menjalankan secara lokal
Buka `index.html` di browser. Untuk pengujian iframe yang lebih konsisten, jalankan server statis sederhana dari folder ini, misalnya `python3 -m http.server 8000`, lalu buka `http://127.0.0.1:8000`.

## Deploy ke GitHub Pages atau Vercel
1. Unggah `index.html`, `style.css`, `script.js`, `.nojekyll`, dan README ke root repository GitHub.
2. GitHub Pages: buka **Settings → Pages**, pilih branch `main` dan folder root.
3. Vercel: impor repository, pilih preset **Other**, tanpa build command; root repository menjadi output directory.
4. Setelah deploy, tes menu Simulator, susun puzzle Pemula, pastikan HTML tampil pada panel Pratinjau, lalu buka Kuis, isi nama dan kelas, selesaikan 25 soal, dan periksa dashboard Top 5.

## Catatan
- Simulator menyediakan contoh jawaban untuk level Pemula, Menengah, dan Expert melalui panel yang dapat dibuka setelah mencoba.
- Video YouTube memerlukan internet dan izin embed dari pemilik video.
- Feedback belum dikirim ke server.
- Agar ranking dan nilai setiap siswa tampil bersama di semua perangkat, hubungkan leaderboard ke database online (misalnya Supabase atau Firebase) dan tambahkan aturan keamanan. Jangan mengandalkan `localStorage` untuk ranking kelas bersama.
