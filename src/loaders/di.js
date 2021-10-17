import { Container } from 'typedi';
import Config from '../config.js';


export default ({
  logger,
  lowdb,
  ScoreService,
  SessionService,

}) => {
  Container.set('lowdbInstance', lowdb);
  logger.info('💉 lowdb instance injected');

  Container.set('loggerInstance', logger);
  logger.info('💉 logger instance injected');

  Container.set('scoreService', new ScoreService());
  logger.info('💉 score service instance injected');

  Container.set('sessionService', new SessionService());
  logger.info('💉 session service instance injected');
}