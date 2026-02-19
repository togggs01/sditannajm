# Fix: SyntaxError Unexpected token '<' JSON Error

## Masalah:
Error di admin panel: `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

## Penyebab:
- SessionTimer dan SessionChecker fetch `/api/auth/me`
- Kadang API return HTML error page instead of JSON
- Code langsung parse response tanpa check content-type
- Menyebabkan JSON.parse() error

## Solusi:

### 1. Check Content-Type Sebelum Parse JSON

Tambah validasi di SessionTimer.tsx:
```typescript
const contentType = res.headers.get('content-type')
if (!contentType || !contentType.includes('application/json')) {
  console.warn('Non-JSON response received')
  return // Skip parsing
}
```

### 2. Handle Error Gracefully

Jangan redirect user kalau cuma network error:
```typescript
catch (error) {
  console.error('Session check error:', error)
  // Don't redirect on error, just log it
}
```

### 3. Add Fetch Options

Tambah credentials dan cache control:
```typescript
const res = await fetch('/api/auth/me', {
  credentials: 'include',
  cache: 'no-store'
})
```

## File yang Diubah:

### components/SessionTimer.tsx
- ✅ Check content-type sebelum parse JSON
- ✅ Handle non-JSON response gracefully
- ✅ Add credentials: 'include'
- ✅ Add cache: 'no-store'
- ✅ Better error handling

### components/SessionChecker.tsx
- ✅ Check content-type sebelum parse JSON
- ✅ Handle non-JSON response gracefully
- ✅ Add credentials: 'include'
- ✅ Add cache: 'no-store'
- ✅ Don't redirect on network errors

## Testing:

### Test 1: Normal Flow
```
1. Login ke admin
2. Navigate ke berbagai pages
3. Tidak ada error JSON
4. Session check berjalan normal
```

### Test 2: Network Error
```
1. Login ke admin
2. Disconnect internet sebentar
3. Reconnect
4. Tidak ada error JSON
5. Session check resume normal
```

### Test 3: Session Expired
```
1. Login ke admin
2. Tunggu 24 jam (atau ubah expiresAt)
3. Navigate atau refresh
4. Redirect ke login dengan message
5. Tidak ada error JSON
```

## Deploy:

Upload file-file ini ke server:
- components/SessionTimer.tsx
- components/SessionChecker.tsx

Lalu rebuild:
```bash
chmod +x server-quick-fix.sh
./server-quick-fix.sh
```

## Prevention:

Untuk prevent error ini di future:
1. Selalu check content-type sebelum parse JSON
2. Use try-catch di semua fetch calls
3. Handle error gracefully tanpa crash UI
4. Log error untuk debugging tapi jangan expose ke user
5. Add proper error boundaries di React components

## Notes:

Error ini common terjadi karena:
- API route tidak ditemukan (404 HTML)
- Server error (500 HTML)
- Network timeout
- CORS issues
- Build/deployment issues

Dengan fix ini, app akan handle semua case dengan graceful degradation.
