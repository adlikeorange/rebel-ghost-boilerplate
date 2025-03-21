// scripts/postinstall.js

const fs = require('fs');
const path = require('path');

// Function to recursively list directory contents
const listDirectory = (dir, prefix = '') => {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    console.log(`${prefix}${item}`);
    if (fs.lstatSync(itemPath).isDirectory()) {
      listDirectory(itemPath, `${prefix}  `);
    }
  });
};

// Log environment and paths
console.log('\nEnvironment Info:');
console.log('----------------');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

const adapterPath = path.join(__dirname, '..', 'content', 'adapters', 'storage', 'cloudinary');
console.log('\nAdapter path:', adapterPath);
console.log('Adapter exists:', fs.existsSync(adapterPath));

if (fs.existsSync(adapterPath)) {
  console.log('\nAdapter directory contents:');
  console.log('-------------------------');
  listDirectory(adapterPath);
}

// Log full content/adapters directory
const adaptersPath = path.join(__dirname, '..', 'content', 'adapters');
console.log('\nFull content/adapters directory:', adaptersPath);
console.log('------------------------------');
if (fs.existsSync(adaptersPath)) {
  listDirectory(adaptersPath);
} else {
  console.log('Adapters directory does not exist!');
}

// Call create-config.js script to set up Ghost configuration
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
