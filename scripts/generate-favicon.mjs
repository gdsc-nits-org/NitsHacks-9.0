import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');
const src       = resolve(root, 'src/assets/logo.png');
const publicDir = resolve(root, 'public');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

const sizes = [
  { name: 'favicon-16.png',  size: 16  },
  { name: 'favicon-32.png',  size: 32  },
  { name: 'favicon-48.png',  size: 48  },
  { name: 'favicon-192.png', size: 192 }, // PWA / Android
  { name: 'favicon-512.png', size: 512 }, // PWA splash
];

for (const { name, size } of sizes) {
  const out = resolve(publicDir, name);
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: size <= 48 })
    .toFile(out);

  const { size: bytes } = await import('fs').then(m => m.promises.stat(out));
  console.log(`✅  ${name.padEnd(18)} → ${(bytes / 1024).toFixed(1)} KB`);
}

console.log('\n🎉  All favicons generated in /public');
