# Expo Go Compatibility Guide

## Current Status: ✅ Expo Go Compatible

This app is currently configured to run fully inside **Expo Go** without requiring a native build.

## Card-Based Feed (Current Implementation)

The app currently uses a **card-based feed** to display street art locations. This provides:
- ✅ Full compatibility with Expo Go
- ✅ All features working: like, unlike, view details
- ✅ Fast development iterations
- ✅ Easy testing on any device with Expo Go app

## Native Maps (Future Enhancement)

The project includes `react-native-maps` and `react-native-map-clustering` packages for future use, but **these require a development build** and will not work in Expo Go.

### To Enable Native Apple Maps:

1. **Create a development build:**
   ```bash
   npx expo prebuild
   npx expo run:ios    # For iOS
   npx expo run:android # For Android
   ```

2. **Update `app/(tabs)/index.tsx`:**
   - Import `MapView` and `Marker` from `react-native-maps`
   - Replace the ScrollView/FlatList with MapView component
   - Add markers for each pin location

3. **Platform Detection (Optional):**
   You can detect if running in Expo Go vs dev build:
   ```typescript
   import Constants from 'expo-constants';

   const isExpoGo = Constants.appOwnership === 'expo';

   // Show card feed in Expo Go, map in dev build
   return isExpoGo ? <CardFeed /> : <MapView />;
   ```

## Current Package Versions

- ✅ `react-native-maps@1.26.18` (installed, needs dev build)
- ✅ `react-native-map-clustering@4.0.0` (installed, needs dev build)
- ✅ `expo-location@19.0.7` (installed, works in Expo Go)

## Development Workflow

### For Expo Go (Current):
```bash
npm start
# Scan QR code with Expo Go app
```

### For Native Build (Future):
```bash
npx expo run:ios
# or
npx expo run:android
```

## Notes

- The `expo-location` plugin is already configured in `app.json` for location permissions
- Location permissions will be requested when implementing native maps
- The card feed provides the same data and functionality as the map view
- All other features (likes, saves, profiles) work identically in both modes
