const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'admin');
const dest = path.join(__dirname, '..', 'out', 'admin');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(src)) {
  copyDir(src, dest);
  console.log('admin/ folder copied to out/admin/');
} else {
  console.log('admin/ folder not found, skipping');
}
