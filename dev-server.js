// Set project name before importing port-client (it reads env at import time)
process.env.PROJECT_NAME = 'revenue-engineer-v3';

const { port, deregister } = await import('port-registry/port-client');

const allocatedPort = await port;

// Set the port for Next.js
process.env.PORT = String(allocatedPort);

// Import and run Next.js dev server
const { createServer } = await import('http');
const { parse } = await import('url');
const next = (await import('next')).default;

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

const app = next({ dev, hostname, port: allocatedPort });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer(async (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.end('internal server error');
  }
});

server.listen(allocatedPort, () => {
  console.log(`> Ready on http://${hostname}:${allocatedPort}`);
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

