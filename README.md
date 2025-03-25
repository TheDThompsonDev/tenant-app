![image](https://github.com/user-attachments/assets/80481fb6-6f4e-4fac-8cbf-ee575f1a94af)


# Tenants face delays, security concerns, and communication gaps in modern apartment living.

## Our portal streamlines leasing with digital signatures, automates smart lock access, and enables one-tap reporting for disturbances. By integrating AI escalation, smart package lockers, and guest parking permits, we boost tenant satisfaction and retention.

# Technologies Used

<img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/appwrite/appwrite-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />

## Docs for this project

| Next.js                               | Appwrite                                  | Supabase                                    | React.js                         |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------- | -------------------------------- |
| [Next Docs ](https://nextjs.org/docs) | [Appwrite Docs](https://appwrite.io/docs) | [Supabase Docs ](https://supabase.com/docs) | [React Docs](https://react.dev/) |

## Team Contributors To The Project

<table style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
  <tr style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%;">
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/casacava/">
        <img src="https://github.com/user-attachments/assets/72674182-94f6-45bf-bbe6-7f8cef92338d" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Cass Cavazos</b></sub>
      </a>
    </td>
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/joeaguado/">
        <img src="https://github.com/user-attachments/assets/ed822669-8b90-4d8e-bd15-82513aaffe3e" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Joe Aguado</b></sub>
      </a>
    </td>
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/damianpad/">
        <img src="https://github.com/user-attachments/assets/44d0ee64-babe-4c43-a252-79daac03058e" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Damian Padilla</b></sub>
      </a>
    </td>
    </tr>
   <tr style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%;">
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/tatibertazoli/">
        <img src="https://github.com/user-attachments/assets/288e8740-1f5a-4e4d-a172-da2558ea7ac1" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Tatiana Bertazoli</b></sub>
      </a>
    </td>
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/andrew-sm1th/">
        <img src="https://github.com/user-attachments/assets/bc9f85bd-06a2-49b9-a14f-6e37715f069d" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Andrew Smith</b></sub>
      </a>
    </td>
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/staci-southerland-649549a8/">
        <img src="https://github.com/user-attachments/assets/9660d25b-1111-41e5-8a90-9f91ec928533" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Staci Southerland</b></sub>
      </a>
    </td>
       </tr>
   <tr style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%;">
    <td align="center" width="200" style="flex: 1; max-width: 200px; padding: 10px;">
      <a href="https://www.linkedin.com/in/dthompsondev/">
        <img src="https://github.com/user-attachments/assets/8dc36ff7-8e09-4ea0-9ee1-e9bc3062745b" style="width: 100%; max-width: 150px; height: auto; border-radius: 50%;" /><br />
        <sub><b>Danny Thompson</b></sub>
        <br /><sub>(Tech Lead)</sub>
      </a>
    </td>
  </tr>
</table>
# 🏢 Tenant App Documentation

## 📑 Table of Contents

1. [📌 Introduction](#introduction)
2. [🏗️ Architecture Overview](#architecture-overview)
3. [🛠️ Technology Stack](#technology-stack)
4. [💾 Database Schema](#database-schema)
5. [🔐 Authentication Flow](#authentication-flow)
6. [✨ Key Features](#key-features)
7. [🔌 API Structure](#api-structure)
8. [🧩 Component Structure](#component-structure)
9. [🔄 Data Flow](#data-flow)
10. [🚀 Deployment](#deployment)

---

## 📌 Introduction

Tenant App is a comprehensive property management application designed to streamline interactions between property managers and tenants. The application provides a modern solution to common property management challenges, offering features such as digital lease signing, smart door access, package locker management, guest parking passes, noise reporting, and messaging.

---

## 🏗️ Architecture Overview

The application follows a modern web architecture using Next.js, which provides server-side rendering capabilities and API routes. The architecture can be broken down into the following key components:

| Component | Description |
|-----------|-------------|
| **Frontend** | React-based UI components using Next.js framework |
| **Backend API** | Next.js API routes for handling server-side logic |
| **Database** | PostgreSQL database managed through Prisma ORM |
| **Authentication** | Appwrite for user authentication and management |
| **PDF Generation** | PDF-lib for lease document generation |

The application follows a client-server architecture where the frontend communicates with the backend API, which in turn interacts with the database and external services.

---

## 🛠️ Technology Stack

### 🖥️ Frontend

| Technology | Version/Description |
|------------|---------------------|
| **Framework** | Next.js 15.2.1 |
| **UI Library** | React 19.0.0 |
| **Form Management** | @tanstack/react-form |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS |

### ⚙️ Backend

| Technology | Version/Description |
|------------|---------------------|
| **API Routes** | Next.js API routes |
| **Database ORM** | Prisma 6.5.0 |
| **Database** | PostgreSQL (via Postgres.js) |
| **Authentication** | Appwrite |
| **PDF Generation** | PDF-lib |

### 🧰 Development Tools

| Tool | Purpose |
|------|--------|
| **TypeScript** | Type checking |
| **Jest** | Testing framework |
| **React Testing Library** | Component testing |
| **ESLint** | Code linting |

---

## 💾 Database Schema

The application uses a PostgreSQL database with the following key models:

### 👤 User

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| appwriteId | String | External auth ID |
| firstName | String | User's first name |
| lastName | String | User's last name |
| email | String | User's email address |
| phoneNumber | String | User's phone number |
| apartmentNumber | String | Apartment identifier |
| image | String | Profile image URL |
| leaseId | String | Associated lease ID |
| userRole | Enum | User role (ADMIN, TENANT, etc.) |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |

**Relationships**: Has one Lease, has many ParkingPass, SmartDoorKey, PackageLocker, and Notification records

### 🏢 Property

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| managementCompanyName | String | Property management company |
| addressId | String | Associated address ID |
| propertyName | String | Name of the property |
| phoneNumber | String | Contact phone number |
| email | String | Contact email |
| websiteURL | String | Property website |
| propertyImage | String | Property image URL |
| description | String | Property description |
| propertyManagerName | String | Manager's name |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |

**Relationships**: Has one Address, has many Amenities and Leases

### 📝 Lease

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| propertyId | String | Associated property |
| firstName | String | Tenant's first name |
| lastName | String | Tenant's last name |
| email | String | Tenant's email |
| apartmentNumber | String | Apartment identifier |
| pets | Boolean | Whether pets are allowed |
| governmentId | String | Government ID reference |
| socialSecurity | String | SSN reference |
| leaseStart | DateTime | Lease start date |
| leaseEnd | DateTime | Lease end date |
| monthlyRent | Decimal | Monthly rent amount |
| securityDeposit | Decimal | Security deposit amount |
| leaseStatus | Enum | Status (ACTIVE, EXPIRED, PENDING) |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |

**Relationships**: Belongs to Property, has many Users

### 🚗 ParkingPass

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| userId | String | Associated user ID |
| make | String | Vehicle make |
| model | String | Vehicle model |
| color | String | Vehicle color |
| licensePlate | String | License plate number |
| parkingPassNumber | String | Unique pass identifier |
| createdAt | DateTime | Record creation timestamp |
| expirationDate | DateTime | Pass expiration date |

**Relationships**: Belongs to User

### 🔔 Notification

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| senderId | String | Sender user ID |
| receiverId | String | Receiver user ID |
| notificationType | Enum | Type of notification |
| subject | String | Notification subject |
| message | String | Notification content |
| status | Enum | Status (READ, UNREAD) |
| priority | Enum | Priority (LOW, MEDIUM, HIGH) |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |

**Relationships**: Belongs to sender User and receiver User

### 🔑 SmartDoorKey

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| userId | String | Associated user ID |
| accessCode | String | Door access code |
| createdAt | DateTime | Record creation timestamp |
| expirationDate | DateTime | Code expiration date |
| lastAccessed | DateTime | Last access timestamp |
| lockStatus | Boolean | Lock status (locked/unlocked) |

**Relationships**: Belongs to User

### 📦 PackageLocker

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| userId | String | Associated user ID |
| lockerNumber | String | Locker identifier |
| packageLockerStatus | Enum | Status (READY_FOR_PICKUP, PICKED_UP) |
| accessCode | String | Locker access code |
| createdAt | DateTime | Record creation timestamp |
| lastAcessed | DateTime | Last access timestamp |

**Relationships**: Belongs to User

### 📍 Address

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| address | String | Street address |
| suiteNumber | Int | Suite or apartment number |
| city | String | City name |
| state | String | State or province |
| zipCode | String | Postal code |
| country | String | Country name |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |

**Relationships**: Has one Property

### 🏊‍♂️ Amenity

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| amenityName | String | Name of the amenity |
| description | String | Amenity description |
| location | String | Location within property |
| availabilityStatus | Enum | Status (AVAILABLE, UNAVAILABLE) |
| requiresAccessCode | Boolean | Whether access code is required |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Record update timestamp |
| propertyId | String | Associated property ID |

**Relationships**: Belongs to Property

### 📞 ContactUs

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| fullName | String | Contact name |
| email | String | Contact email |
| phoneNumber | String | Contact phone |
| subject | String | Message subject |
| message | String | Message content |
| createdAt | DateTime | Record creation timestamp |

---

## 🔐 Authentication Flow

The application uses Appwrite for authentication. The authentication flow works as follows:

| Step | Description |
|------|-------------|
| 1 | Users register or log in through the login page |
| 2 | Authentication state is managed through the AuthContext |
| 3 | User tokens are stored and managed for authenticated API requests |
| 4 | Different user roles determine access to different features |

---

## ✨ Key Features

### 📄 1. Digital Lease Management
- Generate and sign lease agreements digitally
- Track lease status (ACTIVE, EXPIRED, PENDING)
- Store lease details including rent, security deposit, and lease terms

### 🚪 2. Smart Door Access
- Generate unique access codes for door entry
- Manage expiration dates for temporary access
- Track door access history

### 📦 3. Package Locker Management
- Assign lockers for package delivery
- Generate access codes for package pickup
- Track package status (READY_FOR_PICKUP, PICKED_UP)

### 🚗 4. Guest Parking Pass
- Generate temporary parking passes for guests
- Track vehicle information and pass expiration
- Verify passes through unique codes

### 🔔 5. Notification System
- Send and receive notifications between tenants and management
- Support different notification types (COMPLAINT, REPAIR, NOISE_COMPLAINT, GENERAL, PACKAGE, PARKING_PASS, LEASE, MANAGEMENT)
- Prioritize notifications (LOW, MEDIUM, HIGH)

### 💬 6. Messaging System
- Direct messaging between tenants and property management
- Thread-based conversation tracking
- Message search functionality

### 🏊‍♂️ 7. Property Amenity Management
- Track property amenities and their availability
- Manage access codes for restricted amenities

---

## 🔌 API Structure

The application uses Next.js API routes organized by feature:

| API Endpoint | Purpose |
|--------------|--------|
| `/api/admin/notifications` | Manage administrative notifications |
| `/api/contact` | Handle contact form submissions from prospective tenants |
| `/api/lease` | Manage lease creation, signing, and retrieval |
| `/api/noise` | Handle noise complaint submissions and tracking |
| `/api/notifications` | Manage general notification system for all users |
| `/api/parking` | Handle guest parking pass creation and validation |
| `/api/property` | Manage property information and amenities |
| `/api/users` | Handle user registration, profile management, and authentication |

---

## 🧩 Component Structure

The application uses a component-based architecture with the following key components:

### 📏 Layout Components
- `Header`: Main navigation header
- `Footer`: Site footer with links and information
- `Layout`: Main layout wrapper for consistent page structure

### 📄 Page Components
- `LandingPage`: Homepage with marketing content
- `Dashboard`: Tenant dashboard with access to features
- `Login`: User authentication page
- `Register`: New user registration

### ⚙️ Feature Components
- `FeatureHighlight`: Showcases key application features
- `FeatureCard`: Individual feature display card
- `ContactUs`: Contact form for prospective tenants
- `ParkingPassForm`: Form for creating guest parking passes
- `SmartDoorAccess`: Interface for door access management
- `PackageLockerAccess`: Interface for package locker management
- `LeaseManagement`: Interface for lease viewing and signing
- `Messaging`: Messaging interface for tenant-management communication

### 🎨 UI Components
- `Hero`: Hero section for landing page
- `HeroPool`: Secondary hero section with image

---

## 🔄 Data Flow

### 👤 User Registration and Authentication

| Step | Description |
|------|-------------|
| 1 | User submits registration form |
| 2 | Data is sent to Appwrite for authentication |
| 3 | User record is created in the database |
| 4 | Authentication token is returned and stored |
| 5 | User is redirected to dashboard |

### 🚗 Guest Parking Pass Creation

| Step | Description |
|------|-------------|
| 1 | Tenant fills out parking pass form |
| 2 | Form data is validated client-side |
| 3 | Data is sent to `/api/parking` endpoint |
| 4 | Parking pass record is created in database |
| 5 | Unique pass code is generated and returned |
| 6 | Pass details are displayed to tenant |

### 🔔 Notification Flow

| Step | Description |
|------|-------------|
| 1 | Admin creates notification through admin interface |
| 2 | Notification is stored in database with appropriate type and priority |
| 3 | Notification appears in tenant's notification list |
| 4 | Tenant can mark notification as read |
| 5 | Notification status is updated in database |

### 📄 Lease Generation

| Step | Description |
|------|-------------|
| 1 | Admin enters lease details for tenant |
| 2 | Data is sent to lease generation API |
| 3 | PDF lease document is created using PDF-lib |
| 4 | Lease record is created in database |
| 5 | Tenant receives notification about new lease |
| 6 | Tenant can view and digitally sign lease |

---

## 🚀 Deployment

The application is designed to be deployed using modern cloud infrastructure:

| Component | Deployment Solution |
|-----------|---------------------|
| **Frontend and API** | Next.js application on platforms like Vercel or Netlify |
| **Database** | PostgreSQL database hosted on a cloud provider (e.g., Supabase, AWS RDS, Digital Ocean) |
| **Authentication** | Appwrite services for user authentication |
| **File Storage** | Cloud storage for property images and documents |
| **Environment Variables** | Configured for different environments (development, production) |

---



## Jira/Git Workflow

### Choose a Jira ticket

- In Jira, find a ticket to work on
- Assign it to yourself and mark it as 'In Progress'

### Local work

- Make sure your local repo is up to date (make sure you have main checked out locally first):

  ```bash
  git pull origin main
  ```

- Create a new branch locally. Make sure to only use the Jira ticket:

  ```bash
  git checkout -b AP-12345
  ```

- Make your changes and then stage them. Commits should be either feat, chore, or fix. Make sure the Jira ticket is at the end in parentheses:

  ```bash
  git commit -m 'feat: add super awesome modal (AP-12345)'
  ```

  or...

  ```bash
  git commit -m "chore: add bg color for super awesome modal (AP-12345)"
  ```

  or...

  ```bash
  git commit -m "fix: center modal (AP-12345)"
  ```

### Push to GitHub and make a pull request

- Sync the remote repo with with your local repo and your new branch:

  ```bash
  git push origin AP-12345
  ```

- Under (https://github.com/TheDThompsonDev/tenant-app/branches) you should find the branch you just pushed. Click on it.
- Click "Compare & pull request".
- Make sure base is set to main at the top.
- Adjust the title as needed and add a description.
- Add reviewers (2) by clicking the gear.
- Click "Create pull request".
- Once the PR is approved, the assignee (you) should complete the pull request by merging to main and delete the branch.
- Go back to Jira and change ticket status to done.

## Color Branding

In order to use the in-line color schema within any front-end component, under `className`, use one of the following color configuration names:

- `primary-green`
- `secondary-blue`
- `alternate-green`
- `primary-black`
- `secondary-dark-gray`
- `alternate-gray`
- `alternate-light-gray`

These can be applied to background colors, text colors, and border colors using Tailwind's utility classes.

### Example Usage

#### Background Color

```jsx
<div className='bg-primary-green p-4'>
  This div has a primary green background.
</div>
```

#### What's the Difference Between Some of These API Routes?
`/api/generate-and-send/route.js`

This generates a lease and sends it to Documenso.
It's triggered when admin fills out the lease form.

Steps:
- Collects lease details (landlord, tenant, address, rent, dates).
- Generates a PDF using pdf-lib.
- Sends the PDF to Documenso.
- Triggers an email to the tenant (once sending is successful).
- Redirects to /confirmation?id={documentId} after successful submission.

`/api/document-status/route.js`
Purpose: Fetches the current status of a lease document from Documenso.
Triggered by: The /confirmation page to check if the tenant has signed.

Steps:
- Takes a documentId and queries Documenso.
- Returns the status (DRAFT, PENDING SIGNATURE, SIGNED, etc.).
- Used for displaying lease progress on the dashboard.
