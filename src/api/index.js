import { Router } from 'express';

// own
import score from './routes/score.js';
import session from './routes/session.js';

export default () => {
  const app = Router();
  score(app);
  session(app);
  return app
}