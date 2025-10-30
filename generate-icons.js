const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = 'C:\\RatiFi\\android\\app\\src\\main\\ic_launcher-playstore.png';
const androidResPath = 'C:\\RatiFi\\android\\app\\src\\main\\res';

const sizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 }
];

async function generateIcons() {
  console.log('Starting icon generation...\n');
  
  for (const { folder, size } of sizes) {
    const folderPath = path.join(androidResPath, folder);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    // Generate square icon
    const squareOutput = path.join(folderPath, 'ic_launcher.png');
    await sharp(sourceImage)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(squareOutput);
    console.log(`✓ Generated ${folder}/ic_launcher.png (${size}x${size})`);
    
    // Generate round icon
    const roundOutput = path.join(folderPath, 'ic_launcher_round.png');
    await sharp(sourceImage)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(roundOutput);
    console.log(`✓ Generated ${folder}/ic_launcher_round.png (${size}x${size})`);
  }
  
  console.log('\n✅ All icons generated successfully!');
  console.log('Run "npx react-native run-android" to rebuild and see your new icon.');
}

generateIcons().catch(err => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
