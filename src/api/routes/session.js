import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app) => {
  const loggerInstance = Container.get('loggerInstance');

  app.use('/sessions', route);

  route.post('/',
    celebrate({
      body: Joi.object({
        gameId: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      // const accountService = Container.get('accountService');
      // const {
      //   name, number, description, bankId, accessId, accessPassword, settings
      // } = req.body;
      // const userId = req.user.id;
      // try {
      //   const account = await accountService.create(
      //     {
      //       name,
      //       number,
      //       description,
      //       userId,
      //       bankId,
      //       accessId,
      //       accessPassword,
      //       settings
      //     }
      //   );
      //   res.status(201).json(account);
      // } catch (err) {
      //   loggerInstance.error('🔥 error: %o', err);
      //   if (err.name === 'SequelizeUniqueConstraintError') {
      //     return res.sendStatus(400);
      //   }
      //   return next(err);
      // }
    });


  route.get('/',
    async (req, res, next) => {
      // const { id } = req.params;
      // const userId = req.user.id;
      // const accountService = Container.get('accountService');
      // try {
      //   if (id) {
      //     const account = await accountService.findById(id, userId);
      //     if (!account) {
      //       return res.sendStatus(404);
      //     }
      //     return res.status(200).json(account);
      //   }
      //   const accounts = await accountService.findAll(userId);
      //   return res.status(200).json(accounts);
      // } catch (err) {
      //   loggerInstance.error('🔥 error: %o', err);
      //   return next(err);
      // }
    }
  );

};