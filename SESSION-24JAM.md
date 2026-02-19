# Session 24 Jam - Auto Logout

## Fitur yang Ditambahkan:

### 1. Session Expiry 24 Jam
- Admin login hari ini, besok otomatis logout
- Session berlaku selama 24 jam sejak login
- Setiap device bisa login sendiri (multi-session support)

### 2. Auto Logout
- Ketika session expired (24 jam), otomatis redirect ke login
- Muncul pesan: "Sesi Anda telah berakhir setelah 24 jam. Silakan login kembali."

### 3. Session Timer Warning
- Muncul notifikasi ketika sisa waktu < 1 jam
- Menampilkan countdown: "X jam Y menit lagi"
- Peringatan: "Simpan pekerjaan Anda sebelum sesi berakhir"

### 4. Multi-Device Support
- Setiap device punya session sendiri
- Bisa login di laptop, HP, tablet bersamaan
- Masing-masing device punya timer 24 jam sendiri

## File yang Diubah:

### 1. app/api/auth/login/route.ts
```typescript
// Tambah expiresAt timestamp
const now = Date.now()
const expiresAt = now + (24 * 60 * 60 * 1000) // 24 hours

const sessionData = {
  id: admin.id,
  username: admin.username,
  role: admin.role,
  loginTime: now,
  expiresAt: expiresAt  // ← NEW
}
```

### 2. app/api/auth/me/route.ts
```typescript
// Check expiry dan return remaining time
if (session.expiresAt && now > session.expiresAt) {
  return NextResponse.json({ 
    error: 'Session expired',
    expired: true,
    message: 'Sesi Anda telah berakhir'
  }, { status: 401 })
}

// Return remaining time
const remainingTime = session.expiresAt - now
return NextResponse.json({
  ...session,
  remainingTime: remainingTime,
  remainingHours: Math.floor(remainingTime / (60 * 60 * 1000))
})
```

### 3. app/admin/layout.tsx
```typescript
// Check expiry dan redirect dengan flag
if (session.expiresAt && now > session.expiresAt) {
  cookieStore.delete('session')
  redirect('/login?expired=true')  // ← expired flag
}
```

### 4. app/(public)/login/page.tsx
```typescript
// Show expired message
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('expired') === 'true') {
    setExpiredMessage('Sesi Anda telah berakhir setelah 24 jam')
  }
}, [])
```

### 5. components/SessionTimer.tsx (NEW)
- Component baru untuk show countdown timer
- Check session every minute
- Show warning jika < 1 jam
- Auto redirect kalau expired

### 6. components/AdminLayoutClient.tsx
```typescript
// Tambah SessionTimer component
import SessionTimer from '@/components/SessionTimer'

return (
  <>
    <SessionChecker />
    <SessionTimer />  // ← NEW
    ...
  </>
)
```

## Cara Kerja:

### Login Flow:
1. User login dengan username/password
2. Server create session dengan:
   - `loginTime`: Waktu login (timestamp)
   - `expiresAt`: loginTime + 24 jam
3. Cookie di-set dengan maxAge 86400 (24 jam)
4. Response include `expiresAt` untuk client

### Session Check:
1. Setiap request ke admin pages, check session
2. Compare `now` dengan `expiresAt`
3. Jika `now > expiresAt`: redirect ke login
4. Jika valid: lanjut ke page

### Timer Warning:
1. SessionTimer component check session tiap 1 menit
2. Ambil `remainingTime` dari `/api/auth/me`
3. Jika < 1 jam: show warning notification
4. Update countdown setiap menit

### Auto Logout:
1. Ketika session expired, `/api/auth/me` return 401
2. SessionTimer detect 401, redirect ke `/login?expired=true`
3. Login page show message expired
4. User harus login ulang

## Testing:

### Test 1: Login Normal
```
1. Login dengan admin/admin123
2. Masuk ke dashboard
3. Session valid selama 24 jam
```

### Test 2: Session Expired
```
1. Login
2. Tunggu 24 jam (atau ubah expiresAt untuk testing)
3. Refresh page atau navigate
4. Auto redirect ke login dengan message
```

### Test 3: Multi-Device
```
1. Login di laptop → Session A (24 jam)
2. Login di HP → Session B (24 jam)
3. Masing-masing independent
4. Logout di laptop tidak affect HP
```

### Test 4: Timer Warning
```
1. Login
2. Tunggu sampai < 1 jam remaining
3. Muncul notifikasi warning
4. Show countdown timer
```

## Deploy ke Production:

Upload file-file ini:
- app/api/auth/login/route.ts
- app/api/auth/me/route.ts
- app/admin/layout.tsx
- app/(public)/login/page.tsx
- components/SessionTimer.tsx
- components/AdminLayoutClient.tsx

Lalu jalankan di server:
```bash
chmod +x server-quick-fix.sh
./server-quick-fix.sh
```

## Notes:

- Session disimpan di cookie (httpOnly, secure)
- Setiap device punya cookie sendiri
- Cookie auto-expire setelah 24 jam
- Server-side validation di setiap request
- Client-side timer untuk UX yang lebih baik
