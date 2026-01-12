/*
  Warnings:

  - Added the required column `namaAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PPDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "agama" TEXT,
    "anakKe" INTEGER,
    "jumlahSaudara" INTEGER,
    "namaAyah" TEXT NOT NULL,
    "pekerjaanAyah" TEXT,
    "namaIbu" TEXT NOT NULL,
    "pekerjaanIbu" TEXT,
    "namaOrangTua" TEXT NOT NULL,
    "teleponOrangTua" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "asalSekolah" TEXT,
    "nomorIjazah" TEXT,
    "fotoSiswa" TEXT,
    "fotoKK" TEXT,
    "fotoAktaLahir" TEXT,
    "tahunAjaran" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PPDB" ("alamat", "createdAt", "email", "id", "jenisKelamin", "namaLengkap", "namaOrangTua", "status", "tahunAjaran", "tanggalLahir", "teleponOrangTua", "tempatLahir", "updatedAt", "namaAyah", "namaIbu", "agama") SELECT "alamat", "createdAt", "email", "id", "jenisKelamin", "namaLengkap", "namaOrangTua", "status", "tahunAjaran", "tanggalLahir", "teleponOrangTua", "tempatLahir", "updatedAt", "namaOrangTua", "namaOrangTua", "Islam" FROM "PPDB";
DROP TABLE "PPDB";
ALTER TABLE "new_PPDB" RENAME TO "PPDB";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
