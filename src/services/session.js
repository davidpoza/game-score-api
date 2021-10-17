import { Container } from 'typedi';

import config from '../config.js';

export default class SessionService {
  constructor() {
    this.logger = Container.get('loggerInstance');
    this.lowdb = Container.get('lowdbInstance');
    this.getSession = this.getSession.bind(this);
    this.createSession = this.createSession.bind(this);
    return this;
  }

  async getSession(appId, username) {
    try {
      await this.lowdb.read();
      return this.lowdb.data?.sessions?.[appId]?.[username];
    } catch(error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createSession(appId, username, gameId) {
    try {
      await this.lowdb.read();
      const appSessions = this.lowdb.data?.sessions?.[appId];
      appSessions[username] = {
        ts: new Date().getTime(),
        gameId,
      };
      await this.lowdb.write();
    } catch(error) {
      this.logger.error(error);
      throw error;
    }
  }
};