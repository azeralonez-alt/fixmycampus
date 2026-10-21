document.addEventListener("DOMContentLoaded", function () {
    // Sample data pengaduan
    const dataPengaduan = [
        {
            id: 1,
            tanggal: "20/10/2026",
            pelapor: "Raditya",
            lokasi: "GKB",
            kategori: "Lainnya",
            deskripsi: "Kerusakan pada AC ruang kelas.",
            status: "Menunggu"
        },
        {
            id: 2,
            tanggal: "18/10/2026",
            pelapor: "Budi",
            lokasi: "Gedung B",
            kategori: "Fasilitas",
            deskripsi: "Proyektor mati saat digunakan.",
            status: "Diproses"
        },
        {
            id: 3,
            tanggal: "15/10/2026",
            pelapor: "Siti",
            lokasi: "Lab Komputer",
            kategori: "Jaringan",
            deskripsi: "Koneksi WiFi terputus-putus.",
            status: "Selesai"
        }
    ];

    const tableBody = document.getElementById("riwayatTableBody");

    // Fungsi untuk mendapatkan kelas badge sesuai status
    function getBadgeClass(status) {
        switch (status.toLowerCase()) {
            case "menunggu":
                return "badge-pending";
            case "diproses":
                return "badge-process";
            case "selesai":
                return "badge-done";
            default:
                return "badge-pending";
        }
    }

    // Render baris tabel
    tableBody.innerHTML = dataPengaduan.map((item, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.tanggal}</td>
                <td>${item.pelapor}</td>
                <td>${item.lokasi}</td>
                <td>${item.kategori}</td>
                <td>${item.deskripsi}</td>
                <td><span class="badge ${getBadgeClass(item.status)}">${item.status}</span></td>
            </tr>
        `;
    }).join("");
});