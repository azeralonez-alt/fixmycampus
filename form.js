// Cek sesi login saat halaman dimuat
const userAktif = getSessionUser();

// Jika belum login, tendang kembali ke halaman login
if (!userAktif) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "login.html";
} else {
    // Otomatis isi input Nama Pelapor dengan nama user yang sedang login
    document.getElementById("namaPelapor").value = userAktif.nama;
}

// Proses submit form pengaduan
document.getElementById("formPengaduan").addEventListener("submit", function (e) {
    e.preventDefault();

    const pelapor = document.getElementById("namaPelapor").value;
    const lokasi = document.getElementById("lokasi").value.trim();
    const kategori = document.getElementById("kategori").value;
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const successMsg = document.getElementById("successMsg");

    // Panggil fungsi simpan laporan dari config/database.js
    tambahLaporanBaru(pelapor, lokasi, kategori, deskripsi);

    // Tampilkan notifikasi sukses
    successMsg.style.display = "block";

    // Reset isi form
    document.getElementById("lokasi").value = "";
    document.getElementById("kategori").value = "";
    document.getElementById("deskripsi").value = "";

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        successMsg.style.display = "none";
    }, 3000);
});