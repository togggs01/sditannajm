# Database Configuration - FIXED

## ✅ Correct Configuration

### Database Details:
- **Host**: srv1154.hstgr.io
- **Port**: 3306
- **Username**: u900997367_annajm
- **Password**: Vu7tBK^|A92^
- **Database**: u900997367_annajm (BUKAN u9O0997367_annajm)

### DATABASE_URL (URL Encoded):
```
mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm
```

### Special Characters Encoding:
- `^` = `%5E`
- `|` = `%7C`

## Files Updated:
- ✅ `.env` - FIXED
- ✅ `.env.local` - FIXED  
- ✅ `.env copy` - FIXED

## Test Connection:

```bash
# Test dengan Prisma
npx prisma db push

# Test dengan MySQL client
mysql -h srv1154.hstgr.io -P 3306 -u u900997367_annajm -p u900997367_annajm
```

## For Deployment:

Copy this to server `.env`:
```env
DATABASE_URL="mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
NODE_ENV=production
```

## Common Mistakes to Avoid:
- ❌ `u9O0997367_annajm` (huruf O)
- ✅ `u900997367_annajm` (angka 0)
- ❌ Password tanpa encoding: `Vu7tBK^|A92^`
- ✅ Password dengan encoding: `Vu7tBK%5E%7CA92%5E`
