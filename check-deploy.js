const netlify = require('netlify');
const http = require('http');

const siteId = '0623f7eb-47ec-4369-b786-d3744e175720';
const deployUrl = 'https://silver-cendol-50897f.netlify.app';

console.log('=== Current Site Info ===');
console.log('Site ID:', siteId);
console.log('Deploy URL:', deployUrl);

// Try to fetch a simple endpoint
const https = require('https');
https.get(deployUrl, (res) => {
  console.log('Status:', res.statusCode);
  res.resume();
}).on('error', (e) => {
  console.error('Error:', e.message);
});