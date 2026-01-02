# PO Generator - Mobile-First Purchase Order Web App

A production-ready, mobile-first web application for creating, managing, and sharing purchase orders. Built with React, TailwindCSS, and Supabase with full offline support.

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with progressive enhancement for desktop
- 📄 **Create & Manage POs** - Quick purchase order creation with auto-generated PO numbers
- 🏭 **Mills Management** - Store and manage mill information
- 📦 **Product Catalog** - Maintain a reusable product database
- 👥 **Customer Management** - Keep track of customer details
- 📊 **Order History** - Search and filter past orders
- 📥 **PDF Generation** - Download and share POs as professional PDFs
- 🔄 **Offline Support** - Works offline with automatic sync when connection restored
- 💾 **Auto-Save Drafts** - Never lose your work with automatic draft saving
- 🔐 **User Authentication** - Secure sign-up and login with Supabase Auth
- 🎨 **Clean UI** - Minimal, intuitive interface with large tap targets

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)

### PDF & Offline
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **localforage** - Offline storage
- **Vite PWA** - Progressive Web App support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### Installation

1. **Clone the repository**
   ```bash
   cd po-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Follow the instructions in [DATABASE_SETUP.md](DATABASE_SETUP.md) to create tables

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### First Time Setup

1. **Sign Up** - Create an account on the login page
2. **Company Settings** - Go to Settings and add your company details (name, address, bank info)
3. **Add Mills** - Navigate to Mills and add your mills
4. **Add Products** - Add your product catalog
5. **Add Customers** - Add your customers for quick selection

### Creating a Purchase Order

1. Navigate to "Create PO" from the bottom navigation or dashboard
2. Fill in the required fields (auto-suggested from your database)
3. Click "Preview Order" to review
4. Confirm to save or download/share PDF directly

### Managing Data

- **Mills**: Add, edit, and delete mill information
- **Products**: Manage your product catalog
- **Customers**: Keep track of customer details
- **History**: Search and filter past orders, regenerate PDFs

### Offline Mode

- The app automatically detects when you're offline
- Changes are queued and synced when connection is restored
- Drafts are saved locally every second

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

## 📁 Project Structure

```
po-generator/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.jsx
│   │   ├── DataContext.jsx
│   │   └── OfflineContext.jsx
│   ├── lib/            # Utilities and configurations
│   │   ├── supabase.js
│   │   ├── offline.js
│   │   ├── validation.js
│   │   └── utils.js
│   ├── pages/          # Page components
│   │   ├── Dashboard.jsx
│   │   ├── CreatePO.jsx
│   │   ├── Mills.jsx
│   │   ├── Products.jsx
│   │   ├── Customers.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── services/       # Service layer
│   │   └── pdfService.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── DATABASE_SETUP.md   # Database schema instructions
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔐 Security

- All data is user-scoped with Row Level Security (RLS)
- Authentication handled by Supabase Auth
- Passwords are securely hashed
- API keys are environment variables (never committed)

## 🌟 Features in Detail

### Auto-Generated PO Numbers

The app automatically generates PO numbers by checking your order history and incrementing from the last number.

### PDF Generation

PDFs include:
- Company header with logo
- "श्री गणेशाय नमः" at the top
- All order details in a clean table
- Terms & conditions
- Bank details in footer

### Offline-First Architecture

- All data cached locally using IndexedDB (via localforage)
- Changes queued for sync when offline
- Automatic sync when connection restored
- Visual indicator when offline

### Mobile-Optimized UI

- Large tap targets (min 44x44px)
- Bottom navigation for easy thumb access
- Progressive enhancement for desktop
- Fast load times (<2.5s)

## 🤝 Contributing

This is a production-ready application. For issues or feature requests, please create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built following mobile-first design principles
- Icons by [Lucide](https://lucide.dev)
- Authentication & Database by [Supabase](https://supabase.com)

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for small businesses and students**
