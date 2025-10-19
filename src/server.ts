
import 'zone.js/node';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

// The Express app exported for serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/unidad_restitucion_tierras/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';


  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  // All regular routes use the Universal engine
  server.get('*', (req: Request, res: Response) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    // Server-side startup message (keep console for server runtime logs)
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Ensure the server runs only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__.main : require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
