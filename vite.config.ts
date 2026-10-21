import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function syncPhotosPlugin(): Plugin {
  return {
    name: 'sync-photos-plugin',
    configureServer(server) {
      server.middlewares.use('/api/sync-photos', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const photos = data.photos || [];
            for (const item of photos) {
              const filePath = path.resolve(__dirname, 'public', item.repoFilePath);
              const dir = path.dirname(filePath);
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              const base64Data = item.dataUrl.includes(',')
                ? item.dataUrl.split(',')[1]
                : item.dataUrl;
              fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
            }
            exec(
              'git add public/assets/clinic/ && git commit -m "feat(photos): update custom clinic photos from user PC" && git push origin main',
              (err, _stdout, stderr) => {
                if (err) {
                  console.warn('Git commit/push warning in dev middleware:', stderr);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, count: photos.length }));
              }
            );
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), syncPhotosPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
