# Graffiti Maps

A mobile street art discovery app built with React Native/Expo - combining interactive maps with Instagram-style photo viewing and local data persistence.

## Overview
**Graffiti Maps** is a mobile application (MVP) that helps users discover street art. Current features:
- Interactive map with custom graffiti pin markers
- Anonymous authentication using device ID (no signup required)
- Like and save functionality with local persistence
- User profile with Instagram-style grid layout
- Database schema designed for future backend integration

## Project Structure
- `/app/(tabs)` - Main app screens
  - `index.tsx` - Map screen with interactive pins
  - `explore.tsx` - User profile with liked/saved/submissions tabs
- `/lib` - Core app logic
  - `/hooks` - Custom React hooks (useAuth, useGraffitiData)
  - `mock-data.ts` - Sample graffiti data
  - `/types` - TypeScript type definitions
- `/shared/schema.ts` - Database schema (Drizzle ORM)
- `/components` - Reusable UI components

## Tech Stack
- **Frontend**: React Native with Expo Router
- **Maps**: react-native-maps
- **Storage**: AsyncStorage for local persistence
- **Database Schema**: PostgreSQL with Drizzle ORM (ready for backend)
- **Auth**: Device ID-based anonymous authentication

## Current Implementation
This is a **client-side MVP** using:
- Mock data for graffiti pins (NYC street art)
- Local storage for likes/saves
- No backend required to run

## Backend Integration Ready
The database schema is complete and ready for backend:
- Run `npm run db:push` to sync to PostgreSQL
- Notion integration code available for admin CMS
- API structure documented in README

## Recent Changes (2025-10-31)
- Built interactive map with custom image markers
- Implemented anonymous auth with device IDs
- Created user profile with tabbed interface
- Added like/save functionality with AsyncStorage
- Designed complete database schema
- Set up Expo workflow on port 8080

## User Preferences
- Mobile-first design
- Instagram-style UI patterns
- Anonymous user experience (no signup required)
- Local-first data with backend-ready architecture
