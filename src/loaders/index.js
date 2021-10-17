import expressLoader from './express.js';
import LowdbLoader from './lowdb.js';
import diLoader from './di.js';
import logger from './logger.js';
import ScoreService from '../services/score.js';
import SessionService from '../services/session.js';

export default async ({ expressApp }) => {
  const lowdb = new LowdbLoader();

  diLoader({
    logger,
    lowdb,
    ScoreService,
    SessionService,
  });
  logger.info('🟢 Dependency injection loaded');

  await expressLoader({ app: expressApp });
  logger.info('🟢 Express loaded');

  // rest of loaders...
};