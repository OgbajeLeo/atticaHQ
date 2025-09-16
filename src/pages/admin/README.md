# Admin Dashboard

This is the admin dashboard for the Attica property management system. It provides a comprehensive interface for managing properties, viewing statistics, and handling tour requests.

## Features

- **Collapsible Sidebar**: Responsive sidebar that can be collapsed/expanded
- **Authentication**: Protected routes with login/logout functionality
- **Dashboard Overview**: Statistics cards showing key metrics
- **Property Management**: View and manage newly listed properties
- **Tour Requests**: Handle client tour requests
- **Responsive Design**: Works on desktop and mobile devices

## Authentication

### Default Login Credentials

- **Email**: `admin@attica.com`
- **Password**: `admin123`

### Login Process

1. Navigate to `/admin/login`
2. Enter the admin credentials
3. Upon successful login, you'll be redirected to `/admin`

## Components Structure

```
src/pages/admin/
├── index.tsx                 # Main dashboard component
├── AdminLogin.tsx           # Login page
├── components/
│   ├── AdminSidebar.tsx     # Collapsible sidebar navigation
│   └── DashboardContent.tsx # Main dashboard content with tables
└── README.md               # This file

src/components/auth/
└── ProtectedRoute.tsx      # Route protection wrapper

src/contexts/
└── AdminAuthContext.tsx    # Authentication context
```

## Usage

### Accessing the Dashboard

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/login`
3. Login with the default credentials
4. You'll be redirected to the main dashboard

### Sidebar Navigation

- **Dashboard**: Main overview with statistics and tables
- **Manage Property**: Property management (to be implemented)
- **Messages**: Message management (to be implemented)
- **Account Settings**: User settings (to be implemented)
- **Logout**: Sign out of the admin panel

### Dashboard Features

- **Statistics Cards**: View total properties, sales, rentals, and tour requests
- **Newly Listed Table**: Browse recently added properties with details
- **Tour Requests Table**: Manage client tour requests

## Customization

### Adding New Menu Items

Edit `src/pages/admin/components/AdminSidebar.tsx` and add new items to the `menuItems` array:

```typescript
const menuItems = [
  // ... existing items
  {
    id: 'new-feature',
    label: 'New Feature',
    icon: YourIcon,
    active: false
  }
];
```

### Modifying Statistics

Update the `stats` array in `src/pages/admin/components/DashboardContent.tsx`:

```typescript
const stats = [
  {
    title: 'Your Custom Stat',
    value: '1,234',
    color: 'bg-blue-100'
  }
  // ... other stats
];
```

### Adding New Tables

Create new table components in `src/pages/admin/components/` and import them in `DashboardContent.tsx`.

## Security Notes

- The current implementation uses mock authentication
- Replace the mock login logic in `AdminAuthContext.tsx` with real API calls
- Implement proper JWT token handling
- Add role-based access control if needed
- Consider adding CSRF protection for production use

## Styling

The dashboard uses Tailwind CSS for styling. The color scheme is based on amber/brown tones to match the Attica brand:

- Primary: `amber-600`, `amber-700`, `amber-800`, `amber-900`
- Background: `gray-50`, `gray-100`
- Text: `gray-700`, `gray-800`, `gray-900`
- Accent: `pink-100` for statistics cards
