import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set project name before importing port-client (it reads env at import time)
process.env.PROJECT_NAME = 'revenue-engineer-v3';

const { port, deregister } = await import('port-registry/port-client');

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, 'public', 'index.html'), 'utf-8');

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

const allocatedPort = await port;

server.listen(allocatedPort, () => {
  console.log(`Server running on http://localhost:${allocatedPort}`);
});

// Clean shutdown
async function shutdown() {
  console.log('\nShutting down...');
  await deregister();
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
