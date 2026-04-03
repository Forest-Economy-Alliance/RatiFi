# Offline Polygon Storage Implementation

## Overview
This implementation allows users to trace multiple forest boundary polygons while offline in the forest, save them locally on the device, and batch-generate maps when network connectivity is available.

## Architecture

### Database Schema
**Vasern SavedPolygons Schema** (`vasern/index.js`)
```javascript
{
  userId: string,           // User who traced the polygon
  polygonName: string,      // Auto-generated (Polygon-1, Polygon-2, etc.)
  coordinates: string,      // JSON stringified array of {latitude, longitude}
  startTime: string,        // ISO timestamp when tracing started
  endTime: string,          // ISO timestamp when tracing completed
  duration: number,         // Duration in seconds
  pointsRecorded: number,   // Number of GPS points recorded
  isVisible: boolean,       // Show/hide on map (future feature)
  createdAt: number         // Unix timestamp for sorting
}
```

**Note:** Map generation is done on-the-fly. Map URLs are not stored since users can generate maps with any combination of saved polygons.

## User Flow

### 1. Trace Polygon Offline (APCFRMarkBoundary.js)
**Location:** `Screens/MarkBoundry/APCFRMarkBoundary.js`

**Changes Made:**
- Added `tripStartTime` state to track when tracing begins
- Modified "Save Polygon" button to save locally and reset for next trace
- Generates automatic polygon names (Polygon-1, Polygon-2, etc.)
- Calculates duration and metadata before saving
- Shows toast notification with summary
- Automatically resets to allow tracing another polygon
- User stays on same screen to continue tracing more boundaries

**Key Code:**
```javascript
const endTime = new Date().toISOString();
const durationSeconds = Math.floor((end - startTime) / 1000);

const savedPolygon = {
  userId: profile?.id,
  polygonName: `Polygon-${polygonCount}`,
  coordinates: JSON.stringify(userPath),
  startTime: tripStartTime,
  endTime: endTime,
  duration: durationSeconds,
  pointsRecorded: userPath.length,
  isVisible: true,
  createdAt: Date.now()
};

VasernDB.SavedPolygons.insert(savedPolygon);

// Reset for next polygon
setUserPath([]);
setTripStartTime(null);

ToastAndroid.show(
  `✅ ${polygonName} saved! Press Start to trace another boundary.`,
  ToastAndroid.LONG
);
```

### 2. View & Manage Saved Polygons (SavedPolygonsScreen.js)
**Location:** `Screens/MarkBoundry/SavedPolygonsScreen.js`

**Features:**
- Lists all saved polygons for current user
- Display metadata:
  - Polygon name
  - Start time (formatted)
  - Duration (Xh Ym Zs format)
  - Number of points recorded
- Multi-select with checkboxes
- View/Hide toggle (updates `isVisible` in DB)
- Delete with confirmation dialog
- Bottom button: "Generate Maps (N)" where N = selected count
- Header actions:
  - **Refresh button**: Reload polygon list
  - **Add/Trace button** (green + icon): Navigate to APCFRMarkBoundary to trace more
- Empty state with instructions
- Pull-to-refresh functionality

**Key Functions:**
```javascript
loadSavedPolygons()           // Load from Vasern, filter by userId
togglePolygonVisibility()     // Update isVisible flag
deletePolygon()              // Delete with confirmation
toggleSelection()            // Manage multi-select
generateMapsForSelected()    // Navigate to DownloadPDF with selectedPolygons
```

### 3. Batch Map Generation (DownloadPDF/downloadPDFScreen.js)
**Location:** `Screens/DownloadPDF/downloadPDFScreen.js`

**Changes Made:**
- Enhanced `handleCustomBoundaryComplete()` to support batch mode
- New parameters:
  - `userCoords`: Single polygon coordinates (legacy)
  - `isBatchMode`: Boolean flag for batch processing
  - `selectedPolygonIds`: Array of polygon IDs to process
- Format coordinates for multiple polygons:
  - Input: Array of {latitude, longitude} objects per polygon
  - Output: `List[List[Tuple[float, float]]]` for API
- Update Vasern records with generated map URLs
- Show appropriate success dialogs

**API Payload Format:**
```javascript
{
  address: { state, district, block, village },
  user_coords: [
    [[lat1, lng1], [lat2, lng2], ...],  // Polygon 1
    [[lat1, lng1], [lat2, lng2], ...],  // Polygon 2
    // ... more polygons
  ],
  show_neighbor_boundaries: false,
  show_neighbor_names: false
}
```

**Updated useEffect:**
```javascript
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', async () => {
    const params = route.params;
    
    // Batch mode from SavedPolygonsScreen
    if (params?.selectedPolygons && params.selectedPolygons.length > 0) {
      const polygonIds = params.selectedPolygons.map(p => p.id);
      handleCustomBoundaryComplete(null, true, polygonIds);
    }
    // Single polygon mode (legacy support)
    else if (params?.userCoords) {
      handleCustomBoundaryComplete(params.userCoords, false, []);
    }
  });
  return unsubscribe;
}, [navigation, route.params, printDocs]);
```

## Navigation Integration
**File:** `Navigation/index.js`

**Added:**
- Import: `SavedPolygonsScreen`
- Route: `SavedPolygons` screen in stack navigator
- Positioned after `APCFRMarkBoundry` for logical flow

```javascript
<Stack.Screen
  name="SavedPolygons"
  component={SavedPolygonsScreen}
  options={{ headerShown: false }}
/>
```

## Translations
**Files Modified:**
- `assets/i18n/en.json`
- `assets/i18n/hi.json`
- `assets/i18n/te.json`

**Added Translation Key:**
- `save_polygon`:
  - English: "Save Polygon"
  - Hindi: "बहुभुज सहेजें"
  - Telugu: "బహుభుజిని సేవ్ చేయండి"

## Testing Checklist

### Offline Mode Testing
- [ ] Turn on Airplane Mode
- [ ] Navigate to APCFRMarkBoundary
- [ ] Trace a polygon with at least 3 points
- [ ] Complete and save polygon
- [ ] Verify data saved in Vasern (check logs)
- [ ] Trace multiple polygons in sequence
- [ ] Close and reopen app - verify polygons persist

### Online Mode Testing
- [ ] Turn off Airplane Mode
- [ ] Navigate to SavedPolygonsScreen
- [ ] Verify all saved polygons appear
- [ ] Select multiple polygons using checkboxes
- [ ] Click "Generate Maps (N)"
- [ ] Verify API call with correct format
- [ ] Verify maps generated successfully with download URLs

### UI/UX Testing
- [ ] Test view/hide toggle
- [ ] Test delete with confirmation
- [ ] Test empty state display
- [ ] Test formatted date/time display
- [ ] Test formatted duration display
- [ ] Test "Trace Another" flow
- [ ] Test "View Saved Polygons" navigation
- [ ] Test "Go Back" from SavedPolygonsScreen

### Edge Cases
- [ ] Attempt to complete polygon with < 3 points
- [ ] Test with no network connection during generation
- [ ] Test API timeout (90 seconds)
- [ ] Test with invalid polygon data
- [ ] Test with large number of polygons (100+)
- [ ] Test with large number of points (1000+)

## API Endpoint
**URL:** `http://34.234.85.163/api/v1/generateMap`

**Method:** POST

**Request Format:**
```json
{
  "address": {
    "state": "string",
    "district": "string",
    "block": "string",
    "village": "string"
  },
  "user_coords": [
    [[23.123, 85.456], [23.124, 85.457], ...],
    [[23.125, 85.458], [23.126, 85.459], ...]
  ],
  "show_neighbor_boundaries": false,
  "show_neighbor_names": false
}
```

**Expected Response:**
```json
{
  "status": 200,
  "data": [
    "https://example.com/map1.png",
    "https://example.com/map2.png"
  ]
}
```

## Files Modified

### Core Functionality
1. **vasern/index.js** - Added SavedPolygons schema
2. **Screens/MarkBoundry/APCFRMarkBoundary.js** - Offline polygon saving
3. **Screens/MarkBoundry/SavedPolygonsScreen.js** - NEW file, management UI
4. **Screens/DownloadPDF/downloadPDFScreen.js** - Batch map generation

### Navigation & Translations
5. **Navigation/index.js** - Added SavedPolygons route
6. **assets/i18n/en.json** - Added save_polygon translation
7. **assets/i18n/hi.json** - Added save_polygon translation
8. **assets/i18n/te.json** - Added save_polygon translation

## Usage Instructions

### For Forest Workers
1. **Offline in Forest:**
   - Open app and navigate to boundary tracing screen
   - Press "Start Tracking" 🚀
   - Walk around forest boundary (GPS records every 3 seconds)
   - Press "Save Polygon" 💾
   - See toast notification confirming save
   - Press "Start Tracking" again to trace another polygon
   - Repeat for as many boundaries as needed
   - All data saved locally on device

2. **Back in Network Area:**
   - Navigate to "Saved Polygons" screen
   - Review all traced polygons
   - Use **+ button** in header to trace more boundaries if needed
   - Select multiple polygons with checkboxes
   - Press "Generate Maps (N)" button
   - Wait for batch generation (90 second timeout)
   - Download generated PDF maps directly

3. **Generate Maps with Different Combinations:**
   - Select any combination of saved polygons
   - Generate maps on-the-fly as needed
   - No need to regenerate - just select different combinations

## Benefits
✅ **Offline-First:** Work without network connectivity  
✅ **Batch Processing:** Generate multiple maps at once  
✅ **Data Persistence:** Vasern local database  
✅ **User-Friendly:** Automatic naming, metadata tracking  
✅ **Flexible:** View/hide, delete, multi-select  
✅ **Efficient:** Single API call for multiple polygons  
✅ **Backward Compatible:** Supports legacy single polygon flow

## Future Enhancements
- [ ] Map preview in SavedPolygonsScreen
- [ ] Export polygon data as GeoJSON
- [ ] Polygon editing (add/remove points)
- [ ] Polygon merging/splitting
- [ ] Cloud sync for backup
- [ ] Offline map tiles for reference
- [ ] Share polygon data with other users
