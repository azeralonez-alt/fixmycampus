var KEY = "aduan";

function ambilData() {
    var data = localStorage.getItem(KEY);
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function simpanData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

function aman(teks) {
    var div = document.createElement("div");
    div.textContent = teks || "";
    return div.innerHTML;
}

function tampilRingkasan(data) {
    var menunggu = 0;
    var diproses = 0;
    var selesai = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].status === "Menunggu") menunggu++;
        if (data[i].status === "Diproses") diproses++;
        if (data[i].status === "Selesai") selesai++;
    }

    document.getElementById("total").textContent = data.length;
    document.getElementById("menunggu").textContent = menunggu;
    document.getElementById("diproses").textContent = diproses;
    document.getElementById("selesai").textContent = selesai;
}

function tampilTabel() {
    var data = ambilData();
    var kataCari = document.getElementById("cari").value.toLowerCase();
    var statusPilih = document.getElementById("filterStatus").value;
    var isiTabel = document.getElementById("isiTabel");

    tampilRingkasan(data);
    isiTabel.innerHTML = "";

    var nomor = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        var a = data[i];

        var teksGabung = ((a.nama || "") + (a.lokasi || "") + (a.deskripsi || "")).toLowerCase();
        var cocokCari = teksGabung.indexOf(kataCari) !== -1;
        var cocokStatus = statusPilih === "" || a.status === statusPilih;

        if (cocokCari && cocokStatus) {
            nomor++;
            isiTabel.innerHTML +=
                "<tr>" +
                "<td>" + nomor + "</td>" +
                "<td>" + aman(a.tanggal) + "</td>" +
                "<td>" + aman(a.nama) + "</td>" +
                "<td>" + aman(a.lokasi) + "</td>" +
                "<td>" + aman(a.kategori) + "</td>" +
                "<td>" + aman(a.deskripsi) + "</td>" +
                "<td>" +
                "<select onchange='ubahStatus(" + a.id + ", this.value)'>" +
                pilihanStatus(a.status) +
                "</select>" +
                "</td>" +
                "<td><button onclick='hapusAduan(" + a.id + ")'>Hapus</button></td>" +
                "</tr>";
        }
    }

    if (nomor === 0) {
        isiTabel.innerHTML = "<tr><td colspan='8' class='kosong'>Belum ada pengaduan.</td></tr>";
    }
}

function pilihanStatus(statusSekarang) {
    var daftar = ["Menunggu", "Diproses", "Selesai"];
    var hasil = "";
    for (var i = 0; i < daftar.length; i++) {
        var terpilih = daftar[i] === statusSekarang ? " selected" : "";
        hasil += "<option value='" + daftar[i] + "'" + terpilih + ">" + daftar[i] + "</option>";
    }
    return hasil;
}

function ubahStatus(id, statusBaru) {
    var data = ambilData();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data[i].status = statusBaru;
        }
    }
    simpanData(data);
    tampilTabel();
}

function hapusAduan(id) {
    if (!confirm("Yakin mau hapus pengaduan?")) {
        return;
    }
    var data = ambilData();
    var dataBaru = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].id !== id) {
            dataBaru.push(data[i]);
        }
    }
    simpanData(dataBaru);
    tampilTabel();
}

document.getElementById("cari").addEventListener("input", tampilTabel);
document.getElementById("filterStatus").addEventListener("change", tampilTabel);

tampilTabel();