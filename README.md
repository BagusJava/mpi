# Media Pembelajaran Interaktif: Mari Membuat Web dengan HTML

Website ini menggunakan HTML, CSS, dan JavaScript murni. Tidak membutuhkan Node.js, framework, database, backend, atau build command untuk dipublikasikan sebagai situs statis.

## Isi folder

- `index.html` — halaman website dan video Bab 1–7
- `style.css` — tema gelap dengan aksen cyan neon dan tata letak responsif
- `script.js` — navigasi, tab materi, latihan, kuis, dan simulator HTML
- `.nojekyll` — membantu GitHub Pages menyajikan file statis tanpa pemrosesan Jekyll

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub.
2. Unggah `index.html`, `style.css`, `script.js`, dan `.nojekyll` ke folder utama (root) repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, pilih branch `main` dan folder `/(root)`, lalu simpan.
5. Tunggu proses publikasi, lalu buka alamat GitHub Pages yang diberikan.

## Deploy ke Vercel

1. Buat repository GitHub berisi file-file website ini.
2. Di Vercel, pilih **Add New → Project**, lalu impor repository tersebut.
3. Gunakan **Framework Preset: Other**.
4. Untuk website HTML/CSS/JS statis, kosongkan **Build Command** dan gunakan root repository sebagai **Output Directory** (`.` jika Vercel meminta nilai eksplisit).
5. Klik **Deploy**.

Setiap push baru ke branch yang terhubung dapat memicu deployment baru.

## Video YouTube

- Bab 1: Pengenalan HTML — mulai 11:39
- Bab 2: Kerangka HTML — mulai 26:33
- Bab 3: Teks dan Heading — mulai 51:39
- Bab 4: List HTML — mulai 1:26:48
- Bab 5: Link dan Gambar — mulai 1:33:18; materi gambar tersedia lewat tautan langsung mulai 1:55:57
- Bab 6: Tabel HTML — mulai 2:51:31
- Bab 7: Form HTML — mulai dari pengenalan form (1:16) pada video khusus formulir

Pemutar menyediakan tombol Play yang ditekan oleh pengguna. Autoplay dengan suara tidak dipaksakan karena umumnya dibatasi browser. Video memerlukan internet dan tetap bergantung pada izin embed YouTube serta kebijakan jaringan/browser. Bila tidak dapat diputar dalam halaman, gunakan tautan **Buka video di YouTube** di bawah pemutar.

## Catatan

Form Feedback saat ini hanya menampilkan tanggapan secara lokal dan belum mengirim/menyimpan data ke server. Nilai kuis dan simulator bekerja di browser.
