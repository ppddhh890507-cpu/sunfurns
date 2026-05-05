// postbuild.js - Restructure Next.js standalone output for Netlify
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const nextStandaloneDir = path.join(rootDir, '.next', 'standalone', '.next');
const projectNextDir = path.join(rootDir, '.next');

// Clean and create out directory
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// Create out/standalone directory
const standaloneOutDir = path.join(outDir, 'standalone');
fs.mkdirSync(standaloneOutDir, { recursive: true });

// Move everything from standalone to out/standalone
const items = fs.readdirSync(standaloneDir);
for (const item of items) {
  if (item === '.next') continue;
  const src = path.join(standaloneDir, item);
  const dst = path.join(standaloneOutDir, item);
  fs.renameSync(src, dst);
}

// Create out/standalone/.next
const standaloneNextDir = path.join(standaloneOutDir, '.next');
fs.mkdirSync(standaloneNextDir, { recursive: true });

// Copy .next content - check if standalone has its own .next first
const nextSrc = fs.existsSync(nextStandaloneDir) ? nextStandaloneDir : projectNextDir;
console.log('Copying .next from:', nextSrc);

// Copy server directory
const serverSrc = path.join(nextSrc, 'server');
const serverDst = path.join(standaloneNextDir, 'server');
if (fs.existsSync(serverSrc)) {
  fs.cpSync(serverSrc, serverDst, { recursive: true });
  console.log('Copied server to', serverDst);
}

// Copy build files
const buildFiles = ['BUILD_ID', 'app-path-routes-manifest.json', 'build-manifest.json', 
                    'prerender-manifest.json', 'routes-manifest.json'];
for (const file of buildFiles) {
  const srcFile = path.join(nextSrc, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(standaloneNextDir, file));
  }
}

// Copy required-server-files.json
const rsfSrc = path.join(nextSrc, 'required-server-files.json');
const rsfDst = path.join(standaloneNextDir, 'required-server-files.json');
if (fs.existsSync(rsfSrc)) {
  fs.copyFileSync(rsfSrc, rsfDst);
  fs.mkdirSync(path.join(outDir, '.next'), { recursive: true });
  fs.copyFileSync(rsfSrc, path.join(outDir, '.next', 'required-server-files.json'));
}

// Skip package.json copy - standalone doesn't have one
// (moved items from standaloneDir don't include package.json - it stays in project root)

// Copy BUILD_ID to out root (plugin expects it here)
// Use projectNextDir since nextStandaloneDir is .next/standalone/.next (no BUILD_ID there)
fs.copyFileSync(path.join(projectNextDir, 'BUILD_ID'), path.join(outDir, 'BUILD_ID'));

// Copy required-server-files.json to out/.next/
fs.mkdirSync(path.join(outDir, '.next'), { recursive: true });
fs.copyFileSync(path.join(projectNextDir, 'required-server-files.json'), path.join(outDir, '.next', 'required-server-files.json'));

// Copy static files to out/static (plugin expects static assets)
const staticSrc = path.join(projectNextDir, 'static');
const staticDst = path.join(outDir, 'static');
if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDst, { recursive: true });
  console.log('Copied static files');
} else {
  fs.mkdirSync(staticDst, { recursive: true });
}

// Copy public files
const publicSrc = path.join(rootDir, 'public');
const publicDst = path.join(outDir, 'static');
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDst, { recursive: true });
  console.log('Copied public files');
}

// Copy admin folder
fs.cpSync(path.join(rootDir, 'admin'), path.join(outDir, 'admin'), { recursive: true });
console.log('Copied admin folder');

console.log('Post-build restructure complete');
console.log('out/standalone/.next/server:', fs.existsSync(serverDst));
console.log('out/static:', fs.existsSync(staticDst));