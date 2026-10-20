// config/database.js

// 1. Data Dummy Akun (Untuk Login)
const defaultUsers = [
  { username: "mhs", password: "123", nama: "Budi Mahasiswa", role: "mahasiswa" },
  { username: "admin", password: "123", nama: "Admin Sarpras", role: "admin" }
];

// 2. Data Dummy Laporan Awal (Biar halaman riwayat tidak kosong)
const defaultLaporan = [
  {
    id: "LP-001",
    tanggal: "20/10/2026",
    pelapor: "Budi Mahasiswa",
    lokasi: "Gedung A - Ruang 201",
    kategori: "AC / Pendingin",
    deskripsi: "AC mati total dan ruangan sangat panas.",
    status: "Menunggu"
  },
  {
    id: "LP-002",
    tanggal: "19/10/2026",
    pelapor: "Siti Aminah",
    lokasi: "Gedung B - Lab Komputer",
    kategori: "Proyektor",
    deskripsi: "Kabel HDMI proyektor longgar/rusak.",
    status: "Diproses"
  }
];

// Inisialisasi LocalStorage jika belum ada
if (!localStorage.getItem("db_users")) {
  localStorage.setItem("db_users", JSON.stringify(defaultUsers));
}

if (!localStorage.getItem("db_laporan")) {
  localStorage.setItem("db_laporan", JSON.stringify(defaultLaporan));
}

// ==========================================
// FUNGSI-FUNGSI UTAMA (UNTUK KAMU & TIM)
// ==========================================

// Dipakai oleh login.js (Bagianmu)
function cekLogin(username, password) {
  const users = JSON.parse(localStorage.getItem("db_users")) || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Simpan sesi user yang sedang aktif ke localStorage
    localStorage.setItem("session_user", JSON.stringify(user));
    return true;
  }
  return false;
}

// Dipakai untuk ambil data user aktif saat ini
function getSessionUser() {
  return JSON.parse(localStorage.getItem("session_user"));
}

// Dipakai untuk Logout
function logoutUser() {
  localStorage.removeItem("session_user");
  window.location.href = "login.html";
}

// Dipakai oleh tim lain (Riwayat Laporan & Dashboard)
function ambilSemuaLaporan() {
  return JSON.parse(localStorage.getItem("db_laporan")) || [];
}

// Dipakai oleh tim lain (Form Pengaduan)
function tambahLaporanBaru(pelapor, lokasi, kategori, deskripsi) {
  const laporan = ambilSemuaLaporan();
  const laporanBaru = {
    id: "LP-00" + (laporan.length + 1),
    tanggal: new Date().toLocaleDateString("id-ID"),
    pelapor: pelapor,
    lokasi: lokasi,
    kategori: kategori,
    deskripsi: deskripsi,
    status: "Menunggu"
  };
  laporan.push(laporanBaru);
  localStorage.setItem("db_laporan", JSON.stringify(laporan));
}

// Dipakai oleh tim lain (Admin mengubah status di Riwayat Laporan)
function ubahStatusLaporan(idLaporan, statusBaru) {
  const laporan = ambilSemuaLaporan();
  const index = laporan.findIndex(item => item.id === idLaporan);
  if (index !== -1) {
    laporan[index].status = statusBaru;
    localStorage.setItem("db_laporan", JSON.stringify(laporan));
  }
}