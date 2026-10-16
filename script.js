// Navigasi halaman utama
function goTo(pageId) {
  const target = document.getElementById(pageId);
  if (!target) {
    console.warn(`Halaman dengan ID "${pageId}" tidak ditemukan.`);
    return;
  }

  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  target.classList.add("active");

  if (pageId.startsWith("bab")) {
    const firstTab = target.querySelector(".tab-btn");
    const firstContent = target.querySelector(".tab-content");
    target.querySelectorAll(".tab-btn").forEach((button) => button.classList.remove("active-tab"));
    target.querySelectorAll(".tab-content").forEach((content) => { content.hidden = true; });
    if (firstTab) firstTab.classList.add("active-tab");
    if (firstContent) firstContent.hidden = false;
  }

  if (pageId === "simulator") {
    jalankanSimulator();
  }
  if (pageId === "kuis") {
    bukaTabKuis("kuis");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleKode() {
  const kodeBox = document.getElementById("kode-pemantik");
  if (!kodeBox) return;
  kodeBox.style.display = getComputedStyle(kodeBox).display === "none" ? "block" : "none";
}

function sapaPemantik() {
  const nama = document.getElementById("nama-pemantik").value.trim();
  const hasil = document.getElementById("hasil-pemantik");
  hasil.textContent = nama ? `Halo, ${nama}! Kamu baru saja mencoba input HTML.` : "Silakan masukkan nama terlebih dahulu.";
}

function bukaTab(event, tabName, babId) {
  const indukBab = document.getElementById(babId);
  if (!indukBab) return;
  indukBab.querySelectorAll(".tab-content").forEach((content) => { content.hidden = true; });
  indukBab.querySelectorAll(".tab-btn").forEach((button) => { button.classList.remove("active-tab"); });
  const contentDipilih = document.getElementById(tabName);
  if (contentDipilih) contentDipilih.hidden = false;
  if (tabName.endsWith("-video") && contentDipilih) {
    const player = contentDipilih.querySelector("iframe");
    if (player) player.loading = "eager";
  }
  if (event && event.currentTarget) event.currentTarget.classList.add("active-tab");
}

function cekJawaban(namaSoal, jawabanBenar, hasilId) {
  const pilihan = document.querySelector(`input[name="${namaSoal}"]:checked`);
  const hasil = document.getElementById(hasilId);
  if (!hasil) return;
  hasil.classList.remove("correct", "incorrect");
  if (!pilihan) {
    hasil.textContent = "Pilih salah satu jawaban terlebih dahulu.";
    hasil.classList.add("incorrect");
    return;
  }
  if (pilihan.value === jawabanBenar) {
    hasil.textContent = "Benar! Bagus, jawabanmu tepat.";
    hasil.classList.add("correct");
  } else {
    hasil.textContent = "Belum tepat. Coba baca kembali uraian materi, lalu coba lagi.";
    hasil.classList.add("incorrect");
  }
}

function bukaTabSimulator(tab) {
  const allowedTabs = ["misi", "puzzle", "editor", "solusi"];
  if (!allowedTabs.includes(tab)) return;
  if (tab === "puzzle" && simActiveLevel && simActiveLevel !== "pemula") {
    const result = document.getElementById("simulator-mission-result");
    if (result) {
      result.className = "mission-result error";
      result.textContent = "Puzzle tempel tersedia pada level Pemula. Pilih level Pemula untuk menggunakannya.";
    }
    return;
  }
  document.querySelectorAll(".simulator-tab-pane").forEach((pane) => {
    pane.hidden = pane.id !== `sim-tab-${tab}`;
  });
  document.querySelectorAll(".simulator-tab-button").forEach((button) => {
    const active = button.dataset.labTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const puzzleButton = document.querySelector('.simulator-tab-button[data-lab-tab="puzzle"]');
  if (puzzleButton) puzzleButton.disabled = simActiveLevel !== "pemula";
}

function bukaTabKuis(tab) {
  const showDashboard = tab === "dashboard";
  const quizPane = document.getElementById("quiz-pane-kuis");
  const dashboardPane = document.getElementById("quiz-pane-dashboard");
  if (quizPane) quizPane.hidden = showDashboard;
  if (dashboardPane) dashboardPane.hidden = !showDashboard;
  document.querySelectorAll(".quiz-tab-button").forEach((button) => {
    const active = button.dataset.quizTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (showDashboard) renderLeaderboard();
}

// Kuis akhir: 25 soal pilihan ganda Bab 1–7; tiap soal mempunyai lima opsi.
const quizQuestions = [
  { q: 'Apa kepanjangan HTML?', options: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'HighText Machine Language', 'Hyperlink Text Management Language', 'Hyper Tool Multi Language'], answer: 1 },
  { q: 'Apa peran utama HTML dalam website?', options: ['Mengatur struktur konten halaman', 'Mengelola sistem operasi', 'Menyimpan data ke database secara otomatis', 'Menggantikan semua fungsi CSS', 'Menjalankan server web tanpa perangkat lunak lain'], answer: 0 },
  { q: 'Tag untuk heading tingkat paling tinggi adalah …', options: ['<h6>', '<head>', '<h1>', '<header-text>', '<heading>'], answer: 2 },
  { q: 'Tag yang tepat untuk membuat paragraf adalah …', options: ['<paragraph>', '<p>', '<text>', '<pg>', '<para>'], answer: 1 },
  { q: 'Tag penutup yang sesuai untuk heading <h2> adalah …', options: ['<h2>', '</h2>', '</heading>', '<h2/>', '<close h2>'], answer: 1 },
  { q: 'Apa fungsi deklarasi <!DOCTYPE html>?', options: ['Menampilkan judul halaman', 'Membuat paragraf pertama', 'Memberi tahu browser bahwa dokumen menggunakan HTML modern', 'Menghubungkan file CSS', 'Membuat tabel otomatis'], answer: 2 },
  { q: 'Teks di dalam tag <title> biasanya ditampilkan di …', options: ['Bagian isi sebagai paragraf', 'Tab atau judul jendela browser', 'Kaki halaman', 'Tombol formulir', 'Di sebelah setiap gambar'], answer: 1 },
  { q: 'Tag untuk membuat daftar tidak berurutan dengan bullet adalah …', options: ['<ol>', '<li>', '<ul>', '<dl-row>', '<list>'], answer: 2 },
  { q: 'Tag untuk membuat daftar bernomor adalah …', options: ['<ul>', '<ol>', '<list>', '<li>', '<number>'], answer: 1 },
  { q: 'Elemen yang digunakan untuk setiap item dalam daftar adalah …', options: ['<item>', '<dt>', '<ul>', '<li>', '<option-list>'], answer: 3 },
  { q: 'Atribut pada <a> yang menentukan alamat tujuan tautan adalah …', options: ['src', 'href', 'alt', 'target-text', 'action'], answer: 1 },
  { q: 'Atribut yang berisi lokasi sumber berkas gambar pada <img> adalah …', options: ['href', 'link', 'src', 'path-text', 'source'], answer: 2 },
  { q: 'Apa manfaat atribut alt pada gambar?', options: ['Menentukan ukuran file', 'Memberi teks alternatif untuk aksesibilitas atau saat gambar gagal tampil', 'Membuat gambar menjadi tautan otomatis', 'Mengatur posisi tabel', 'Menyimpan gambar ke database'], answer: 1 },
  { q: 'Tag untuk membuat satu baris dalam tabel adalah …', options: ['<td>', '<th>', '<tr>', '<table-row>', '<row>'], answer: 2 },
  { q: 'Tag yang umumnya digunakan untuk sel judul/header tabel adalah …', options: ['<td>', '<th>', '<tr>', '<thead-cell>', '<caption>'], answer: 1 },
  { q: 'Tag yang digunakan untuk sel data biasa dalam tabel adalah …', options: ['<td>', '<th>', '<tr>', '<data>', '<cell>'], answer: 0 },
  { q: 'Elemen HTML yang membungkus kontrol untuk mengirim data pengguna adalah …', options: ['<fieldset-only>', '<form>', '<input-group>', '<submit>', '<data>'], answer: 1 },
  { q: 'Atribut type yang sesuai agar kolom diperlakukan sebagai input email adalah …', options: ['text', 'email', 'password', 'url', 'number'], answer: 1 },
  { q: 'Apa fungsi atribut required pada input form?', options: ['Mengubah teks menjadi tebal', 'Membuat input tersembunyi', 'Mewajibkan kolom terisi sebelum form dapat dikirim', 'Menghubungkan input ke gambar', 'Menentukan warna latar input'], answer: 2 },
  { q: 'Manakah elemen HTML yang termasuk elemen kosong (void) dan tidak memerlukan tag penutup?', options: ['<div>', '<p>', '<img>', '<section>', '<strong>'], answer: 2 },
  { q: 'Agar label terhubung dengan input, nilai atribut for pada label harus sama dengan nilai atribut … milik input.', options: ['name', 'class', 'id', 'type', 'value'], answer: 2 },
  { q: 'Atribut apa pada tautan <a> yang umum digunakan untuk membuka halaman tujuan di tab baru?', options: ['rel="new-tab"', 'target="_blank"', 'href="_tab"', 'open="tab"', 'tab="new"'], answer: 1 },
  { q: 'Elemen utama yang membungkus baris dan sel untuk membuat tabel HTML adalah …', options: ['<grid>', '<table>', '<tabular>', '<tbody-only>', '<data-table>'], answer: 1 },
  { q: 'Tag HTML yang digunakan untuk menghubungkan file CSS eksternal melalui atribut rel="stylesheet" adalah …', options: ['<style src="style.css">', '<css href="style.css">', '<link rel="stylesheet" href="style.css">', '<script src="style.css">', '<a rel="stylesheet" href="style.css">'], answer: 2 },
  { q: 'Apa fungsi <input type="password"> pada formulir?', options: ['Menampilkan pilihan tanggal', 'Menyamarkan karakter yang diketik', 'Memastikan input berisi angka saja', 'Mengunggah berkas otomatis', 'Membuat tombol kirim'], answer: 1 }
];
const leaderboardStorageKey = 'mpiHtmlQuizLeaderboard_v3';
let identitasPesertaKuis = null;
let quizMulaiPada = null;
let quizAnswers = {};
let quizCurrentPage = 0;
let quizPageSize = getUkuranHalamanKuis();

function getUkuranHalamanKuis() {
  // Ponsel: satu soal; tablet/laptop rendah: dua; layar lapang: empat soal per bagian.
  if (window.innerWidth <= 560 || window.innerHeight <= 900) return 1;
  if (window.innerWidth <= 920) return 2;
  if (window.innerHeight <= 1120) return 3;
  return 4;
}

function updateNavigasiKuis() {
  const pages = document.querySelectorAll('.quiz-question-page');
  const tabs = document.querySelectorAll('.quiz-part-tab');
  const totalPages = pages.length;
  const isLast = quizCurrentPage >= totalPages - 1;
  const previous = document.getElementById('kuis-soal-sebelumnya');
  const next = document.getElementById('kuis-soal-berikutnya');
  const submit = document.getElementById('kuis-submit-button');
  const status = document.getElementById('quiz-bagian-status');
  if (previous) previous.disabled = quizCurrentPage === 0;
  if (next) next.hidden = isLast;
  if (submit) submit.hidden = !isLast;
  if (status) {
    const start = quizCurrentPage * quizPageSize + 1;
    const end = Math.min(start + quizPageSize - 1, quizQuestions.length);
    status.textContent = `Bagian ${quizCurrentPage + 1} dari ${totalPages} · Soal ${start}–${end}`;
  }
  tabs.forEach((button, index) => {
    const active = index === quizCurrentPage;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
}

function tampilkanBagianKuis(index) {
  const pages = document.querySelectorAll('.quiz-question-page');
  if (!pages.length) return;
  quizCurrentPage = Math.max(0, Math.min(index, pages.length - 1));
  pages.forEach((page, pageIndex) => { page.hidden = pageIndex !== quizCurrentPage; });
  updateNavigasiKuis();
}

function renderPertanyaanKuis(preservePosition = false) {
  const container = document.getElementById('kuis-pertanyaan');
  const tabsContainer = document.getElementById('quiz-bagian-tabs');
  if (!container || !tabsContainer) return;
  const oldFirstQuestion = quizCurrentPage * quizPageSize;
  const newPageSize = getUkuranHalamanKuis();
  quizPageSize = newPageSize;
  if (preservePosition) quizCurrentPage = Math.floor(oldFirstQuestion / quizPageSize);
  else quizCurrentPage = 0;
  container.replaceChildren();
  tabsContainer.replaceChildren();
  const totalPages = Math.ceil(quizQuestions.length / quizPageSize);

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
    const start = pageIndex * quizPageSize;
    const end = Math.min(start + quizPageSize, quizQuestions.length);
    const page = document.createElement('section');
    page.className = 'quiz-question-page';
    page.dataset.page = String(pageIndex);
    page.setAttribute('aria-label', `Bagian ${pageIndex + 1}, soal ${start + 1} sampai ${end}`);
    page.hidden = pageIndex !== quizCurrentPage;

    for (let index = start; index < end; index += 1) {
      const item = quizQuestions[index];
      const fieldset = document.createElement('fieldset');
      fieldset.className = 'quiz-question-card';
      const legend = document.createElement('legend');
      legend.textContent = `${index + 1}. ${item.q}`;
      fieldset.appendChild(legend);
      const options = document.createElement('div');
      options.className = 'quiz-option-grid';
      item.options.forEach((labelText, optionIndex) => {
        const label = document.createElement('label');
        label.className = 'quiz-choice';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `kuis-${index + 1}`;
        input.value = String(optionIndex);
        input.checked = quizAnswers[index] === optionIndex;
        input.setAttribute('aria-label', labelText);
        input.addEventListener('change', () => { quizAnswers[index] = optionIndex; });
        const text = document.createElement('span');
        text.textContent = labelText;
        label.append(input, text);
        options.appendChild(label);
      });
      fieldset.appendChild(options);
      page.appendChild(fieldset);
    }
    container.appendChild(page);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'quiz-part-tab';
    tab.dataset.page = String(pageIndex);
    tab.textContent = `${String(start + 1).padStart(2, '0')}–${String(end).padStart(2, '0')}`;
    tab.title = `Buka soal ${start + 1} sampai ${end}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', page.id || `quiz-question-page-${pageIndex + 1}`);
    tab.addEventListener('click', () => tampilkanBagianKuis(pageIndex));
    tabsContainer.appendChild(tab);
  }
  container.querySelectorAll('.quiz-question-page').forEach((page, index) => { page.id = `quiz-question-page-${index + 1}`; });
  tabsContainer.querySelectorAll('.quiz-part-tab').forEach((button) => {
    button.setAttribute('aria-controls', `quiz-question-page-${Number(button.dataset.page) + 1}`);
  });
  tampilkanBagianKuis(quizCurrentPage);
}

function mulaiKuis(event) {
  if (event) event.preventDefault();
  const namaEl = document.getElementById('kuis-nama');
  const kelasEl = document.getElementById('kuis-kelas');
  const status = document.getElementById('status-mulai-kuis');
  const nama = namaEl ? namaEl.value.trim() : '';
  const kelas = kelasEl ? kelasEl.value.trim() : '';
  if (!nama || !kelas) {
    if (status) status.textContent = 'Nama dan kelas perlu diisi sebelum mulai kuis.';
    if (!nama && namaEl) namaEl.focus(); else if (kelasEl) kelasEl.focus();
    return;
  }
  identitasPesertaKuis = { nama, kelas };
  quizMulaiPada = Date.now();
  quizAnswers = {};
  quizCurrentPage = 0;
  quizPageSize = getUkuranHalamanKuis();
  const intro = document.getElementById('kuis-pengantar');
  const active = document.getElementById('kuis-area-aktif');
  const form = document.getElementById('kuis-akhir');
  if (intro) intro.hidden = true;
  if (active) active.hidden = false;
  if (form) form.hidden = false;
  const identitas = document.getElementById('kuis-identitas-aktif');
  if (identitas) identitas.textContent = `${nama} • ${kelas}`;
  const result = document.getElementById('hasil-kuis');
  if (result) { result.hidden = true; result.replaceChildren(); }
  renderPertanyaanKuis();
}

function ambilLeaderboard() {
  try {
    const value = JSON.parse(localStorage.getItem(leaderboardStorageKey) || '[]');
    return Array.isArray(value) ? value.filter((row) => row && typeof row.nama === 'string' && Number.isFinite(Number(row.nilai))) : [];
  } catch (error) {
    console.warn('Papan peringkat lokal tidak dapat dibaca.', error);
    return [];
  }
}

function simpanLeaderboard(entries) {
  try { localStorage.setItem(leaderboardStorageKey, JSON.stringify(entries)); }
  catch (error) { console.warn('Papan peringkat tidak dapat disimpan di browser ini.', error); }
}

function urutkanLeaderboard(entries) {
  return entries.sort((a, b) =>
    Number(b.nilai) - Number(a.nilai) ||
    Number(a.durasi || 0) - Number(b.durasi || 0) ||
    String(a.tanggal || '').localeCompare(String(b.tanggal || ''))
  );
}

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-top5-body');
  const empty = document.getElementById('leaderboard-empty');
  const allEntries = urutkanLeaderboard(ambilLeaderboard());
  const entries = allEntries.slice(0, 5);
  if (!tbody) return;
  tbody.replaceChildren();
  if (empty) empty.hidden = entries.length > 0;
  entries.forEach((entry, index) => {
    const tr = document.createElement('tr');
    const values = [String(index + 1), entry.nama, entry.kelas, `${entry.nilai}/100`, `${entry.benar}/25`];
    values.forEach((value, cellIndex) => {
      const td = document.createElement('td');
      td.textContent = value;
      if (cellIndex === 0) td.className = `rank-${index + 1}`;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  const statParticipants = document.getElementById('stat-peserta');
  const statBest = document.getElementById('stat-tertinggi');
  const statAverage = document.getElementById('stat-rata-rata');
  if (statParticipants) statParticipants.textContent = String(allEntries.length);
  if (statBest) statBest.textContent = allEntries.length ? `${Math.max(...allEntries.map((e) => Number(e.nilai) || 0))}/100` : '—';
  if (statAverage) statAverage.textContent = allEntries.length ? `${Math.round(allEntries.reduce((sum, e) => sum + (Number(e.nilai) || 0), 0) / allEntries.length)}/100` : '—';
}

function nilaiKuis() {
  if (!identitasPesertaKuis) return;
  const hasil = document.getElementById('hasil-kuis');
  const form = document.getElementById('kuis-akhir');
  if (!hasil || !form) return;

  const unansweredIndex = quizQuestions.findIndex((_, index) => !Number.isInteger(quizAnswers[index]));
  if (unansweredIndex >= 0) {
    tampilkanBagianKuis(Math.floor(unansweredIndex / quizPageSize));
    hasil.hidden = false;
    hasil.className = 'info-box quiz-result-box';
    hasil.textContent = `Soal nomor ${unansweredIndex + 1} belum dijawab. Bagian soal tersebut sudah dibuka; pilih jawaban, lalu lanjutkan.`;
    return;
  }

  const benar = quizQuestions.reduce((sum, item, index) => sum + (quizAnswers[index] === item.answer ? 1 : 0), 0);
  const nilai = Math.round((benar / quizQuestions.length) * 100);
  const durasi = Math.max(0, Math.round((Date.now() - (quizMulaiPada || Date.now())) / 1000));
  const record = {
    nama: identitasPesertaKuis.nama,
    kelas: identitasPesertaKuis.kelas,
    nilai,
    benar,
    durasi,
    tanggal: new Date().toISOString()
  };
  const entries = ambilLeaderboard();
  const keyName = record.nama.trim().toLocaleLowerCase('id-ID');
  const keyClass = record.kelas.trim().toLocaleLowerCase('id-ID');
  const existingIndex = entries.findIndex((row) =>
    row.nama.trim().toLocaleLowerCase('id-ID') === keyName &&
    row.kelas.trim().toLocaleLowerCase('id-ID') === keyClass
  );
  if (existingIndex >= 0) {
    const current = entries[existingIndex];
    if (record.nilai > Number(current.nilai) || (record.nilai === Number(current.nilai) && record.durasi < Number(current.durasi || Infinity))) {
      entries[existingIndex] = record;
    }
  } else {
    entries.push(record);
  }
  simpanLeaderboard(urutkanLeaderboard(entries).slice(0, 100));
  form.hidden = true;
  hasil.hidden = false;
  hasil.className = 'info-box quiz-result-box quiz-result-centered';
  hasil.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = `Nilai ${nilai}/100`;
  const detail = document.createElement('p');
  detail.textContent = `${record.nama} (${record.kelas}), jawaban benar ${benar} dari 25 soal. Waktu pengerjaan ${Math.floor(durasi / 60)} menit ${durasi % 60} detik.`;
  const message = document.createElement('p');
  message.textContent = nilai >= 85 ? 'Hebat! Pemahaman HTML kamu sangat baik.' : nilai >= 70 ? 'Bagus! Pelajari kembali beberapa materi untuk meningkatkan nilai.' : 'Terus berlatih. Baca kembali Bab 1–7 dan coba lagi.';
  const actions = document.createElement('div');
  actions.className = 'quiz-result-actions';
  const dashboardButton = document.createElement('button');
  dashboardButton.type = 'button';
  dashboardButton.className = 'quiz-start-button';
  dashboardButton.textContent = '🏆 Lihat Dashboard Hasil';
  dashboardButton.addEventListener('click', () => bukaTabKuis('dashboard'));
  const restartButton = document.createElement('button');
  restartButton.type = 'button';
  restartButton.className = 'nav-back';
  restartButton.textContent = '↺ Coba Lagi';
  restartButton.addEventListener('click', ulangiKuis);
  actions.append(dashboardButton, restartButton);
  hasil.append(title, detail, message, actions);
  renderLeaderboard();
}

function ulangiKuis() {
  const form = document.getElementById('kuis-akhir');
  if (form) { form.reset(); form.hidden = false; }
  const result = document.getElementById('hasil-kuis');
  if (result) { result.hidden = true; result.replaceChildren(); }
  const active = document.getElementById('kuis-area-aktif');
  const intro = document.getElementById('kuis-pengantar');
  if (active) active.hidden = true;
  if (intro) intro.hidden = false;
  identitasPesertaKuis = null;
  quizMulaiPada = null;
  quizAnswers = {};
  quizCurrentPage = 0;
  const status = document.getElementById('status-mulai-kuis');
  if (status) status.textContent = '';
}

// HTML Interactive Lab: tiga level, pemeriksaan otomatis, XP dan progres tersimpan di browser.
const simMissions = {
  pemula: {
    title: "Misi 1 — Bangun halaman pertama",
    description: "Buat sebuah heading, paragraf, dan daftar tidak berurutan (ul) yang berisi minimal dua item (li).",
    hint: "Petunjuk: gunakan <h1> untuk judul, <p> untuk paragraf, lalu <ul><li>Item 1</li><li>Item 2</li></ul> untuk daftar.",
    starter: '<h1>Halo, Dunia!</h1>\n<p>Saya sedang belajar HTML.</p>\n<!-- TODO: tambahkan daftar ul dengan minimal 2 item -->',
    solution: '<h1>Halo, Dunia!</h1>\n<p>Saya sedang belajar HTML.</p>\n<ul>\n  <li>Belajar tag</li>\n  <li>Berlatih HTML</li>\n</ul>',
    check(doc) {
      const checks = [doc.querySelector("h1"), doc.querySelector("p"), doc.querySelectorAll("ul li").length >= 2];
      return { ok: checks.every(Boolean), message: checks.every(Boolean) ? "Keren! Heading, paragraf, dan daftar sudah ditemukan." : "Masih ada yang kurang: pastikan ada <h1>, <p>, serta <ul> berisi sedikitnya dua <li>." };
    }
  },
  menengah: {
    title: "Misi 2 — Buat kartu profil siswa",
    description: "Lengkapi profil dengan heading, gambar berisi atribut src dan alt, tautan yang memiliki href, serta tabel berisi heading dan data.",
    hint: 'Petunjuk: gambar perlu src dan alt, tautan perlu href, sedangkan tabel bisa memakai <table>, <tr>, <th>, dan <td>. Contoh: <a href="https://example.com">Kunjungi</a>.',
    starter: '<h1>Profil Siswa</h1>\n<p>Nama: Rani</p>\n<img alt="Foto siswa">\n<p><a>Portal Belajar</a></p>\n<table>\n  <tr><th>Mata Pelajaran</th><th>Nilai</th></tr>\n  <tr><td>HTML</td><td>90</td></tr>\n</table>',
    solution: '<h1>Profil Siswa</h1>\n<p>Nama: Rani</p>\n<img src="https://placehold.co/240x140" alt="Ilustrasi profil siswa">\n<p><a href="https://example.com" target="_blank" rel="noopener">Portal Belajar</a></p>\n<table>\n  <tr><th>Mata Pelajaran</th><th>Nilai</th></tr>\n  <tr><td>HTML</td><td>90</td></tr>\n</table>',
    check(doc) {
      const img = doc.querySelector("img");
      const link = doc.querySelector("a");
      const table = doc.querySelector("table");
      const checks = [doc.querySelector("h1"), img && img.getAttribute("src")?.trim(), img && img.getAttribute("alt")?.trim(), link && link.getAttribute("href")?.trim(), table && table.querySelector("th"), table && table.querySelector("td")];
      const passed = checks.every(Boolean);
      return { ok: passed, message: passed ? "Mantap! Profil sudah punya heading, gambar, tautan, dan tabel yang memenuhi kriteria." : "Periksa lagi: heading, gambar dengan src dan alt, tautan dengan href, serta tabel dengan th dan td harus tersedia." };
    }
  },
  expert: {
    title: "Misi 3 — Form pendaftaran tervalidasi",
    description: "Buat form pendaftaran dengan label yang terhubung ke input, input email wajib diisi, pilihan kelas, dan tombol Daftar.",
    hint: 'Petunjuk: gunakan <input id="email" type="email" required>, <label for="email">Email</label>, elemen <select>, dan <button type="submit">Daftar</button>.',
    starter: '<h1>Form Pendaftaran</h1>\n<form>\n  <label for="nama">Nama lengkap</label>\n  <input id="nama" type="text" required>\n  <!-- TODO: tambahkan label dan input email type=email required -->\n  <!-- TODO: tambahkan label serta select untuk kelas -->\n  <button type="submit">Daftar</button>\n</form>',
    solution: '<h1>Form Pendaftaran</h1>\n<form>\n  <label for="nama">Nama lengkap</label>\n  <input id="nama" name="nama" type="text" required>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <label for="kelas">Kelas</label>\n  <select id="kelas" name="kelas" required>\n    <option value="">Pilih kelas</option>\n    <option value="X PPLG 1">X PPLG 1</option>\n    <option value="X PPLG 2">X PPLG 2</option>\n  </select>\n  <button type="submit">Daftar</button>\n</form>',
    check(doc) {
      const email = doc.querySelector('input[type="email"][required]');
      const labelConnected = email && email.id && doc.querySelector(`label[for="${CSS.escape(email.id)}"]`);
      const select = doc.querySelector("select");
      const selectConnected = select && select.id && doc.querySelector(`label[for="${CSS.escape(select.id)}"]`);
      const submit = doc.querySelector('button[type="submit"], input[type="submit"]');
      const checks = [doc.querySelector("form"), labelConnected, select, selectConnected, submit];
      const passed = checks.every(Boolean);
      return { ok: passed, message: passed ? "Luar biasa! Form sudah memiliki email wajib, label terhubung, pilihan kelas, dan tombol submit." : "Belum lengkap: buat form, email type=email required dengan label for yang sesuai, select dengan label, dan tombol submit." };
    }
  }
};


// Puzzle tempel untuk level Pemula; mendukung drag-drop desktop dan tap di layar sentuh.
const puzzlePieces = {
  heading: { label: "Judul", code: "<h1>Halo, Dunia!</h1>" },
  paragraph: { label: "Paragraf", code: "<p>Saya sedang belajar HTML.</p>" },
  list: { label: "Daftar", code: "<ul>\\n  <li>Belajar tag</li>\\n  <li>Berlatih HTML</li>\\n</ul>".replaceAll("\\n", "\n") }
};
const puzzleDisplayOrder = ["list", "paragraph", "heading"];
const puzzleCorrectOrder = ["heading", "paragraph", "list"];
let puzzleSlots = [null, null, null];
let puzzleSelectedPiece = null;
let puzzleSelectedSlot = null;

function renderPuzzle() {
  const bank = document.getElementById("puzzle-bank");
  const slots = document.querySelectorAll(".puzzle-slot");
  if (!bank || slots.length !== 3) return;

  bank.replaceChildren();
  puzzleDisplayOrder.forEach((id) => {
    if (puzzleSlots.includes(id)) return;
    const piece = puzzlePieces[id];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `puzzle-piece${puzzleSelectedPiece === id ? " is-selected" : ""}`;
    // Puzzle memakai langkah bertab agar tetap pas di layar; pilih/ketuk potongan untuk menempelkannya.
    button.draggable = false;
    button.dataset.piece = id;
    button.setAttribute("aria-pressed", String(puzzleSelectedPiece === id));
    const label = document.createElement("strong");
    label.textContent = piece.label;
    const code = document.createElement("code");
    code.textContent = piece.code;
    const action = document.createElement("small");
    action.textContent = "Ketuk untuk memilih";
    button.append(label, code, action);
    button.addEventListener("click", () => {
      const feedback = document.getElementById("puzzle-feedback");
      if (Number.isInteger(puzzleSelectedSlot)) {
        const targetIndex = puzzleSelectedSlot;
        puzzleSelectedSlot = null;
        puzzleSelectedPiece = null;
        tempatkanPuzzle(targetIndex, id);
        bukaLangkahPuzzle(puzzleSlots.every(Boolean) ? 1 : 0);
        return;
      }
      puzzleSelectedPiece = puzzleSelectedPiece === id ? null : id;
      renderPuzzle();
      if (feedback) {
        feedback.className = "puzzle-feedback";
        feedback.textContent = puzzleSelectedPiece ? `Potongan “${puzzlePieces[id].label}” dipilih. Sekarang pilih tab Kotak Urutan.` : "Pilihan dibatalkan.";
      }
      if (puzzleSelectedPiece) bukaLangkahPuzzle(0);
    });
    bank.appendChild(button);
  });

  slots.forEach((slot, index) => {
    slot.replaceChildren();
    const number = document.createElement("span");
    number.className = "slot-number";
    number.textContent = String(index + 1).padStart(2, "0");
    slot.appendChild(number);
    slot.classList.toggle("is-filled", Boolean(puzzleSlots[index]));
    slot.classList.toggle("is-selected-target", puzzleSelectedSlot === index);
    slot.classList.remove("drag-over");
    if (puzzleSlots[index]) {
      const code = document.createElement("code");
      code.textContent = puzzlePieces[puzzleSlots[index]].code;
      slot.appendChild(code);
      slot.setAttribute("aria-label", `Kotak urutan ${index + 1}: ${puzzlePieces[puzzleSlots[index]].label}. Ketuk untuk mengosongkan.`);
    } else {
      const message = document.createElement("span");
      message.className = "slot-message";
      message.textContent = ["Tempel bagian judul di sini", "Tempel bagian paragraf di sini", "Tempel bagian daftar di sini"][index];
      slot.appendChild(message);
      slot.setAttribute("aria-label", `Kotak urutan ${index + 1}, masih kosong`);
    }
  });
}

function tempatkanPuzzle(index, pieceId = puzzleSelectedPiece) {
  const feedback = document.getElementById("puzzle-feedback");
  if (!pieceId) {
    if (puzzleSlots[index]) {
      puzzleSlots[index] = null;
      puzzleSelectedPiece = null;
      puzzleSelectedSlot = null;
      renderPuzzle();
      if (feedback) {
        feedback.className = "puzzle-feedback";
        feedback.textContent = "Potongan dikembalikan ke tempat potongan kode.";
      }
    } else {
      puzzleSelectedSlot = index;
      puzzleSelectedPiece = null;
      renderPuzzle();
      if (feedback) {
        feedback.className = "puzzle-feedback";
        feedback.textContent = `Kotak urutan ${index + 1} dipilih. Buka tab Potongan Kode, lalu pilih bagian yang sesuai.`;
      }
      bukaLangkahPuzzle(1);
    }
    return;
  }
  const oldIndex = puzzleSlots.indexOf(pieceId);
  if (oldIndex >= 0) puzzleSlots[oldIndex] = null;
  // Jika kotak tujuan sudah berisi, potongan lamanya kembali ke bank.
  puzzleSlots[index] = pieceId;
  puzzleSelectedPiece = null;
  puzzleSelectedSlot = null;
  renderPuzzle();
  if (feedback) {
    feedback.className = "puzzle-feedback";
    feedback.textContent = `Potongan “${puzzlePieces[pieceId].label}” ditempel pada urutan ${index + 1}.`;
  }
}

function bukaLangkahPuzzle(step) {
  const nav = document.querySelector('.puzzle-step-tabs');
  if (!nav) return;
  nav.querySelectorAll('.puzzle-step-button').forEach((button, index) => {
    const active = index === step;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.puzzle-step-pane').forEach((pane, index) => { pane.hidden = index !== step; });
}

function inisialisasiTabPuzzle() {
  const panel = document.getElementById('puzzle-panel');
  const board = panel?.querySelector('.puzzle-board');
  const slots = document.getElementById('puzzle-slots');
  const bank = panel?.querySelector('.puzzle-bank-wrap');
  const actions = panel?.querySelector('.puzzle-actions');
  const feedback = document.getElementById('puzzle-feedback');
  if (!panel || !board || !slots || !bank || !actions || !feedback || panel.dataset.stepsReady === 'true') return;

  const nav = document.createElement('nav');
  nav.className = 'puzzle-step-tabs';
  nav.setAttribute('aria-label', 'Langkah puzzle HTML');
  const labels = ['① Kotak Urutan', '② Potongan Kode'];
  const panes = labels.map((label, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `puzzle-step-button${index === 0 ? ' active' : ''}`;
    button.textContent = label;
    button.setAttribute('aria-selected', String(index === 0));
    button.addEventListener('click', () => bukaLangkahPuzzle(index));
    nav.appendChild(button);
    const pane = document.createElement('section');
    pane.className = 'puzzle-step-pane';
    pane.hidden = index !== 0;
    return pane;
  });
  const instructionSlots = document.createElement('p');
  instructionSlots.className = 'puzzle-step-hint';
  instructionSlots.textContent = 'Langkah 1: pilih kotak kosong yang ingin kamu isi.';
  panes[0].append(instructionSlots, slots);
  const instructionPieces = document.createElement('p');
  instructionPieces.className = 'puzzle-step-hint';
  instructionPieces.textContent = 'Langkah 2: pilih potongan yang sesuai dengan kotak terpilih.';
  panes[1].append(instructionPieces, bank, actions);
  board.replaceWith(nav, ...panes, feedback);
  panel.dataset.stepsReady = 'true';
}

function bindPuzzleEvents() {
  document.querySelectorAll(".puzzle-slot").forEach((slot) => {
    slot.addEventListener("click", () => tempatkanPuzzle(Number(slot.dataset.slot)));
  });
}

function cekPuzzlePemula() {
  const feedback = document.getElementById("puzzle-feedback");
  if (puzzleSlots.some((id) => !id)) {
    feedback.className = "puzzle-feedback error";
    feedback.textContent = "Belum lengkap. Tempelkan ketiga potongan ke kotak yang tersedia.";
    return;
  }
  if (!puzzleSlots.every((id, index) => id === puzzleCorrectOrder[index])) {
    feedback.className = "puzzle-feedback error";
    feedback.textContent = "Belum tepat. Urutkan: Judul → Paragraf → Daftar. Ketuk kotak yang keliru untuk memindahkan potongan.";
    return;
  }
  const editor = document.getElementById("kode-editor");
  editor.value = puzzleCorrectOrder.map((id) => puzzlePieces[id].code).join("\n");
  jalankanSimulator();
  feedback.className = "puzzle-feedback success";
  feedback.textContent = "Hebat! Puzzle benar. Kode sudah ditempel ke editor dan hasilnya tampil di tab Editor & Hasil.";
  periksaMisiSimulator();
  bukaTabSimulator("editor");
}

function resetPuzzlePemula() {
  puzzleSlots = [null, null, null];
  puzzleSelectedPiece = null;
  puzzleSelectedSlot = null;
  bukaLangkahPuzzle(0);
  renderPuzzle();
  const feedback = document.getElementById("puzzle-feedback");
  if (feedback) {
    feedback.className = "puzzle-feedback";
    feedback.textContent = "Puzzle diulang. Tempelkan judul, paragraf, lalu daftar.";
  }
}

const simStorageKey = "mpiHtmlInteractiveLab_v3";
let simActiveLevel = "pemula";
let simProgress = { completed: { pemula: false, menengah: false, expert: false }, code: {} };

function muatProgresSimulator() {
  try {
    const saved = JSON.parse(localStorage.getItem(simStorageKey) || "null");
    if (saved && saved.completed && saved.code) {
      simProgress = {
        completed: {
          pemula: Boolean(saved.completed.pemula),
          menengah: Boolean(saved.completed.menengah),
          expert: Boolean(saved.completed.expert)
        },
        code: saved.code
      };
    }
  } catch (error) {
    console.warn("Progres simulator tidak dapat dibaca dari penyimpanan browser.", error);
  }
}

function simpanProgresSimulator() {
  try { localStorage.setItem(simStorageKey, JSON.stringify(simProgress)); }
  catch (error) { console.warn("Progres tidak bisa disimpan pada browser ini.", error); }
}

function levelTerbuka(level) {
  if (level === "pemula") return true;
  if (level === "menengah") return simProgress.completed.pemula;
  return simProgress.completed.menengah;
}

function renderProgresSimulator() {
  const levels = ["pemula", "menengah", "expert"];
  const xp = levels.filter((level) => simProgress.completed[level]).length * 100;
  const xpEl = document.getElementById("simulator-xp");
  const xpBar = document.getElementById("simulator-xp-bar");
  const progressText = document.getElementById("simulator-progress-text");
  if (xpEl) xpEl.textContent = String(xp);
  if (xpBar) xpBar.style.width = `${xp / 3}%`;
  if (progressText) progressText.textContent = `${xp / 100} dari 3 misi selesai`;

  levels.forEach((level) => {
    const button = document.querySelector(`.level-card[data-level="${level}"]`);
    const status = document.getElementById(`status-${level}`);
    if (!button || !status) return;
    button.classList.toggle("active-level", simActiveLevel === level);
    button.classList.toggle("is-locked", !levelTerbuka(level));
    button.classList.toggle("is-complete", simProgress.completed[level]);
    button.disabled = !levelTerbuka(level);
    if (simProgress.completed[level]) status.textContent = "✓ SELESAI · 100 XP";
    else if (levelTerbuka(level)) status.textContent = "TERBUKA";
    else status.textContent = "🔒 TERKUNCI";
  });
}

function pilihLevelSimulator(level) {
  if (!simMissions[level]) return;
  if (!levelTerbuka(level)) {
    const result = document.getElementById("simulator-mission-result");
    if (result) {
      result.textContent = level === "menengah" ? "Selesaikan misi Pemula terlebih dahulu untuk membuka level ini." : "Selesaikan misi Menengah terlebih dahulu untuk membuka level Expert.";
      result.className = "mission-result error";
    }
    return;
  }

  const editor = document.getElementById("kode-editor");
  if (editor && simActiveLevel) simProgress.code[simActiveLevel] = editor.value;
  simActiveLevel = level;
  const puzzlePanel = document.getElementById("puzzle-panel");
  if (puzzlePanel) puzzlePanel.hidden = level !== "pemula";
  const puzzleTab = document.querySelector('.simulator-tab-button[data-lab-tab="puzzle"]');
  if (puzzleTab) puzzleTab.disabled = level !== "pemula";
  if (level !== "pemula" && document.getElementById("sim-tab-puzzle") && !document.getElementById("sim-tab-puzzle").hidden) bukaTabSimulator("misi");
  const mission = simMissions[level];
  const solutionCode = document.getElementById("simulator-solution-code");
  if (solutionCode) solutionCode.textContent = mission.solution || mission.starter;
  document.getElementById("simulator-mission-title").textContent = mission.title;
  document.getElementById("simulator-mission-desc").textContent = mission.description;
  document.getElementById("simulator-hint").hidden = true;
  const result = document.getElementById("simulator-mission-result");
  result.className = "mission-result";
  if (simProgress.completed[level]) {
    result.textContent = "Misi ini sudah selesai. Kamu boleh mengubah kode dan mencoba lagi.";
  } else {
    result.textContent = "Selesaikan kriteria misi untuk mendapatkan 100 XP.";
  }
  editor.value = typeof simProgress.code[level] === "string" ? simProgress.code[level] : mission.starter;
  if (level === "pemula") renderPuzzle();
  renderProgresSimulator();
  jalankanSimulator();
}

function togglePetunjukSimulator() {
  const hint = document.getElementById("simulator-hint");
  if (!hint) return;
  hint.textContent = simMissions[simActiveLevel].hint;
  hint.hidden = !hint.hidden;
}

function parseKodeSimulator() {
  const source = document.getElementById("kode-editor").value;
  return new DOMParser().parseFromString(source, "text/html");
}

function periksaMisiSimulator() {
  const editor = document.getElementById("kode-editor");
  const result = document.getElementById("simulator-mission-result");
  const doc = parseKodeSimulator();
  const check = simMissions[simActiveLevel].check(doc);
  result.className = `mission-result ${check.ok ? "success" : "error"}`;

  if (check.ok) {
    const firstCompletion = !simProgress.completed[simActiveLevel];
    simProgress.completed[simActiveLevel] = true;
    simProgress.code[simActiveLevel] = editor.value;
    simpanProgresSimulator();
    renderProgresSimulator();
    if (firstCompletion) {
      result.textContent = `🎉 ${check.message} +100 XP!`;
      if (simActiveLevel === "pemula") result.textContent += " Level Menengah sekarang terbuka.";
      if (simActiveLevel === "menengah") result.textContent += " Level Expert sekarang terbuka.";
      if (simActiveLevel === "expert") result.textContent += " Semua level selesai. Kamu adalah HTML Lab Champion!";
    } else {
      result.textContent = `✅ ${check.message} Misi ini sudah tercatat selesai sebelumnya.`;
    }
  } else {
    result.textContent = `🔎 ${check.message}`;
  }
  jalankanSimulator();
}

// Sanitizer untuk pratinjau HTML. Render di Shadow DOM agar stylesheet website
// tidak merusak hasil siswa; script, event handler, iframe, dan form submission dinonaktifkan.
const previewAllowedTags = new Set([
  "a", "abbr", "article", "aside", "b", "blockquote", "br", "button", "caption", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "ol", "optgroup", "option", "output", "p", "pre", "q", "s", "samp", "section", "select", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var"
]);
const previewBlockedTags = new Set(["script", "iframe", "object", "embed", "applet", "base", "meta", "link", "style", "template", "noscript"]);
const previewAllowedAttrs = new Set([
  "id", "class", "title", "alt", "src", "href", "width", "height", "colspan", "rowspan", "scope", "type", "name", "value", "placeholder", "required", "checked", "selected", "for", "maxlength", "minlength", "min", "max", "step", "multiple", "disabled", "readonly", "autocomplete", "pattern", "rows", "cols", "size", "start", "reversed", "open", "datetime", "cite", "lang", "dir", "role"
]);

function urlPreviewAman(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed || /^(javascript|vbscript|data|file):/i.test(trimmed)) return "";
  return trimmed;
}

function nodePreviewAman(node) {
  if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.nodeValue || "");
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tag = node.tagName.toLowerCase();
  if (previewBlockedTags.has(tag)) return null;

  // Dokumen HTML penuh boleh ditempel; pembungkus html/head/body tidak diperlukan di kanvas.
  if (["html", "head", "body", "title"].includes(tag)) {
    const fragment = document.createDocumentFragment();
    node.childNodes.forEach((child) => {
      const safeChild = nodePreviewAman(child);
      if (safeChild) fragment.appendChild(safeChild);
    });
    return fragment;
  }

  // Tag yang tidak dikenal diurai menjadi anak teks/elemen aman, bukan dieksekusi.
  if (!previewAllowedTags.has(tag)) {
    const fragment = document.createDocumentFragment();
    node.childNodes.forEach((child) => {
      const safeChild = nodePreviewAman(child);
      if (safeChild) fragment.appendChild(safeChild);
    });
    return fragment;
  }

  const clean = document.createElement(tag);
  Array.from(node.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase();
    let value = attribute.value;
    if (name.startsWith("on") || name === "style" || name === "srcdoc" || name === "action" || name === "formaction" || name === "formtarget" || name === "target" || name === "srcset") return;
    if (!previewAllowedAttrs.has(name) && !name.startsWith("aria-") && !name.startsWith("data-")) return;
    if (name === "href" || name === "src" || name === "cite") {
      value = urlPreviewAman(value);
      if (!value) return;
    }
    if (name === "type" && tag === "input" && !["text", "email", "number", "date", "radio", "checkbox", "password", "submit", "button", "reset", "tel", "url"].includes(value.toLowerCase())) return;
    clean.setAttribute(name, value);
  });

  if (tag === "a" && clean.hasAttribute("href")) {
    clean.setAttribute("target", "_blank");
    clean.setAttribute("rel", "noopener noreferrer");
  }

  node.childNodes.forEach((child) => {
    const safeChild = nodePreviewAman(child);
    if (safeChild) clean.appendChild(safeChild);
  });
  return clean;
}

function siapkanKanvasPreview(preview) {
  if (preview.shadowRoot) return preview.shadowRoot;
  const shadow = preview.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    :host { display:block; width:100%; height:100%; overflow:auto; background:#fff; color:#20242b; border-radius:6px; }
    .preview-root { box-sizing:border-box; min-height:100%; padding:16px; margin:0; background:#fff; color:#20242b; font:16px/1.55 Arial,sans-serif; overflow-wrap:anywhere; }
    h1,h2,h3,h4,h5,h6 { color:#15202b; line-height:1.25; margin:0.55em 0; }
    p { margin:0.7em 0; }
    img { max-width:100%; height:auto; }
    table { border-collapse:collapse; max-width:100%; }
    th,td { border:1px solid #89939f; padding:7px 10px; text-align:left; }
    input,select,button,textarea { box-sizing:border-box; margin:5px 0; padding:6px; max-width:100%; font:inherit; }
    label { display:block; margin-top:8px; }
    ul,ol { padding-left:24px; }
    a { color:#086b9a; }
    pre,code { white-space:pre-wrap; overflow-wrap:anywhere; }
    form { border:1px solid #cbd5e1; border-radius:6px; padding:12px; }
  `;
  const root = document.createElement("div");
  root.className = "preview-root";
  shadow.append(style, root);
  shadow.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);
  return shadow;
}

function jalankanSimulator() {
  const editor = document.getElementById("kode-editor");
  const preview = document.getElementById("hasil-editor");
  if (!editor || !preview) return;

  const shadow = siapkanKanvasPreview(preview);
  const root = shadow.querySelector(".preview-root");
  const kode = editor.value || "";
  root.replaceChildren();

  if (!kode.trim()) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Mulai ketik HTML untuk melihat hasilnya.";
    placeholder.style.color = "#64748b";
    root.appendChild(placeholder);
  } else {
    try {
      const parsed = new DOMParser().parseFromString(kode, "text/html");
      parsed.body.childNodes.forEach((node) => {
        const safeNode = nodePreviewAman(node);
        if (safeNode) root.appendChild(safeNode);
      });
      if (!root.childNodes.length) {
        const placeholder = document.createElement("p");
        placeholder.textContent = "Kode berhasil dibaca, tetapi belum ada elemen yang dapat ditampilkan.";
        placeholder.style.color = "#64748b";
        root.appendChild(placeholder);
      }
    } catch (error) {
      const message = document.createElement("p");
      message.textContent = "Pratinjau belum dapat dibuat. Periksa kembali susunan HTML.";
      message.style.color = "#b91c1c";
      root.appendChild(message);
      console.error("Gagal merender pratinjau HTML:", error);
    }
  }

  if (simActiveLevel) {
    simProgress.code[simActiveLevel] = kode;
    simpanProgresSimulator();
  }
}

function resetSimulator() {
  const editor = document.getElementById("kode-editor");
  if (!editor || !simMissions[simActiveLevel]) return;
  editor.value = simMissions[simActiveLevel].starter;
  simProgress.code[simActiveLevel] = editor.value;
  const hint = document.getElementById("simulator-hint");
  const result = document.getElementById("simulator-mission-result");
  if (hint) hint.hidden = true;
  if (result) { result.className = "mission-result"; result.textContent = "Kode di level ini dikembalikan ke kondisi awal."; }
  simpanProgresSimulator();
  jalankanSimulator();
}

function resetProgresSimulator() {
  const yakin = window.confirm("Reset seluruh progres, XP, dan kode tersimpan untuk semua level?");
  if (!yakin) return;
  simProgress = { completed: { pemula: false, menengah: false, expert: false }, code: {} };
  simActiveLevel = "pemula";
  simpanProgresSimulator();
  pilihLevelSimulator("pemula");
  const result = document.getElementById("simulator-mission-result");
  if (result) { result.className = "mission-result"; result.textContent = "Progres direset. Selamat mulai petualangan HTML dari awal!"; }
}


// Pecah bagian Uraian yang panjang menjadi tiga layar ringkas agar tidak perlu menggulir panel panjang.
function inisialisasiTabUraian() {
  const config = {
    1: [4, 6],
    2: [3, 4],
    3: [3, 4],
    4: [3, 4],
    5: [3, 4],
    6: [3, 4],
    7: [3, 4]
  };
  const titles = ["Konsep", "Contoh Kode", "Hasil & Catatan"];
  document.querySelectorAll('.tab-content[id$="-uraian"]').forEach((container) => {
    if (container.dataset.subtabsReady === "true") return;
    const match = container.id.match(/^bab(\d+)-uraian$/);
    if (!match) return;
    const bab = Number(match[1]);
    const cuts = config[bab];
    const nodes = Array.from(container.children);
    if (!cuts || nodes.length <= cuts[1]) return;

    const groups = [nodes.slice(0, cuts[0]), nodes.slice(cuts[0], cuts[1]), nodes.slice(cuts[1])];
    const nav = document.createElement('nav');
    nav.className = 'uraian-step-tabs';
    nav.setAttribute('aria-label', `Bagian uraian Bab ${bab}`);
    const panes = [];
    groups.forEach((group, index) => {
      const pane = document.createElement('section');
      pane.className = 'uraian-step-pane';
      pane.dataset.step = String(index);
      pane.hidden = index !== 0;
      group.forEach((node) => pane.appendChild(node));
      panes.push(pane);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = `uraian-step-button${index === 0 ? ' active' : ''}`;
      button.textContent = titles[index];
      button.setAttribute('aria-selected', String(index === 0));
      button.addEventListener('click', () => {
        panes.forEach((target, targetIndex) => { target.hidden = targetIndex !== index; });
        nav.querySelectorAll('.uraian-step-button').forEach((other, targetIndex) => {
          other.classList.toggle('active', targetIndex === index);
          other.setAttribute('aria-selected', String(targetIndex === index));
        });
      });
      nav.appendChild(button);
    });
    container.replaceChildren(nav, ...panes);
    container.dataset.subtabsReady = 'true';
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inisialisasiTabUraian();
  renderLeaderboard();
  const startQuizForm = document.getElementById("kuis-identitas-form");
  if (startQuizForm) startQuizForm.addEventListener("submit", mulaiKuis);
  const quizForm = document.getElementById("kuis-akhir");
  if (quizForm) quizForm.addEventListener("submit", (event) => { event.preventDefault(); nilaiKuis(); });
  const previousQuizPage = document.getElementById("kuis-soal-sebelumnya");
  const nextQuizPage = document.getElementById("kuis-soal-berikutnya");
  if (previousQuizPage) previousQuizPage.addEventListener("click", () => tampilkanBagianKuis(quizCurrentPage - 1));
  if (nextQuizPage) nextQuizPage.addEventListener("click", () => tampilkanBagianKuis(quizCurrentPage + 1));
  const restartQuizButton = document.getElementById("ulang-kuis-button");
  if (restartQuizButton) restartQuizButton.addEventListener("click", ulangiKuis);
  window.addEventListener("resize", () => {
    const nextPageSize = getUkuranHalamanKuis();
    if (identitasPesertaKuis && nextPageSize !== quizPageSize) renderPertanyaanKuis(true);
  });
  muatProgresSimulator();
  bukaTabSimulator("misi");
  inisialisasiTabPuzzle();
  bindPuzzleEvents();
  renderPuzzle();
  const puzzlePanel = document.getElementById("puzzle-panel");
  if (puzzlePanel) puzzlePanel.hidden = simActiveLevel !== "pemula";
  const editor = document.getElementById("kode-editor");
  if (editor) {
    const savedBeginnerCode = simProgress.code.pemula;
    if (typeof savedBeginnerCode === "string") editor.value = savedBeginnerCode;
    editor.addEventListener("input", () => {
      jalankanSimulator();
      const result = document.getElementById("simulator-mission-result");
      if (result && !simProgress.completed[simActiveLevel]) {
        result.className = "mission-result";
        result.textContent = "Kode berubah. Periksa misi saat kamu siap.";
      }
    });
  }
  renderProgresSimulator();
  const activeSolution = document.getElementById("simulator-solution-code");
  if (activeSolution && simMissions[simActiveLevel]) activeSolution.textContent = simMissions[simActiveLevel].solution || simMissions[simActiveLevel].starter;
  jalankanSimulator();

  const formFeedback = document.getElementById("form-feedback");
  if (formFeedback) {
    formFeedback.addEventListener("submit", (event) => {
      event.preventDefault();
      const nama = document.getElementById("nama-feedback").value.trim();
      const rating = document.getElementById("rating-feedback").value;
      const pesan = document.getElementById("pesan-feedback").value.trim();
      const hasil = document.getElementById("hasil-feedback");
      hasil.textContent = `${nama ? `Terima kasih, ${nama}. ` : "Terima kasih. "}Penilaian: ${rating}.${pesan ? ` Saran: ${pesan}` : ""} Feedback ini belum dikirim ke server.`;
    });
  }
});
