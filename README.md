# Aplikasi Forum Diskusi

Aplikasi Forum Diskusi adalah proyek React dengan Redux yang menggunakan Dicoding Forum API sebagai sumber data. Aplikasi ini dibuat untuk memenuhi kriteria submission kelas "Membangun Aplikasi React dengan Redux" dengan fokus pada autentikasi, daftar thread, detail diskusi, komentar, votes, filter kategori, leaderboard, dan pengelolaan state yang terpusat.

## Fitur Utama

- Registrasi akun pengguna baru.
- Login dan logout menggunakan token autentikasi dari Dicoding Forum API.
- Menampilkan daftar thread terbaru.
- Menampilkan detail thread beserta informasi pemilik dan daftar komentar.
- Membuat thread baru untuk pengguna yang sudah login.
- Membuat komentar pada detail thread untuk pengguna yang sudah login.
- Menampilkan loading indicator saat aplikasi mengambil atau mengirim data.
- Menampilkan pesan kesalahan ketika operasi API gagal.

## Fitur Tambahan

- Up-vote, down-vote, dan neutral-vote pada thread.
- Up-vote, down-vote, dan neutral-vote pada komentar.
- Indikasi visual ketika pengguna sudah memberi vote.
- Optimistic UI untuk aksi vote agar respons antarmuka terasa cepat.
- Filter daftar thread berdasarkan kategori dari sisi front-end.
- Halaman leaderboard berisi nama pengguna, avatar, dan score.

## Teknologi

- React dan React DOM.
- Redux Toolkit untuk store, slice, dan async thunk.
- React Redux untuk menghubungkan komponen dengan Redux Store.
- React Router untuk navigasi halaman.
- Vite sebagai build tool.
- ESLint dengan Airbnb JavaScript Style Guide.
- CSS biasa tanpa UI library tambahan.

## Sumber Data

Aplikasi menggunakan Dicoding Forum API:

```text
https://forum-api.dicoding.dev/v1
```

Endpoint yang digunakan meliputi:

- `POST /register` untuk registrasi.
- `POST /login` untuk login.
- `GET /users/me` untuk mengambil profil pengguna yang sedang login.
- `GET /users` untuk melengkapi informasi pemilik thread.
- `GET /threads` untuk daftar thread.
- `POST /threads` untuk membuat thread.
- `GET /threads/:threadId` untuk detail thread dan komentar.
- `POST /threads/:threadId/comments` untuk membuat komentar.
- Endpoint vote thread dan komentar.
- `GET /leaderboards` untuk data leaderboard.

Token login disimpan di browser agar sesi pengguna dapat dipulihkan ketika aplikasi dibuka kembali.

## Halaman Aplikasi

| Route | Keterangan |
| --- | --- |
| `/` | Menampilkan daftar thread, filter kategori, dan tombol vote thread. |
| `/threads/:threadId` | Menampilkan detail thread, komentar, form komentar, dan vote thread/komentar. |
| `/threads/new` | Form membuat thread baru. Halaman ini hanya bisa dibuka setelah login. |
| `/leaderboards` | Menampilkan daftar leaderboard pengguna. |
| `/login` | Form login pengguna. |
| `/register` | Form registrasi pengguna baru. |

## Arsitektur Project

```text
src/
  components/      Komponen UI reusable seperti layout, form, list, vote, dan loading.
  pages/           Komponen halaman yang digunakan oleh React Router.
  services/        Modul komunikasi dengan Dicoding Forum API.
  states/          Redux Store, slice, reducer, dan async thunk.
  styles/          Styling global aplikasi.
  utils/           Helper untuk format waktu, ringkasan HTML, dan update vote.
```

State utama yang berasal dari API disimpan di Redux Store. Komponen halaman melakukan dispatch action atau async thunk, sedangkan pemanggilan REST API dipusatkan di `src/services/api.js`. State lokal hanya digunakan untuk kebutuhan form input seperti email, password, judul thread, isi thread, dan komentar.

## Redux State

- `auth`: menyimpan pengguna login, status loading autentikasi, dan error autentikasi.
- `users`: menyimpan daftar pengguna untuk melengkapi informasi pemilik thread.
- `threads`: menyimpan daftar thread, filter kategori aktif, status loading, dan error.
- `threadDetail`: menyimpan detail thread aktif beserta komentar.
- `leaderboards`: menyimpan daftar leaderboard.

## Alur Penggunaan

1. Pengguna dapat membuka halaman utama untuk melihat daftar thread tanpa login.
2. Pengguna dapat mendaftar melalui halaman register.
3. Setelah login, pengguna dapat membuat thread baru.
4. Pengguna dapat membuka detail thread untuk membaca isi thread dan komentar.
5. Pengguna yang sudah login dapat menambahkan komentar.
6. Pengguna yang sudah login dapat memberi up-vote, down-vote, atau neutral-vote pada thread dan komentar.
7. Pengguna dapat membuka leaderboard untuk melihat kontributor dengan score tertinggi.

## Menjalankan Project

Pastikan Node.js dan npm sudah tersedia, lalu jalankan:

```bash
npm install
```

Mode pengembangan:

```bash
npm run dev
```

Build produksi:

```bash
npm run build
```

Menjalankan hasil build secara lokal:

```bash
npm run preview
```

Memeriksa kualitas kode:

```bash
npm run lint
```

## Kualitas Kode

Project ini menggunakan React Strict Mode dan ESLint. Struktur kode dipisahkan berdasarkan tanggung jawab agar UI, state management, dan komunikasi API tidak bercampur dalam satu tempat.

Beberapa keputusan implementasi:

- Komponen dibuat modular agar bisa digunakan ulang.
- Pemanggilan API dilakukan melalui service terpusat.
- Async flow menggunakan Redux Toolkit `createAsyncThunk`.
- Vote diterapkan secara optimistic pada UI.
- Thread list menggabungkan data thread dan data pengguna untuk menampilkan nama pembuat.
- Filter kategori dikerjakan dari sisi front-end karena API tidak menyediakan endpoint filter.

## Persiapan Pengumpulan

Sebelum mengirim project untuk review, jalankan pemeriksaan berikut:

```bash
npm run lint
npm run build
```

Kirim folder project React dalam bentuk ZIP sesuai ketentuan Dicoding. Sertakan kode sumber, konfigurasi, dan file pendukung yang diperlukan untuk menjalankan aplikasi. Folder dependencies hasil instalasi tidak perlu disertakan karena dapat dibuat ulang dengan `npm install`.
