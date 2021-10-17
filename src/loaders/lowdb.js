import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class LowdbLoader {
  constructor() {
    const file = join(__dirname, '../../db.json');
    const adapter = new JSONFile(file);
    const db = new Low(adapter);
    return db;
  }
}
