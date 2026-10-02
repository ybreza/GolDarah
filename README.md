# Golongan Darah

![Logo](https://user-images.githubusercontent.com/35470865/40240381-a517c83a-5ae2-11e8-84f5-e45ce09f56bf.png)

Aplikasi penentuan golongan darah dari sisi sifat dan karakter, memakai 67 pertanyaan yang disusun dari dua sumber ilmiah pada folder `pdf`. Seluruh perhitungan berjalan di sisi klien dengan HTML, CSS, dan JavaScript murni.

## Fitur

- 67 pertanyaan: 40 pertanyaan karakter dan 27 pertanyaan gaya hidup
- Skala jawaban 1 sampai 5 pada tiap pertanyaan, memakai input radio asli
- Bilah progres lengket yang menunjukkan jumlah jawaban terjawab
- Hasil berupa golongan terdekat, perbandingan skor, ciri terindikasi, dan profil gaya hidup
- Navigasi keyboard, label ARIA, target sentuh minimal 40 piksel, dan kontras warna yang lolos audit
- Ikon dari Font Awesome dan foto latar dari CDN, tanpa aset gambar lokal

## Menjalankan

Aplikasi ini statis, tidak memerlukan server, PHP, atau `npm install`.

```
Buka index.html langsung di browser
```

Alternatif memakai server lokal:

```bash
npx serve .
```

## Struktur Proyek

```
.
├── index.html      Struktur halaman
├── css
│   └── style.css   Gaya kustom, responsif
├── js
│   ├── data.js     Bobot ciri, pertanyaan, dan data hasil
│   └── app.js      Render kuis, mesin skor, dan interaksi
├── pdf
│   ├── DATA (1).pdf    Jurnal ANALISIS Indonesia
│   ├── DATA (1).xlsx   Data 148 responden
│   └── DATA (2).pdf    Jurnal Kanazawa
├── Contributing.md
├── LICENSE.md
└── README.md
```

## Metode

### Skala jawaban

Setiap pernyataan dinilai dari 1 (sangat tidak sesuai) sampai 5 (sangat sesuai). Nilai dikurangi 3 sehingga angka 3 menjadi titik netral dan tidak menambah maupun mengurangi skor.

### Bobot ciri

Tiap pertanyaan terikat pada satu ciri, dan tiap ciri punya bobot untuk keempat golongan darah. Contoh:

```js
serius: { label: "Serius dan tidak ceroboh", A: 3, B: -1, AB: 1, O: -1 }
```

Skor akhir setiap golongan darah adalah jumlah dari `bobot x (jawaban - 3)` untuk seluruh pertanyaan. Golongan dengan skor tertinggi ditampilkan sebagai golongan terdekat, disertai persentase kecocokan terhadap total skor positif.

### Asal bobot

| Sumber | Pemakaian |
| --- | --- |
| Kanazawa (2020) | 15 ciri kepribadian per golongan darah dari survei besar di Jepang |
| Data 148 responden | Rata-rata skor Lima Kepribadian tiap golongan darah sebagai penyesua bobot |
| Nawata (2014) | 27 butir sikap hidup, dipakai sebagai profil gaya hidup |

Pemetaan kode golongan pada berkas Excel ke label ABO tidak tersedia di dalam data, sehingga disimpulkan dari kecocokan profil trait dengan ciri golongan yang dipublikasikan di jurnal.

### Bagian gaya hidup

27 butir dari jurnal Nawata (2014) sengaja tidak memengaruhi golongan darah. Jurnal tersebut menyimpulkan bahwa tidak ada perbedaan berarti antar golongan darah pada butir-butir itu, sehingga butir tersebut hanya ditampilkan sebagai profil tambahan.

## Menambah Pertanyaan

1. Tambahkan ciri baru atau bobot baru di `FEATURES` pada `js/data.js`.
2. Tambahkan soal di `QUESTIONS` dengan `feature` yang sesuai, atau di `PROFILE_QUESTIONS` dengan `dimension` yang sesuai.
3. Skala jawaban, baris progres, dan perhitungan otomatis menyesuaikan sendiri.

## Batasan

Golongan darah ABO memang ada, tetapi belum ada bukti ilmiah kuat bahwa golongan tersebut menentukan kepribadian. Aplikasi ini karena itu sebaiknya dibaca sebagai hiburan dan gambaran diri, bukan hasil pemeriksaan laboratorium.

## Versi

Versi 3.0, ditulis ulang sepenuhnya dengan HTML, CSS, dan JavaScript vanilla.

## Kontributing

Silakan baca [Contributing.md](Contributing.md) untuk detail conduct dan alur pull request.

## License

Proyek ini dilisensikan di bawah MIT License. Lihat berkas [LICENSE.md](LICENSE.md) untuk detail.