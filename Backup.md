# 📄 PO Generator - Backup & Recovery Guide

## 🎯 Overview

This document outlines backup and recovery strategies for the **PO Generator** application - a mobile-first Purchase Order management system built with React, Vite, and Supabase.

---

## 📊 Data Architecture

### Primary Data Storage
- **Supabase PostgreSQL** - Main database with Row Level Security (RLS)
- **LocalForage** - Offline data storage (IndexedDB)
- **Browser LocalStorage** - Session and draft data

### Data Tables to Backup
| Table | Description | Priority |
|-------|-------------|----------|
| `purchase_orders` | All purchase orders with PO numbers | 🔴 Critical |
| `mills` | Mill/supplier information | 🔴 Critical |
| `customers` | Customer records | 🔴 Critical |
| `products` | Product catalog | 🟡 High |
| `quality_records` | Quality inspection data | 🟡 High |
| `user_settings` | Company details & preferences | 🟢 Medium |

---

## 🔄 Backup Strategies

#### Automatic Backups 

- : No automatic backups
- : Daily backups, 7-day retention
- : Daily backups, 14-day retention

#### Manual Export via Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Database**
3. Click **Database Backups**
4. Download the latest backup
<!-- 
#### Manual SQL Export
```bash
# Using pg_dump (requires PostgreSQL tools)
pg_dump -h <SUPABASE_DB_HOST> -U postgres -d postgres -F c -f backup_$(date +%Y%m%d).sql

# Connection string format
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" > backup.sql
``` -->

### 2. Local Offline Data Backup

The app uses LocalForage for offline storage. Data is stored in IndexedDB:

```javascript
// Stores used by the app
- po-generator/offline_data  // Cached data for offline use
- po-generator/sync_queue    // Pending sync operations
- po-generator/drafts        // Unsaved draft POs
```

#### Export Offline Data (Browser Console)
```javascript
// Export all offline data
const offlineData = await localforage.createInstance({
  name: 'po-generator',
  storeName: 'offline_data'
}).iterate((value, key) => console.log(key, value));
```

### 3. PDF Backup Strategy

Generated PDFs are created client-side using jsPDF. To maintain PDF records:

#### Option A: Local Device Storage
- Users can download PDFs directly to their device
- File naming convention: `PO-{PO_NUMBER}.pdf`

#### Option B: Cloud Storage Integration (Future)
For cloud PDF storage, consider:
- Google Drive API integration
- Supabase Storage (if needed)
- AWS S3 or Azure Blob Storage

---

## 📱 Offline Data Sync

### Sync Queue Management
The app maintains a sync queue for offline operations:

```javascript
// Pending operations are stored in sync_queue
{
  id: timestamp,
  operation: 'create' | 'update' | 'delete',
  table: 'purchase_orders' | 'mills' | 'customers' | 'products',
  data: { ... },
  timestamp: ISO_DATE
}
```

### Recovery from Sync Queue
If sync fails, data remains in the queue until successfully synced:
1. App automatically retries when online
2. Manual sync available in Settings
3. Queue persists across browser sessions

---

## 🔐 Environment Variables Backup

Store these securely (never commit to version control):

```env
# .env file contents to backup
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backup locations:**
- Password manager (1Password, LastPass, etc.)
- Encrypted cloud storage
- Supabase Dashboard (API Settings)

---

## 🛠️ Recovery Procedures

### Scenario 1: Lost Local Data
1. Ensure internet connection
2. Login to the app
3. Data will sync from Supabase automatically

### Scenario 2: Supabase Database Recovery
1. Access Supabase Dashboard
2. Go to Database Backups
3. Restore from latest backup point

### Scenario 3: Complete App Recovery
1. Clone repository from version control
2. Run `npm install`
3. Configure `.env` with Supabase credentials
4. Run `npm run dev`
5. Login - data syncs from Supabase

### Scenario 4: Draft Recovery
Drafts are auto-saved to LocalForage:
```javascript
// Check for saved drafts
const draft = await draftStore.getItem('create_po');
if (draft) {
  // Restore draft data
  console.log('Draft found:', draft.data);
  console.log('Saved at:', draft.timestamp);
}
```

---

## 📅 Recommended Backup Schedule

| Backup Type | Frequency | Method |
|-------------|-----------|--------|
| Supabase DB | Daily (Auto on Pro) | Supabase built-in |
| Manual SQL Export | Weekly | pg_dump script |
| Environment Vars | On change | Password manager |
| Source Code | Every commit | Git repository |

---

## ⚠️ Important Notes

1. **RLS Protection**: All tables use Row Level Security - users can only access their own data
2. **Auth Tokens**: Never backup or share authentication tokens
3. **Sensitive Data**: Company bank details in settings should be treated as confidential
4. **PDF Generation**: PDFs are generated client-side and not stored on server by default

---

## 🚀 Future Enhancements

- [ ] Automated cloud backup integration
- [ ] Export all data as JSON/CSV
- [ ] Scheduled backup reminders
- [ ] Backup verification system
- [ ] Cross-device sync status indicator