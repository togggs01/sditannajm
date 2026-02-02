-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Galeri" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "gambar" TEXT,
    "video" TEXT,
    "kategori" TEXT NOT NULL,
    "tipe" TEXT NOT NULL DEFAULT 'gambar',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Galeri" ("createdAt", "deskripsi", "gambar", "id", "judul", "kategori") SELECT "createdAt", "deskripsi", "gambar", "id", "judul", "kategori" FROM "Galeri";
DROP TABLE "Galeri";
ALTER TABLE "new_Galeri" RENAME TO "Galeri";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
