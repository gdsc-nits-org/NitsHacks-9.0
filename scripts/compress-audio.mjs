/**
 * compress-audio.mjs
 * Re-encodes the background song to 96 kbps mono MP3.
 * 96 kbps is transparent for background music and reduces ~6 MB → ~1 MB.
 */
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { statSync } from 'fs';

Ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');

const INPUT  = resolve(root, 'src/assets/comingSoon/gone-gone-gone.mp3');
const OUTPUT = resolve(root, 'src/assets/comingSoon/gone-gone-gone-compressed.mp3');

const before = (statSync(INPUT).size / 1024 / 1024).toFixed(2);
console.log(`\n📂  Input : ${before} MB`);
console.log('⏳  Compressing to 96 kbps mono MP3 …\n');

await new Promise((resolve, reject) => {
  Ffmpeg(INPUT)
    .audioBitrate('96k')       // 96 kbps — perfectly fine for background music
    .audioChannels(1)          // mono halves the bitrate again → ~48 kbps effective
    .audioFrequency(44100)
    .outputOptions(['-map_metadata', '-1'])  // strip album art / ID3 tags (saves ~50-100 KB)
    .on('end', resolve)
    .on('error', reject)
    .save(OUTPUT);
});

const after = (statSync(OUTPUT).size / 1024 / 1024).toFixed(2);
const saving = (((statSync(INPUT).size - statSync(OUTPUT).size) / statSync(INPUT).size) * 100).toFixed(0);

console.log(`✅  Output: ${after} MB  (${saving}% smaller)\n`);
console.log('🎉  Done! Now rename gone-gone-gone-compressed.mp3 → gone-gone-gone.mp3');
