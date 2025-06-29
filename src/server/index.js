import express from 'express';
import { createServer, getServerPort } from '@devvit/server';
import { devvitMiddleware } from './middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(devvitMiddleware);

const router = express.Router();
router.get('/api/user', getUser);
app.use(router);

async function getUser(request, response) {
  const profile = await request.devvit.reddit.getCurrentUser();
  const username = profile?.username ?? 'Anon';
  const defaultAvatarUrl = 'https://www.redditstatic.com/shreddit/assets/thinking-snoo.png';
  const avatar = (await profile?.getSnoovatarUrl()) ?? defaultAvatarUrl;
  response.json({ type: 'userdata', username, avatar });
}

function onServerStart() {
  console.log('Server Started')
}

function onServerError(err) {
  console.error('Server Error:', err);
}

const port = getServerPort();
const server = createServer(app);
server.on('error', onServerError);
server.listen(port, onServerStart);