# Custom Forest Map Boundary Feature - Implementation Flow

## Overview
When the forest map document (`जंगल का नक्शा`) appears in the DownloadPDF screen, users now have two options:
1. **Download Default Map** - Download the pre-generated forest map
2. **Add Custom Boundary** - Trace their own boundary on the map and generate a custom map with overlay

## User Flow

### 1. User sees forest map document with two buttons:
- **Default** button (with download icon)
- **Custom** button (with map-marker-path icon)

### 2. Option A: Download Default Map
- User clicks "Default" button
- System opens default map URL directly
- URL: `https://ncount-apps.s3.amazonaws.com/ANDHRA_PRADESH_Alluri_Sitharama_Raju_Devipatnam_Maddirathigudem_11072.pdf`

### 3. Option B: Add Custom Boundary

#### Step 1: Navigate to Boundary Tracing Screen
- User clicks "Custom" button
- System navigates to `APCFRMarkBoundry` screen with params:
  ```javascript
  {
    returnScreen: 'DownloadPDF',
    mode: 'customBoundary'
  }
  ```

#### Step 2: Trace Boundary
- User sees Google Maps with hybrid view
- User clicks "प्रारंभ करें" (Start) button
- User walks around the area (GPS tracks every 3 seconds)
- Red polyline shows the traced path in real-time
- Location accuracy displayed at bottom

#### Step 3: Complete Boundary
- User clicks "सीमा पूर्ण करें और वापस जाएं" (Complete Boundary and Return)
- System logs the traced coordinates:
  ```javascript
  [
    {latitude: 23.4243415, longitude: 85.3467311},
    {latitude: 23.4244123, longitude: 85.3468234},
    // ... more coordinates
  ]
  ```
- System navigates back to DownloadPDF screen with `userCoords` param

#### Step 4: Generate Custom Map
- DownloadPDF screen receives `userCoords` via navigation param
- System calls `handleCustomBoundaryComplete(userCoords)`
- Console logs comprehensive debugging info:
  - All traced coordinates (JSON formatted)
  - Total boundary points
  - Village ID
  - Owner ID
- "Custom" button changes to "Generating..." with loading icon
- Button is disabled during generation

#### Step 5: API Processing (20-30 seconds)
**Current Implementation:** Simulated with 25-second delay

**TODO - Actual API Integration:**
```javascript
// POST /generate-custom-map
const response = await request('/generate-custom-map', {
  method: 'POST',
  data: {
    coordinates: userCoords, // Array of {latitude, longitude}
    villageId: profile?.village,
    ownerId: profile?._id.toString(),
    defaultMapUrl: 'https://ncount-apps.s3.amazonaws.com/...'
  }
});

// Expected Response:
{
  customMapUrl: 'https://custom-maps.s3.amazonaws.com/custom_123_1234567890.pdf',
  generationTime: 25000, // milliseconds
  status: 'success'
}
```

**Backend Processing (to be implemented):**
1. Receive user coordinates
2. Load default forest map PDF
3. Convert coordinates to map projection
4. Generate polyline overlay layer
5. Merge default map with overlay
6. Upload to S3
7. Return custom map URL

#### Step 6: Download Custom Map
- After generation completes, a new green button appears:
  **"Download Custom Map"**
- Button shows download icon + text
- User clicks to download the custom map
- Custom map contains:
  - Default forest map layers (satellite/terrain)
  - User traced boundary (red polyline overlay)
  - Village boundary markers

## File Changes

### 1. `c:\RatiFi\Screens\DownloadPDF\downloadPDFScreen.js`
**Added:**
- State: `customMapUrl`, `isGeneratingMap`
- Function: `handleCustomBoundaryComplete(userCoords)`
- useEffect: Listen for navigation params with userCoords
- UI: Two-button layout for forest map
- UI: Conditional "Download Custom Map" button

**Key Code Sections:**
```javascript
// Line ~68: State declarations
const [customMapUrl, setCustomMapUrl] = useState(null);
const [isGeneratingMap, setIsGeneratingMap] = useState(false);

// Line ~2748: Custom boundary completion handler
const handleCustomBoundaryComplete = async (userCoords) => {
  // Logs all coordinates and metadata
  // Simulates API call with 25s delay
  // Updates state with custom map URL
}

// Line ~2790: Navigation listener
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    if (route.params?.userCoords) {
      handleCustomBoundaryComplete(route.params.userCoords);
    }
  });
  return unsubscribe;
}, [navigation, route.params]);

// Line ~2902: Forest map rendering with two buttons
if (item?.name === 'जंगल का नक्शा') {
  // Default download button
  // Custom boundary button (navigates to APCFRMarkBoundry)
  // Conditional custom map download button
}
```

### 2. `c:\RatiFi\Screens\MarkBoundry\APCFRMarkBoundary.js`
**Added:**
- Import: `useRoute` from @react-navigation/native
- State: `isCustomBoundaryMode`, `returnScreen` from route.params
- Logic: Conditional navigation back to DownloadPDF with coordinates

**Key Code Sections:**
```javascript
// Line ~40: Route params handling
const route = useRoute();
const isCustomBoundaryMode = route.params?.mode === 'customBoundary';
const returnScreen = route.params?.returnScreen;

// Line ~311: Complete boundary button logic
if (isCustomBoundaryMode && returnScreen === 'DownloadPDF') {
  console.log('Custom boundary mode - returning coordinates');
  navigation.navigate('DownloadPDF', { userCoords: userPath });
  return;
}
// ... original IFR flow continues
```

## Console Logs to Watch

When testing the feature, look for these console logs:

### In APCFRMarkBoundry:
```
Custom boundary mode - returning coordinates to DownloadPDF
User traced path: [{lat: ..., lng: ...}, ...]
```

### In DownloadPDF:
```
=== CUSTOM BOUNDARY MAP GENERATION STARTED ===
User traced coordinates: [
  {latitude: 23.4243415, longitude: 85.3467311},
  ...
]
Total boundary points: 45
Village: Bano
Owner ID: 507f1f77bcf86cd799439011
Processing map overlay... (simulated 25s delay)
=== CUSTOM MAP GENERATED SUCCESSFULLY ===
Custom map URL: https://custom-maps.s3.amazonaws.com/custom_507f1f77bcf86cd799439011_1734636789123.pdf
Map contains:
  1. Default forest map layers (satellite/terrain)
  2. User traced boundary overlay (red polyline)
  3. Village boundary markers
=============================================
```

## API Integration TODO

### Backend Endpoint to Create:
**Endpoint:** `POST /generate-custom-map`

**Request Body:**
```json
{
  "coordinates": [
    {"latitude": 23.4243415, "longitude": 85.3467311},
    {"latitude": 23.4244123, "longitude": 85.3468234}
  ],
  "villageId": "Bano",
  "ownerId": "507f1f77bcf86cd799439011",
  "defaultMapUrl": "https://ncount-apps.s3.amazonaws.com/..."
}
```

**Response:**
```json
{
  "status": "success",
  "customMapUrl": "https://custom-maps.s3.amazonaws.com/custom_507f1f77bcf86cd799439011_1734636789123.pdf",
  "generationTime": 24567,
  "coordinates": 45
}
```

**Implementation Steps:**
1. Receive coordinates array
2. Validate coordinates (min 3 points for valid boundary)
3. Download default map PDF from S3
4. Use PDF/GIS library to add polyline overlay
5. Upload generated PDF to S3 bucket
6. Return S3 URL

**Recommended Libraries:**
- Python: `PyPDF2` + `reportlab` + `shapely`
- Node.js: `pdf-lib` + `turf.js`
- Processing time: 15-30 seconds depending on complexity

## Testing Checklist

- [ ] Default download button works
- [ ] Custom button navigates to APCFRMarkBoundry
- [ ] APCFRMarkBoundry shows "Complete Boundary and Return" text
- [ ] Coordinates are logged in APCFRMarkBoundry console
- [ ] Navigation returns to DownloadPDF with userCoords
- [ ] DownloadPDF logs comprehensive coordinate data
- [ ] "Generating..." state shows during 25s delay
- [ ] "Download Custom Map" button appears after generation
- [ ] Custom button is disabled during generation
- [ ] Custom map URL is logged successfully

## UI/UX Details

### Forest Map Document Layout:
```
┌─────────────────────────────────────────┐
│ जंगल का नक्शा                          │
│                                         │
│  ┌──────────┐  ┌──────────┐            │
│  │  📥       │  │  🗺️      │            │
│  │ Default  │  │ Custom   │            │
│  └──────────┘  └──────────┘            │
│                                         │
│  [If custom generated]                 │
│  ┌─────────────────────────────────┐   │
│  │  📥 Download Custom Map         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Button States:
- **Default:** Always enabled with download icon
- **Custom (idle):** Enabled with map-marker-path icon, "Custom" text
- **Custom (generating):** Disabled with loading icon, "Generating..." text
- **Download Custom Map:** Appears only after successful generation, green background

## Notes
- Custom map generation is currently simulated with 25-second delay
- All coordinate data is logged to console for verification
- Original IFR boundary flow remains unchanged
- Feature only works for CFR claims (typeOfClaim === 'CFR')
- Custom map URL format: `custom_${ownerId}_${timestamp}.pdf`
