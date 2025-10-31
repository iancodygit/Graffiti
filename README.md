# Graffiti Maps 🎨

A mobile street art discovery app built with React Native/Expo - think Snap Map meets Instagram for graffiti!

## Features

### 🗺️ Interactive Map
- View graffiti pins on an interactive map
- Custom image-based markers showing thumbnail previews
- Tap markers to view pin details
- Map clustering support included

### 👤 User Profile
- Anonymous authentication using device ID (no signup required!)
- View liked and saved pins
- Instagram-style grid layout
- Editable username

### 🎯 Core Functionality (MVP)
- **Map View**: Browse street art locations with custom pin markers
- **Profile**: Track your liked pins and saved favorites
- **Mock Data**: Sample graffiti pins from NYC
- **Local Storage**: Likes and saves persist locally

## Tech Stack

- **Frontend**: React Native with Expo Router
- **Maps**: react-native-maps with clustering
- **Database**: PostgreSQL with Drizzle ORM (schema ready for backend)
- **CMS**: Notion API integration (for future admin use)
- **State**: AsyncStorage for local data persistence

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npx expo start --web --port 8080
```

3. Open the app:
- Press `w` to open in web browser
- Scan QR code with Expo Go app on mobile
- Press `a` for Android emulator
- Press `i` for iOS simulator

## Project Structure

```
├── app/
│   └── (tabs)/
│       ├── index.tsx       # Map screen
│       └── explore.tsx     # Profile screen
├── lib/
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Anonymous authentication
│   │   └── useGraffitiData.ts  # Data management
│   ├── types/              # TypeScript types
│   └── mock-data.ts        # Sample graffiti pins
├── shared/
│   └── schema.ts           # Database schema
└── components/             # Reusable UI components
```

## Current Features

**✅ Implemented:**
- Interactive map with graffiti pins
- Custom image markers
- Anonymous authentication (device ID based)
- User profile with liked/saved tabs
- Instagram-style photo grid
- Local data persistence
- Database schema ready for backend

**🚧 Coming Soon:**
- Backend API integration
- Photo carousel viewer
- Search and filters
- Camera integration for submissions
- Notion CMS sync for admin

## Database Schema

The app includes a complete PostgreSQL schema design:

- **graffiti_pins**: Street art locations with images, tags, and metadata
- **artists**: Artist profiles and social links
- **users**: Anonymous users (device ID based)
- **likes**: User likes on pins
- **saved_pins**: User bookmarks

Run `npm run db:push` to sync schema to database (requires DATABASE_URL).

## Adding a Backend

To connect to a real backend:

1. Create a Node.js/Express API server
2. Implement REST endpoints matching the schema
3. Update `lib/hooks/useGraffitiData.ts` to fetch from API
4. Enable Notion sync for admin content management

Reference backend implementation available in commit history.

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Drizzle ORM](https://orm.drizzle.team/)

## License

MIT
