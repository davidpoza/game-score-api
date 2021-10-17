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

  async createScore() {

  }

};
