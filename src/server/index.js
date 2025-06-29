import express from 'express';
import { createServer, getServerPort } from '@devvit/server';
import { devvitMiddleware } from './middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(devvitMiddleware);

const router = express.Router();
router.get('/api/context', getContext);
app.use(router);

async function getContext(request, response) {
  const context = request.devvit;
  
  const data = {
    subredditId: context?.subredditId,
    subredditName: context?.subredditName,
    postId: context?.postId,
    userId: context?.userId
  };
  
  const profile = await context.reddit.getCurrentUser();
  data.userAvatar = await profile?.getSnoovatarUrl();
  data.userName = profile?.username ?? 'Anon';

  response.json({ type: 'context', data });
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