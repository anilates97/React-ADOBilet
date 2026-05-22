# ADO Bilet

ADO Bilet is a React-based event ticket platform built with Supabase, Redux Toolkit, React Router, protected user/admin routes, event browsing, seat selection, ticket purchasing, and admin management screens.

The project was redesigned from a basic event listing interface into a fuller ticket platform experience with a stronger public UI, protected ticket flow, Supabase-backed data operations, and an admin panel for managing platform content.

---

## About the Project

ADO Bilet focuses on the main flows of an event ticketing product:

- Browsing upcoming and past events
- Searching events by keyword, date, and location
- Viewing event details
- Registering and signing in users
- Selecting seats
- Buying tickets
- Managing events and ticket data from an admin panel

The application uses React for the interface, Redux Toolkit for async state management, React Router for page routing, and Supabase for authentication and database operations.

---

## Main Features

- React 18 application structure
- Supabase Auth integration
- Supabase database operations
- Redux Toolkit store and async thunks
- React Router page routing
- Protected user ticket routes
- Protected admin routes
- Event listing and filtering
- Event detail pages
- Category-based event pages
- Upcoming and past event separation
- Seat selection flow
- Ticket purchase flow
- Sold seat update logic
- Ticket success page
- Admin dashboard layout
- Admin CRUD modules
- Demo fallback events for portfolio presentation
- Event image fallback handling
- Loading states with React Spinners
- Responsive redesigned UI

---

## Screenshots

### Home Page

![Home Page](src/assets/screenshots/home-page.png)

### Event Details

![Event Details](src/assets/screenshots/event-details.png)

### Ticket Selection

![Ticket Selection](src/assets/screenshots/ticket-selection.png)

### Admin Dashboard

![Admin Dashboard](src/assets/screenshots/admin-dashboard.png)

---

## User Features

Users can browse events, open event detail pages, register, log in, select a seat, and complete the ticket purchase flow.

The ticket page checks whether the event is still available for sale, prevents ticket purchase for past events, updates seat availability, and redirects the user to a success page after purchase.

---

## Admin Features

The admin panel includes management screens for:

- Categories
- Artists
- Events
- Event photos
- Seats
- Users
- Ticket categories
- Ticket prices
- Ticket assignment

Admin pages are protected with a route guard. The app checks the active Supabase session and then verifies the user's role from the database before allowing access to admin screens.

---

## Tech Stack

### Frontend

- React
- JavaScript
- React Router DOM
- Redux Toolkit
- React Redux
- Tailwind CSS
- CSS
- Swiper
- React Icons
- React Spinners
- Formik
- Yup

### Backend / Data

- Supabase
- Supabase Auth
- Supabase Database
- Environment-based Supabase configuration

### Integrations

- Google Maps API package
- Axios
- UUID

### Tools

- Git
- GitHub
- Vercel
- npm

---

## Project Structure

```text
React-ADOBilet
├── public
├── src
│   ├── assets
│   ├── backend
│   │   ├── admin
│   │   ├── artists
│   │   ├── categories
│   │   ├── events
│   │   ├── seats
│   │   ├── tickets
│   │   ├── user
│   │   └── supabase.js
│   ├── components
│   ├── pages
│   │   └── admin
│   ├── redux
│   ├── App.js
│   ├── eventUtils.js
│   └── index.js
├── package.json
└── README.md
```

---

## Routing

The application uses React Router for public, user-protected, and admin-protected pages.

Main public routes include:

```text
/
```

```text
/login
```

```text
/register
```

```text
/details/:id
```

```text
/events
```

```text
/events/:categoryName
```

```text
/pastevents
```

```text
/contact
```

User-protected ticket route:

```text
/event/tickets/:id
```

Admin routes include:

```text
/admin/Dashboard
```

```text
/admin/Categories
```

```text
/admin/Events
```

```text
/admin/Artists
```

```text
/admin/Seats
```

```text
/admin/Users
```

```text
/admin/TicketCategories
```

---

## Supabase Configuration

Supabase is configured through environment variables.

Create a `.env` file in the project root:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

The app expects both values to exist before creating the Supabase client.

---

## Data Flow

ADO Bilet keeps most remote data operations under the `src/backend` folder.

Redux Toolkit async thunks are used for:

- Fetching categories
- Fetching artists
- Fetching events with artists and categories
- Fetching event photos
- Fetching seats
- Fetching ticket categories
- Buying tickets
- Signing in and signing up users
- Fetching users
- Running admin create, update, and delete operations

The Redux store keeps event data, selected seat, user session, user profile, ticket categories, admin data, seats, sold tickets, and event photos in a shared state tree.

---

## Ticket Purchase Flow

The ticket purchase page loads the selected event, available seats, and ticket data.

The user selects a seat from the seat map. After selection, the page shows:

- Selected seat
- Ticket category
- Price
- Venue
- Event image

When the user buys a ticket, the app updates the seat availability and marks the related ticket pricing record as sold.

Past events are blocked from ticket purchase.

---

## Demo Event Support

The project includes a local demo event utility for portfolio presentation.

If an event is part of the demo list, the app can display fallback event details, images, photos, and ticket data without depending completely on live Supabase records.

This keeps the public experience stable while still supporting real Supabase-backed data flows.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/anilates97/React-ADOBilet.git
cd React-ADOBilet
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

### Start the development server

```bash
npm start
```

### Build for production

```bash
npm run build
```

---

## Development Notes

- Supabase client creation is isolated in `src/backend/supabase.js`.
- Redux Toolkit is used for async data fetching and state updates.
- User and admin access are handled with separate protected route components.
- Admin access depends on the user's `authenticated_role` value from the database.
- Ticket purchase updates seat availability and ticket sale state.
- Demo events are merged with Supabase events for a more complete portfolio presentation.
- Event image helpers provide fallback visuals when remote image data is missing.
- The project still uses Create React App through `react-scripts`.

---

## Current Limitations

- Some admin and ticket flows depend on the expected Supabase table structure.
- Payment processing is simulated through ticket and seat state updates.
- The project does not include a real payment gateway.
- Demo event data is included for presentation stability.
- Some older naming conventions from the original team project remain in the codebase.

---

## Developer

**Anıl Hasan Ateş**

- LinkedIn: https://linkedin.com/in/anilates97
- GitHub: https://github.com/anilates97
- Portfolio: https://anilates.vercel.app/
