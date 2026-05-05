// Simple Next.js handler that uses built standalone server
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: process.env.PATH_INFO || '/',
  method: 'GET',
  headers: {
    ...Object.fromEntries(
      Object.entries(process.env)
        .filter(([k]) => k.startsWith('HEADER_'))
        .map(([k, v]) => [k.replace(/^HEADER_/, ''), v])
    ),
    'x-now-id': process.env.EffectiveContext,
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    // Set status code
    res.resume();
    // Use context.succeed() equivalent
    console.log(`STATUS:${res.statusCode}`);
    console.log(`HEADERS:${JSON.stringify(res.headers)}`);
    console.log(`BODY:${data}`);
  });
});

req.on('error', (e) => {
  console.error(`ERROR:${e.message}`);
});

req.end();