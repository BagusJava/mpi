// Navigasi halaman utama
function goTo(pageId) {
  const target = document.getElementById(pageId);
  if (!target) {
    console.warn(`Halaman dengan ID "${pageId}" tidak ditemukan.`);
    return;
  }

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  target.classList.add("active");

  // Kembalikan tab ke Uraian saat bab dibuka kembali.
  if (pageId.startsWith("bab")) {
    const firstTab = target.querySelector(".tab-btn");
    const firstContent = target.querySelector(".tab-content");
    target.querySelectorAll(".tab-btn").forEach((button) => button.classList.remove("active-tab"));
    target.querySelectorAll(".tab-content").forEach((content) => {
      content.hidden = true;
    });
    if (firstTab) firstTab.classList.add("active-tab");
    if (firstContent) firstContent.hidden = false;
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

  indukBab.querySelectorAll(".tab-content").forEach((content) => {
    content.hidden = true;
  });
  indukBab.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.remove("active-tab");
  });

  const contentDipilih = document.getElementById(tabName);
  if (contentDipilih) contentDipilih.hidden = false;

  // Prioritaskan pemuatan pemutar saat tab Video dibuka.
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
    if (pilihan) {
      terisi += 1;
      if (pilihan.value === jawaban) benar += 1;
    }
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

function jalankanSimulator() {
  const kode = document.getElementById("kode-editor").value;
  const preview = document.getElementById("hasil-editor");
  // sandbox pada iframe membatasi pratinjau agar tidak mendapat akses ke halaman induk.
  preview.srcdoc = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;padding:16px;color:#222}img{max-width:100%}</style></head><body>${kode}</body></html>`;
}

function resetSimulator() {
  document.getElementById("kode-editor").value = '<h1>Halo, Dunia!</h1>\n<p>Saya sedang belajar HTML.</p>\n<ul><li>Tag</li><li>Elemen</li></ul>';
  jalankanSimulator();
}

document.addEventListener("DOMContentLoaded", () => {
  jalankanSimulator();

  const formFeedback = document.getElementById("form-feedback");
  formFeedback.addEventListener("submit", (event) => {
    event.preventDefault();
    const nama = document.getElementById("nama-feedback").value.trim();
    const rating = document.getElementById("rating-feedback").value;
    const pesan = document.getElementById("pesan-feedback").value.trim();
    const hasil = document.getElementById("hasil-feedback");
    hasil.textContent = `${nama ? `Terima kasih, ${nama}. ` : "Terima kasih. "}Penilaian: ${rating}.${pesan ? ` Saran: ${pesan}` : ""} Feedback ini belum dikirim ke server.`;
  });
});
