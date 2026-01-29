# Project Structure - 2025 Best Practices

This project is organized using Next.js 13+ Route Groups for optimal separation of concerns.

## 📁 Directory Structure

```
app/
├── (marketing)/          # Marketing & Promotional Pages
│   ├── landing/         # Landing pages (A/B testing, campaigns)
│   ├── testimonials/    # Customer stories & social proof
│   ├── press/          # Media coverage & press releases  
│   ├── careers/        # Job postings & company culture
│   └── layout.tsx      # Marketing-specific layout
│
├── (website)/           # Public Website Pages
│   ├── about/          # Company information
│   ├── blog/           # Content marketing
│   ├── contact/        # Contact forms & info
│   ├── faq/            # Frequently asked questions
│   ├── features/       # Product features
│   ├── how-it-works/   # Process explanation
│   ├── pricing/        # Pricing plans
│   ├── privacy/        # Privacy policy
│   ├── resources/      # Helpful resources
│   ├── security/       # Security information
│   ├── support/        # Help & support
│   ├── terms/          # Terms of service
│   └── layout.tsx      # Website-specific layout
│
├── (webapp)/            # Authenticated Web Application
│   ├── dashboard/      # Main dashboard functionality
│   │   ├── ask/        # AI question interface
│   │   ├── cases/      # Case management
│   │   ├── chat/       # Chat functionality
│   │   ├── documents/  # Document management
│   │   ├── favorites/  # Saved items
│   │   ├── lawyers/    # Lawyer connections
│   │   ├── notifications/ # User notifications
│   │   ├── profile/    # User profile
│   │   ├── search/     # Search functionality
│   │   ├── security/   # Security settings
│   │   └── settings/   # User settings
│   └── layout.tsx      # Protected route wrapper
│
├── (auth)/              # Authentication Flow
│   ├── auth/           # Auth components & pages
│   │   ├── login/      # Login page
│   │   ├── signup/     # Registration page
│   │   ├── verify-email/ # Email verification
│   │   ├── forgot-password/ # Password reset
│   │   ├── AuthContext.tsx # Auth context
│   │   └── ProtectedRoute.tsx # Route protection
│   └── layout.tsx      # Auth-specific layout
│
├── api/                 # API Routes
│   ├── admin/          # Admin endpoints
│   ├── ai/             # AI processing
│   ├── analytics/      # Analytics tracking
│   ├── auth/           # Authentication endpoints
│   └── landing/        # Landing page config
│
├── admin/              # Admin Interface
│   ├── landing/        # Landing page management
│   └── pages/          # Page management
│
├── globals.css         # Global styles
├── layout.tsx          # Root layout
├── page.tsx           # Homepage
└── not-found.tsx      # 404 page
```

## 🎯 Benefits of This Structure

### **Route Groups** `(marketing)`, `(website)`, `(webapp)`, `(auth)`
- **No URL Impact**: Parentheses in folder names don't affect routing
- **Logical Separation**: Clear boundaries between different app sections
- **Independent Layouts**: Each section can have its own layout and styling
- **Team Organization**: Different teams can work on different sections
- **Deploy Separately**: Easier to split or deploy sections independently

### **Marketing Section** `(marketing)/`
- **Temporary Content**: Landing pages that may be updated/removed frequently
- **A/B Testing**: Easy to swap different landing page versions
- **Campaign Specific**: Pages for specific marketing campaigns
- **Social Proof**: Testimonials, press coverage, careers

### **Website Section** `(website)/`
- **Core Website**: Stable pages that represent the main website
- **SEO Optimized**: Main pages for search engine optimization
- **Product Information**: Features, pricing, documentation
- **Legal Pages**: Terms, privacy, security information

### **Web App Section** `(webapp)/`
- **Protected Routes**: All pages require authentication
- **Rich Functionality**: Complex dashboard and user interactions
- **User Data**: Personal dashboards, settings, documents
- **Separate Styling**: Different UI patterns from marketing site

### **Auth Section** `(auth)/`
- **Authentication Flow**: Login, signup, password reset
- **Shared Components**: AuthContext, ProtectedRoute
- **Security Focused**: Isolated from other app sections

## 🔧 Development Guidelines

### **Adding New Pages**
```bash
# Marketing page
touch app/(marketing)/new-campaign/page.tsx

# Website page  
touch app/(website)/new-feature/page.tsx

# Webapp page (protected)
touch app/(webapp)/dashboard/new-tool/page.tsx

# Auth page
touch app/(auth)/auth/new-flow/page.tsx
```

### **Navigation Between Sections**
```tsx
// Marketing to Website
<Link href="/about">About Us</Link>

// Website to Webapp (requires auth)
<Link href="/dashboard">Dashboard</Link>  

// Any section to Marketing
<Link href="/landing">Special Offer</Link>
```

### **Layout Hierarchy**
1. `app/layout.tsx` - Root layout (global styles, fonts)
2. `app/(section)/layout.tsx` - Section-specific layout
3. `app/(section)/page/layout.tsx` - Page-specific layout (if needed)

## 🚀 Deployment Strategy

### **Separate Deployments** (Optional)
- **Marketing**: Deploy to CDN for high performance
- **Website**: Main domain deployment  
- **Webapp**: Separate subdomain (app.ellio.com)
- **API**: Serverless functions or separate service

### **Unified Deployment** (Current)
- All sections deploy together as single Next.js app
- Route groups provide organization without affecting deployment

## 📝 Best Practices

1. **Keep Marketing Separate**: Landing pages change frequently
2. **Webapp Protection**: Always use ProtectedRoute wrapper
3. **Consistent Styling**: Each section can have its own CSS approach
4. **Clear Boundaries**: Don't cross-reference between inappropriate sections
5. **Independent Teams**: Different sections can be developed independently

This structure follows 2025 Next.js best practices for large applications with multiple concerns.