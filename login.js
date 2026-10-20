// login.js

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Memanggil fungsi dari config/database.js
    const statusLogin = cekLogin(usernameInput, passwordInput);

    if (statusLogin) {
        // Jika Berhasil, pindah ke halaman utama (index.html)
        window.location.href = "index.html";
    } else {
        // Jika Gagal, tampilkan pesan error
        errorMsg.style.display = "block";
    }
});