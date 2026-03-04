# Purchase Order Generator Web App — Instruction.md

This document specifies the plan, requirements, development guidelines, and deliverables for building a **mobile‑first, responsive Purchase Order (PO) Generator Web App**.

The goal is to ensure Claude (or any developer/agent) can implement the system in a structured, production‑ready, scalable manner.

---

## 🎯 Product Vision

A lightweight, mobile‑optimized web app to:

* Create purchase orders quickly
* Share/export PO as PDF
* Download PO as PDF
* Maintain vendor, item, and order records
* Work smoothly on mobile and desktop (mostly on mobile)

Primary users:  students, and small businesses.

---

## 🎨 Design & UX Principles (Mobile‑First)

* Mobile‑first layout → Progressive enhancement for desktop
* Minimal UI, large tap targets, clear spacing
* Avoid heavy animations
* Use system fonts & lightweight icons
* Prefer bottom‑navigation on mobile

**Core Layout Sections**

1. Dashboard
2. Create Purchase Order
3. Vendors
4. Items / Products
5. Order History

---

## 📱 Responsive Framework & Tech Stack

### Frontend

* **React (Recommended)** or Next.js (App Router)
* TailwindCSS (mobile‑first utility design)
* Form library → React Hook Form
* Validation → Zod / Yup

### PDF Generation

* Client‑side: html‑to‑pdf or jspdf
* Server‑side (optional): node-pdf / puppeteer

### Backend Options

Choose one depending on project scope:

**Option A — Serverless (Recommended for MVP)**

* Firebase / Supabase Auth + Database

**Option B — Lightweight Node Backend**

* Node + Express / Fastify
* PostgreSQL / NeonDB / Supabase

### Deployment

* Frontend → Vercel / Netlify
* Backend (if separate) → Render / Railway / Supabase Edge Functions
* Database → Supabase / NeonDB/ 

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
