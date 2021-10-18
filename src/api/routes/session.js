import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app) => {
  const loggerInstance = Container.get('loggerInstance');
  const sessionService = Container.get('sessionService');

  app.use('/sessions', route);

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
        await sessionService.createSession(appId, username, gameId);
        res.sendStatus(204);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

  // this endpoint will be used to check gameId is not changing during game, to avoid cheating
  route.get('/',
    async (req, res, next) => {
      try {
        const { appId, username } = req.query;
        const session = await sessionService.getSession(appId, username);
        if (!session) return res.sendStatus(404);
        res.status(200).json(session);
      } catch (error) {
        res.status(400).json({ error: err.message });
      }
    }
  );

};