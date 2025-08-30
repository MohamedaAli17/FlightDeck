# Restaurant Logos

This folder contains restaurant logo images for the FlightDeck app.

## Current Status
Currently, the app uses fallback restaurant icons when actual logos are not available.

## How to Add Restaurant Logos

To add actual restaurant logos:

1. **Download the restaurant logos** from official sources or use licensed images
2. **Save them as PNG files** with the following naming convention:
   - `one-flew-south.png`
   - `paschals.png`
   - `phillips-seafood.png`
   - `varsity.png`
   - `sweet-auburn-bbq.png`
   - `chick-fil-a.png`
   - `pf-changs.png`
   - `tgi-fridays.png`
   - `cafe-intermezzo.png`
   - `starbucks.png`
   - `qdoba.png`
   - `burger-king.png`
   - `popeyes.png`
   - `atlanta-chophouse.png`
   - `panda-express.png`
   - `arbys.png`
   - `dunkin.png`
   - `ecco.png`

3. **Recommended image specifications:**
   - Format: PNG with transparency
   - Size: 160x160 pixels (2x for high DPI)
   - Background: Transparent
   - File size: Under 100KB each

4. **Update the food.tsx file** to use the actual images:
   ```typescript
   // Replace null with require statements
   image: require('../../assets/images/restaurant-logos/restaurant-name.png'),
   ```

## Legal Considerations
- Ensure you have proper licensing for any restaurant logos used
- Consider using official brand assets when available
- Some restaurants may require permission for logo usage

## Fallback System
If a logo is not available, the app will display a generic restaurant icon as a fallback.
