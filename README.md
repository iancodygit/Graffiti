# Graffiti Maps 🎨

A mobile street art discovery app built with React Native/Expo - think Snap Map meets Instagram for graffiti!

## Features

### 🗺️ Discover Street Art
- Browse graffiti pins in a card-based feed
- Beautiful photo cards with artist info
- Tap to like pins directly from the feed
- Detailed pin information with tags and locations

**Note**: The app uses a card-based view instead of an interactive map for Expo Go compatibility. For a real map with markers, you'll need to create a development build (`npx expo run:ios` or `npx expo run:android`).

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
- **UI**: Card-based feed (Expo Go compatible)
- **Database**: PostgreSQL with Drizzle ORM (schema ready for backend)
- **CMS**: Notion API integration (for future admin use)
- **State**: AsyncStorage for local data persistence

**Why No Map?** react-native-maps requires native modules that don't work in Expo Go. To add an interactive map, you'll need to create a development build with `npx expo prebuild` and `npx expo run:ios`/`npx expo run:android`.

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
- Card-based graffiti feed (works in Expo Go!)
- Like functionality with heart icon
- Anonymous authentication (device ID based)
- User profile with liked/saved tabs
- Instagram-style photo grid
- Local data persistence with AsyncStorage
- Complete database schema ready for backend

**🚧 Next Steps:**
- Interactive map (requires development build, not Expo Go)
- Backend API integration
- Full-screen photo carousel viewer
- Search and filter UI
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
