# Leon International CRM — Mobile App Plan

## Context

The Leon International CRM admin panel is a fully functional Next.js web app with:
- **Supabase** backend (PostgreSQL, Auth, Realtime, Storage)
- **Gmail API** integration for email send/sync/forward
- **6 admin pages**: Dashboard, Inbox, Contacts, Quotations, Settings, Users
- **Role-based access**: super_admin, admin, sales, support
- **Realtime**: Live updates on conversations, contacts, quotations, notifications
- **Attachments**: Upload/download via Supabase Storage

The goal is to build a **mobile app** (Play Store deployable) that replicates this CRM with the **same database, same Gmail integration, same aliases, same branding** — in a **separate project folder** outside the website.

---

## Recommended Technology: React Native + Expo

### Why Expo + React Native?

| Factor | Expo + React Native | Flutter | PWA |
|--------|---------------------|---------|-----|
| **Learning curve** | Low (you already know React) | High (new language: Dart) | Low |
| **Play Store** | Yes (EAS Build) | Yes | Limited |
| **Supabase SDK** | Official JS SDK works | Community SDK | Same as web |
| **Realtime** | Works natively | Works but different API | Works |
| **Push notifications** | Expo Push + FCM | Firebase | Very limited |
| **Code sharing** | Can reuse patterns from Next.js | All new code | Could wrap web |
| **Native feel** | Excellent | Excellent | Not truly native |

**Winner: Expo + React Native** — You already know React/TypeScript, Supabase JS SDK works identically, and Expo handles Play Store builds with zero native code knowledge needed.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  MOBILE APP                      │
│            (React Native + Expo)                 │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │Dashboard │ │  Inbox   │ │Contacts/Quotes   │ │
│  │  Screen  │ │  Screen  │ │    Screens       │ │
│  └────┬─────┘ └────┬─────┘ └───────┬──────────┘ │
│       │             │               │            │
│  ┌────▼─────────────▼───────────────▼──────────┐ │
│  │         Supabase JS Client                  │ │
│  │    (Auth, Database, Realtime, Storage)       │ │
│  └─────────────────┬───────────────────────────┘ │
└────────────────────┼─────────────────────────────┘
                     │
        ┌────────────▼────────────────┐
        │     SUPABASE (Same DB)      │
        │                             │
        │  Auth (JWT tokens)          │
        │  PostgreSQL (same tables)   │
        │  Realtime (same channels)   │
        │  Storage (attachments)      │
        │  RLS (same policies)        │
        └────────────┬────────────────┘
                     │
        ┌────────────▼────────────────┐
        │   EXISTING NEXT.JS API      │
        │   (deployed on Vercel)      │
        │                             │
        │  /api/admin/emails/sync     │
        │  /api/admin/emails/compose  │
        │  /api/admin/emails/forward  │
        │  /api/admin/emails/delete   │
        │  /api/admin/reply           │
        │                             │
        │  (Gmail API needs server-   │
        │   side secrets — can't run  │
        │   on mobile device)         │
        └─────────────────────────────┘
```

### Key Architectural Decision: Gmail Operations

Gmail API requires OAuth2 credentials (client secret, refresh token) — these **cannot** be stored on a mobile device. Solution:

**Call existing Next.js API routes** — Your web app is deployed. Mobile app calls the same `/api/admin/emails/*` endpoints. Add Bearer token auth (Supabase JWT) alongside existing cookie auth. Zero duplication of Gmail logic.

---

## Project Structure

```
D:\Projects\leon-international-app/     <-- NEW folder (outside website)
├── app/                                <-- Expo Router (file-based routing)
│   ├── _layout.tsx                     <-- Root layout + auth provider
│   ├── login.tsx                       <-- Login screen
│   ├── (tabs)/                         <-- Tab navigator (main app)
│   │   ├── _layout.tsx                 <-- Tab bar config
│   │   ├── index.tsx                   <-- Dashboard
│   │   ├── inbox/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx               <-- Conversation list
│   │   │   └── [id].tsx               <-- Conversation thread
│   │   ├── contacts/
│   │   │   ├── index.tsx               <-- Contacts list
│   │   │   └── [id].tsx               <-- Contact detail + reply
│   │   ├── quotations/
│   │   │   ├── index.tsx               <-- Quotations list
│   │   │   └── [id].tsx               <-- Quotation detail + reply
│   │   └── settings.tsx                <-- Settings + change password
│   └── (admin)/
│       └── users.tsx                   <-- User management (super_admin)
├── components/
│   ├── ConversationItem.tsx
│   ├── MessageBubble.tsx
│   ├── ComposeModal.tsx
│   ├── ReplySheet.tsx
│   ├── StatusBadge.tsx
│   ├── NotificationBell.tsx
│   ├── StatCard.tsx
│   └── EmptyState.tsx
├── lib/
│   ├── supabase.ts                     <-- Supabase client (same URL + anon key)
│   ├── api.ts                          <-- HTTP client for Next.js API routes
│   ├── auth.ts                         <-- Auth helpers
│   └── types.ts                        <-- Shared TypeScript types
├── contexts/
│   ├── AuthContext.tsx
│   └── UserContext.tsx
├── hooks/
│   ├── useRealtime.ts
│   ├── useConversations.ts
│   ├── useContacts.ts
│   └── useNotifications.ts
├── constants/
│   └── theme.ts                        <-- Brand colors (#0E2F44, #E67E22, etc.)
├── assets/
│   ├── logo-transparent.png
│   └── fonts/
├── app.json                            <-- Expo config
├── package.json
├── tsconfig.json
└── eas.json                            <-- EAS Build config for Play Store
```

---

## Navigation Structure

```
Root Stack Navigator
├── Login Screen (unauthenticated)
└── Tab Navigator (authenticated)
    ├── Dashboard tab
    ├── Inbox tab (Stack)
    │   ├── Conversation List
    │   └── Conversation Thread
    ├── Contacts tab (Stack)
    │   ├── Contact List
    │   └── Contact Detail
    ├── Quotes tab (Stack)
    │   ├── Quotation List
    │   └── Quotation Detail
    └── More tab (Stack)
        ├── Settings
        └── Users (super_admin only)
```

Bottom tab bar: 5 tabs with icons. Inbox tab shows unread badge count.

---

## Screen-by-Screen Features

### 1. Login Screen
- Email + password form
- Supabase `auth.signInWithPassword()`
- Secure token storage via `expo-secure-store`
- Auto-login if valid session exists
- Leon International branding (navy bg, gold accents, logo)

### 2. Dashboard Tab
- Stats cards (contacts, quotations, conversations, unread)
- Weekly trend chart
- Urgency breakdown bars
- Storage usage (super admin only)
- Recent submissions list (tap to navigate)
- Pull-to-refresh

### 3. Inbox Tab

**Conversation List:**
- FlatList with conversation items
- Search bar with debounce
- Status filter chips
- Alias filter (super admin)
- Unread badge per item
- Pull-to-refresh + realtime
- Long-press multi-select + bulk delete
- Compose FAB button

**Conversation Thread:**
- Chat-style message bubbles (inbound left, outbound right)
- Attachment previews + download
- Reply input at bottom + attachment picker
- Status change, forward, delete actions
- Auto-mark-read on open

### 4. Contacts Tab
- FlatList with search + status filter + pagination
- Contact detail screen with all fields
- Reply with template picker (sends via user's alias)
- Status change + delete
- Realtime updates

### 5. Quotations Tab
- Same pattern as Contacts
- Extra fields: urgency badge, vessel info, request type

### 6. Settings Screen
- Profile card, change password, logout

### 7. Users Screen (super_admin only)
- CRUD users, assign aliases, reset passwords

---

## Changes to Existing Website Project (Minimal)

Only **2 small additions** needed — fully isolated, won't break anything:

### 1. New auth helper (`src/lib/auth-helper.ts` — ~20 lines)
Extracts user from cookie session OR Bearer token header. Falls back gracefully.

### 2. Update 5 API routes to use the new helper (~1 line each)
- `/api/admin/emails/compose`
- `/api/admin/emails/sync`
- `/api/admin/emails/forward`
- `/api/admin/emails/delete`
- `/api/admin/reply`

### 3. New Supabase migration: `push_tokens` table
For mobile push notification token storage.

---

## Push Notifications

1. Mobile app registers -> gets Expo Push Token
2. Token stored in `push_tokens` table (user_id, expo_push_token)
3. Supabase Database Webhook on `notifications` INSERT
4. Webhook triggers Edge Function -> sends push via Expo Push API
5. Tap notification -> deep links to relevant screen

---

## Branding Theme

```
Navy:    #0E2F44  (primary, headers, tab bar)
Orange:  #E67E22  (accent, FABs, badges)
Ocean:   #2E86C1  (links, active states)
Gold:    #C5961A  (premium accents)
White:   #FFFFFF  (backgrounds)
Gray:    #F3F4F6  (card backgrounds)
```

---

## Key Dependencies

```
expo, expo-router               — Framework + navigation
@supabase/supabase-js           — Same SDK as web
expo-secure-store                — Secure token storage
@gorhom/bottom-sheet             — Bottom sheets (compose, reply)
expo-image-picker                — Camera/gallery attachments
expo-document-picker             — File attachments
expo-notifications               — Push notifications
expo-file-system                 — Download attachments
react-native-chart-kit           — Dashboard charts
react-native-reanimated          — Animations
```

---

## Implementation Phases

| Phase | What | Days |
|-------|------|------|
| 1 | Project setup + Auth + Login | 1-2 |
| 2 | Dashboard screen | 2-3 |
| 3 | Contacts + Quotations screens | 3-5 |
| 4 | Inbox (conversations + thread + compose) + Bearer auth on web API | 5-8 |
| 5 | Settings + Users (super admin) | 8-9 |
| 6 | Push notifications (Expo + Edge Function) | 9-10 |
| 7 | Polish + Play Store submission | 10-12 |

---

## How to Test Locally

### Option 1: Expo Go App (Easiest — No Install Needed)
1. Install **Expo Go** app on your Android phone from Play Store
2. Run `npx expo start` on your computer
3. Scan the QR code with Expo Go
4. App runs live on your phone — hot-reloads as you code

### Option 2: Android Emulator
1. Install Android Studio
2. Create a virtual device (Pixel 7 recommended)
3. Run `npx expo start` then press `a` to open in emulator
4. App runs on your computer screen in the emulator window

### Option 3: Development Build (Full Native Features)
1. Run `eas build --platform android --profile development`
2. Install the APK on your phone
3. Connect to dev server — full native features including push notifications

**Recommended: Start with Option 1 (Expo Go)** for development, switch to Option 3 when testing push notifications.

---

## Play Store Deployment

```bash
# Build production APK/AAB
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

Requirements:
- Google Play Developer Account ($25 one-time fee)
- App icon (512x512 PNG) + Feature graphic (1024x500 PNG)
- Screenshots + Privacy policy URL

---

## Website Safety Guarantees

The existing website will NOT break because:
1. Mobile app is a **completely separate project** in a different folder
2. Only 2 tiny additions to website: auth helper (new file) + 1-line changes to 5 routes
3. Auth helper **falls back** to existing cookie auth — if Bearer token is missing, cookies still work
4. No database schema changes (except adding a new `push_tokens` table)
5. No changes to any existing UI components
6. No changes to existing business logic
7. All existing RLS policies remain unchanged
