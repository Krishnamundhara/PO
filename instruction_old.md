# Purchase Order & Quality Management System — Complete Development Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Product Vision](#product-vision)
3. [Tech Stack](#tech-stack)
4. [Features Specification](#features-specification)
5. [Database Schema](#database-schema)
6. [File Structure](#file-structure)
7. [Development Guidelines](#development-guidelines)
8. [PDF Generation Specs](#pdf-generation-specs)
9. [Deployment Instructions](#deployment-instructions)
10. [Instructions for Claude](#instructions-for-claude)

---

## 🎯 Project Overview

This is a **production-ready, mobile-first web application** for creating, managing, and sharing:
- **Purchase Orders (POs)** - Complete order management system
- **Quality Records** - Quality management and tracking system

Built with React, TailwindCSS, and Supabase, featuring full offline support, automatic synchronization, PDF generation, and mobile sharing capabilities.

**Target Users:** Small businesses, traders, manufacturers, and entrepreneurs who need professional order and quality management on mobile devices.

**Status:** PRODUCTION READY ✅

---

## 🎯 Product Vision

A lightweight, mobile-optimized web application to:

✨ **Purchase Order Features:**
* Create purchase orders quickly with auto-generated PO numbers
* Share/export PO as professional PDF
* Download PO as PDF with company branding
* Manage mills, products, and customers database
* Track order history with search and filtering
* Work smoothly on mobile and desktop (mobile-first)

✨ **Quality Management Features:**
* Create quality records with auto-generated SR numbers
* Track quality parameters (width, quality, reed, peek, weight, rate)
* Generate and share quality PDFs
* Search and manage quality records
* Edit and update quality parameters

🔄 **Cross-Cutting Features:**
* Works offline with automatic sync when online
* Auto-save drafts to prevent data loss
* Secure user authentication
* Multi-user support with data isolation
* Company settings with logo and bank details

**Primary users:** Students, small businesses, traders, and manufacturers.

---

## 🎨 Design & UX Principles (Mobile‑First)

### Visual Design
* **Mobile‑first layout** → Progressive enhancement for desktop
* **Minimal UI** with large tap targets (min 44x44px)
* **Clear spacing** and visual hierarchy
* **System fonts** for fast loading
* **Lucide React icons** for consistency
* **Clean color palette** with good contrast
* **Bottom navigation** on mobile for easy thumb access

### User Experience
* **Auto-save drafts** every 1 second
* **Preview before save** for all records
* **Instant search** with debouncing
* **Optimistic UI updates** for fast feedback
* **Loading states** for all async operations
* **Toast notifications** for user feedback
* **Offline indicator** in header
* **Empty states** with helpful actions

### Core Layout Sections

1. **Dashboard** - Statistics, quick actions, recent orders
2. **Create Purchase Order** - Step-based form with preview
3. **Create Quality Record** - Quality parameter entry with preview
4. **Mills Management** - CRUD operations for mills
5. **Products Management** - Product catalog management
6. **Customers Management** - Customer database
7. **Order History** - Search, filter, view, edit, share POs
8. **Quality Records** - Search, filter, view, edit, share quality records
9. **Settings** - Company details, bank info, logo upload

---

## 🛠️ Tech Stack

### Frontend Framework
* **React 18.2.0** - UI library with modern hooks
* **Vite 5.0.8** - Lightning-fast build tool and dev server
* **React Router DOM 6.20.0** - Client-side routing with protected routes

### UI & Styling  
* **TailwindCSS 3.4.0** - Utility-first CSS framework (mobile-first)
* **Lucide React 0.303.0** - Beautiful, consistent icon library
* **PostCSS 8.4.32** - CSS processing
* **Autoprefixer 10.4.16** - Automatic vendor prefixes

### Form Management & Validation
* **React Hook Form 7.49.2** - Performant form library
* **Zod 3.22.4** - TypeScript-first schema validation
* **@hookform/resolvers 3.3.3** - Form validation integration

### Backend & Database
* **Supabase 2.39.0** - Backend-as-a-Service
  - PostgreSQL database
  - User authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Auto-generated REST API

### Offline & PWA
* **Vite PWA Plugin 0.17.4** - Progressive Web App support
* **localforage 1.10.0** - Offline storage (IndexedDB/WebSQL/localStorage)
* Custom offline queue with automatic sync

### PDF Generation & Export
* **jsPDF 2.5.1** - Client-side PDF generation
* **html2canvas 1.4.1** - HTML to canvas conversion for PDF
* Native Web Share API for mobile sharing

### Utilities & Helpers
* **date-fns 3.0.6** - Modern date utility library
* **react-hot-toast 2.6.0** - Toast notifications

### Development Tools
* **ESLint 8.55.0** - Code linting
* **eslint-plugin-react 7.33.2** - React-specific linting

### Deployment Stack
* **Frontend Hosting:** Vercel / Netlify (recommended)
* **Database:** Supabase PostgreSQL
* **Authentication:** Supabase Auth
* **File Storage:** Supabase Storage (for company logos)
* **CDN:** Automatic via Vercel/Netlify 

---

## 🧩 Core Features (MVP)

### 1️⃣ Create Purchase Order

Fields:

* PO Number (auto‑generated) (starts from custom number)
* Date
* Party Name
* Broker
* Mill
* Weight (Kg/Meters) suffix
* Quantity (Bags/taka) suffix
* Product
* Rate
* Terms & Conditions

Actions:

* Preview
* Edit
* Generate PDF & Download
* Share 

### 2️⃣ Mills

* Add Mills
* Edit Mills
* Select Mills while creating PO

### 3️⃣ Items / Product Catalog

* Add common items
* Autofill during PO creation

### 4️⃣ Order History

* View past POs
* Search / Filter
* Re‑generate PDF

---

## 🗄️ Database Schema (MVP)

### users

* id
* Username
* Password

### Mills

* id
* name
* contact
* email
* address (optional)
* gstin (optional)
* mill detail (optional)
* Products (one or multiple)

### Product

* id
* name
* description (optional)

### purchase_orders

* id
* PO Number  (starts from custom number) (unique) (

  1. Check your history of existing PO numbers.
  2. Identify the highest or last used PO number.
  3. Add one to that number.
  4. Assign this new number as the current PO number.
     )
* Date
* Party Name
* Broker
* Mill
* Weight (Kg/Meters) suffix
* Quantity (Bags/taka) suffix
* Product
* Rate
* Terms & Conditions

### Company Details

logo 

name

address

Bank name

Account number

ifsc code

branch

---

## 🔌 API (If Backend Exists)

**POST /api/po** — create purchase order

**GET /api/po/********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************:id** — fetch PO

**GET /api/po** — list orders (filters supported)

**POST /api/vendor** — create vendor

**GET /api/vendor** — list vendors

**POST /api/item** — create / update item

Validation rules & auth required for user‑scoped data.

---

##

---

## 🧾 PDF Layout Spec

Header:

**श्री गणेशाय नमः (Top middle centered)**

* Company name
* Company address
* PO Number + Date

Table:

* Party Name:
* Broker:
* Mill:
* Product:
* Rate:
* Weight:
* Quantity:
* Terms & Conditions

Footer:

* Thanks For Your Order
* Bank Det**ails**

Design must remain:

* Clean
* Printable on A4 
* Legible on phone

---

## 🧱 UI Pages Breakdown

### Dashboard

* Quick actions
* Recent Orders

### Create PO

* Step‑based form (mobile friendly)

## **Customer**

* List + Add + Edit

### Mills 

* List + Add + Edit 

###  Product Catalog

* Quick add
* Autocomplete during PO entry

### Order Order History

* Search by Mills / Customers / Product / date / PO number

---

## ⚙️ Non‑Functional Requirements

* Mobile responsive first
* Fast load < 2.5s
* Works offline with local draft storage; when internet reconnects, data is automatically synced and pushed to the database (offline‑first PWA)
* Data privacy & user‑scoped access

---

## 🗂️ Project Folder Structure (React)

```
frontend/
  src/
    components/
    pages/
    modules/
      po/
      mills/
      products/
      customers/
    hooks/
    lib/
    services/
    styles/

backend/
  src/
    api/
      po/
      mills/
      products/
      customers/
    db/
    models/
    controllers/
    routes/
    services/
    utils/
  tests/
```

---

## 🚀 Production‑Ready Development Roadmap (2–3 Weeks)

**Note: The app is being developed as a fully production‑ready system, with security, scalability, offline‑sync, performance, logging, and deployment standards applied across all features.**

---

## ✅ Acceptance Criteria

* App works smoothly on mobile
* User can create + save + export/share PO
* Mills & Product reusable
* PDF readable and clean
* Data persists per user

---

## 📦 Final Deliverables

* Production‑ready web app
* Source code repository
* README with setup instructions

---

## 📝 Instructions for Claude During Development

* Follow mobile‑first approach
* Keep UI minimal & functional
* Ask clarifying questions only when essential
* Use reusable components
* Keep code modular and scalable

If anything is ambiguous, assume:

* Simplicity
* Performance
* Mobile usability first

---

End of specification.
