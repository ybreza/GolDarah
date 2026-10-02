const SCALE = [
  { value: 1, label: "Sangat tidak sesuai", short: "Sangat tidak" },
  { value: 2, label: "Tidak sesuai", short: "Tidak" },
  { value: 3, label: "Netral", short: "Netral" },
  { value: 4, label: "Sesuai", short: "Sesuai" },
  { value: 5, label: "Sangat sesuai", short: "Sangat sesuai" }
];

const TYPES = ["A", "B", "AB", "O"];

const FEATURES = {
  kooperatif: { label: "Kooperatif", A: 3, B: 1, AB: 0, O: 1 },
  sulitDimahami: { label: "Sulit dipahami orang lain", A: -1, B: -1, AB: 3, O: -1 },
  iramaSendiri: { label: "Berjalan dengan irama sendiri", A: -1, B: 3, AB: 1, O: 0 },
  positif: { label: "Selalu melihat sisi baik", A: -1, B: 2, AB: 0, O: 3 },
  pertimbangan: { label: "Hati-hati dan penuh pertimbangan", A: 3, B: 0, AB: 1, O: -1 },
  duaSisi: { label: "Punya dua sisi kepribadian", A: 0, B: -1, AB: 3, O: -1 },
  hatiLuas: { label: "Hati luas dan mudah memaafkan", A: 0, B: 2, AB: 0, O: 3 },
  serius: { label: "Serius dan tidak ceroboh", A: 3, B: -1, AB: 1, O: -1 },
  ceria: { label: "Ceria dan bersemangat", A: -1, B: 2, AB: 0, O: 3 },
  santai: { label: "Santai dan tidak kaku", A: -2, B: 1, AB: -1, O: 3 },
  cerdas: { label: "Cerdas dan cepat memahami", A: 1, B: 0, AB: 3, O: -1 },
  gugup: { label: "Mudah cemas dan gugup", A: 3, B: 0, AB: 1, O: -2 },
  ekspresif: { label: "Mudah menyampaikan perasaan", A: 0, B: 1, AB: -1, O: 2 },
  ramah: { label: "Ramah kepada semua orang", A: 0, B: 2, AB: -2, O: 1 },
  manusiawi: { label: "Memperhatikan perasaan orang lain", A: 0, B: 2, AB: -2, O: 1 },
  terbuka: { label: "Terbuka kepada orang terdekat", A: -1, B: 1, AB: -1, O: 3 },
  optimis: { label: "Optimis dan penuh harapan", A: -1, B: 3, AB: 0, O: 1 },
  swakelola: { label: "Mandiri dan bebas memutuskan", A: -1, B: 3, AB: 1, O: 0 },
  teliti: { label: "Teliti dan telaten", A: 2, B: -2, AB: 1, O: -1 },
  stabil: { label: "Suara hati yang stabil", A: -1, B: 2, AB: -1, O: -1 }
};

const QUESTIONS = [
  { id: "k01", text: "Saya senang membantu orang lain.", feature: "kooperatif" },
  { id: "k02", text: "Saya mudah bekerja sama dalam kelompok.", feature: "kooperatif" },
  { id: "k03", text: "Orang lain sering kesulitan memahami maksud saya.", feature: "sulitDimahami" },
  { id: "k04", text: "Saya sulit membaca perasaan orang lain.", feature: "sulitDimahami" },
  { id: "k05", text: "Saya menentukan sendiri cara kerja saya.", feature: "iramaSendiri" },
  { id: "k06", text: "Saya tidak nyaman mengikuti tempo orang lain.", feature: "iramaSendiri" },
  { id: "k07", text: "Saya hampir selalu melihat sisi baik dari kejadian.", feature: "positif" },
  { id: "k08", text: "Setelah masalah selesai, saya langsung mencari sisi positifnya.", feature: "positif" },
  { id: "k09", text: "Saya berpikir panjang sebelum mengambil keputusan penting.", feature: "pertimbangan" },
  { id: "k10", text: "Saya tidak lengah dalam mengerjakan sesuatu.", feature: "pertimbangan" },
  { id: "k11", text: "Saya merasa punya dua sisi yang berbeda dalam diri.", feature: "duaSisi" },
  { id: "k12", text: "Suasana hati saya berubah-ubah dalam waktu singkat.", feature: "duaSisi" },
  { id: "k13", text: "Saya mudah memaafkan orang lain.", feature: "hatiLuas" },
  { id: "k14", text: "Saya tidak menyimpan dendam terhadap siapa pun.", feature: "hatiLuas" },
  { id: "k15", text: "Saya serius menjalankan setiap pekerjaan.", feature: "serius" },
  { id: "k16", text: "Saya jarang menunda pekerjaan yang penting.", feature: "serius" },
  { id: "k17", text: "Saya mudah tertawa dan membuat suasana jadi ceria.", feature: "ceria" },
  { id: "k18", text: "Saya selalu punya semangat yang tinggi.", feature: "ceria" },
  { id: "k19", text: "Saya lebih suka santai dan tidak terlalu kaku.", feature: "santai" },
  { id: "k20", text: "Saya mudah beradaptasi dengan situasi baru.", feature: "santai" },
  { id: "k21", text: "Saya cepat memahami hal-hal yang rumit.", feature: "cerdas" },
  { id: "k22", text: "Saya sering menemukan cara baru untuk menyelesaikan masalah.", feature: "cerdas" },
  { id: "k23", text: "Saya mudah merasa cemas pada situasi baru.", feature: "gugup" },
  { id: "k24", text: "Saya sering berpikir berlebihan soal hal kecil.", feature: "gugup" },
  { id: "k25", text: "Saya mudah menunjukkan perasaan saya.", feature: "ekspresif" },
  { id: "k26", text: "Saya cepat akrab dengan orang baru.", feature: "ekspresif" },
  { id: "k27", text: "Saya menyapa orang yang baru saya temui.", feature: "ramah" },
  { id: "k28", text: "Saya menjaga hubungan baik dengan semua orang.", feature: "ramah" },
  { id: "k29", text: "Saya memperhatikan perasaan orang lain.", feature: "manusiawi" },
  { id: "k30", text: "Saya berusaha tidak menyinggung perasaan orang.", feature: "manusiawi" },
  { id: "k31", text: "Sayasharing cerita pribadi kepada orang terdekat.", feature: "terbuka" },
  { id: "k32", text: "Saya senang berbagi cerita kepada orang terdekat.", feature: "terbuka" },
  { id: "k33", text: "Saya yakin masa depan saya akan baik.", feature: "optimis" },
  { id: "k34", text: "Saya melihat masalah sebagai kesempatan baru.", feature: "optimis" },
  { id: "k35", text: "Saya lebih suka memutuskan sendiri.", feature: "swakelola" },
  { id: "k36", text: "Saya tidak suka diperintah oleh orang lain.", feature: "swakelola" },
  { id: "k37", text: "Saya memeriksa ulang hasil kerja saya.", feature: "teliti" },
  { id: "k38", text: "Saya tidak suka bekerja dengan cara asal-asalan.", feature: "teliti" },
  { id: "k39", text: "Saya tetap tenang menghadapi masalah.", feature: "stabil" },
  { id: "k40", text: "Suara hati saya jarang berubah mendadak.", feature: "stabil" }
];

const PROFILE_DIMENSIONS = {
  kenyamanan: "Kenyamanan hidup",
  perbandingan: "Perbandingan sosial",
  menunda: "Menunda kepuasan",
  keuangan: "Sikap terhadap uang",
  kesehatan: "Kesehatan dan nilai hidup",
  keluarga: "Keluarga dan kelompok",
  karier: "Sikap terhadap pekerjaan",
  masaDepan: "Pikir tentang masa depan"
};

const PROFILE_QUESTIONS = [
  { id: "h01", text: "Saya merasa puas dengan hidup saya sekarang.", dimension: "kenyamanan" },
  { id: "h02", text: "Saya merasa hidup saya sudah berjalan baik.", dimension: "kenyamanan" },
  { id: "h03", text: "Saya sering membandingkan diri dengan orang lain.", dimension: "perbandingan" },
  { id: "h04", text: "Saya merasa jarak antara hidup saya dan orang lain makin lebar.", dimension: "perbandingan" },
  { id: "h05", text: "Saya merasa standar hidup saya turun dari yang pernah saya nikmati.", dimension: "perbandingan" },

  { id: "h06", text: "Saya lebih suka menunggu manfaat di masa depan.", dimension: "menunda" },
  { id: "h07", text: "Saya jarang menikmati kesenangan sekarang juga.", dimension: "menunda" },
  { id: "h08", text: "Saya ingin hidup sesederhana mungkin.", dimension: "keuangan" },
  { id: "h09", text: "Menabung adalah tujuan utama saya dalam hidup.", dimension: "keuangan" },
  { id: "h10", text: "Saya punya rencana pengeluaran besar di masa depan.", dimension: "keuangan" },

  { id: "h11", text: "Saya ingin meninggalkan banyak harta untuk keluarga.", dimension: "keuangan" },
  { id: "h12", text: "Saya merasa sibuk dan tidak punya waktu untuk memikirkan masa depan.", dimension: "masaDepan" },
  { id: "h13", text: "Saya merasa masa depan saya tidak pasti.", dimension: "masaDepan" },
  { id: "h14", text: "Saya merasa khawatir dengan kesehatan saya.", dimension: "kesehatan" },
  { id: "h15", text: "Saya aktif menjalankan ibadah.", dimension: "kesehatan" },

  { id: "h16", text: "Saya merasa cukup aman dalam keuangan saya.", dimension: "keuangan" },
  { id: "h17", text: "Saya merasa hidup saya sudah penuh dengan beban.", dimension: "kenyamanan" },

  { id: "h18", text: "Saya khawatir dengan masa tua nanti.", dimension: "kesehatan" },

  { id: "h19", text: "Saya khawatir dengan masa depan anak saya.", dimension: "keluarga" },
  { id: "h20", text: "Saya merasa keluarga sudah menyiapkan masa depan saya.", dimension: "keluarga" },
  { id: "h21", text: "Saya merasa aman ketika bertindak seperti orang sekitar.", dimension: "keluarga" },

  { id: "h22", text: "Di tempat kerja, saya merasa harus mengikuti pendapat kelompok.", dimension: "keluarga" },
  { id: "h23", text: "Di rumah, saya merasa harus mengikuti pendapat keluarga.", dimension: "keluarga" },
  { id: "h24", text: "Bekerja bersama kelompok memberi hasil yang lebih baik.", dimension: "karier" },

  { id: "h25", text: "Kerja sama mencapai target terasa lebih memuaskan.", dimension: "karier" },
  { id: "h26", text: "Pekerjaan adalah sumber makna dalam hidup saya.", dimension: "karier" },
  { id: "h27", text: "Saya bekerja terutama untuk mendapatkan uang.", dimension: "karier" },
];

const RESULTS = {
  A: {
    color: "#2563eb",
    name: "Golongan Darah A",
    tagline: "Si teliti dan penuh pertimbangan",
    description: "Telaten, cermat, dan mudah tegang.",
    traits: [
      "Suka merencanakan sebelum bertindak",
      "Menekan perasaan sendiri sampai akhirnya meledak",
      "Perhatian pada hal-hal kecil",
      "Hasil kerja selalu rapi dan telaten",
      "Kurang cepat menyesuaikan perubahan"
    ]
  },

  B: {
    color: "#dc2626",
    name: "Golongan Darah B",
    tagline: "Si aktif dan bebas",
    description: "Aktif, kreatif, dan bebas.",
    traits: [
      "Aktif, kreatif, dan terbuka pada hal baru",
      "Tidak suka aturan yang terlalu kaku",
      "Memilih irama kerja sendiri",
      "Sabar menunggu hasil yang datang",
      "Kadang sulit menerima kritik"
    ]
  },

  AB: {
    color: "#7c3aed",
    name: "Golongan Darah AB",
    tagline: "Si brilian dan sulit dibaca",
    description: "Tenang, brilian, dan sulit ditebak.",
    traits: [
      "Pikirannya logis dan objektif",
      "Merasa punya dua sisi kepribadian",
      "Tidak suka dibatasi aturan",
      "Sulit dipahami orang lain",
      "Tidak suka ikut serta perselisihan"
    ]
  },

  O: {
    color: "#ea580c",
    name: "Golongan Darah O",
    tagline: "Si pemimpin yang berani",
    description: "Pemberani, sosial, dan energik.",
    traits: [
      "Pemberani dan mau memimpin",
      "Terbuka dan mudah bergaul dengan orang baru",
      "Suka menjadi pusat perhatian",
      "Emosinya relatif stabil",
      "Tidak menyimpan dendam"
    ]
  }
};


const SOURCES = [
  {
    label: "Kanazawa (2020)",
    detail: "Survei besar di Jepang: 15 ciri kepribadian per golongan darah."
  },
  {
    label: "Nawata (2014)",
    detail: "68 item sikap hidup dari survei Jepang dan Amerika."
  },
  {
    label: "Data responden",
    detail: "148 responden, 50 item skala 1 sampai 5, plus skor Lima Kepribadian."
  }
];

