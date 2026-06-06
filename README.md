# Aplikasi Forum Diskusi

Aplikasi Forum Diskusi adalah aplikasi React bertema forum komunitas yang menggunakan Redux sebagai pusat pengelolaan state dan Dicoding Forum API sebagai sumber data. Aplikasi ini menyediakan alur membaca thread, melihat detail diskusi, membuat thread, menulis komentar, melakukan vote, memfilter kategori, dan melihat leaderboard pengguna.

Project ini dibuat untuk memenuhi kriteria submission kelas **Membangun Aplikasi React dengan Redux**. Implementasinya memisahkan UI, state management, komunikasi API, utilitas, dan styling agar kode lebih mudah dirawat dan diperiksa.

## Fitur

### Fitur Wajib

- Registrasi akun pengguna baru.
- Login dan logout menggunakan token autentikasi.
- Pemulihan sesi pengguna ketika token masih tersedia di browser.
- Menampilkan daftar thread terbaru.
- Menampilkan detail thread beserta isi diskusi dan komentar.
- Membuat thread baru untuk pengguna yang sudah login.
- Membuat komentar pada detail thread untuk pengguna yang sudah login.
- Menampilkan loading indicator saat data sedang dimuat atau dikirim.
- Menampilkan pesan error ketika operasi API gagal.
- Mengamankan halaman pembuatan thread agar hanya dapat diakses oleh pengguna yang sudah login.

### Fitur Tambahan

- Up-vote, down-vote, dan neutral-vote pada thread.
- Up-vote, down-vote, dan neutral-vote pada komentar.
- Indikasi visual ketika pengguna sudah memberi vote.
- Optimistic UI untuk vote agar interaksi terasa cepat.
- Rollback optimistic vote jika request vote gagal.
- Filter daftar thread berdasarkan kategori dari sisi front-end.
- Halaman leaderboard yang menampilkan nama pengguna, avatar, dan score.
- Empty state untuk daftar thread atau komentar yang belum memiliki data.

## Teknologi

- React 18.
- Redux Toolkit.
- React Redux.
- React Router.
- Vite.
- ESLint dengan Airbnb JavaScript Style Guide.
- CSS global tanpa UI framework tambahan.

## Sumber Data

Aplikasi menggunakan Dicoding Forum API.

```text
https://forum-api.dicoding.dev/v1
```

Endpoint utama yang digunakan:

| Endpoint | Kegunaan |
| --- | --- |
| `POST /register` | Registrasi akun baru. |
| `POST /login` | Login dan mendapatkan token. |
| `GET /users/me` | Mengambil profil pengguna yang sedang login. |
| `GET /users` | Mengambil daftar pengguna untuk melengkapi informasi pemilik thread. |
| `GET /threads` | Mengambil daftar thread. |
| `POST /threads` | Membuat thread baru. |
| `GET /threads/:threadId` | Mengambil detail thread beserta komentar. |
| `POST /threads/:threadId/comments` | Membuat komentar pada thread. |
| `POST /threads/:threadId/up-vote` | Memberi up-vote pada thread. |
| `POST /threads/:threadId/down-vote` | Memberi down-vote pada thread. |
| `POST /threads/:threadId/neutral-vote` | Menghapus vote pada thread. |
| `POST /threads/:threadId/comments/:commentId/up-vote` | Memberi up-vote pada komentar. |
| `POST /threads/:threadId/comments/:commentId/down-vote` | Memberi down-vote pada komentar. |
| `POST /threads/:threadId/comments/:commentId/neutral-vote` | Menghapus vote pada komentar. |
| `GET /leaderboards` | Mengambil data leaderboard. |

Token autentikasi disimpan di browser supaya sesi pengguna dapat dipulihkan saat aplikasi dibuka kembali.

## Halaman

| Route | Akses | Deskripsi |
| --- | --- | --- |
| `/` | Publik | Menampilkan daftar thread, filter kategori, informasi pembuat, jumlah komentar, dan vote thread. |
| `/threads/:threadId` | Publik | Menampilkan detail thread, body thread, informasi pembuat, daftar komentar, form komentar, dan vote. |
| `/threads/new` | Login | Menampilkan form untuk membuat thread baru. |
| `/leaderboards` | Publik | Menampilkan daftar pengguna dengan score tertinggi. |
| `/login` | Publik | Menampilkan form login. |
| `/register` | Publik | Menampilkan form registrasi. |
| `*` | Publik | Menampilkan halaman fallback ketika route tidak ditemukan. |

## Alur Penggunaan

1. Pengguna membuka halaman utama untuk membaca daftar thread.
2. Pengguna dapat memfilter thread berdasarkan kategori yang tersedia.
3. Pengguna memilih salah satu thread untuk membaca detail dan komentar.
4. Pengguna dapat mendaftar atau login untuk ikut berpartisipasi.
5. Setelah login, pengguna dapat membuat thread baru.
6. Setelah login, pengguna dapat menulis komentar pada detail thread.
7. Setelah login, pengguna dapat memberi up-vote, down-vote, atau neutral-vote pada thread dan komentar.
8. Pengguna dapat membuka halaman leaderboard untuk melihat kontributor dengan score tertinggi.
9. Pengguna dapat logout melalui navigasi utama.

## Struktur Project

```text
src/
  components/
    forms/       Form autentikasi, form thread, dan form komentar.
    layout/      Layout utama aplikasi.
    routes/      Guard route untuk halaman yang membutuhkan login.
    thread/      Komponen daftar thread, detail thread, komentar, kategori, dan vote.
    ui/          Komponen UI kecil seperti alert dan loading indicator.
  pages/         Komponen halaman yang dipakai oleh React Router.
  services/      Modul komunikasi dengan Dicoding Forum API.
  states/        Redux store, slice, reducer, dan async thunk.
  styles/        Styling global aplikasi.
  utils/         Helper format waktu, ringkasan HTML, status vote, dan update vote.
```

## Arsitektur State

Sebagian besar state aplikasi, terutama yang berasal dari API, disimpan di Redux Store. State lokal hanya digunakan untuk controlled component seperti input form.

| Slice | Tanggung Jawab |
| --- | --- |
| `auth` | Menyimpan pengguna login, status loading autentikasi, dan error autentikasi. |
| `users` | Menyimpan daftar pengguna untuk melengkapi informasi pemilik thread. |
| `threads` | Menyimpan daftar thread, kategori aktif, status loading, error, dan optimistic vote thread. |
| `threadDetail` | Menyimpan detail thread aktif, komentar, status loading, error, vote thread detail, dan vote komentar. |
| `leaderboards` | Menyimpan data leaderboard, status loading, dan error. |

Pemanggilan REST API dipusatkan di `src/services/api.js`. Komponen tidak memanggil `fetch` secara langsung; komponen melakukan dispatch action atau async thunk dari Redux slice.

## Catatan Implementasi

- React Strict Mode aktif di entry point aplikasi.
- Routing dikelola menggunakan React Router.
- Halaman `/threads/new` dilindungi dengan `ProtectedRoute`.
- Daftar thread dapat dibaca tanpa login.
- Aksi yang mengubah data, seperti membuat thread, membuat komentar, dan vote, membutuhkan autentikasi.
- Data thread digabungkan dengan data pengguna agar daftar thread dapat menampilkan nama pembuat.
- Filter kategori dilakukan di front-end karena API tidak menyediakan endpoint filter kategori.
- Vote memakai optimistic UI dan dikembalikan ke state sebelumnya jika request gagal.
- Form komentar hanya dikosongkan setelah komentar berhasil terkirim.
- Body thread dan komentar dari API dirender sebagai HTML sesuai format data API.

## Menjalankan Project

Pastikan Node.js dan npm sudah tersedia.

Instal dependency:

```bash
npm install
```

Jalankan mode pengembangan:

```bash
npm run dev
```

Build untuk produksi:

```bash
npm run build
```

Jalankan preview hasil build:

```bash
npm run preview
```

Periksa kualitas kode:

```bash
npm run lint
```

## Review Mandiri

Sebelum dikumpulkan, pemeriksaan berikut dapat digunakan:

| Area | Status Implementasi |
| --- | --- |
| Fungsionalitas aplikasi | Register, login, daftar thread, detail thread, membuat thread, membuat komentar, dan loading indicator tersedia. |
| Bugs highlighting | ESLint tersedia, Airbnb style guide digunakan, lint dapat dijalankan melalui `npm run lint`, dan React Strict Mode aktif. |
| Arsitektur aplikasi | State API dikelola di Redux, REST API dipusatkan di service, folder UI dan state terpisah, dan komponen dibuat modular. |
| Fitur unggulan | Vote thread/komentar, leaderboard, dan filter kategori tersedia. |

Perintah verifikasi yang disarankan:

```bash
npm run lint
npm run build
```
