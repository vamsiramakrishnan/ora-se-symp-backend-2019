import db from '../helpers/database'
import { Model } from 'objection'


Model.knex(db);

export class User extends Model {
    static get tableName() {
        return 'USERTABLE'
    }
}

export class Post extends Model {
    static get tableName() {
        return 'POSTTABLE'
    }
}

export class Comment extends Model {
    static get tableName() {
        return 'COMMENTTABLE'
    }
}