/*
  Warnings:

  - You are about to drop the column `alamat` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `anakKe` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `fotoAktaLahir` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `fotoKK` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `fotoSiswa` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahSaudara` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `namaAyah` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `namaIbu` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `namaOrangTua` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `nomorIjazah` on the `PPDB` table. All the data in the column will be lost.
  - You are about to drop the column `teleponOrangTua` on the `PPDB` table. All the data in the column will be lost.
  - Added the required column `agamaAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agamaIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamatRumah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahasaSehari` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jarakRumahSekolah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kewarganegaraan` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masukKelas` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaLengkapAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaLengkapIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaPanggilan` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorHandphone` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorHandphoneAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorHandphoneIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendidikanTerakhirAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendidikanTerakhirIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghasilanAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghasilanIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatTanggalLahirAyah` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatTanggalLahirIbu` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Made the column `agama` on table `PPDB` required. This step will fail if there are existing NULL values in that column.
  - Made the column `asalSekolah` on table `PPDB` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pekerjaanAyah` on table `PPDB` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pekerjaanIbu` on table `PPDB` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PPDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "namaLengkap" TEXT NOT NULL,
    "namaPanggilan" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "kewarganegaraan" TEXT NOT NULL,
    "bahasaSehari" TEXT NOT NULL,
    "bahasaLainnya" TEXT,
    "jumlahSaudaraKandung" INTEGER,
    "jumlahSaudaraTiri" INTEGER,
    "jumlahSaudaraAngkat" INTEGER,
    "tinggiBadan" INTEGER,
    "beratBadan" INTEGER,
    "golonganDarah" TEXT,
    "penyakitPernah" TEXT,
    "kelainanFisik" TEXT,
    "alamatRumah" TEXT NOT NULL,
    "nomorHandphone" TEXT NOT NULL,
    "jarakRumahSekolah" TEXT NOT NULL,
    "masukKelas" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "namaLengkapAyah" TEXT NOT NULL,
    "tempatTanggalLahirAyah" TEXT NOT NULL,
    "pendidikanTerakhirAyah" TEXT NOT NULL,
    "agamaAyah" TEXT NOT NULL,
    "nomorHandphoneAyah" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "penghasilanAyah" TEXT NOT NULL,
    "namaLengkapIbu" TEXT NOT NULL,
    "tempatTanggalLahirIbu" TEXT NOT NULL,
    "pendidikanTerakhirIbu" TEXT NOT NULL,
    "agamaIbu" TEXT NOT NULL,
    "nomorHandphoneIbu" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,
    "penghasilanIbu" TEXT NOT NULL,
    "scanAktaKelahiran" TEXT,
    "pasFoto" TEXT,
    "scanKTPAyah" TEXT,
    "scanKTPIbu" TEXT,
    "scanKartuKeluarga" TEXT,
    "tahunAjaran" TEXT NOT NULL,
    "gelombang" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Migrate existing data with default values for new required fields
INSERT INTO "new_PPDB" (
    "id", "namaLengkap", "namaPanggilan", "jenisKelamin", "tempatLahir", "tanggalLahir", 
    "agama", "kewarganegaraan", "bahasaSehari", "alamatRumah", "nomorHandphone", 
    "jarakRumahSekolah", "masukKelas", "asalSekolah", "namaLengkapAyah", 
    "tempatTanggalLahirAyah", "pendidikanTerakhirAyah", "agamaAyah", "nomorHandphoneAyah", 
    "pekerjaanAyah", "penghasilanAyah", "namaLengkapIbu", "tempatTanggalLahirIbu", 
    "pendidikanTerakhirIbu", "agamaIbu", "nomorHandphoneIbu", "pekerjaanIbu", 
    "penghasilanIbu", "scanAktaKelahiran", "pasFoto", "scanKTPAyah", "scanKTPIbu", 
    "scanKartuKeluarga", "tahunAjaran", "gelombang", "status", "createdAt", "updatedAt"
) 
SELECT 
    "id", 
    "namaLengkap", 
    COALESCE("namaLengkap", 'Tidak Diisi') as "namaPanggilan",
    "jenisKelamin", 
    "tempatLahir", 
    "tanggalLahir",
    COALESCE("agama", 'Islam') as "agama",
    'Indonesia' as "kewarganegaraan",
    '["Indonesia"]' as "bahasaSehari",
    COALESCE("alamat", 'Tidak Diisi') as "alamatRumah",
    COALESCE("teleponOrangTua", '08123456789') as "nomorHandphone",
    '1 km' as "jarakRumahSekolah",
    '1' as "masukKelas",
    COALESCE("asalSekolah", 'Tidak Diisi') as "asalSekolah",
    COALESCE("namaAyah", 'Tidak Diisi') as "namaLengkapAyah",
    'Tidak Diisi, 1 Januari 1980' as "tempatTanggalLahirAyah",
    'SMA/SMK' as "pendidikanTerakhirAyah",
    'Islam' as "agamaAyah",
    COALESCE("teleponOrangTua", '08123456789') as "nomorHandphoneAyah",
    COALESCE("pekerjaanAyah", 'Tidak Diisi') as "pekerjaanAyah",
    '0' as "penghasilanAyah",
    COALESCE("namaIbu", 'Tidak Diisi') as "namaLengkapIbu",
    'Tidak Diisi, 1 Januari 1985' as "tempatTanggalLahirIbu",
    'SMA/SMK' as "pendidikanTerakhirIbu",
    'Islam' as "agamaIbu",
    COALESCE("teleponOrangTua", '08123456789') as "nomorHandphoneIbu",
    COALESCE("pekerjaanIbu", 'Tidak Diisi') as "pekerjaanIbu",
    '0' as "penghasilanIbu",
    "fotoAktaLahir" as "scanAktaKelahiran",
    "fotoSiswa" as "pasFoto",
    NULL as "scanKTPAyah",
    NULL as "scanKTPIbu",
    "fotoKK" as "scanKartuKeluarga",
    "tahunAjaran", 
    "gelombang", 
    "status", 
    "createdAt", 
    "updatedAt" 
FROM "PPDB";

DROP TABLE "PPDB";
ALTER TABLE "new_PPDB" RENAME TO "PPDB";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
