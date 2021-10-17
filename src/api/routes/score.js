import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app) => {
  const loggerInstance = Container.get('loggerInstance');
  const scoreService = Container.get('scoreService');


  app.use('/scores', route);

  route.post('/',
    celebrate({
      body: Joi.object({
        appId: Joi.string().required(),
        username: Joi.string().required(),
        gameId: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { appId, username, gameId } = req.body;
        await scoreService.createScore(appId, username, gameId);
        res.sendStatus(204);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

  route.get('/:appId',
    async (req, res, next) => {
    loggerInstance.info(`request from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)
    const { appId } = req.params;
    let scores = null;
    try {
      scores = await scoreService.getScores(appId);
    } catch(error) {
      loggerInstance.error('🔥 error: %o', err);
      return next(err);
    }
    if (!appId || !scores) return res.sendStatus(404);
    return res.status(200).json(scores);
  });
};