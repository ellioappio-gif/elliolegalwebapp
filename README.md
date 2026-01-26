# Ellio Solutions Website

A modern, professional website for Ellio Solutions built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Modern Tech Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS
- **Fast Performance**: Optimized with Next.js Turbopack for blazing-fast development
- **Professional Components**: Reusable, well-structured React components
- **SEO Ready**: Proper metadata and semantic HTML structure
- **Beautiful UI**: Modern gradient designs and smooth animations

## Project Structure

```
ellio.solutions website/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with Navigation and Footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   ├── Services.tsx       # Services section
│   ├── CTA.tsx            # Call-to-action section
│   └── Footer.tsx         # Footer component
├── public/                # Static assets
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The project uses:

- **Next.js 16** with App Router for file-based routing
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **ESLint** for code quality

### Component Structure

Each component is a functional React component with TypeScript:

- **Navigation** - Sticky header with navigation links
- **Hero** - Eye-catching landing section with CTA
- **Features** - Grid of key features with icons
- **Services** - Service offerings displayed with borders
- **CTA** - Call-to-action section for contact
- **Footer** - Footer with links and company info

## Customization

### Colors

Update the color scheme in Tailwind classes (e.g., `text-blue-600`, `bg-blue-800`):

### Content

Edit component files in `/components` to update:
- Navigation links
- Feature descriptions
- Service offerings
- Footer links and information

### Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind classes in component JSX
- Custom fonts: Configured with Google Fonts in `app/layout.tsx`

## Building for Production

```bash
npm run build
npm run start
```

The application will be optimized and ready for deployment.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The site is optimized for:
- Fast initial load with Next.js Turbopack
- Server-side rendering
- Static site generation where applicable
- Image optimization

## License

© 2026 Ellio Solutions. All rights reserved.

## Support

For questions or issues, please contact support or open an issue in the repository.
