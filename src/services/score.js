import { Container } from 'typedi';

import config from '../config.js';

export default class ScoreService {
  constructor() {
    this.logger = Container.get('loggerInstance');
    this.lowdb = Container.get('lowdbInstance');
    this.getScores = this.getScores.bind(this);
    this.createScore = this.createScore.bind(this);
    return this;
  }

  async getScores(appId) {
    try {
      await this.lowdb.read();
      return this.lowdb.data?.scores?.[appId];
    } catch(error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createScore(appId, username, gameId) {
    try {
      await this.lowdb.read();
      let scores = this.lowdb.data?.scores?.[appId];
      let userSession = this.lowdb.data?.sessions?.[appId]?.[username];
      if (!userSession) {
        throw new Error('a session must exist in order to create a score');
        return;
      }
      if (userSession?.gameId !== gameId) {
        throw new Error('gameId does not match');
        return;
      }
      const score = Math.floor((new Date().getTime() - userSession.ts) / 1000);
      delete this.lowdb.data?.sessions?.[appId]?.[username];
      scores.push({
        user: username,
        score
      });
      scores = scores
        .sort((a, b) => {
          if (a.score > b.score) return 1;
          return -1;
        })
        .slice(0, 10);

      await this.lowdb.write();
    } catch(error) {
      this.logger.error(error);
      throw error;
    }
  }

};
