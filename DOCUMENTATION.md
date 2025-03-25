# Tenant App Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [Authentication Flow](#authentication-flow)
6. [Key Features](#key-features)
7. [API Structure](#api-structure)
8. [Component Structure](#component-structure)
9. [Data Flow](#data-flow)
10. [Deployment](#deployment)

## Introduction

Tenant App is a comprehensive property management application designed to streamline interactions between property managers and tenants. The application provides a modern solution to common property management challenges, offering features such as digital lease signing, smart door access, package locker management, guest parking passes, noise reporting, and messaging.

## Architecture Overview

The application follows a modern web architecture using Next.js, which provides server-side rendering capabilities and API routes. The architecture can be broken down into the following key components:

- **Frontend**: React-based UI components using Next.js framework
- **Backend API**: Next.js API routes for handling server-side logic
- **Database**: PostgreSQL database managed through Prisma ORM
- **Authentication**: Appwrite for user authentication and management
- **PDF Generation**: PDF-lib for lease document generation

The application follows a client-server architecture where the frontend communicates with the backend API, which in turn interacts with the database and external services.

## Technology Stack

### Frontend
- **Framework**: Next.js 15.2.1
- **UI Library**: React 19.0.0
- **Form Management**: @tanstack/react-form
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

### Backend
- **API Routes**: Next.js API routes
- **Database ORM**: Prisma 6.5.0
- **Database**: PostgreSQL (via Postgres.js)
- **Authentication**: Appwrite
- **PDF Generation**: PDF-lib

### Development Tools
- **Type Checking**: TypeScript
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint

## Database Schema

The application uses a PostgreSQL database with the following key models:

### User
Stores information about users including tenants and administrators.
- Fields: id, appwriteId, firstName, lastName, email, phoneNumber, apartmentNumber, image, leaseId, userRole, createdAt, updatedAt
- Relationships: Has one Lease, has many ParkingPass, SmartDoorKey, PackageLocker, and Notification records

### Property
Stores information about properties managed by the system.
- Fields: id, managementCompanyName, addressId, propertyName, phoneNumber, email, websiteURL, propertyImage, description, propertyManagerName, createdAt, updatedAt
- Relationships: Has one Address, has many Amenities and Leases

### Lease
Stores lease agreements between tenants and properties.
- Fields: id, propertyId, firstName, lastName, email, apartmentNumber, pets, governmentId, socialSecurity, leaseStart, leaseEnd, monthlyRent, securityDeposit, leaseStatus, createdAt, updatedAt
- Relationships: Belongs to Property, has many Users

### ParkingPass
Stores guest parking pass information.
- Fields: id, userId, make, model, color, licensePlate, parkingPassNumber, createdAt, expirationDate
- Relationships: Belongs to User

### Notification
Stores notifications and messages between users.
- Fields: id, senderId, receiverId, notificationType, subject, message, status, priority, createdAt, updatedAt
- Relationships: Belongs to sender User and receiver User

### SmartDoorKey
Stores smart door access codes for tenants.
- Fields: id, userId, accessCode, createdAt, expirationDate, lastAccessed, lockStatus
- Relationships: Belongs to User

### PackageLocker
Stores package locker information for tenants.
- Fields: id, userId, lockerNumber, packageLockerStatus, accessCode, createdAt, lastAcessed
- Relationships: Belongs to User

### Address
Stores address information for properties.
- Fields: id, address, suiteNumber, city, state, zipCode, country, createdAt, updatedAt
- Relationships: Has one Property

### Amenity
Stores information about property amenities.
- Fields: id, amenityName, description, location, availabilityStatus, requiresAccessCode, createdAt, updatedAt, propertyId
- Relationships: Belongs to Property

### ContactUs
Stores contact form submissions from prospective tenants.
- Fields: id, fullName, email, phoneNumber, subject, message, createdAt

## Authentication Flow

The application uses Appwrite for authentication. The authentication flow works as follows:

1. Users register or log in through the login page
2. Authentication state is managed through the AuthContext
3. User tokens are stored and managed for authenticated API requests
4. Different user roles (ADMIN, TENANT, PROSPECTIVE_TENANT, PROPERTY_MANAGER, LEASING_AGENT) determine access to different features

## Key Features

### 1. Digital Lease Management
- Generate and sign lease agreements digitally
- Track lease status (ACTIVE, EXPIRED, PENDING)
- Store lease details including rent, security deposit, and lease terms

### 2. Smart Door Access
- Generate unique access codes for door entry
- Manage expiration dates for temporary access
- Track door access history

### 3. Package Locker Management
- Assign lockers for package delivery
- Generate access codes for package pickup
- Track package status (READY_FOR_PICKUP, PICKED_UP)

### 4. Guest Parking Pass
- Generate temporary parking passes for guests
- Track vehicle information and pass expiration
- Verify passes through unique codes

### 5. Notification System
- Send and receive notifications between tenants and management
- Support different notification types (COMPLAINT, REPAIR, NOISE_COMPLAINT, GENERAL, PACKAGE, PARKING_PASS, LEASE, MANAGEMENT)
- Prioritize notifications (LOW, MEDIUM, HIGH)

### 6. Messaging System
- Direct messaging between tenants and property management
- Thread-based conversation tracking
- Message search functionality

### 7. Property Amenity Management
- Track property amenities and their availability
- Manage access codes for restricted amenities

## API Structure

The application uses Next.js API routes organized by feature:

### /api/admin
- `/notifications`: Manage administrative notifications

### /api/contact
- Handles contact form submissions from prospective tenants

### /api/lease
- Manages lease creation, signing, and retrieval

### /api/noise
- Handles noise complaint submissions and tracking

### /api/notifications
- Manages general notification system for all users

### /api/parking
- Handles guest parking pass creation and validation

### /api/property
- Manages property information and amenities

### /api/users
- Handles user registration, profile management, and authentication

## Component Structure

The application uses a component-based architecture with the following key components:

### Layout Components
- `Header`: Main navigation header
- `Footer`: Site footer with links and information
- `Layout`: Main layout wrapper for consistent page structure

### Page Components
- `LandingPage`: Homepage with marketing content
- `Dashboard`: Tenant dashboard with access to features
- `Login`: User authentication page
- `Register`: New user registration

### Feature Components
- `FeatureHighlight`: Showcases key application features
- `FeatureCard`: Individual feature display card
- `ContactUs`: Contact form for prospective tenants
- `ParkingPassForm`: Form for creating guest parking passes
- `SmartDoorAccess`: Interface for door access management
- `PackageLockerAccess`: Interface for package locker management
- `LeaseManagement`: Interface for lease viewing and signing
- `Messaging`: Messaging interface for tenant-management communication

### UI Components
- `Hero`: Hero section for landing page
- `HeroPool`: Secondary hero section with image

## Data Flow

### User Registration and Authentication
1. User submits registration form
2. Data is sent to Appwrite for authentication
3. User record is created in the database
4. Authentication token is returned and stored
5. User is redirected to dashboard

### Guest Parking Pass Creation
1. Tenant fills out parking pass form
2. Form data is validated client-side
3. Data is sent to `/api/parking` endpoint
4. Parking pass record is created in database
5. Unique pass code is generated and returned
6. Pass details are displayed to tenant

### Notification Flow
1. Admin creates notification through admin interface
2. Notification is stored in database with appropriate type and priority
3. Notification appears in tenant's notification list
4. Tenant can mark notification as read
5. Notification status is updated in database

### Lease Generation
1. Admin enters lease details for tenant
2. Data is sent to lease generation API
3. PDF lease document is created using PDF-lib
4. Lease record is created in database
5. Tenant receives notification about new lease
6. Tenant can view and digitally sign lease

## Deployment

The application is designed to be deployed using modern cloud infrastructure:

1. **Frontend and API**: Deployed as a Next.js application on platforms like Vercel or Netlify
2. **Database**: PostgreSQL database hosted on a cloud provider (e.g., Supabase, AWS RDS, Digital Ocean)
3. **Authentication**: Appwrite services for user authentication
4. **File Storage**: Cloud storage for property images and documents
5. **Environment Variables**: Configured for different environments (development, production)

---

This documentation provides a comprehensive overview of the Tenant App application, its architecture, features, and implementation details. For specific code-level documentation, refer to the inline comments and function documentation within the codebase.
