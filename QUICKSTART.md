# Quick Start Guide

Follow these steps to get the PO Generator app running in minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including React, TailwindCSS, Supabase, and more.

## Step 2: Set Up Supabase Database

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `po-generator` (or any name you prefer)
   - Database Password: (create a secure password)
   - Region: Choose closest to you
5. Click "Create new project"
6. Wait 1-2 minutes for setup to complete

### 2.2 Get Your Credentials

1. In your Supabase project dashboard
2. Go to Settings (gear icon) → API
3. Copy:
   - `Project URL` (starts with https://xxx.supabase.co)
   - `anon public` key (under Project API keys)

### 2.3 Configure Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and paste your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 2.4 Create Database Tables

1. In your Supabase dashboard, go to SQL Editor (database icon)
2. Click "New Query"
3. Open `DATABASE_SETUP.md` file
4. Copy all SQL commands (from "Mills Table" to "Indexes")
5. Paste into Supabase SQL Editor
6. Click "Run" or press Ctrl+Enter
7. You should see "Success. No rows returned"

Alternatively, you can run each table creation separately:
- Mills table + policies
- Products table + policies
- Customers table + policies
- Purchase Orders table + policies
- Company Details table + policies
- Triggers
- Indexes

## Step 3: Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Step 4: First Time Setup in App

1. **Sign Up**
   - Open `http://localhost:5173`
   - Click "Don't have an account? Sign Up"
   - Enter email and password
   - Click "Sign Up"

2. **Add Company Details**
   - Click Settings (gear icon in top right)
   - Fill in your company information:
     - Company Name (required)
     - Address
     - Bank details (for PDF footer)
   - Click "Save Company Details"

3. **Add Mills**
   - Go to Mills tab (bottom navigation)
   - Click "Add Mill"
   - Fill in mill information
   - Click "Add"
   - Repeat for all your mills

4. **Add Products**
   - Go to Products tab
   - Click "Add Product"
   - Enter product name and description
   - Click "Add"
   - Repeat for all your products

5. **Add Customers**
   - Go to Customers tab
   - Click "Add Customer"
   - Fill in customer details
   - Click "Add"
   - Repeat for all your customers

6. **Create Your First PO**
   - Go to Create tab
   - Fill in the form (mills, products, customers auto-suggest)
   - Click "Preview Order"
   - Review the details
   - Click "Confirm & Save"
   - Or click "Download PDF" / "Share PDF"

## Troubleshooting

### Can't connect to Supabase?

- Check your `.env` file has correct credentials
- Make sure you're using the "Project URL" not the Database URL
- Verify you're using the `anon public` key, not the `service_role` key
- Restart the dev server after changing `.env`

### Database errors?

- Make sure all SQL commands ran successfully
- Check that RLS (Row Level Security) is enabled on all tables
- Verify all policies are created

### Page not loading?

- Check browser console for errors (F12)
- Make sure `npm run dev` is running
- Try clearing browser cache and localStorage

### PDF not generating?

- Make sure you've added company details in Settings
- Check browser console for errors
- Try a different browser (Chrome/Edge recommended)

## What's Next?

- Explore all features
- Create multiple purchase orders
- Test offline functionality (disconnect internet)
- Try PDF generation and sharing
- Customize company details

## Need Help?

- Check `README.md` for full documentation
- Review `DATABASE_SETUP.md` for database details
- Check browser console for error messages
- Ensure all dependencies are installed correctly

## Production Deployment

When ready to deploy:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy to Vercel/Netlify:
   - Push code to GitHub
   - Connect repository to hosting platform
   - Add environment variables
   - Deploy!

---

**You're all set! 🎉**

Start creating purchase orders and managing your business efficiently!
