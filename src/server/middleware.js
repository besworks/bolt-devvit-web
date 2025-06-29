import { getContext } from '@devvit/server';

export function devvitMiddleware(req, res, next) {
  req.devvit = getContext(); next();
}