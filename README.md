# Diary App: Ruang Cerita

Aplikasi diary sederhana dengan suasana hangat untuk mencatat momen, mencari cerita, dan menyimpan favorit. Dibuat menggunakan Expo dan React Native.

## Cara menjalankan

1. Pastikan Node.js dan Expo Go tersedia. Untuk emulator Android, siapkan Android Studio serta Android Virtual Device.
2. Buka terminal di folder `diary-app`, lalu pasang dependensi:

   ```bash
   npm install
   ```

3. Jalankan server pengembangan:

   ```bash
   npm start
   ```

4. Buka aplikasi dengan salah satu cara berikut:
   - **Expo Go:** pindai QR yang muncul di terminal dengan Expo Go pada ponsel.
   - **Android emulator:** jalankan emulator terlebih dahulu, lalu tekan `a` di terminal Expo atau gunakan `npm run android`.
   - **iOS Simulator:** gunakan `npm run ios` pada macOS dengan Xcode.

Perubahan dan entri baru disimpan dalam state selama aplikasi berjalan. Memuat ulang atau menutup aplikasi akan mengembalikan entri contoh serta menghapus status suka sementara.

## Fitur

- **Home:** menampilkan entri diary, avatar, dan ringkasan dengan gaya visual yang konsisten.
- **Mood filter:** pilih Bahagia, Tenang, Bersyukur, Lelah, atau Semangat untuk menyaring cerita di Home.
- **Pencarian:** cari berdasarkan judul, isi, atau mood. Tombol **Reset Filter** mengosongkan pencarian dan pilihan mood.
- **Tambah cerita:** form terkontrol untuk judul, isi, dan mood; cerita baru langsung masuk ke daftar tanpa memuat ulang aplikasi.
- **Detail cerita:** ketuk kartu untuk membuka modal detail beserta kontrol suka.
- **Like dan Favorites:** status suka dapat diubah dari kartu maupun modal detail. Home, detail, dan tab Favorites memakai state suka yang sama sehingga selalu sinkron.
- **Kartu adaptif:** warna dan aksen kartu mengikuti mood. Ilustrasi suasana dan avatar menggunakan gambar lokal di `assets/moods/` dan `assets/people/`.
- **Aksesibilitas:** kontrol interaktif memiliki label aksesibilitas dan target sentuh yang cukup besar; warna teks dipilih agar mudah dibaca.

## Daftar responsif

`DiaryListScreen` membaca lebar area aplikasi melalui `useWindowDimensions`. Lebar di bawah **600** menghasilkan satu kolom; lebar **600 atau lebih** menghasilkan dua kolom. Nilai lebar React Native adalah ukuran layout (dp/pt), bukan jumlah piksel fisik layar. `FlatList` diberi kunci berbeda saat jumlah kolom berubah agar tata letak diperbarui dengan benar.

## Hooks yang digunakan

| Hook | Input | Output | Dependency | Alasan |
|---|---|---|---|---|
| `useState` | Nilai awal, misalnya daftar entri, query, mood, tab aktif, pilihan detail, dan `likedIds` | Nilai state dan fungsi setter | Tidak memakai dependency array | Menjaga interaksi dan perubahan UI tetap sinkron tanpa reload. `SearchBar` dan `EntryForm` juga memakai state lokal untuk nilai input terkontrol. |
| `useWindowDimensions` | Tidak menerima argumen | Ukuran area aplikasi, termasuk `width` | Tidak memakai dependency array; hook memperbarui nilai saat ukuran jendela berubah | Menentukan breakpoint satu atau dua kolom dan merespons perubahan ukuran layar. |
| `useMemo` pada `useDiarySearch` | `entries`, `query`, dan mood aktif | Daftar hasil pencarian yang cocok dengan query **dan** mood | `[entries, query, mood]` | Menggabungkan kedua filter dan menghindari pemfilteran ulang pada render yang tidak terkait. |
| `useMemo` pada `useLikedEntries` | `entries` dan `likedIds` | Daftar entri yang disukai | `[entries, likedIds]` | Menghitung data Favorites hanya saat daftar atau status suka berubah. |
| `useDiarySearch` | Daftar sumber, query, dan mood | Daftar cerita yang sudah difilter | Memo internal bergantung pada `[entries, query, mood]` | Memusatkan logika pencarian dan filter mood agar Home dan Favorites konsisten. |
| `useLikedEntries` | Semua entri dan kumpulan ID yang disukai | Entri favorit yang cocok dengan ID suka | Memo internal bergantung pada `[entries, likedIds]` | Menyediakan data Favorites dari state suka yang sama dengan kartu dan modal detail. |

## Screenshot

- [Tampilan satu kolom sebelum perubahan state](./screenshots/diary-before-mobile.png)
- [Tampilan satu kolom setelah menambah cerita dan memberi like](./screenshots/diary-after-mobile.png)
- [Tampilan dua kolom pada lebar minimal 600](./screenshots/diary-grid.png)
