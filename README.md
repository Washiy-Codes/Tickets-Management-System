# Multi-Tenant Ticket Management System

A production-grade, full-stack ticketing application built with the **Next.js App Router**, **Prisma ORM**, and **TypeScript**. This platform features a robust multi-tenant architecture allowing users to create organizations, manage team memberships, and handle dynamic role-based access controls.

##  Key Features

- **Multi-Tenant Architecture**: Dynamic organization creation and switching with isolated team workspaces.
- **Role-Based Access Control (RBAC)**: Granular permission schemes (e.g., `canDeleteTicket`, `isAdmin`) managed securely via Next.js Server Actions.
- **Advanced Data Pipelines**: Optimized data fetching featuring parallel processing (`Promise.all`) and transactional integrity (`prisma.$transaction`).
- **Strict Type Safety**: End-to-end type safety utilizing explicit Prisma payload intersection mappings (`Prisma.TicketGetPayload`).
- **Server-Driven UI**: Secure routing guards, contextual breadcrumbs, and instantaneous UI updates using Next.js caching algorithms (`revalidatePath`).

##  Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Database ORM**: Prisma Client (PostgreSQL / Supabase)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Language**: TypeScript (Strict Mode)
- **Validation**: Zod

##  Architecture & File Structure

The project follows a scalable, feature-driven folder structure:

```text
├── components/                # Shared global UI elements (cards, forms, loaders)
├── features/                  # Domain-driven feature modules
│   ├── auth/                  # Authentication states, guards, and ownership helpers
│   ├── organization/          # Multi-tenant state logic, mutations, and actions
│   ├── membership/            # Team assignment operations and permissions queries
│   └── tickets/               # Ticketing queries, forms, views, and contextual actions
```

##  Core Technical Implementations

### 1. Secure Ownership & Permission Guards
The core security layer implements a generic entity ownership check alongside organization membership verification to evaluate user actions dynamically:

```typescript
// features/auth/utils/is-owner.ts
type Entity = { userId?: string | null };

export const isOwner = async (
  authUser: User | null | undefined, 
  entity: Entity | null | undefined
): Promise<boolean> => {
  if (!authUser || !entity?.userId) return false;
  return entity.userId === authUser.id;
};
```

### 2. Transactional Multi-Tenant Mutation Pipeline
Organizations are spun up using safe database transactions that automatically assign the creator as an `ADMIN` while deactivating non-primary historical workspace scopes:

```typescript
await prisma.\$transaction(async (tx) => {
  const organization = await tx.organization.create({
    data: {
      ...data,
      memberships: {
        create: { userId: user.id, isActive: true, membershipRole: "ADMIN" }
      }
    }
  });
  
  await tx.membership.updateMany({
    where: { userId: user.id, organizationId: { not: organization.id } },
    data: { isActive: false }
  });
});
```

### 3. Highly Optimized Data Transformations
Data layer reads inject runtime metrics asynchronously before delivering content structures downstream to standard layout presentations:

```typescript
const list: TransformedTicket[] = await Promise.all(
  tickets.map(async (ticket) => {      
    const ticketIsOwner = await isOwner(user, ticket);
    const organization = organizationsByUser.find(org => org.id === ticket.organizationId);

    return {
      ...ticket,
      isOwner: ticketIsOwner,
      permissions: {
        canDeleteTicket: ticketIsOwner && !!organization?.membershipByUser?.canDeleteTicket,
      },
    };
  })
);
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ or 20+
- A running PostgreSQL database (e.g., Supabase instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd ticket-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables inside a `.env` file:
   ```env
   DATABASE_URL="postgresql://..."
   AUTH_SECRET="your-next-auth-secret"
   ```

4. Push the database schema layout:
   ```bash
   npx prisma db push
   ```

5. Run the local development server environment:
   ```bash
   npm run dev
   ```

##  License
This project is open-source and available under the [MIT License](LICENSE).
