# Lotere Bitcoin

## Pendahuluan

**Lotere Bitcoin** adalah sistem lotere terdesentralisasi yang beroperasi sepenuhnya di blockchain Bitcoin. Ini tidak terkait dengan organisasi manapun, dan hanya bergantung pada blockchain untuk eksistensinya. Metodologi untuk menghasilkan angka transparan dan tersedia di repositori GitHub ini. Dengan menggunakan hash transaksi dan hash blok, angka dihasilkan dan akan selalu sama ketika input yang sama diberikan.

Kode yang digunakan untuk menghasilkan nomor lotere dapat ditemukan di repositori, dan Anda dapat memverifikasinya kapan saja. Proses ini sepenuhnya dapat diaudit dan transparan untuk semua peserta.

## Aturan Lotere

### 1. **Jadwal dan Mulai**
- **Tanggal Mulai**: Lotere pertama akan dimulai pada **01/01/2026 pukul 00:00 UTC**.
- **Frekuensi**: Setiap undian lotere akan berlangsung selama **1.008 blok** (sekitar 1 minggu).
- **Blok Pertama**: Undian pertama akan didasarkan pada penambangan blok Bitcoin **930210**.

### 2. **Partisipasi dan Biaya**
- **Biaya per Urutan**: 5.000 satoshi (0.00005 BTC) per urutan.
- **Maksimal Urutan per Transaksi**: Anda dapat memasukkan hingga **10 urutan per transaksi**. Jumlah lebih dari ini tidak akan dihitung.
- **Deposit Minimal**: Jika Anda menyetor kurang dari 5.000 satoshi, deposit Anda akan dianggap sebagai donasi dan tidak ada urutan yang akan dibuat untuk Anda.
- **Penanganan Deposit Ekstra**: Hanya kelipatan dari 5.000 satoshi yang akan diterima, dengan nilai maksimum 50.000 satoshi. Misalnya, jika Anda menyetor 9.999 satoshi, hanya **1 urutan** yang akan sah dan 4.999 satoshi tambahan akan dianggap sebagai donasi.
- **Biaya Transaksi**: Pastikan untuk memeriksa biaya transaksi yang dikenakan oleh dompet Anda. Bergantung pada dompet Anda, biaya bisa dipotong dari deposit Anda, yang dapat memengaruhi entri Anda. Pastikan deposit Anda setidaknya 5.000 satoshi setelah biaya transaksi.

### 3. **Pembuatan Angka**
Angka lotere dibuat menggunakan **ID Transaksi (TXID)** dari transaksi Anda dan **Hash dari blok terakhir** periode lotere. Setiap karakter dalam TXID dan hash blok dipetakan ke sebuah angka, yang menghasilkan serangkaian angka antara **1 dan 50**.

Anda dapat memeriksa kode algoritma pembuatan angka di sini:  
["../service/number_generation.js"]

### 4. **Distribusi Hadiah (90% dari Pendapatan)**
- **60%**: Didistribusikan kepada pengguna yang mencocokkan **5 angka** dalam urutannya.
- **20%**: Didistribusikan kepada pengguna yang mencocokkan **4 angka** dalam urutannya.
- **10%**: Ditransfer ke undian berikutnya.
- **10%**: Diperuntukkan untuk **Hadiah Super** pada undian terakhir tahun ini.

Jika tidak ada peserta yang mencocokkan 5 angka, hadiahnya akan diteruskan ke undian berikutnya. Aturan yang sama berlaku untuk hadiah 4 angka.

### 5. **Transparansi dan Audit**
- Kode sumber untuk sistem lotere tersedia secara publik di **GitHub**, memungkinkan siapa saja untuk mengunduh dan menjalankannya sendiri.
- Ada juga halaman **GitHub Pages** tempat Anda dapat:
  - Memeriksa status lotere saat ini.
  - Memverifikasi urutan angka Anda menggunakan **ID Transaksi**.
  - Melihat hasil lotere sebelumnya dan hadiah-hadiah yang diberikan.

Anda dapat menemukan halaman-halaman ini di sini:  
https://lotto-btc.com

### 6. **Struktur Repositori**
Repositori berisi folder-folder berikut:
- **/reports**: Berisi laporan untuk setiap undian lotere, termasuk pemenang dan distribusi hadiah.
- **/prizes**: Berisi catatan pembayaran hadiah, termasuk detail transaksi.

### 7. **Lisensi**
Proyek ini dilisensikan di bawah [Lisensi MIT](https://opensource.org/licenses/MIT), kecuali dinyatakan lain.

