import { Container } from 'typedi';

import config from '../config.js';

export default class SessionService {
  constructor() {
    this.logger = Container.get('loggerInstance');
    this.getSession = this.getSession.bind(this);
    this.createSession = this.createSession.bind(this);
    return this;
  }

  async getSession() {

  }

  async createSession() {

  }
};