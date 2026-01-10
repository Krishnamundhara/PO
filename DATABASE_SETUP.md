# Database Schema Setup

This document provides the SQL schema for setting up the Supabase database for the PO Generator application.

## Prerequisites

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key
3. Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## Database Tables

Run the following SQL commands in your Supabase SQL editor:

### 1. Enable Row Level Security

All tables use Supabase's built-in authentication with Row Level Security (RLS) to ensure users can only access their own data.

### 2. Mills Table

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
  products TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE mills ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own mills"
  ON mills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mills"
  ON mills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mills"
  ON mills FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mills"
  ON mills FOR DELETE
  USING (auth.uid() = user_id);
```

### 3. Products Table

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own products"
  ON products FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
  ON products FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
  ON products FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Customers Table

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

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own customers"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customers"
  ON customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers"
  ON customers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers"
  ON customers FOR DELETE
  USING (auth.uid() = user_id);
```

### 5. Purchase Orders Table

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
  UNIQUE(user_id, po_number)
);

-- Enable RLS
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own purchase orders"
  ON purchase_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchase orders"
  ON purchase_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchase orders"
  ON purchase_orders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own purchase orders"
  ON purchase_orders FOR DELETE
  USING (auth.uid() = user_id);
```

### 6. Quality Records Table

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE quality_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own quality records"
  ON quality_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quality records"
  ON quality_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quality records"
  ON quality_records FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quality records"
  ON quality_records FOR DELETE
  USING (auth.uid() = user_id);
```

### 7. Company Details Table

```sql
CREATE TABLE company_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  branch TEXT,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE company_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own company details"
  ON company_details FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own company details"
  ON company_details FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company details"
  ON company_details FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company details"
  ON company_details FOR DELETE
  USING (auth.uid() = user_id);
```

### 8. Updated_at Trigger Function

```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_mills_updated_at
  BEFORE UPDATE ON mills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_orders_updated_at
  BEFORE UPDATE ON purchase_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quality_records_updated_at
  BEFORE UPDATE ON quality_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_details_updated_at
  BEFORE UPDATE ON company_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Indexes for Performance

```sql
-- Indexes for faster queries
CREATE INDEX idx_mills_user_id ON mills(user_id);
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_purchase_orders_user_id ON purchase_orders(user_id);
CREATE INDEX idx_purchase_orders_po_number ON purchase_orders(po_number);
CREATE INDEX idx_purchase_orders_created_at ON purchase_orders(created_at DESC);
CREATE INDEX idx_quality_records_user_id ON quality_records(user_id);
CREATE INDEX idx_quality_records_created_at ON quality_records(created_at DESC);
CREATE INDEX idx_company_details_user_id ON company_details(user_id);
```

## Verification

After running the above SQL commands, verify that:

1. All 5 tables are created
2. RLS is enabled on all tables
3. All policies are in place
4. Triggers are active
5. Indexes are created

You can verify by running:

```sql
-- Check tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
SELECT * FROM pg_policies;
```

## Next Steps

1. Update your `.env` file with Supabase credentials
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Sign up for a new account to test the application
