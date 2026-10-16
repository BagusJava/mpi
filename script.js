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

const jawabanKuisAkhir = {
  k1: "a", k2: "b", k3: "a", k4: "c", k5: "b", k6: "a", k7: "c"
};

function nilaiKuis() {
  const form = document.getElementById("kuis-akhir");
  let benar = 0;
  let terisi = 0;
  Object.entries(jawabanKuisAkhir).forEach(([nama, jawaban]) => {
    const pilihan = form.querySelector(`input[name="${nama}"]:checked`);
    if (pilihan) { terisi += 1; if (pilihan.value === jawaban) benar += 1; }
  });
  const hasil = document.getElementById("hasil-kuis");
  if (terisi < Object.keys(jawabanKuisAkhir).length) {
    hasil.textContent = `Kamu baru menjawab ${terisi} dari 7 soal. Lengkapi semua jawaban sebelum memeriksa nilai.`;
    return;
  }
  const nilai = Math.round((benar / 7) * 100);
  hasil.textContent = `Nilai kamu: ${nilai}/100 (${benar} dari 7 jawaban benar). ${nilai >= 80 ? "Hebat! Pertahankan pemahamanmu." : "Ayo pelajari kembali bab yang masih sulit, lalu coba lagi."}`;
}

function resetNilaiKuis() {
  const hasil = document.getElementById("hasil-kuis");
  if (hasil) hasil.textContent = "";
}

// HTML Interactive Lab: tiga level, pemeriksaan otomatis, XP dan progres tersimpan di browser.
const simMissions = {
  pemula: {
    title: "Misi 1 — Bangun halaman pertama",
    description: "Buat sebuah heading, paragraf, dan daftar tidak berurutan (ul) yang berisi minimal dua item (li).",
    hint: "Petunjuk: gunakan <h1> untuk judul, <p> untuk paragraf, lalu <ul><li>Item 1</li><li>Item 2</li></ul> untuk daftar.",
    starter: '<h1>Halo, Dunia!</h1>\n<p>Saya sedang belajar HTML.</p>\n<!-- TODO: tambahkan daftar ul dengan minimal 2 item -->',
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
    button.draggable = true;
    button.dataset.piece = id;
    button.setAttribute("aria-pressed", String(puzzleSelectedPiece === id));
    const label = document.createElement("strong");
    label.textContent = piece.label;
    const code = document.createElement("code");
    code.textContent = piece.code;
    const action = document.createElement("small");
    action.textContent = "Seret atau ketuk";
    button.append(label, code, action);
    button.addEventListener("click", () => {
      puzzleSelectedPiece = puzzleSelectedPiece === id ? null : id;
      renderPuzzle();
      const feedback = document.getElementById("puzzle-feedback");
      if (feedback) {
        feedback.className = "puzzle-feedback";
        feedback.textContent = puzzleSelectedPiece ? `Potongan “${puzzlePieces[id].label}” dipilih. Sekarang ketuk kotak urutannya.` : "Pilihan dibatalkan.";
      }
    });
    button.addEventListener("dragstart", (event) => {
      puzzleSelectedPiece = id;
      event.dataTransfer.setData("text/plain", id);
      event.dataTransfer.effectAllowed = "move";
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
      renderPuzzle();
      if (feedback) {
        feedback.className = "puzzle-feedback";
        feedback.textContent = "Potongan dikembalikan ke tempat potongan kode.";
      }
    } else if (feedback) {
      feedback.className = "puzzle-feedback";
      feedback.textContent = "Pilih satu potongan kode dahulu, lalu pilih kotak tujuan.";
    }
    return;
  }
  const oldIndex = puzzleSlots.indexOf(pieceId);
  if (oldIndex >= 0) puzzleSlots[oldIndex] = null;
  // Jika kotak tujuan sudah berisi, potongan lamanya dikembalikan otomatis ke bank.
  puzzleSlots[index] = pieceId;
  puzzleSelectedPiece = null;
  renderPuzzle();
  if (feedback) {
    feedback.className = "puzzle-feedback";
    feedback.textContent = `Potongan “${puzzlePieces[pieceId].label}” ditempel pada urutan ${index + 1}.`;
  }
}

function bindPuzzleEvents() {
  document.querySelectorAll(".puzzle-slot").forEach((slot) => {
    slot.addEventListener("click", () => tempatkanPuzzle(Number(slot.dataset.slot)));
    slot.addEventListener("dragover", (event) => {
      event.preventDefault();
      slot.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      slot.classList.remove("drag-over");
      const id = event.dataTransfer.getData("text/plain") || puzzleSelectedPiece;
      if (puzzlePieces[id]) tempatkanPuzzle(Number(slot.dataset.slot), id);
    });
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
  feedback.textContent = "Hebat! Puzzle benar. Kode sudah ditempel ke editor dan hasilnya tampil di pratinjau. Kamu juga bisa memperoleh XP dari misi Pemula.";
  periksaMisiSimulator();
}

function resetPuzzlePemula() {
  puzzleSlots = [null, null, null];
  puzzleSelectedPiece = null;
  renderPuzzle();
  const feedback = document.getElementById("puzzle-feedback");
  if (feedback) {
    feedback.className = "puzzle-feedback";
    feedback.textContent = "Puzzle diulang. Tempelkan judul, paragraf, lalu daftar.";
  }
}

const simStorageKey = "mpiHtmlInteractiveLab_v1";
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
  const mission = simMissions[level];
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

function jalankanSimulator() {
  const editor = document.getElementById("kode-editor");
  const preview = document.getElementById("hasil-editor");
  if (!editor || !preview) return;
  const kode = editor.value;
  const safeStyle = "html{background:#fff}body{font-family:Arial,sans-serif;padding:16px;margin:0;color:#20242b;line-height:1.55;overflow-wrap:anywhere}h1,h2,h3{color:#15202b}img{max-width:100%;height:auto}table{border-collapse:collapse;max-width:100%}th,td{border:1px solid #89939f;padding:7px 10px}input,select,button,textarea{margin:5px 0;padding:6px;max-width:100%}label{display:block;margin-top:8px}ul,ol{padding-left:24px}";
  // srcdoc menampilkan HTML secara terisolasi. Tidak ada allow-scripts atau allow-forms.
  const documentHtml = `<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${safeStyle}</style></head><body>${kode || '<p style="color:#64748b">Mulai ketik HTML untuk melihat hasilnya.</p>'}</body></html>`;
  try {
    // Script dan form tetap dilarang. allow-same-origin hanya memungkinkan halaman induk
    // menulis dokumen ke iframe pratinjau, sehingga rendering tidak bergantung pada srcdoc saja.
    if (preview.getAttribute("sandbox") !== "allow-same-origin") preview.setAttribute("sandbox", "allow-same-origin");
    const frameDocument = preview.contentDocument;
    if (frameDocument) {
      frameDocument.open();
      frameDocument.write(documentHtml);
      frameDocument.close();
    } else {
      preview.srcdoc = documentHtml;
    }
  } catch (error) {
    // Jalur cadangan untuk browser yang membatasi akses dokumen iframe.
    try { preview.srcdoc = documentHtml; }
    catch (fallbackError) { console.error("Pratinjau HTML tidak dapat diperbarui.", fallbackError); }
  }
  if (simActiveLevel) {
    simProgress.code[simActiveLevel] = kode;
    simpanProgresSimulator();
  }
}

function resetSimulator() {
  const editor = document.getElementById("kode-editor");
  if (!editor) return;
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

document.addEventListener("DOMContentLoaded", () => {
  muatProgresSimulator();
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
