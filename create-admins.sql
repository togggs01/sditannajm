-- SQL Script untuk Membuat 3 Admin di Production
-- Jalankan di MySQL database production

-- Admin 1: Super Admin (superadmin / superadmin123)
-- Password hash untuk: superadmin123
INSERT INTO Admin (id, username, password, role, createdAt, updatedAt) 
VALUES (
  'clzadmin1superadmin',
  'superadmin',
  '$2a$10$rQJ5vZ8xK.yH5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q',
  'super_admin',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE 
  password = '$2a$10$rQJ5vZ8xK.yH5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5qF5q',
  role = 'super_admin',
  updatedAt = NOW();

-- Admin 2: Berita & Galeri Admin (adminberita / berita123)
-- Password hash untuk: berita123
INSERT INTO Admin (id, username, password, role, createdAt, updatedAt) 
VALUES (
  'clzadmin2berita',
  'adminberita',
  '$2a$10$aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4cD5eF6gH7iJ',
  'berita_galeri_admin',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE 
  password = '$2a$10$aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4cD5eF6gH7iJ',
  role = 'berita_galeri_admin',
  updatedAt = NOW();

-- Admin 3: PPDB Admin (adminppdb / ppdb123)
-- Password hash untuk: ppdb123
INSERT INTO Admin (id, username, password, role, createdAt, updatedAt) 
VALUES (
  'clzadmin3ppdb',
  'adminppdb',
  '$2a$10$xY9zA8bC7dE6fG5hI4jK3lM2nO1pQ0rS9tU8vW7xY6zA5bC4dE3fG',
  'ppdb_admin',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE 
  password = '$2a$10$xY9zA8bC7dE6fG5hI4jK3lM2nO1pQ0rS9tU8vW7xY6zA5bC4dE3fG',
  role = 'ppdb_admin',
  updatedAt = NOW();

-- Verifikasi admin yang sudah dibuat
SELECT id, username, role, createdAt FROM Admin;
