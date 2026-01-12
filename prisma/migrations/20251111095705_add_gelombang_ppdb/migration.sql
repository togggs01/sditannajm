/*
  Warnings:

  - Added the required column `gelombang` to the `PPDB` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "GelombangPPDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tahunAjaran" TEXT NOT NULL,
    "gelombang" TEXT NOT NULL,
    "tanggalMulai" TEXT NOT NULL,
    "tanggalSelesai" TEXT NOT NULL,
    "kuota" INTEGER,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "gelombang" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PPDB" ("agama", "alamat", "anakKe", "asalSekolah", "createdAt", "email", "fotoAktaLahir", "fotoKK", "fotoSiswa", "id", "jenisKelamin", "jumlahSaudara", "namaAyah", "namaIbu", "namaLengkap", "namaOrangTua", "nomorIjazah", "pekerjaanAyah", "pekerjaanIbu", "status", "tahunAjaran", "tanggalLahir", "teleponOrangTua", "tempatLahir", "updatedAt", "gelombang") SELECT "agama", "alamat", "anakKe", "asalSekolah", "createdAt", "email", "fotoAktaLahir", "fotoKK", "fotoSiswa", "id", "jenisKelamin", "jumlahSaudara", "namaAyah", "namaIbu", "namaLengkap", "namaOrangTua", "nomorIjazah", "pekerjaanAyah", "pekerjaanIbu", "status", "tahunAjaran", "tanggalLahir", "teleponOrangTua", "tempatLahir", "updatedAt", "Gelombang 1" FROM "PPDB";
DROP TABLE "PPDB";
ALTER TABLE "new_PPDB" RENAME TO "PPDB";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
