# Purchase Order & Quality Management System — Complete Development Guide for Claude

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Product Vision](#product-vision)
3. [Design & UX Principles](#design--ux-principles)
4. [Tech Stack](#tech-stack)
5. [Features Specification](#features-specification)
6. [Database Schema](#database-schema)
7. [File Structure](#file-structure)
8. [Development Guidelines](#development-guidelines)
9. [Environment Setup](#environment-setup)
10. [Deployment Instructions](#deployment-instructions)
11. [**Instructions for Claude**](#instructions-for-claude)

---

## 🎯 Project Overview

This is a **production-ready, mobile-first web application** for creating, managing, and sharing:
- **Purchase Orders (POs)** - Complete order management system
- **Quality Records** - Quality management and tracking system

Built with React 18, TailwindCSS, and Supabase, featuring PDF generation and mobile sharing capabilities.

**Target Users:** Small businesses, traders, manufacturers, and entrepreneurs who need professional order and quality management on mobile devices.

**Status:** PRODUCTION READY ✅

**Live Features:** 
- User authentication with Supabase Auth
- Complete PO lifecycle management
- Quality records management
- Professional PDF generation and sharing
- Mills, Products, and Customers database
- Company settings with logo upload

---

## 💡 Product Vision

### Purpose
A lightweight, mobile-optimized web application to streamline business operations for small manufacturers and traders.

### Purchase Order Module
* ✅ Create purchase orders quickly with auto-generated PO numbers
* ✅ Share/export PO as professional PDF with company branding
* ✅ Download PO as PDF
* ✅ Manage mills, products, and customers database
* ✅ Track order history with powerful search and filtering
* ✅ Works seamlessly on mobile and desktop (mobile-first approach)

### Quality Management Module
* ✅ Create quality records with auto-generated SR numbers
* ✅ Track quality parameters (width, quality, reed, peek, weight, rate)
* ✅ Generate and share quality PDFs
* ✅ Search and manage quality records
* ✅ Edit and update quality parameters

### Cross-Cutting Features
* ✅ **Secure authentication**: User sign-up and login with Supabase Auth
* ✅ **Multi-user support**: Complete data isolation with Row Level Security
* ✅ **Company branding**: Custom logo and bank details in PDFs
* ✅ **Mobile optimized**: Bottom navigation, large tap targets, thumb-friendly UI

**Primary Users:** Students, small businesses, traders, textile manufacturers, and entrepreneurs.

---

## 🎨 Design & UX Principles

### Visual Design Philosophy
* **Mobile-first layout** → Progressive enhancement for desktop
* **Minimal UI** with large tap targets (minimum 44x44px for accessibility)
* **Clear spacing** and visual hierarchy using TailwindCSS utilities
* **System fonts** for fast loading and native feel
* **Lucide React icons** for consistency and clarity
* **Clean color palette** with good contrast ratios
* **Bottom navigation** on mobile for easy thumb access
* **Card-based layouts** for scannable information

### User Experience Principles
* **Preview before save** for all records (POs and Quality)
* **Instant search** with debouncing for performance
* **Optimistic UI updates** for immediate feedback
* **Loading states** for all async operations
* **Toast notifications** for user feedback (success/error)
* **Empty states** with helpful actions and clear CTAs
* **Confirmation modals** for destructive actions (delete)

### Core Application Sections

1. **Dashboard** - Statistics overview, quick actions, recent orders
2. **Create Purchase Order** - Step-based form with autocomplete and preview
3. **Create Quality Record** - Quality parameter entry with preview
4. **Mills Management** - Full CRUD operations for mill database
5. **Products Management** - Product catalog management
6. **Customers Management** - Customer database with contact info
7. **Order History** - Search, filter, view, edit, share, delete POs
8. **Quality Records** - Search, filter, view, edit, share, delete quality records
9. **Settings** - Company details, bank info, logo upload, sign out

---

## 🛠️ Tech Stack

### Frontend Framework & Build
* **React 18.2.0** - UI library with modern hooks and concurrent features
* **Vite 5.0.8** - Lightning-fast build tool and dev server (ESM-based)
* **React Router DOM 6.20.0** - Client-side routing with protected routes

### UI & Styling  
* **TailwindCSS 3.4.0** - Utility-first CSS framework (mobile-first responsive)
* **Lucide React 0.303.0** - Beautiful, consistent icon library (tree-shakeable)
* **PostCSS 8.4.32** - CSS processing pipeline
* **Autoprefixer 10.4.16** - Automatic vendor prefixes for browser compatibility

### Form Management & Validation
* **React Hook Form 7.49.2** - Performant form library with minimal re-renders
* **Zod 3.22.4** - TypeScript-first schema validation with type inference
* **@hookform/resolvers 3.3.3** - Integration layer for form validation

### Backend & Database
* **@supabase/supabase-js 2.39.0** - Backend-as-a-Service client
  - **PostgreSQL database** - Robust relational database
  - **User authentication** - Email/password auth with JWT
  - **Row Level Security (RLS)** - Database-level data isolation
  - **Real-time subscriptions** - Live data updates
  - **Auto-generated REST API** - CRUD operations out of the box
  - **File Storage** - For company logos



### PDF Generation & Export
* **jsPDF 2.5.1** - Client-side PDF generation library
* **html2canvas 1.4.1** - HTML to canvas conversion for PDF rendering
* **Native Web Share API** - Mobile sharing for PDFs

### Utilities & Helpers
* **date-fns 3.0.6** - Modern date utility library (modular and lightweight)
* **react-hot-toast 2.6.0** - Beautiful toast notifications with accessibility

### Development Tools
* **ESLint 8.55.0** - Code linting and quality checks
* **eslint-plugin-react 7.33.2** - React-specific linting rules

### Deployment Stack
* **Frontend Hosting:** Vercel / Netlify - Automatic deployments from Git
* **Database:** Supabase PostgreSQL - Managed PostgreSQL with auto-backups
* **Authentication:** Supabase Auth - Managed auth service
* **File Storage:** Supabase Storage - For company logo uploads
* **CDN:** Automatic via Vercel/Netlify edge network

---

## 📋 Features Specification

### 🔐 1. User Authentication & Authorization

#### Sign Up / Login (Login.jsx)
- Email and password authentication via Supabase Auth
- Secure session management with JWT tokens
- Password strength validation (minimum 6 characters)
- Protected routes using ProtectedRoute component
- Redirect to login if accessing protected page without authentication
- Sign out functionality clears session and redirects to login

#### Data Isolation & Security
- **Row Level Security (RLS)** ensures users only see their own data
- All database tables have `user_id` foreign key to `auth.users`
- RLS policies automatically filter queries by authenticated user
- No possibility of cross-user data leakage
- Session refresh handled automatically by Supabase client

#### Implementation
- AuthContext manages authentication state
- useAuth hook provides: `user`, `signIn`, `signUp`, `signOut`, `loading`
- ProtectedRoute wrapper checks authentication before rendering

---

### 📊 2. Dashboard (Main Landing Page)

#### Statistics Cards
Display four key metrics:
- **Total Purchase Orders** - Count of all POs (FileText icon)
- **Total Mills** - Count of mills (Factory icon)
- **Total Products** - Count of products (Package icon)
- **Total Customers** - Count of customers (Users icon)

Each card shows:
- Large number (text-3xl font)
- Descriptive label
- Relevant icon from Lucide React
- Subtle background color

#### Quick Actions Section
Grid of action buttons (2 columns on mobile, 4 on desktop):
- **Create PO** - Navigate to /create-po (primary action, highlighted)
- **Manage Mills** - Navigate to /mills
- **Manage Products** - Navigate to /products
- **Manage Customers** - Navigate to /customers
- **Create Quality Record** - Navigate to /create-quality

Each button has:
- Large tap target (min 44x44px)
- Clear icon and label
- Hover/active states for feedback

#### Recent Orders Section
- Display last 5 purchase orders in reverse chronological order
- Each order shows:
  - PO Number (bold, prominent)
  - Customer/Party Name
  - Date (formatted: DD/MM/YYYY)
  - Click to navigate to Order History
- Empty state if no orders: "No orders yet. Create your first PO!"

#### UI Features
- Loading skeleton while fetching data
- Error handling with retry option
- Responsive grid layouts
- Smooth transitions and animations

---

### 📝 3. Create Purchase Order (CreatePO.jsx)

#### Form Fields (All Required Unless Noted)

| Field | Type | Description | Validation | Auto-Complete |
|-------|------|-------------|------------|---------------|
| **PO Number** | Text (auto-generated) | Sequential number | Unique per user | No (read-only) |
| **Date** | Date | Order date | Required, default today | No |
| **Party Name** | Text | Customer name | Required, min 2 chars | Yes (from customers) |
| **Broker** | Text | Broker name | Optional | No |
| **Mill** | Text | Mill name | Required, min 2 chars | Yes (from mills) |
| **Product** | Text | Product name | Required, min 2 chars | Yes (from products) |
| **Rate** | Number | Price per unit | Required, positive number | No |
| **Weight** | Text | Weight value | Required | No |
| **Weight Unit** | Select | Kg or Meters | Required, default Kg | No |
| **Quantity** | Text | Quantity value | Required | No |
| **Quantity Unit** | Select | Bags or Taka | Required, default Bags | No |
| **Terms & Conditions** | Textarea | Payment/delivery terms | Optional | No |

#### PO Number Generation Logic
```javascript
// Implemented in CreatePO.jsx
1. Fetch all PO numbers for current user from database
2. Extract numeric values from PO numbers
3. Find the maximum/highest number
4. Increment by 1
5. Assign as new PO number
6. Database constraint ensures uniqueness
```

#### Auto-Complete Features
- **Party Name**: As user types, show matching customers from database
- **Mill**: Show matching mills with live search
- **Product**: Show matching products with live search
- Clicking suggestion fills the field
- User can also type custom value (not in database)



#### User Flow
1. User navigates to Create PO
2. Form loads with auto-generated PO number and today's date
3. User fills form
4. User types in autocomplete fields → Suggestions appear
5. User clicks "Preview Order" → Validation runs
6. If validation passes → Preview modal opens
7. Preview shows formatted PO with all details
8. User has three options:
   - **Edit** - Close modal, return to form
   - **Confirm & Save** - Save to database
   - **Download PDF** - Generate and download PDF
   - **Share PDF** - Open native share dialog (mobile)
9. After save → Success toast + redirect to Order History

#### Form Validation (Zod Schema)
```javascript
// From lib/validation.js
purchaseOrderSchema = z.object({
  po_number: z.string().min(1),
  date: z.string().min(1),
  party_name: z.string().min(2),
  broker: z.string().optional(),
  mill: z.string().min(2),
  product: z.string().min(2),
  rate: z.string().min(1),
  weight: z.string().min(1),
  weight_unit: z.enum(['Kg', 'Meters']),
  quantity: z.string().min(1),
  quantity_unit: z.enum(['Bags', 'Taka']),
  terms_conditions: z.string().optional()
})
```

#### Error Handling
- **Field-level validation errors**: Shown below each field in red
- **Duplicate PO number**: Caught by database unique constraint
- **Network errors**: Toast notification with retry option

---

### 🏭 4. Mills Management (Mills.jsx)

#### Features
- **List View**: Display all mills in card format (responsive grid)
- **Add Mill**: Open modal with form to create new mill
- **Edit Mill**: Open modal pre-filled with mill data for editing
- **Delete Mill**: Confirmation dialog before deletion
- **Search/Filter**: Real-time search by mill name

#### Mill Data Fields
```javascript
{
  id: UUID,           // Auto-generated
  user_id: UUID,      // Foreign key to auth.users
  name: string,       // Required
  contact: string,    // Optional (phone number)
  email: string,      // Optional (email address)
  address: string,    // Optional (full address)
  gstin: string,      // Optional (GST number)
  mill_detail: string,// Optional (additional notes)
  products: array,    // Optional (array of product names)
  created_at: timestamp,
  updated_at: timestamp
}
```

#### UI Components
- **Mill Cards**: Show name, contact, email, actions (Edit/Delete)
- **Add Mill Modal**: Form with validation, Save/Cancel buttons
- **Edit Mill Modal**: Same as Add but pre-filled
- **Delete Confirmation Modal**: "Are you sure?" with Yes/No
- **Search Bar**: Debounced search input at top
- **Empty State**: "No mills found. Add your first mill!"

#### CRUD Operations
```javascript
// Using Supabase client
- Create: supabase.from('mills').insert(millData)
- Read: supabase.from('mills').select('*')
- Update: supabase.from('mills').update(millData).eq('id', millId)
- Delete: supabase.from('mills').delete().eq('id', millId)
```

---

### 📦 5. Products Management (Products.jsx)

#### Features
- **Grid View**: Product cards in responsive grid (1 col mobile, 2-3 desktop)
- **Add Product**: Simple form (name + description)
- **Edit Product**: Update product details in modal
- **Delete Product**: Remove with confirmation dialog
- **Search**: Real-time filtering by product name

#### Product Data Fields
```javascript
{
  id: UUID,
  user_id: UUID,
  name: string,          // Required
  description: string,   // Optional
  created_at: timestamp,
  updated_at: timestamp
}
```

#### UI Features
- Product count badge in header
- Empty state with "Add First Product" CTA
- Responsive grid layout
- Search bar with debouncing
- Toast notifications for all actions

---

### 👥 6. Customers Management (Customers.jsx)

#### Features
- **List View**: Customer cards showing key info
- **Add Customer**: Form with contact details
- **Edit Customer**: Update customer information
- **Delete Customer**: Remove with confirmation
- **Search**: Find by name, contact, or email

#### Customer Data Fields
```javascript
{
  id: UUID,
  user_id: UUID,
  name: string,     // Required
  contact: string,  // Optional (phone)
  email: string,    // Optional
  address: string,  // Optional
  created_at: timestamp,
  updated_at: timestamp
}
```

#### Integration
- Used as "Party Name" autocomplete source in PO creation
- Customer count shown in dashboard statistics
- Referenced in order history for filtering

---

### 📚 7. Order History (OrderHistory.jsx)

#### Features
- **Display all POs**: Reverse chronological order (newest first)
- **Advanced Search**: Multi-field search support
  - Search by PO number
  - Search by customer/party name
  - Search by mill name
  - Search by product name
- **Real-time filtering**: Updates as user types (debounced)
- **Pagination**: Load more as needed (or infinite scroll)

#### Actions Per Order
Each order card has action buttons:
1. **View**: Open modal with full order details (read-only)
2. **Edit**: Open EditPOModal with editable form
3. **Download PDF**: Generate and download PO as PDF
4. **Share PDF**: Native mobile share dialog
5. **Delete**: Confirmation dialog → Remove from database

#### Order Card Display
```
┌─────────────────────────────┐
│ PO #123         📅 15/01/24 │
│ Party: ABC Corp             │
│ Mill: XYZ Mills             │
│ Product: Cotton Fabric      │
│ [👁️ View] [✏️ Edit]          │
│ [📥 Download] [🗑️ Delete]   │
└─────────────────────────────┘
```

#### Edit Modal Features (EditPOModal.jsx)
- All fields editable **except PO number** (read-only)
- Same validation as create form
- Pre-filled with current order data
- Save updates to database with `updated_at` timestamp
- Toast notification on success
- Closes modal and refreshes order list

#### Empty State
- Message: "No orders yet"
- CTA button: "Create Your First Order"
- Illustration or icon

---

### ✨ 8. Create Quality Record (CreateQuality.jsx)

#### Form Fields

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| **SR No** | Text (auto-generated) | Serial Number | Unique, auto-increment |
| **Width** | Text | Fabric width | Required |
| **Quality** | Text | Quality grade/type | Required |
| **Reed on Loom** | Text | Reed count | Required |
| **Peek on Loom** | Text | Peek count | Required |
| **Weight** | Text | Weight specification | Required |
| **Rate** | Number | Price/rate | Required, positive |
| **Remark** | Textarea | Additional notes | Optional |

#### SR Number Generation
- Same logic as PO number generation
- Query `quality_records` table for highest SR number
- Increment by 1
- Ensure uniqueness via database constraint

#### Features
- Preview modal before final save
- PDF generation (download & share)
- Form validation with Zod schema
- Same user flow as Create PO

#### Validation Schema
```javascript
// From lib/validation.js
qualityRecordSchema = z.object({
  sr_no: z.string().min(1),
  width: z.string().min(1),
  quality: z.string().min(1),
  reed_on_loom: z.string().min(1),
  peek_on_loom: z.string().min(1),
  weight: z.string().min(1),
  rate: z.string().min(1),
  remark: z.string().optional()
})
```

---

### 📋 9. Quality Records Management (QualityRecords.jsx)

#### Features
- **Display all quality records** in responsive grid layout
- **Search functionality**:
  - By SR number
  - By quality type/grade
  - By width
- **Real-time search** with debouncing
- **Card-based layout** for easy scanning

#### Actions Per Record
1. **View**: Modal with full quality details
2. **Edit**: EditQualityModal with editable form
3. **Download PDF**: Generate quality record PDF
4. **Share PDF**: Native share for mobile
5. **Delete**: Confirmation before removal

#### Quality Card Display
```
┌─────────────────────────────┐
│ SR #45          📅 20/01/24 │
│ Width: 44"                  │
│ Quality: Premium Grade A    │
│ Rate: ₹1250                 │
│ [👁️ View] [✏️ Edit]          │
│ [📥 Download] [🗑️ Delete]   │
└─────────────────────────────┘
```

#### Edit Modal (EditQualityModal.jsx)
- All fields editable **except SR No** (to prevent confusion)
- Validation for SR No uniqueness (excluding current record)
- Pre-filled form with current data
- Save updates with `updated_at` timestamp

---

### ⚙️ 10. Settings Page (Settings.jsx)

#### Company Details Section
Form fields:
- **Company Name** (text input, required)
- **Company Address** (textarea, required)
- **Company Logo** (image upload)
  - Preview current logo
  - Upload new image → Supabase Storage
  - Accept: .jpg, .png, .svg
  - Max size: 2MB

#### Bank Details Section
Form fields:
- **Bank Name** (text, required)
- **Account Number** (text, required)
- **IFSC Code** (text, required, validation pattern)
- **Branch Name** (text, required)

#### Data Storage
Option 1: Store in `auth.users.user_metadata`
```javascript
const { data } = await supabase.auth.updateUser({
  data: {
    company_name: 'ABC Corp',
    company_address: '123 Main St',
    // ...other fields
  }
})
```

Option 2: Separate `company_settings` table with user_id foreign key

#### Features
- Form validation before save
- Image upload with preview
- Loading state during save
- Success toast on update
- **Sign Out** button at bottom (red, destructive)

#### Used In
- PDF generation (header with company logo and details)
- PDF footer (bank details)
- Email notifications (future feature)

---

---

### 📄 11. PDF Generation System

#### Service: pdfService.js

Located in `src/services/pdfService.js`, this service handles all PDF generation logic.

#### Functions Overview

1. **`createPOPDFContent(orderData, companyDetails)`**
   - Input: Order data object, company details object
   - Output: HTML string
   - Generates formatted HTML for purchase order

2. **`createQualityPDFContent(recordData, companyDetails)`**
   - Input: Quality record object, company details object
   - Output: HTML string
   - Generates formatted HTML for quality record

3. **`generatePDF(htmlContent, filename)`**
   - Input: HTML string, filename
   - Output: PDF blob
   - Converts HTML to PDF using jsPDF and html2canvas

4. **`downloadPOPDF(orderData, companyDetails)`**
   - Downloads PO as PDF file
   - Filename: `PO_${poNumber}_${date}.pdf`

5. **`downloadQualityPDF(recordData, companyDetails)`**
   - Downloads quality record as PDF
   - Filename: `Quality_${srNo}_${date}.pdf`

6. **`sharePOPDF(orderData, companyDetails)`**
   - Uses Web Share API to share PO PDF
   - Fallback to download if share not supported

7. **`shareQualityPDF(recordData, companyDetails)`**
   - Uses Web Share API to share quality PDF
   - Fallback to download if share not supported

#### Purchase Order PDF Layout

```
┌───────────────────────────────────────────┐
│                                           │
│       श्री गणेशाय नमः (Centered)          │
│                                           │
│  [Company Logo]    ABC Corporation        │
│                   123 Main Street         │
│                   City, State 12345       │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  PO Number: #123            Date: 15/1/24 │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  Party Name:      ABC Textiles Ltd.       │
│  Broker:          John Doe                │
│  Mill:            XYZ Mills               │
│  Product:         Cotton Fabric           │
│  Rate:            ₹1500 per unit          │
│  Weight:          500 Kg                  │
│  Quantity:        100 Bags                │
│                                           │
│  Terms & Conditions:                      │
│  Payment within 30 days. Delivery FOB.    │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│       Thanks For Your Order (Centered)    │
│                                           │
│  Bank Details:                            │
│  Bank Name:       State Bank of India     │
│  Account Number:  1234567890              │
│  IFSC Code:       SBIN0001234             │
│  Branch:          Main Branch             │
│                                           │
└───────────────────────────────────────────┘
```

#### Quality Record PDF Layout

```
┌───────────────────────────────────────────┐
│                                           │
│       श्री गणेशाय नमः (Centered)          │
│                                           │
│  [Company Logo]    ABC Corporation        │
│                   Quality Record          │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  SR No: #45                Date: 20/1/24  │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  Width:           44 inches               │
│  Quality:         Premium Grade A         │
│  Reed on Loom:    72                      │
│  Peek on Loom:    68                      │
│  Weight:          350 GSM                 │
│  Rate:            ₹1250 per meter        │
│                                           │
│  Remark:                                  │
│  Excellent quality, meets all standards.  │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  Contact: [Company Contact Info]          │
│                                           │
└───────────────────────────────────────────┘
```

#### PDF Styling Requirements
- **Font**: System fonts (Helvetica, Arial) for compatibility
- **Font Size**: 
  - Header: 20-24px
  - Title/Labels: 14-16px (bold)
  - Content: 12-14px
- **Colors**: Black text, subtle gray borders
- **Spacing**: Generous padding and margins
- **Page Size**: A4 (210mm × 297mm)
- **Orientation**: Portrait
- **Printable**: Margins suitable for printing
- **Mobile-readable**: Minimum 12px font size

#### Web Share API Implementation
```javascript
if (navigator.share) {
  const file = new File([pdfBlob], filename, { type: 'application/pdf' })
  await navigator.share({
    title: 'Purchase Order',
    text: `PO #${poNumber}`,
    files: [file]
  })
} else {
  // Fallback: Download PDF
  downloadPDF(pdfBlob, filename)
}
```

---

## 🗄️ Database Schema

### Complete Supabase PostgreSQL Schema

All tables use **Row Level Security (RLS)** with policies that ensure `user_id = auth.uid()` for complete data isolation.

---

#### 1. Mills Table

```sql
CREATE TABLE mills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  address TEXT,
  gstin TEXT,
  mill_detail TEXT,
  products TEXT[],  -- Array of product names
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE mills ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own mills" ON mills
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mills" ON mills
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mills" ON mills
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mills" ON mills
  FOR DELETE USING (auth.uid() = user_id);
```

---

#### 2. Products Table

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own products" ON products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" ON products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products" ON products
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products" ON products
  FOR DELETE USING (auth.uid() = user_id);
```

---

#### 3. Customers Table

```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own customers" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customers" ON customers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customers" ON customers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own customers" ON customers
  FOR DELETE USING (auth.uid() = user_id);
```

---

#### 4. Purchase Orders Table

```sql
CREATE TABLE purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  po_number TEXT NOT NULL,
  date DATE NOT NULL,
  party_name TEXT NOT NULL,
  broker TEXT,
  mill TEXT NOT NULL,
  weight TEXT NOT NULL,
  weight_unit TEXT NOT NULL DEFAULT 'Kg',
  quantity TEXT NOT NULL,
  quantity_unit TEXT NOT NULL DEFAULT 'Bags',
  product TEXT NOT NULL,
  rate TEXT NOT NULL,
  terms_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, po_number)  -- Unique PO number per user
);

ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON purchase_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON purchase_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON purchase_orders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own orders" ON purchase_orders
  FOR DELETE USING (auth.uid() = user_id);
```

---

#### 5. Quality Records Table

```sql
CREATE TABLE quality_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sr_no TEXT NOT NULL,
  width TEXT NOT NULL,
  quality TEXT NOT NULL,
  reed_on_loom TEXT NOT NULL,
  peek_on_loom TEXT NOT NULL,
  weight TEXT NOT NULL,
  rate TEXT NOT NULL,
  remark TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, sr_no)  -- Unique SR number per user
);

ALTER TABLE quality_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quality records" ON quality_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quality records" ON quality_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quality records" ON quality_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quality records" ON quality_records
  FOR DELETE USING (auth.uid() = user_id);
```

---

#### 6. Company Settings (Optional Separate Table)

```sql
-- Alternative to storing in user_metadata
CREATE TABLE company_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  company_address TEXT NOT NULL,
  company_logo_url TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  branch_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings" ON company_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON company_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON company_settings
  FOR UPDATE USING (auth.uid() = user_id);
```

---

## 📁 File Structure

```
po-generator/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── App.jsx                    # Main app component with routes
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles + Tailwind imports
│   │
│   ├── components/                # Reusable UI components
│   │   ├── BottomNav.jsx          # Mobile bottom navigation
│   │   ├── Button.jsx             # Styled button component
│   │   ├── Card.jsx               # Card container
│   │   ├── EditPOModal.jsx        # Modal for editing POs
│   │   ├── EditQualityModal.jsx   # Modal for editing quality records
│   │   ├── EmptyState.jsx         # No data placeholder
│   │   ├── Header.jsx             # Top header
│   │   ├── Input.jsx              # Styled input field
│   │   ├── Layout.jsx             # App layout wrapper
│   │   ├── Loading.jsx            # Loading spinner
│   │   ├── Modal.jsx              # Generic modal component
│   │   ├── ProtectedRoute.jsx     # Auth guard for routes
│   │   ├── Select.jsx             # Styled select dropdown
│   │   ├── Textarea.jsx           # Styled textarea
│   │   └── ui/                    # Special UI components
│   │       ├── FlowButton.jsx     
│   │       ├── GradientButton.jsx
│   │       └── POButton.jsx
│   │
│   ├── contexts/                  # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── DataContext.jsx        # Global data fetching/caching
│   │   └── ThemeContext.jsx       # Theme management (optional)
│   │
│   ├── lib/                       # Core utilities
│   │   ├── supabase.js            # Supabase client initialization
│   │   ├── utils.js               # Helper functions
│   │   └── validation.js          # Zod schemas
│   │
│   ├── pages/                     # Route pages
│   │   ├── Login.jsx              # Login/Signup page
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── CreatePO.jsx           # Create purchase order
│   │   ├── CreateQuality.jsx      # Create quality record
│   │   ├── Mills.jsx              # Mills management
│   │   ├── Products.jsx           # Products management
│   │   ├── Customers.jsx          # Customers management
│   │   ├── OrderHistory.jsx       # View all POs
│   │   ├── QualityRecords.jsx     # View all quality records
│   │   ├── Settings.jsx           # Company settings
│   │   ├── Manager.jsx            # (Optional manager view)
│   │   └── FlowButtonDemo.jsx     # (Demo page)
│   │
│   └── services/                  # External services
│       └── pdfService.js          # PDF generation logic
│
├── .env                           # Environment variables (gitignored)
├── .env.example                   # Template for env vars
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── index.html                     # HTML entry point
│
├── README.md                      # User-facing documentation
├── ARCHITECTURE.md                # Architecture overview
├── DATABASE_SETUP.md              # Database setup guide
├── PROJECT_SUMMARY.md             # Project status summary
├── QUALITY_MODULE.md              # Quality module docs
├── DEPLOYMENT.md                  # Deployment instructions
└── instruction.md                 # THIS FILE - Developer guide
```

---

## 🔧 Development Guidelines

### Code Style & Best Practices

#### React Components
- **Functional components** with hooks (no class components)
- **Named exports** for components (except pages can use default)
- **PropTypes** or TypeScript for type checking (optional but recommended)
- **Component structure**:
  ```javascript
  import React, { useState, useEffect } from 'react'
  import { useAuth } from '../contexts/AuthContext'
  
  function ComponentName({ prop1, prop2 }) {
    // 1. Hooks
    const [state, setState] = useState(initialValue)
    const { user } = useAuth()
    
    // 2. Effects
    useEffect(() => {
      // side effects
    }, [dependencies])
    
    // 3. Event handlers
    const handleClick = () => {
      // logic
    }
    
    // 4. Render
    return (
      <div className="...">
        {/* JSX */}
      </div>
    )
  }
  
  export default ComponentName
  ```

#### State Management
- **Local state** for component-specific UI state (useState)
- **Context** for shared state (auth, data)
- **Avoid prop drilling** - use Context when passing props >2 levels deep
- **Memoization** for expensive computations (useMemo, useCallback)

#### Data Fetching
- Fetch in `useEffect` with cleanup
- Loading states for all async operations
- Error handling with try/catch
- Show toast notifications for errors
- Example:
  ```javascript
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('table').select('*')
        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  ```

#### Form Handling
- Use **React Hook Form** for all forms
- Integrate with **Zod** for validation
- Show validation errors below fields
- Example:
  ```javascript
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = async (data) => {
    // handle form submission
  }
  ```

#### Styling
- **TailwindCSS** utility classes
- Mobile-first responsive design (default mobile, use `md:` `lg:` for larger)
- Consistent spacing scale (p-4, mb-6, etc.)
- Limit custom CSS, prefer Tailwind
- Example of responsive design:
  ```jsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
  </div>
  ```

#### Error Handling
- Try/catch for all async operations
- User-friendly error messages (no technical jargon)
- Toast notifications for feedback
- Console.error for debugging (remove in production)
- Fallback UI for critical errors

#### Performance
- **Code splitting** with React.lazy() for large components
- **Memoization** with React.memo() for expensive components
- **Debounce** search inputs (300ms delay)
- **Optimize images** - compress and use appropriate formats
- **Lazy load** images below the fold

#### Security
- **Never expose** Supabase service_role key (only use anon key)
- **RLS policies** enforce all data access control
- **Validate** all user input (client and server side)
- **Sanitize** user input before displaying (prevent XSS)
- **HTTPS only** in production

---

## 🌍 Environment Setup

### Prerequisites
- **Node.js 18+** and npm
- **Supabase account** (free tier sufficient)
- **Git** for version control
- **Code editor** (VS Code recommended)

### Step 1: Clone & Install

```bash
git clone <repository-url>
cd po-generator
npm install
```

### Step 2: Supabase Setup

1. **Create Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization, name, database password, region
   - Wait for project to be ready (~2 minutes)

2. **Get credentials**
   - Go to Project Settings → API
   - Copy `Project URL` and `anon/public key`

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Database Setup

1. **Open SQL Editor** in Supabase dashboard
2. **Run schema** from `DATABASE_SETUP.md`
   - Copy all SQL commands
   - Paste into SQL Editor
   - Click "Run"
3. **Verify tables** in Table Editor
   - Should see: mills, products, customers, purchase_orders, quality_records

### Step 4: Enable Storage (for company logos)

1. Go to **Storage** in Supabase dashboard
2. Click **New Bucket**
3. Name: `company-logos`
4. Public bucket: ✅ (Yes)
5. **Add RLS policies**:
   ```sql
   -- Allow authenticated users to upload
   CREATE POLICY "Users can upload own logos"
   ON storage.objects FOR INSERT
   WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
   
   -- Allow public read access
   CREATE POLICY "Public logos are viewable"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'company-logos');
   ```

### Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 6: Test the Application

1. **Sign up** with email and password
2. **Add a mill**, product, and customer
3. **Create a PO** - should auto-generate PO #1
4. **Download PDF** - check formatting
5. **Upload logo** in Settings

---

## 🚀 Deployment Instructions

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite

3. **Add Environment Variables**
   - In Vercel project settings
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Visit your live site!

### Netlify Deployment

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Add environment variables** in Netlify UI
4. **Deploy**

### Post-Deployment

1. **Test production build**
   - Sign up, create data, test PDFs
2. **Enable HTTPS** (automatic with Vercel/Netlify)
3. **Add custom domain** (optional)
4. **Setup analytics** (optional - Google Analytics, Plausible)

---

## 📝 Instructions for Claude

### Overview
You are tasked with developing, maintaining, or extending a **production-ready Purchase Order and Quality Management System**. This application is built with React, TailwindCSS, and Supabase, designed for mobile-first usage by small businesses.

### Your Role
- **Understand** the complete system architecture
- **Implement** new features following existing patterns
- **Debug** issues by analyzing code structure
- **Optimize** performance and user experience
- **Maintain** code quality and consistency

---

### When Developing New Features

1. **Read this instruction.md completely** before starting
2. **Follow the established patterns**:
   - Use React Hook Form + Zod for forms
   - Use Supabase client for all database operations
   - Use TailwindCSS for styling (no custom CSS unless necessary)
   - Use Lucide React for icons
   - Create context for shared state, not prop drilling
3. **Mobile-first responsive design**:
   - Start with mobile layout
   - Use Tailwind responsive prefixes (`md:`, `lg:`) for larger screens
   - Test on mobile viewport (375px width minimum)
4. **Implement proper loading and error states**:
   - Show skeleton/spinner while loading
   - Toast notifications for errors
   - Graceful error handling with try/catch
5. **Follow accessibility best practices**:
   - Semantic HTML tags
   - ARIA labels where needed
   - Keyboard navigation support
   - Minimum 44x44px tap targets
6. **Test thoroughly** before marking complete:
   - Create, read, update, delete operations
   - Form validation (submit with empty fields, invalid data)
   - PDF generation
   - Mobile responsiveness

---

### When Debugging Issues

1. **Check the console** for errors first
2. **Verify environment variables** are set correctly
3. **Check Supabase connection**:
   - Is the user authenticated?
   - Are RLS policies correct?
   - Is the table structure correct?
4. **Check React DevTools**:
   - Is state updating correctly?
   - Are props being passed correctly?
5. **Check Network tab**:
   - Are API calls succeeding?
   - What's the error response?
6. **Review this documentation**:
   - Is the implementation following the spec?
   - Are all required fields included?

---

### When Adding Database Tables

1. **Always include**:
   - `id UUID DEFAULT gen_random_uuid() PRIMARY KEY`
   - `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL`
   - `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
   - `updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`

2. **Always enable RLS**:
   ```sql
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
   ```

3. **Always create four policies**:
   - SELECT: `auth.uid() = user_id`
   - INSERT: `auth.uid() = user_id`
   - UPDATE: `auth.uid() = user_id`
   - DELETE: `auth.uid() = user_id`

---

### When Creating Forms

1. **Use React Hook Form**:
   ```javascript
   const { register, handleSubmit, formState: { errors } } = useForm({
     resolver: zodResolver(yourSchema)
   })
   ```

2. **Create Zod schema** in `lib/validation.js`:
   ```javascript
   export const yourSchema = z.object({
     field: z.string().min(1, 'Field is required')
   })
   ```

3. **Show validation errors**:
   ```jsx
   {errors.field && (
     <p className="text-red-500 text-sm mt-1">{errors.field.message}</p>
   )}
   ```



---

### When Generating PDFs

1. **Get company details**:
   ```javascript
   const { data: { user } } = await supabase.auth.getUser()
   const companyDetails = user.user_metadata
   ```

2. **Use pdfService functions**:
   ```javascript
   import { downloadPOPDF } from '../services/pdfService'
   downloadPOPDF(orderData, companyDetails)
   ```

3. **Test PDF output**:
   - Check all fields are present
   - Verify formatting is clean
   - Test on mobile and desktop
   - Print preview to check A4 layout

---

### Code Quality Checklist

Before submitting any code, verify:

- [ ] Mobile-first responsive design (test at 375px width)
- [ ] Loading states for all async operations
- [ ] Error handling with user-friendly messages
- [ ] Toast notifications for user feedback
- [ ] Form validation with clear error messages
- [ ] Consistent styling with TailwindCSS
- [ ] No console errors or warnings
- [ ] Code follows existing patterns in the project
- [ ] Comments for complex logic
- [ ] No hardcoded values (use constants or environment variables)
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation
- [ ] Security: no exposure of secrets, proper RLS policies
- [ ] Performance: no unnecessary re-renders, debounced searches

---

### Common Patterns to Follow

#### Context Usage
```javascript
// In a component
import { useAuth } from '../contexts/AuthContext'
const { user, signOut } = useAuth()

import { useData } from '../contexts/DataContext'
const { mills, products, customers, refreshData } = useData()
```

#### Supabase Queries
```javascript
// Create
const { data, error } = await supabase
  .from('table_name')
  .insert({ ...data, user_id: user.id })

// Read (RLS auto-filters by user)
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// Update
const { error } = await supabase
  .from('table_name')
  .update({ field: newValue, updated_at: new Date().toISOString() })
  .eq('id', recordId)

// Delete
const { error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', recordId)
```

#### Toast Notifications
```javascript
import toast from 'react-hot-toast'

toast.success('PO created successfully!')
toast.error('Failed to save data')
toast.loading('Saving...')
```

#### Modal Pattern
```javascript
const [isOpen, setIsOpen] = useState(false)

<button onClick={() => setIsOpen(true)}>Open Modal</button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  {/* Modal content */}
</Modal>
```

---

### Questions to Ask Before Implementing

When you receive a task, consider these questions:

1. **Does this feature follow mobile-first design?**
   - How will it look on a 375px screen?
   - Are tap targets large enough (44x44px)?



3. **What's the data model?**
   - Does it need a new table or use existing?
   - What RLS policies are needed?

4. **Does it need PDF generation?**
   - What layout should the PDF have?
   - Where does company branding appear?

5. **How is this validated?**
   - What are the required fields?
   - What are the validation rules?

6. **What's the user flow?**
   - Where does the user start?
   - What happens after they submit?
   - What feedback do they receive?

7. **How does this integrate with existing features?**
   - Does it reference mills/products/customers?
   - Does it appear in the dashboard?
   - Does it need a new route?

---

### Preferred Approaches

When you have implementation choices, prefer:

1. **Simplicity over complexity**
   - Choose the straightforward approach
   - Avoid premature optimization
   - Don't add features not in the spec

2. **Consistency over novelty**
   - Follow existing patterns in the codebase
   - Use the same libraries and tools
   - Match the existing code style

3. **Mobile-first over desktop-first**
   - Design for mobile, enhance for desktop
   - Touch-friendly UI elements
   - Bottom navigation, not sidebar

4. **User feedback over silence**
   - Loading states for waits >500ms
   - Toast notifications for all actions
   - Clear error messages

5. **Type safety over dynamic**
   - Use Zod schemas for validation
   - TypeScript (if requested)
   - PropTypes (if using plain JS)

---

### When You're Unsure

If you encounter ambiguity or need clarification:

1. **Check existing implementations** - Look at similar features in the codebase
2. **Refer to this documentation** - The answer is likely here
3. **Assume simplicity** - Choose the simpler, more obvious solution
4. **Assume mobile-first** - Optimize for mobile experience
5. **Assume performance matters** - Avoid expensive operations
6. **Ask clarifying questions** - But only after checking the above

---

### Success Criteria

Your implementation is successful when:

✅ **It works on mobile** (tested at 375px width)  
✅ **It's accessible** (keyboard navigation, screen readers)  
✅ **It's fast** (< 100ms interactions, < 2s data loads)  
✅ **It's secure** (RLS enforced, no secrets exposed)  
✅ **It's consistent** (follows existing patterns)  
✅ **It's documented** (comments for complex logic)  
✅ **It's tested** (you've manually verified all flows)  

---

### Final Notes

This application is **production-ready** and actively used. Treat it as such:

- **Don't break existing features** when adding new ones
- **Test thoroughly** before marking tasks complete
- **Maintain code quality** at a high standard
- **Follow security best practices** always
- **Think mobile-first** in every decision
- **Document your changes** in code comments

Remember: You're building for small business owners who rely on this app daily. Stability, usability, and reliability are paramount.

---

**Happy Coding! 🚀**

If you have questions about any part of this system, refer back to this document - it contains complete specifications for development.
