# Multi-Language Implementation Guide

## ✅ Completed

1. **Translation System** (`lib/i18n/translations.ts`) - Complete translations for FR, EN, AR
2. **Language Context** (`lib/i18n/language-context.tsx`) - State management for current language
3. **Language Selector** (`components/language-selector.tsx`) - UI component to switch languages
4. **Provider Integration** - App wrapped with LanguageProvider
5. **Navigation Component** - ✅ UPDATED with translations

## 🎯 Pattern to Follow

Every component that has text needs to:

1. Import the language hook:
```typescript
import { useLanguage } from '@/lib/i18n/language-context'
```

2. Use the hook in the component:
```typescript
const { t, language, dir } = useLanguage()
```

3. Replace hardcoded text with translation keys:
```typescript
// Before:
<h1>Bienvenue</h1>

// After:
<h1>{t.dashboard.welcome}</h1>
```

## 📋 Remaining Pages to Update

### Priority 1 (Most Used)
- ✅ Navigation component - **DONE**
- Dashboard page (`app/dashboard/page.tsx`)
- Home page (`app/page.tsx`)
- Auth pages (`app/auth/signin/page.tsx`, `app/auth/signup/page.tsx`)
- Footer component (`components/footer.tsx`)

### Priority 2
- Reservation page (`app/reservation/page.tsx`)
- Services page (`app/services/page.tsx`)
- Contact page (`app/contact/page.tsx`)
- About page (`app/a-propos/page.tsx`)

### Priority 3
- Admin pages (`app/admin/**/*.tsx`)
- Blog pages (`app/blog/**/*.tsx`)

## 🔄 Quick Implementation for Dashboard

Here's how the Dashboard header should look:

```typescript
// Add import
import { useLanguage } from '@/lib/i18n/language-context'

// In component
const { t } = useLanguage()

// Update header
<header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold gradient-text">IMBT</span>
        <span className="text-sm text-foreground/60">{t.nav.consulting}</span>
      </Link>
      <div className="flex items-center gap-3">
        <LanguageSelector />
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            {t.common.home}
          </Button>
        </Link>
        <Button onClick={handleLogout} variant="outline" size="sm" className="bg-transparent">
          <LogOut className="h-4 w-4 mr-2" />
          {t.common.logout}
        </Button>
      </div>
    </div>
  </div>
</header>

// Update welcome message
<h1 className="text-4xl font-bold gradient-text mb-2">
  {t.dashboard.welcome}, {data.client.firstName}!
</h1>

// Update stats cards
<p className="text-sm text-foreground/60">{t.dashboard.upcomingReservations}</p>
<p className="text-sm text-foreground/60">{t.dashboard.completedReservations}</p>
<p className="text-sm text-foreground/60">{t.dashboard.totalPurchases}</p>
<p className="text-sm text-foreground/60">{t.dashboard.totalSpent}</p>

// Update tabs
<TabsTrigger value="reservations">
  <Calendar className="h-4 w-4 mr-2" />
  {t.dashboard.myReservations}
</TabsTrigger>
<TabsTrigger value="purchases">
  <Package className="h-4 w-4 mr-2" />
  {t.dashboard.myPurchases}
</TabsTrigger>
<TabsTrigger value="profile">
  <User className="h-4 w-4 mr-2" />
  {t.dashboard.profile}
</TabsTrigger>
```

## 🌐 RTL Support for Arabic

Add this CSS to `globals.css`:

```css
/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .ml-2 {
  margin-left: 0;
  margin-right: 0.5rem;
}

[dir="rtl"] .mr-2 {
  margin-right: 0;
  margin-left: 0.5rem;
}

[dir="rtl"] .ml-auto {
  margin-left: 0;
  margin-right: auto;
}

[dir="rtl"] .mr-auto {
  margin-right: 0;
  margin-left: auto;
}

/* Reverse flex direction for RTL */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

/* Arabic font support */
.font-arabic {
  font-family: 'Tajawal', 'Cairo', 'Amiri', sans-serif;
}
```

## 🎨 Language Selector

The language selector is now available in:
- Desktop navigation (top right)
- Mobile menu (before login/reserve buttons)
- Can be added anywhere with: `<LanguageSelector />`

## 📝 Translation Keys Available

All translation keys are in `lib/i18n/translations.ts`. Main categories:

- `t.common.*` - Common UI elements (home, services, login, logout, etc.)
- `t.nav.*` - Navigation specific
- `t.hero.*` - Homepage hero section
- `t.dashboard.*` - Dashboard page
- `t.auth.*` - Authentication pages
- `t.reservation.*` - Reservation page
- `t.admin.*` - Admin pages
- `t.status.*` - Status labels (pending, confirmed, etc.)
- `t.errors.*` - Error messages

## 🚀 Testing

1. Open the app
2. Use the language selector in the navigation
3. Switch between FR, EN, AR
4. Verify:
   - Text changes
   - Direction changes (RTL for Arabic)
   - localStorage persists choice
   - Page reloads maintain language

## 📌 Next Steps

1. Update Dashboard page (highest priority - user-facing)
2. Update Home page (landing page)
3. Update Auth pages (signin/signup)
4. Update Footer
5. Continue with remaining pages

Each page follows the same pattern - import useLanguage, destructure t, replace text with t.category.key.
