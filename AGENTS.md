# AGENTS.md

## Project Overview

This project is a School Admission Management System (SPMB).

The primary goal is to deliver a functional, maintainable MVP.

Prefer simple and clear solutions over enterprise-level abstractions.

Do not introduce unnecessary architecture, patterns, dependencies, or abstractions unless the project clearly needs them.

---

# Tech Stack

- Framework: Next.js 16
- Language: TypeScript
- Database: MySQL
- ORM: Drizzle ORM
- Admin UI: PrimeReact
- Student Portal UI: PrimeReact
- SPMB Registration Form UI: PrimeReact
- Public Landing Page: Tailwind CSS
- Animation: Motion, only when it improves the user experience

---

# Localization

The application user interface must use Bahasa Indonesia.

All user-facing text must be written in Indonesian, including:

- Navigation labels
- Buttons
- Form labels
- Placeholders
- Validation messages
- Error messages
- Success messages
- Empty states
- Loading states
- Confirmation dialogs
- Registration statuses displayed to users

Examples:

```text
Masuk
Masukkan Email
Kirim Kode OTP
Verifikasi Kode
Simpan Draft
Data berhasil disimpan
Pendaftaran berhasil dikirim
Tidak ada data
Memuat data...
```

Do not mix English and Indonesian in the user interface unless the English term is commonly used and contextually appropriate.

---

# Code Language

All source code must use English.

This includes:

- Variable names
- Function names
- Component names
- Type names
- Interface names
- Database entity names
- File names
- Code comments

Prefer:

```ts
saveRegistrationDraft()
submitRegistration()
registrationStatus
currentUser
```

Do not use Indonesian names in source code such as:

```ts
simpanPendaftaran()
dataSiswa()
statusPendaftaran
```

---

# AI Instructions

All development instructions, prompts, architecture documentation, and AGENTS.md rules should remain in English.

The exception is user-facing application content, which must use Bahasa Indonesia.

Use the following convention:

```text
User Interface
→ Bahasa Indonesia

Source Code
→ English

Database Schema
→ English

AGENTS.md
→ English

Developer Documentation
→ English
```

Always preserve this separation when implementing new features.

---

# Core Development Philosophy

Follow these principles:

1. Build the MVP first.
2. Prefer simple solutions.
3. Avoid overengineering.
4. Do not introduce enterprise architecture without a clear need.
5. Keep business logic close to its feature.
6. Keep files focused and reasonably small.
7. Do not create abstractions for hypothetical future requirements.
8. Reuse existing code before creating new utilities or components.
9. Prefer explicit and readable code over clever code.
10. Do not add dependencies unless they provide clear value.

Avoid unnecessary patterns such as:

- Repository layers
- Service layers
- Use case layers
- DTO layers
- Factory patterns
- Generic abstraction layers

unless the project genuinely becomes complex enough to require them.

---

# Project Structure

Use the following structure:

```text
src/
├── app/
├── components/
├── features/
├── db/
├── lib/
└── types/
```

Keep the root project directory clean.

Example:

```text
/
├── public/
├── src/
├── drizzle/
├── AGENTS.md
├── drizzle.config.ts
├── next.config.ts
└── package.json
```

---

# App Directory Rules

`src/app` is responsible for:

- Routes
- Layouts
- Route-level composition
- Route metadata

Do not place large amounts of business logic directly inside route files.

Prefer thin route files.

Example:

```tsx
export default async function RegistrationPage() {
    const registration = await getRegistration();

    return (
        <RegistrationForm
            initialData={registration}
        />
    );
}
```

Business logic should live inside the relevant feature.

Do not create unnecessary route-local architectures such as:

```text
app/
└── dashboard/
    ├── services/
    ├── repositories/
    ├── hooks/
    └── components/
```

unless there is a clear route-specific reason.

---

# Route Groups

Use route groups to separate application areas.

```text
app/
├── (public)/
├── (auth)/
├── (student)/
└── (admin)/
```

Suggested routes:

```text
/
├── login
├── dashboard
├── pendaftaran
│
└── admin/
    ├── dashboard
    ├── pendaftar
    ├── berita
    ├── guru
    └── fasilitas
```

---

# Features

Business logic belongs inside `src/features`.

Suggested structure:

```text
features/
├── auth/
├── registration/
└── content/
```

Example:

```text
features/
└── registration/
    ├── actions.ts
    ├── queries.ts
    ├── schemas.ts
    ├── types.ts
    └── components/
```

Feature files should only be created when needed.

Do not force every feature to have the same folder structure.

---

# Feature Responsibilities

## actions.ts

Use for mutations and Server Actions.

Examples:

```text
saveRegistrationDraft()
submitRegistration()
updateRegistrationStatus()
createNews()
updateNews()
deleteNews()
```

Server Action names must use explicit verb-based names that describe the business operation.

Avoid vague names such as:

```text
handleData()
process()
submit()
update()
```

---

## queries.ts

Use for read operations.

Examples:

```text
getRegistration()
getRegistrations()
getRegistrationById()
getNews()
```

Keep database read queries out of route components whenever practical.

Server Components should call feature-level queries.

---

## schemas.ts

Use for validation schemas.

Validation schemas should be colocated with the feature that owns the data.

---

## types.ts

Use for feature-specific TypeScript types.

Do not duplicate types that can be inferred from existing schemas or database definitions.

---

# Component Organization

Use `src/components` only for shared or reusable components.

Example:

```text
components/
├── shared/
└── landing/
```

Feature-specific components belong inside their feature.

Example:

```text
features/
└── registration/
    └── components/
        ├── registration-form.tsx
        ├── personal-data-step.tsx
        ├── address-step.tsx
        └── review-step.tsx
```

Do not place a component inside global `components` if it is only used by one feature.

---

# Landing Page Components

Landing page components belong in:

```text
components/landing/
```

Example:

```text
components/
└── landing/
    ├── navbar.tsx
    ├── hero.tsx
    ├── about.tsx
    ├── programs.tsx
    ├── facilities.tsx
    ├── news.tsx
    └── footer.tsx
```

Landing page components use Tailwind CSS as the primary styling system.

Motion may be used for animations.

Do not use PrimeReact as the default component system for the public landing page.

---

# Server Components

Prefer Server Components by default.

Do not add `"use client"` unless it is required.

Server Components should be used for:

- Database reads
- Authentication checks
- Authorization checks
- Initial data loading
- Static rendering
- SEO-oriented content
- Server-side route composition

---

# Client Components

Use `"use client"` only when required.

Client Components are appropriate for:

- React state
- React effects
- Event handlers
- Browser APIs
- Interactive UI
- PrimeReact interactive components
- Form state
- LocalStorage access

Do not make an entire page a Client Component solely because one child component requires interactivity.

Prefer:

```text
Server Page
    ↓
Fetch data
    ↓
Interactive Client Component
```

Keep Client Components as small and isolated as practical.

---

# Server and Client Boundaries

Never import server-only modules into Client Components.

Client Components must never directly access:

- MySQL
- Drizzle database client
- Server-only database modules
- Server-only authentication helpers
- Sensitive environment variables

Never access the database directly from the browser.

---

# Data Access

Database reads belong primarily in feature-level `queries.ts`.

Database mutations belong primarily in feature-level `actions.ts`.

Do not scatter database queries across unrelated components.

Avoid:

```text
page.tsx
├── authentication logic
├── authorization logic
├── complex database queries
├── business logic
└── UI rendering
```

Prefer:

```text
Page
 ↓
Feature Query
 ↓
Database
```

---

# Server Actions

Server Actions are the default mechanism for internal application mutations.

Use Server Actions for:

- Creating records
- Updating records
- Deleting records
- Saving registration drafts
- Submitting registration forms
- Updating registration status
- Admin content management

Do not create internal API endpoints for ordinary CRUD operations when a Server Action is sufficient.

---

# Route Handlers

Use Route Handlers only when an explicit HTTP endpoint is required.

Examples:

- Third-party webhooks
- External integrations
- Public APIs
- Explicit HTTP endpoints

Do not create `/api` endpoints for every CRUD operation by default.

---

# Authentication

Authentication uses passwordless email OTP.

The system does not use passwords unless explicitly required in the future.

Authentication flow:

```text
Email
  ↓
OTP Verification
  ↓
Authenticated Session
  ↓
Determine User Role
  ↓
Redirect to Application Area
```

OTP verification proves ownership of an email address.

OTP verification does not automatically grant administrative access.

---

# Session Policy

Because authentication uses OTP, sessions should be long-lived.

Preferred policy:

- Session duration: approximately 30 days
- Prefer sliding session renewal when supported by the authentication solution
- Active users should not be unnecessarily required to repeatedly verify OTP

Users should be required to verify OTP again when:

- The session expires
- The user logs out
- The session becomes invalid
- The user signs in from a new browser or device when required by the authentication implementation

Avoid implementing unnecessary custom refresh token systems.

Use the authentication library's supported session mechanisms whenever possible.

---

# Authorization

Authentication and authorization are separate concerns.

Authentication answers:

> Who is the user?

Authorization answers:

> What is the user allowed to access or modify?

Do not treat successful OTP verification as authorization to access protected resources.

---

# User Roles

Keep roles simple for the MVP:

```text
STUDENT
ADMIN
SUPER_ADMIN
```

Do not introduce a permission table or granular permission system unless clearly required.

---

# Student Access

Students can access:

- Student dashboard
- Their own registration
- Their own registration status

Students must never access another student's registration.

Student ownership must always be validated server-side.

Never trust ownership information supplied by the client.

---

# Admin Access

`ADMIN` and `SUPER_ADMIN` can access:

```text
/admin/*
```

Administrative access must be validated server-side.

Do not rely only on hidden navigation links or client-side role checks.

---

# Super Admin Access

`SUPER_ADMIN` is responsible for sensitive administrative operations such as:

- Managing administrator access
- System-level settings

Operations restricted to `SUPER_ADMIN` must explicitly verify the role server-side.

---

# Admin Allowlist

Administrative access is controlled through an email allowlist.

Suggested concept:

```text
admin_allowlist
├── id
├── email
├── role
├── created_at
└── updated_at
```

After successful OTP verification:

```text
Authenticated Email
        ↓
Check Admin Allowlist
        │
        ├── Found
        │    ↓
        │  ADMIN / SUPER_ADMIN
        │
        └── Not Found
             ↓
           STUDENT
```

Do not provide unrestricted public admin registration.

---

# Authorization Rules for Server Actions

Route protection is not sufficient authorization.

Every Server Action that accesses protected data must validate:

1. Authentication
2. Role authorization
3. Resource ownership when applicable

Example:

```text
Server Action
    ↓
Require authenticated user
    ↓
Check role or ownership
    ↓
Perform operation
```

Never assume a Server Action is safe simply because its UI exists inside a protected route.

---

# Never Trust Client Authorization Data

Never trust the following values when supplied by the client:

- User IDs
- Roles
- Ownership claims
- Authorization flags
- Permission flags

Always derive the current user from trusted server-side authentication.

For student operations:

```text
Server Session
    ↓
Current User
    ↓
Find User's Registration
    ↓
Perform Authorized Operation
```

---

# Authentication Helpers

Centralize common authentication and authorization checks.

Examples:

```text
requireUser()
requireAdmin()
requireSuperAdmin()
```

Do not duplicate authentication checks across dozens of files.

Keep authentication helpers inside the authentication domain.

Example:

```text
features/
└── auth/
    ├── auth.ts
    ├── actions.ts
    └── queries.ts
```

---

# Database

The database is MySQL.

Drizzle ORM is the default database access layer.

Database schema definitions belong in:

```text
src/db/schema/
```

Example:

```text
db/
├── index.ts
└── schema/
    ├── users.ts
    ├── registrations.ts
    ├── admin-allowlist.ts
    └── index.ts
```

Do not create one massive schema file when domain-based schema files are more maintainable.

---

# Database Access Rules

Prefer Drizzle ORM for database operations.

Do not use raw SQL unless Drizzle cannot reasonably support the required operation.

Do not introduce raw SQL for ordinary CRUD operations.

Database access must remain server-side.

Do not access the database directly from Client Components.

---

# MVP Domain Model

Keep the domain simple.

```text
User
  │
  └── Registration
```

For the MVP:

> One account = one applicant = one registration.

Do not implement:

- Multiple applicants per account
- Registration history
- Complex academic year management
- Complex permission systems
- Highly normalized parent entities

unless explicitly required.

---

# Registration

The registration is the core SPMB domain.

The registration may contain:

- Student personal information
- Address
- Previous school information
- Parent information
- Guardian information
- Registration status

Do not over-normalize the database for the MVP.

A practical registration table is preferred over unnecessary relational complexity.

---

# Registration Status

Keep registration status simple:

```text
DRAFT
SUBMITTED
REVISION_REQUIRED
VERIFIED
```

Expected flow:

```text
DRAFT
  ↓
SUBMITTED
  ↓
VERIFIED
```

Revision flow:

```text
SUBMITTED
    ↓
REVISION_REQUIRED
    ↓
SUBMITTED
```

Do not introduce complex workflow states unless required by the actual SPMB process.

---

# Form Architecture

The SPMB registration form is a multi-step interactive form.

The registration form should be implemented as a Client Component when client-side state and interaction are required.

Suggested structure:

```text
features/
└── registration/
    ├── components/
    │   ├── registration-form.tsx
    │   ├── registration-stepper.tsx
    │   ├── personal-data-step.tsx
    │   ├── address-step.tsx
    │   ├── school-data-step.tsx
    │   ├── parent-data-step.tsx
    │   └── review-step.tsx
    │
    ├── actions.ts
    ├── queries.ts
    ├── schemas.ts
    └── types.ts
```

Do not place the entire registration form implementation inside `page.tsx`.

---

# Validation

Validate important input on both:

- Client
- Server

Client-side validation improves the user experience.

Server-side validation is required for data integrity and security.

Never rely exclusively on client-side validation.

Use shared validation schemas when practical.

Avoid duplicating validation rules across multiple files.

---

# Autosave

Autosave is an important product requirement.

The primary goal is:

> Users should not lose significant registration progress because of page refreshes or unstable internet connections.

For the MVP:

```text
Form State
    ↓
Debounced Save
    ↓
Server Action
    ↓
MySQL
```

Use a reasonable debounce to avoid excessive database writes.

Do not save every keystroke immediately.

---

# Local Backup

Use LocalStorage as a fallback for registration progress when practical.

Concept:

```text
Server = Primary Persistence
LocalStorage = Emergency Backup
```

The local backup should help recover progress when:

- The page refreshes
- The connection temporarily fails
- The server autosave has not completed

Do not introduce IndexedDB unless LocalStorage is insufficient.

---

# Autosave Rules

Autosave must not:

- Create excessive database writes
- Block user interaction
- Prevent navigation
- Submit the registration automatically

The user should receive clear feedback about save status when practical.

Examples:

```text
Menyimpan...
Tersimpan
Gagal menyimpan
Perubahan disimpan secara lokal
```

---

# Final Submission

Saving a draft is not the same as submitting a registration.

The system must distinguish between:

```text
Save Draft
```

and:

```text
Final Submit
```

The user-facing UI must use Indonesian translations.

Final submission should:

1. Validate all required registration data
2. Validate data server-side
3. Change the registration status
4. Prevent accidental duplicate submission when practical

The registration must not automatically become submitted simply because autosave occurs.

---

# PrimeReact

PrimeReact is the primary UI component library for:

- Admin Panel
- Student Portal
- SPMB Registration Form

Prefer PrimeReact components for interactive application UI.

Examples include:

- DataTable
- InputText
- Select
- Dropdown
- Dialog
- Button
- Toast
- Confirmation dialogs
- Form-related components

Do not unnecessarily recreate PrimeReact components with custom implementations.

---

# PrimeReact Boundary

For application areas using PrimeReact:

```text
PrimeReact = Primary Component Library
Tailwind = Layout and supporting utility styling when needed
```

Do not create inconsistent duplicate UI systems.

Avoid mixing:

```text
PrimeReact
+
Random custom components
+
Inline styles
+
Multiple unrelated styling approaches
```

without a clear reason.

---

# Tailwind CSS

Tailwind CSS is the primary styling system for the public landing page.

Landing page components may use:

- Tailwind utilities
- Custom reusable landing page components
- Motion animations

Do not force PrimeReact styling onto the public landing page.

---

# Motion

Motion may be used for:

- Meaningful transitions
- Visual hierarchy
- Section entrance animations
- User feedback

Do not animate every element.

Animations must improve the experience and should not exist purely as decoration.

Avoid excessive:

- Bounce animations
- Random rotations
- Repeated attention-grabbing animations
- Heavy animation chains

Respect user motion preferences when implementing significant animations.

---

# Styling Rules

Avoid mixing styling approaches unnecessarily.

Do not introduce:

- Inline styles
- Random CSS files
- CSS Modules
- Additional styling libraries

unless there is a clear requirement.

Follow the styling system for the current application area:

```text
Public Landing Page
→ Tailwind

Admin Panel
→ PrimeReact

Student Portal
→ PrimeReact

SPMB Form
→ PrimeReact
```

---

# Shared Utilities

`src/lib` is for shared infrastructure and framework-independent utilities.

Examples:

```text
lib/
├── utils.ts
├── constants.ts
├── email.ts
└── otp.ts
```

Do not use `lib` as a dumping ground.

Avoid vague files such as:

```text
helper.ts
helpers.ts
functions.ts
common.ts
misc.ts
```

If code belongs to a specific feature, keep it inside that feature.

---

# Types

Global shared types may live inside:

```text
src/types/
```

Feature-specific types belong inside their feature.

Avoid creating unnecessary types when TypeScript can infer the type.

Prefer inferred types from:

- Drizzle schemas
- Validation schemas
- Existing function contracts

when practical.

---

# Error Handling

Handle expected errors explicitly.

Examples:

- Invalid OTP
- Unauthorized access
- Validation errors
- Registration already submitted
- Registration not found

Do not silently swallow errors.

Avoid empty catch blocks.

Do not expose sensitive server errors directly to users.

User-facing errors must be understandable and written in Bahasa Indonesia.

---

# Loading and Empty States

Interactive application features should handle:

- Loading states
- Empty states
- Error states

Do not assume that every query always returns data.

Examples:

```text
Tidak ada pendaftar
Tidak ada berita
Pendaftaran belum dimulai
Memuat data...
Terjadi kesalahan
```

Use appropriate PrimeReact components when available.

---

# Naming

Use clear and descriptive names.

Prefer:

```text
getRegistrationById()
saveRegistrationDraft()
submitRegistration()
updateRegistrationStatus()
```

Avoid vague names:

```text
handle()
process()
data()
thing()
doStuff()
```

Use names that describe the domain and operation.

---

# TypeScript

Use TypeScript correctly.

Do not use `any` unless there is a clear and unavoidable reason.

Do not silence TypeScript errors with unnecessary casts.

Avoid:

```ts
as any
```

Fix the underlying type problem whenever possible.

Prefer type inference when the type is obvious.

Do not create interfaces or types solely to make the code look more architected.

---

# Environment Variables

Sensitive configuration must use environment variables.

Never expose:

- Database credentials
- Email provider credentials
- OTP secrets
- Authentication secrets
- API keys

to Client Components.

Do not prefix sensitive environment variables with `NEXT_PUBLIC_`.

---

# Dependencies

Before adding a dependency:

1. Check whether the functionality already exists in the project.
2. Check whether Next.js, React, PrimeReact, or the selected authentication solution already provides the required functionality.
3. Add a dependency only when it provides meaningful value.

Avoid adding multiple libraries that solve the same problem.

Do not install dependencies without a clear reason.

---

# Existing Code

Before creating new code:

1. Search for existing components.
2. Search for existing utilities.
3. Search for existing feature logic.
4. Reuse existing patterns when appropriate.

Do not duplicate functionality.

---

# Do Not Overengineer

This is an MVP.

Do not introduce complexity for hypothetical future requirements.

Avoid implementing:

- Microservices
- Event buses
- CQRS
- Repository patterns
- Service layers
- Generic CRUD frameworks
- Complex dependency injection
- Plugin architectures
- Premature caching layers
- Complex permission engines

unless explicitly required.

The preferred solution is usually the simplest solution that correctly solves the current requirement.

---

# Before Making Changes

Before implementing a feature:

1. Identify the relevant feature domain.
2. Check existing code.
3. Follow the current architecture.
4. Keep the change scoped to the requested feature.
5. Avoid unrelated refactoring.

Do not rewrite unrelated code simply because another implementation style looks cleaner.

---

# Completion Checklist

Before considering a task complete, verify:

- Does the implementation work?
- Is the solution appropriate for an MVP?
- Is the code placed in the correct feature?
- Is the Server/Client boundary correct?
- Is the database accessed only server-side?
- Are Server Actions authorized?
- Is user ownership validated?
- Is client input validated server-side?
- Are existing components reused where possible?
- Did the implementation avoid unnecessary dependencies?
- Did the implementation avoid unnecessary abstractions?
- Is all user-facing text written in Bahasa Indonesia?
- Is all source code written in English?

---

# Final Rule

When choosing between a complex architecture and a simple implementation:

> Prefer the simple implementation unless complexity is clearly justified by a real requirement.

Build what the project needs now.

Do not build infrastructure for problems the project does not currently have.