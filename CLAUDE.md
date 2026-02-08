# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Production build (also runs before deploy)
pnpm lint         # Run ESLint with auto-fix + Prettier formatting
pnpm deploy       # Build and deploy to Firebase Hosting
```

## Tech Stack

- **Framework**: Next.js 13.3.0 (Pages Router)
- **Language**: TypeScript 5.0.4
- **Styling**: Tailwind CSS 3.3.1
- **i18n**: next-i18next (locales: en-US, zh-TW)
- **Backend**: Firebase (Auth, Firestore)
- **Package Manager**: pnpm

## Architecture

### Pages Router Structure
This project uses Next.js Pages Router (`src/pages/`), not App Router. All pages use `getStaticProps` for static generation.

### Global Providers
The app wraps all pages with two context providers (in `_app.tsx`):
- `CurrencyProvider` - Multi-currency support (TWD/USD/CNY) with live exchange rates
- `CartProvider` - Shopping cart state with localStorage persistence

### Component Organization
```
src/components/
├── atom/          # Smallest UI elements (Toast, Modal, Icon)
├── molecule/      # Combinations of atoms (CartItemCard, CouponInput)
├── organism/      # Complex sections (Navbar, Footer, CartList, CartSummary)
├── template/      # Full page layouts (IndexPage, AboutMePage)
├── Layout.tsx     # Common page wrapper (Meta + Navbar + Footer)
└── Meta.tsx       # SEO head tags
```

### Data Flow
- **Products**: Mock data in `src/mock/products.ts` (candlesProducts, oilProducts, crystalProducts)
- **Coupons**: Mock data in `src/mock/coupons.ts`
- **Cart State**: React Context with useReducer, persisted to localStorage
- **Currency**: Real-time rates from open.er-api.com, fallback to hardcoded rates

### i18n Setup
- Translation files in `public/locales/{en-US,zh-TW}/`
- Namespaces: common, navbar, home, products, services
- Each page must include `serverSideTranslations` in `getStaticProps`
- Dynamic routes must generate paths for all locales in `getStaticPaths`

### Responsive Breakpoints (Tailwind)
- `tablet`: 640px
- `desktop`: 1024px
- Use `md:` for tablet+, custom `tablet:` and `desktop:` for specific layouts

## Key Patterns

### Adding a New Page
1. Create page in `src/pages/`
2. Use `Layout` component wrapper
3. Add `getStaticProps` with `serverSideTranslations`
4. For dynamic routes, add `getStaticPaths` with locale mapping

### Static Generation with i18n
```typescript
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = items.flatMap((item) =>
    (locales || ['en-US']).map((locale) => ({
      params: { id: item.id },
      locale,
    }))
  );
  return { paths, fallback: false };
};
```

### Using Currency Conversion
```typescript
const { convertPrice } = useCurrency();
// Returns { value: "15.50", symbol: "$", formatted: "$15.50" }
convertPrice(500); // Converts from TWD base price
```
