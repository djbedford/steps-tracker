# GEMINI.MD: AI Collaboration Guide

This document provides essential context for AI models interacting with this project.
Adhering to these guidelines ensures code consistency, security, and architectural alignment.

---

## 1. Project Overview & Architecture

- **Architecture:** Decoupled Headless Setup.
- **Backend:** Laravel (v11/12) serving a RESTful API.
- **Frontend:** Next.js (v14/15) App Router.
- **Database:** SQLite
- **Communication:** Next.js fetches data via `fetch()` with Server Components or TanStack Query for client-side state.

---

## 2. Core Tech Stack

### Backend (Laravel)

- **Language:** PHP 8.3+ (Strict types enabled)
- **Key Packages:** Laravel Sanctum (Auth), Spatie MediaLibrary, [Add your others here]
- **Standards:** PSR-12, Action-based architecture (Logic in `app/Actions` rather than fat Controllers).

### Frontend (Next.js)

- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** TanStack Query (v5) + Zustand
- **Components:** Functional components, prefer Server Components by default.

---

## 3. Coding Conventions

### Naming Conventions

- **PHP/Laravel:** - Variables/Methods: `camelCase`
  - Models/Classes: `PascalCase`
  - Tables/Columns: `snake_case`
- **TypeScript/Next.js:**
  - Components: `PascalCase`
  - Files: `kebab-case` (e.g., `user-profile.tsx`)
  - Hooks: `use` prefix (e.g., `useAuth.ts`)

### Rules of Engagement

1. **No Mixed Logic:** Keep business logic out of Laravel Controllers. Use Actions or Services.
2. **Type Safety:** Always define TypeScript interfaces for API responses.
3. **API Consistency:** Use Laravel API Resources for transforming models to JSON.
4. **Environment:** Use `.env.example` as the source of truth for required variables.

---

## 4. Common Development Commands

| Task          | Command (Laravel)      | Command (Next.js) |
| :------------ | :--------------------- | :---------------- |
| **Start Dev** | `php artisan serve`    | `npm run dev`     |
| **Run Tests** | `php artisan test`     | `npm run test`    |
| **Lint/Fix**  | `composer lint`        | `npm run lint`    |
| **DB Sync**   | `php artisan migrate`  | N/A               |
| **New Class** | `php artisan make:...` | N/A               |

---

## 5. File Structure Hints

- `/api`: The Laravel root directory.
  - `/api/app/Actions`: Business logic lives here.
  - `/api/app/Http/Resources`: API response structures.
- `/frontend`: The Next.js root directory.
  - `/frontend/src/app`: App Router pages and layouts.
  - `/frontend/src/components`: Reusable UI components.
  - `/frontend/src/lib/api`: API client and endpoint definitions.

---

## 6. Specific AI Instructions

- **Laravel:** When generating migrations, always include `softDeletes()` and `timestamps()`.
- **Next.js:** Use `lucide-react` for icons and `clsx` / `tailwind-merge` for class management.
- **Errors:** If an error occurs in the API, the backend should return standard JSON: `{ "message": "...", "errors": [...] }`.
- **Boilerplate:** Avoid generating long comments unless specifically asked for documentation.
