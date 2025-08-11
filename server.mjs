import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3025);
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = new Map([
	['.html', 'text/html; charset=utf-8'],
	['.css', 'text/css; charset=utf-8'],
	['.js', 'text/javascript; charset=utf-8'],
	['.mjs', 'text/javascript; charset=utf-8'],
	['.svg', 'image/svg+xml'],
	['.png', 'image/png'],
	['.jpg', 'image/jpeg'],
	['.jpeg', 'image/jpeg'],
	['.ico', 'image/x-icon']
]);

function normalisePath(urlPath) {
	try {
		const decoded = decodeURIComponent(urlPath);
		const safe = path.normalize(decoded).replace(/^[\\/]+/, '');
		return safe;
	} catch (error) {
		return '';
	}
}

async function sendFile(res, fullPath) {
	try {
		const data = await fs.readFile(fullPath);
		const ext = path.extname(fullPath).toLowerCase();
		res.writeHead(200, { 'content-type': MIME.get(ext) || 'application/octet-stream' });
		res.end(data);
	} catch (error) {
		if (error.code === 'ENOENT') {
			res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
			res.end('Not found');
		} else {
			res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
			res.end('Server error');
		}
	}
}

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	let requested = normalisePath(url.pathname);

	if (!requested || requested === '/') {
		requested = 'index.html';
	}

	const fullPath = path.join(PUBLIC_DIR, requested);
	const publicPath = path.relative(PUBLIC_DIR, fullPath);
	if (publicPath.startsWith('..')) {
		res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
		res.end('Forbidden');
		return;
	}

	await sendFile(res, fullPath);
});

server.listen(PORT, () => {
	console.log(`[SirTet] Static server listening on http://localhost:${PORT}`);
});


