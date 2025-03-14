// scripts/postinstall.js

const fs = require('fs');
const path = require('path');

// Define paths
const source = path.join(__dirname, '..', 'node_modules', 'ghost-storage-cloudinary');
const destination = path.join(__dirname, '..', 'content', 'adapters', 'storage', 'cloudinary');

// Function to copy directory recursively
const copyDirectory = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

// DISABLED, instead of copying from node_modules, we will use the local version from /content/adapters/storage/cloudinary
// Ensure destination directory exists and copy files
if (fs.existsSync(source)) {
  console.log(`Copying Cloudinary adapter from ${source} to ${destination}`);
  copyDirectory(source, destination);
} else {
  console.error('Cloudinary adapter not found in node_modules. Please install it.');
}

// Call create-config.js script
const { exec } = require('child_process');
exec('node script/create-config.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing create-config.js: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});